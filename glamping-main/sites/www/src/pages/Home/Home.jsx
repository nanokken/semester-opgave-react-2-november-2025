import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Avatar,
} from "@mui/material";
import logo from "../../assets/logo.png";
import gitteImage from "../../assets/gitte.jpg";
import headerBg from "../../assets/image_00.jpg";

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:3042/reviews");
        const result = await response.json();

        if (result.status === "ok") {
          setReviews(result.data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <Box>
      {/* Header Section */}
      <Box
        sx={{
          backgroundImage: `url(${headerBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: { xs: "2rem", md: "clamp(2rem, 5vw, 4rem)" },
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(71, 71, 71, 0.418)",
            zIndex: 1,
          },
          "& > *": {
            position: "relative",
            zIndex: 2,
          },
        }}
      >
        <Avatar
          src={logo}
          alt="logo"
          sx={{
            width: { xs: 120, md: "clamp(120px, 15vw, 150px)" },
            height: { xs: 120, md: "clamp(120px, 15vw, 150px)" },
            marginBottom: "1rem",
            padding: "10px",
          }}
        />
        <Typography
          variant="h1"
          sx={{
            color: "white",
            textAlign: "center",
            fontSize: { xs: "3rem", md: "clamp(3rem, 5vw, 4rem)" },
            fontWeight: 300,
            letterSpacing: "2px",
            margin: "0.5rem 0",
          }}
        >
          Gittes
        </Typography>
        <Typography
          variant="h1"
          sx={{
            color: "white",
            textAlign: "center",
            fontSize: { xs: "3.5rem", md: "clamp(3.5rem, 5.5vw, 4.5rem)" },
            fontWeight: 300,
            letterSpacing: "2px",
            margin: "0.5rem 0 3rem 0",
          }}
        >
          Glamping
        </Typography>
        <Button
          component={Link}
          to="/kontakt"
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "white",
            borderWidth: "3px",
            padding: {
              xs: "1rem 4rem",
              md: "clamp(1rem, 2vw, 1.2rem) clamp(3rem, 6vw, 5rem)",
            },
            fontSize: { xs: "1.5rem", md: "clamp(1.5rem, 2vw, 1.8rem)" },
            fontWeight: 300,
            letterSpacing: "3px",
            borderRadius: "50px 0 50px 0",
            "&:hover": {
              backgroundColor: "white",
              color: "#2a4f57",
              borderWidth: "3px",
            },
          }}
        >
          BOOK NU
        </Button>
      </Box>

      {/* Ophold Section */}
      <Box
        sx={{
          backgroundColor: "#2a4f57",
          padding: {
            xs: "3rem 2rem",
            md: "clamp(3rem, 5vw, 5rem) clamp(2rem, 4vw, 4rem)",
          },
          display: "flex",
          borderRadius: {
            xs: "0",
            md: "clamp(30px, 4vw, 40px) 0 clamp(30px, 4vw, 40px) 0",
          },
          flexDirection: "column", // Always use column for better control
          alignItems: "center",
          textAlign: "center",
          marginTop: { xs: "-50px", md: "clamp(-60px, -8vw, -80px)" },
          position: "relative",
          zIndex: 10,
          maxWidth: { xs: "500px", md: "90%", lg: "1400px" },
          margin: {
            xs: "-50px auto 0",
            md: "clamp(-60px, -8vw, -80px) auto 0",
          },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "white",
            fontSize: { xs: "2.5rem", md: "clamp(2.5rem, 4vw, 3.5rem)" },
            fontWeight: 300,
            marginBottom: "2rem",
            lineHeight: 1.4,
            textAlign: "center",
          }}
        >
          Kom og prøv <br /> glamping hos Gitte!
        </Typography>

        <Typography
          sx={{
            color: "white",
            fontSize: { xs: "1rem", md: "clamp(1rem, 1.5vw, 1.2rem)" },
            textAlign: "center",
            maxWidth: { xs: "450px", md: "80%" },
            lineHeight: 1.8,
            marginBottom: "2rem",
          }}
        >
          Vi er stolte af at byde dig velkommen til Gitte's Glamping, hvor
          hjertevarme og omsorg møder naturens skønhed og eventyr. Vores
          dedikerede team, anført af Gitte selv, er her for at skabe den
          perfekte ramme om din luksuriøse udendørsoplevelse. Vi stræber efter
          at skabe minder og fordybelse, uanset om du besøger os som par,
          familie eller soloeventyrer. Vi tilbyder en bred vifte af aktiviteter
          og arrangementer, der passer til alle aldre og interesser. Udforsk
          naturen, slap af ved bålet, del historier med nye venner, eller find
          indre ro med vores wellnessaktiviteter.
        </Typography>

        {/* Container for Avatar and Button on larger screens */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: "2rem", md: "3rem" },
            width: "100%",
          }}
        >
          <Avatar
            src={gitteImage}
            alt="Gitte"
            sx={{
              width: { xs: 200, md: "clamp(200px, 25vw, 300px)" },
              height: { xs: 200, md: "clamp(200px, 25vw, 300px)" },
            }}
          />
          <Button
            component={Link}
            to="/ophold"
            variant="contained"
            sx={{
              backgroundColor: "#829B97",
              color: "white",
              fontSize: { xs: "1.2rem", md: "clamp(1.2rem, 1.8vw, 1.4rem)" },
              letterSpacing: "2px",
              borderRadius: "50px 0 50px 0",
              width: { xs: "280px", md: "clamp(280px, 35vw, 350px)" },
              height: { xs: "105px", md: "clamp(105px, 12vw, 120px)" },
              textAlign: "center",
              "&:hover": {
                backgroundColor: "white",
                color: "#2a4f57",
              },
            }}
          >
            SE VORES OPHOLD
          </Button>
        </Box>
      </Box>

      {/* Reviews Section */}
      <Box
        sx={{
          backgroundColor: "#d9d9d9",
          padding: { xs: "2rem", md: "clamp(2rem, 4vw, 4rem)" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: { xs: "-50px", md: "clamp(-60px, -8vw, -80px)" },
          paddingTop: { xs: "100px", md: "clamp(100px, 15vw, 150px)" },
        }}
      >
        {loading ? (
          <CircularProgress sx={{ color: "#2a4f57" }} />
        ) : (
          <Grid
            container
            spacing={{ xs: 1.5, md: 2 }}
            sx={{
              maxWidth: { xs: "400px", md: "90%", lg: "1200px" },
            }}
          >
            {/* Header Card */}
            <Grid size={{ xs: 12, md: 12, lg: 4 }}>
              <Card
                sx={{
                  backgroundColor: "#c9b591",
                  color: "white",
                  padding: "2rem",
                  borderRadius: {
                    xs: "30px 0 30px 0",
                    md: "clamp(30px, 4vw, 40px) 0 clamp(30px, 4vw, 40px) 0",
                  },
                  textAlign: "center",
                  minHeight: { xs: "200px", md: "clamp(200px, 25vw, 250px)" }, // Changed to match review cards
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: "3rem", md: "clamp(3rem, 4vw, 3.5rem)" },
                    fontWeight: 300,
                    lineHeight: 1.4,
                    margin: 0,
                  }}
                >
                  Vores gæster
                  <br />
                  udtaler
                </Typography>
              </Card>
            </Grid>

            {/* Review Cards */}
            {reviews.map((review) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={review._id}>
                <Card
                  sx={{
                    backgroundColor: "#6b8e8a",
                    color: "white",
                    padding: { xs: "2rem", md: "clamp(2rem, 3vw, 2.5rem)" },
                    borderRadius: {
                      xs: "30px 0 30px 0",
                      md: "clamp(30px, 4vw, 40px) 0 clamp(30px, 4vw, 40px) 0",
                    },
                    textAlign: "center",
                    minHeight: { xs: "200px", md: "clamp(200px, 25vw, 250px)" }, // Same as header card
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <CardContent
                    sx={{ padding: 0, "&:last-child": { paddingBottom: 0 } }}
                  >
                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: {
                          xs: "2rem",
                          md: "clamp(2rem, 2.5vw, 2.2rem)",
                        },
                        fontWeight: 300,
                        margin: "0 0 0.2rem 0",
                      }}
                    >
                      {review.name}, {review.age} år
                    </Typography>
                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: {
                          xs: "2rem",
                          md: "clamp(2rem, 2.5vw, 2.2rem)",
                        },
                        fontWeight: 300,
                        margin: "0 0 1rem 0",
                      }}
                    >
                      Har været på {review.stay}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "0.95rem",
                          md: "clamp(0.95rem, 1.3vw, 1.1rem)",
                        },
                        lineHeight: 1.6,
                        margin: 0,
                        fontWeight: 300,
                      }}
                    >
                      {review.review}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
