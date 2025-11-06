import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
} from "@mui/material";
import heroImage from "../../assets/image_01.jpg";

export default function Ophold() {
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStays = async () => {
      try {
        const response = await fetch("http://localhost:3042/stays/");
        const data = await response.json();
        console.log("API Response:", data);
        // Check if data is an array or if it has a data/items property
        if (Array.isArray(data)) {
          setStays(data);
        } else if (data.data && Array.isArray(data.data)) {
          setStays(data.data);
        } else if (data.items && Array.isArray(data.items)) {
          setStays(data.items);
        } else {
          console.error("Unexpected data format:", data);
          setStays([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stays:", error);
        setLoading(false);
      }
    };

    fetchStays();
  }, []);

  const handleReadMore = (id) => {
    navigate(`/ophold/${id}`);
  };

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: "60vh",
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            position: "relative",
            zIndex: 1,
            fontSize: { xs: "2.5rem", md: "4rem" },
            fontFamily: '"Zen Loop", cursive',
            textAlign: "center",
            px: 2,
          }}
        >
          Vores ophold
        </Typography>
      </Box>

      {/* Description Section */}
      <Container sx={{ py: 6 }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "1.8rem", md: "2.5rem" },
            fontFamily: '"Zen Loop", cursive',
            textAlign: "center",
            color: "#2a4f57",
            mb: 3,
          }}
        >
          Vi har ophold til enhver smag
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            maxWidth: "800px",
            mx: "auto",
            color: "#555",
            lineHeight: 1.8,
            mb: 6,
          }}
        >
          Vores glampingophold er skabt til at tilbyde en unik oplevelse i
          naturskønne omgivelser. Uanset om du ønsker ro og fred, eller et
          aktivt ophold med masser at lave, har vi den ideelle ferie for både
          vær og stress, og der er plads til både familier, venner, par - ja
          selv hunden kan komme med. Oplev naturen med hele din kærnefamilie,
          venner og bekendte. Book dit ophold i dag og og du kan allerede være
          sikker på at glæde sig lykken og oplevelsen til forår, sommer, efterår
          og vinter!
        </Typography>

        {/* Stays Grid */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 3,
          }}
        >
          {stays.map((stay) => (
            <Card
              key={stay._id}
              sx={{
                width: 350,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                overflow: "hidden",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: '"Zen Loop", cursive',
                  backgroundColor: "#6b8e8a",
                  color: "white",
                  textAlign: "center",
                  py: 1,
                }}
              >
                {stay.title}
              </Typography>
              <CardMedia
                component="img"
                height="250"
                image={stay.image?.url || stay.image || "/placeholder.jpg"}
                alt={stay.title}
                sx={{ objectFit: "cover" }}
              />
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "#6b8e8a",
                  textAlign: "center",
                  p: 3,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "white",
                    mb: 2,
                    flexGrow: 1,
                  }}
                >
                  {`${stay.numberOfPersons} Personer - Fra ${stay.price},-`}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => handleReadMore(stay._id)}
                  sx={{
                    backgroundColor: "#829B97",
                    color: "white",
                    borderRadius: 3,
                    px: 4,
                    py: 1,
                    textTransform: "none",
                    fontSize: "1rem",
                    "&:hover": {
                      backgroundColor: "#6d8680",
                    },
                  }}
                >
                  Læs mere
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
