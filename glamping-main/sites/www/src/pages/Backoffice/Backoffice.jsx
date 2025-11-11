import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import ImgUploader from "../../components/ImgUploader/ImgUploader";

export default function Backoffice() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [currentActivity, setCurrentActivity] = useState({
    _id: "",
    title: "",
    description: "",
    date: "",
    time: "",
    image: "",
    imageFile: null,
  });
  const [currentStay, setCurrentStay] = useState({
    _id: "",
    title: "",
    description: "",
    numberOfPersons: "",
    price: "",
    includes: "",
    image: "",
    imageFile: null,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    // Check if user is admin
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }

    const userData = JSON.parse(user);
    if (userData.role !== "admin") {
      setSnackbar({
        open: true,
        message: "Adgang nægtet. Kun administratorer har adgang.",
        severity: "error",
      });
      setTimeout(() => navigate("/"), 2000);
      return;
    }

    fetchActivities();
    fetchStays();
  }, [navigate]);

  const fetchActivities = async () => {
    try {
      const response = await fetch("http://localhost:3042/activities/");
      const result = await response.json();

      if (result.status === "ok") {
        setActivities(result.data);
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
      setSnackbar({
        open: true,
        message: "Fejl ved hentning af aktiviteter",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStays = async () => {
    try {
      const response = await fetch("http://localhost:3042/stays/");
      const result = await response.json();

      if (result.status === "ok") {
        setStays(result.data);
      } else if (Array.isArray(result)) {
        setStays(result);
      }
    } catch (error) {
      console.error("Error fetching stays:", error);
      setSnackbar({
        open: true,
        message: "Fejl ved hentning af ophold",
        severity: "error",
      });
    }
  };

  const handleOpenDialog = (item = null) => {
    if (item) {
      setEditMode(true);
      if (currentTab === 0) {
        setCurrentActivity(item);
      } else {
        // Convert includes array to string for editing
        const stayWithStringIncludes = {
          ...item,
          includes: Array.isArray(item.includes)
            ? item.includes.join(", ")
            : item.includes || "",
        };
        setCurrentStay(stayWithStringIncludes);
      }
    } else {
      setEditMode(false);
      if (currentTab === 0) {
        setCurrentActivity({
          _id: "",
          title: "",
          description: "",
          date: "",
          time: "",
          image: "",
          imageFile: null,
        });
      } else {
        setCurrentStay({
          _id: "",
          title: "",
          description: "",
          numberOfPersons: "",
          price: "",
          includes: "",
          image: "",
          imageFile: null,
        });
      }
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentActivity({
      _id: "",
      title: "",
      description: "",
      date: "",
      time: "",
      image: "",
      imageFile: null,
    });
    setCurrentStay({
      _id: "",
      title: "",
      description: "",
      numberOfPersons: "",
      price: "",
      includes: "",
      image: "",
      imageFile: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (currentTab === 0) {
      setCurrentActivity((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setCurrentStay((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("authToken");
    const isActivity = currentTab === 0;
    const currentItem = isActivity ? currentActivity : currentStay;
    const endpoint = isActivity ? "activity" : "stay";

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("title", currentItem.title);
      formData.append("description", currentItem.description);

      if (isActivity) {
        formData.append("date", currentItem.date);
        formData.append("time", currentItem.time);
      } else {
        formData.append("numberOfPersons", currentItem.numberOfPersons);
        formData.append("price", currentItem.price);
        // Send includes as a simple string - backend will need to split it
        formData.append("includes", currentItem.includes || "");
      }
      if (editMode) {
        formData.append("id", currentItem._id);

        // Only append image if there's a new file
        if (currentItem.imageFile) {
          formData.append("file", currentItem.imageFile);
        }

        const response = await fetch(`http://localhost:3042/${endpoint}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const result = await response.json();

        if (result.status === "ok") {
          setSnackbar({
            open: true,
            message: `${isActivity ? "Aktivitet" : "Ophold"} opdateret`,
            severity: "success",
          });
          isActivity ? fetchActivities() : fetchStays();
          handleCloseDialog();
        } else {
          setSnackbar({
            open: true,
            message: result.message || "Fejl ved opdatering",
            severity: "error",
          });
        }
      } else {
        // For new items, append image if available
        if (currentItem.imageFile) {
          formData.append("file", currentItem.imageFile);
        }

        const response = await fetch(`http://localhost:3042/${endpoint}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const result = await response.json();

        if (result.status === "ok") {
          setSnackbar({
            open: true,
            message: `${isActivity ? "Aktivitet" : "Ophold"} oprettet`,
            severity: "success",
          });
          isActivity ? fetchActivities() : fetchStays();
          handleCloseDialog();
        } else {
          setSnackbar({
            open: true,
            message: result.message || "Fejl ved oprettelse",
            severity: "error",
          });
        }
      }
    } catch (error) {
      console.error(`Error saving ${isActivity ? "activity" : "stay"}:`, error);
      setSnackbar({
        open: true,
        message: "Fejl ved gemning",
        severity: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    const isActivity = currentTab === 0;
    const itemType = isActivity ? "aktivitet" : "ophold";
    const endpoint = isActivity ? "activity" : "stay";

    if (
      !window.confirm(`Er du sikker på, at du vil slette denne ${itemType}?`)
    ) {
      return;
    }

    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(`http://localhost:3042/${endpoint}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result.status === "ok") {
        setSnackbar({
          open: true,
          message: `${isActivity ? "Aktivitet" : "Ophold"} slettet`,
          severity: "success",
        });
        isActivity ? fetchActivities() : fetchStays();
      } else {
        setSnackbar({
          open: true,
          message: result.message || "Fejl ved sletning",
          severity: "error",
        });
      }
    } catch (error) {
      console.error(`Error deleting ${itemType}:`, error);
      setSnackbar({
        open: true,
        message: "Fejl ved sletning",
        severity: "error",
      });
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5", py: 6 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Zen Loop", cursive',
              color: "#2a4f57",
            }}
          >
            Backoffice
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
            sx={{
              backgroundColor: "#829B97",
              "&:hover": {
                backgroundColor: "#6d8680",
              },
            }}
          >
            {currentTab === 0 ? "Ny Aktivitet" : "Nyt Ophold"}
          </Button>
        </Box>

        <Tabs
          value={currentTab}
          onChange={(e, newValue) => setCurrentTab(newValue)}
          sx={{ mb: 3 }}
        >
          <Tab label="Aktiviteter" />
          <Tab label="Ophold" />
        </Tabs>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#2a4f57" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Titel
                </TableCell>
                {currentTab === 0 ? (
                  <>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Dato
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Tid
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Personer
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Pris
                    </TableCell>
                  </>
                )}
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Beskrivelse
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold" }}
                  align="right"
                >
                  Handlinger
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentTab === 0
                ? activities.map((activity) => (
                    <TableRow key={activity._id} hover>
                      <TableCell>{activity.title}</TableCell>
                      <TableCell>{activity.date}</TableCell>
                      <TableCell>{activity.time}</TableCell>
                      <TableCell>
                        {activity.description?.substring(0, 50)}...
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenDialog(activity)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(activity._id)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                : stays.map((stay) => (
                    <TableRow key={stay._id} hover>
                      <TableCell>{stay.title}</TableCell>
                      <TableCell>{stay.numberOfPersons}</TableCell>
                      <TableCell>{stay.price} DKK</TableCell>
                      <TableCell>
                        {stay.description?.substring(0, 50)}...
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenDialog(stay)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(stay._id)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Create/Edit Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {editMode
              ? `Rediger ${currentTab === 0 ? "Aktivitet" : "Ophold"}`
              : `Opret Ny ${currentTab === 0 ? "Aktivitet" : "Ophold"}`}
          </DialogTitle>
          <DialogContent>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
            >
              <TextField
                label="Titel"
                name="title"
                value={
                  currentTab === 0 ? currentActivity.title : currentStay.title
                }
                onChange={handleInputChange}
                fullWidth
                required
              />
              <TextField
                label="Beskrivelse"
                name="description"
                value={
                  currentTab === 0
                    ? currentActivity.description
                    : currentStay.description
                }
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
                required
              />
              {currentTab === 0 ? (
                <>
                  <TextField
                    label="Dato"
                    name="date"
                    value={currentActivity.date}
                    onChange={handleInputChange}
                    fullWidth
                    placeholder="f.eks. Mandag-Fredag"
                  />
                  <TextField
                    label="Tid"
                    name="time"
                    value={currentActivity.time}
                    onChange={handleInputChange}
                    fullWidth
                    placeholder="f.eks. 10:00-12:00"
                  />
                </>
              ) : (
                <>
                  <TextField
                    label="Antal Personer"
                    name="numberOfPersons"
                    value={currentStay.numberOfPersons}
                    onChange={handleInputChange}
                    fullWidth
                    type="number"
                    required
                  />
                  <TextField
                    label="Pris (DKK)"
                    name="price"
                    value={currentStay.price}
                    onChange={handleInputChange}
                    fullWidth
                    type="number"
                    required
                  />
                  <TextField
                    label="Inkluderet"
                    name="includes"
                    value={currentStay.includes}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Skriv hver ting adskilt med komma, f.eks: Morgenmad, Wifi, Parkering, Adgang til cykler"
                    helperText="Adskil hver ting med komma"
                  />
                </>
              )}
              <ImgUploader
                label={`${currentTab === 0 ? "Aktivitet" : "Ophold"} Billede`}
                id={`${currentTab === 0 ? "activity" : "stay"}-image`}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    if (currentTab === 0) {
                      setCurrentActivity((prev) => ({
                        ...prev,
                        imageFile: file,
                        image: file.name,
                      }));
                    } else {
                      setCurrentStay((prev) => ({
                        ...prev,
                        imageFile: file,
                        image: file.name,
                      }));
                    }
                  } else {
                    if (currentTab === 0) {
                      setCurrentActivity((prev) => ({
                        ...prev,
                        imageFile: null,
                        image: "",
                      }));
                    } else {
                      setCurrentStay((prev) => ({
                        ...prev,
                        imageFile: null,
                        image: "",
                      }));
                    }
                  }
                }}
                defaultImage={
                  editMode
                    ? currentTab === 0
                      ? currentActivity.image
                      : currentStay.image
                    : null
                }
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Annuller</Button>
            <Button
              onClick={handleSave}
              variant="contained"
              sx={{
                backgroundColor: "#829B97",
                "&:hover": {
                  backgroundColor: "#6d8680",
                },
              }}
            >
              {editMode ? "Gem" : "Opret"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
