import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  CircularProgress 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import headerBg from '../../assets/image_00.jpg';

export default function Aktiviteter() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('http://localhost:3042/activities/');
        const result = await response.json();
        
        if (result.status === 'ok') {
          setActivities(result.data);
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <Box>
      {/* Header Section with Background Image */}
      <Box
        sx={{
          backgroundImage: `url(${headerBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "40vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(71, 71, 71, 0.5)",
            zIndex: 1,
          },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            position: "relative",
            zIndex: 2,
            color: "white",
            fontFamily: '"Zen Loop", cursive',
            fontSize: { xs: "3rem", md: "4rem" },
            fontWeight: 300,
            letterSpacing: "2px",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          Aktiviteter
        </Typography>
      </Box>

      {/* Info Section */}
      <Box
        sx={{
          backgroundColor: "#2a4f57",
          padding: { xs: "3rem 2rem", md: "4rem 3rem" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "white",
            fontFamily: '"Zen Loop", cursive',
            fontSize: { xs: "2rem", md: "2.5rem" },
            fontWeight: 300,
            marginBottom: "1.5rem",
            lineHeight: 1.4,
          }}
        >
          Ingen skal kede sig hos Gitte
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: "0.95rem", md: "1rem" },
            lineHeight: 1.8,
            maxWidth: "800px",
          }}
        >
          Glamping er mere end blot en overnatning det er en mulighed for at
          forbinde dig naturens og skabe minder, der varer evigt ud. Lærer om os
          forventede en eventyrlig kanotur, en omkring bålet, småfulde
          oplevelser som vinsmagning eller minigolf. det giver dig mulighed for
          fordybelse indad + til at sætte gang balance fremadrettet skal vi ikke
          kunne medbestimme aline fremtid.
        </Typography>
      </Box>

      {/* Activities Section */}
      <Box
        sx={{
          backgroundColor: "#d9d9d9",
          padding: { xs: "3rem 1.5rem", md: "4rem 2rem" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {loading ? (
          <CircularProgress sx={{ color: "#33626C" }} />
        ) : (
          <Box
            sx={{
              width: "100%",
              maxWidth: "600px",
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {activities.map((activity) => (
              <Box key={activity._id}>
                {/* Activity Image */}
                <Box
                  sx={{
                    width: "100%",
                    height: "200px",
                    backgroundImage: `url(${activity.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "20px 20px 0 0",
                  }}
                />

                {/* Activity Card */}
                <Box
                  sx={{
                    backgroundColor: "#33626C",
                    padding: "2rem",
                    borderRadius: "0 0 20px 20px",
                  }}
                >
                  {/* Activity Title */}
                  <Typography
                    sx={{
                      color: "#c9b591",
                      fontFamily: '"Zen Loop", cursive',
                      fontSize: "2.5rem",
                      fontWeight: 300,
                      marginBottom: "1rem",
                      textAlign: "center",
                    }}
                  >
                    {activity.title}
                  </Typography>

                  {/* Days and Time Info */}
                  <Box sx={{ marginBottom: "1.5rem" }}>
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "1rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {activity.date}
                    </Typography>
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "1rem",
                      }}
                    >
                      Kl. {activity.time}
                    </Typography>
                  </Box>

                  {/* Læs mere Accordion */}
                  <Accordion
                    sx={{
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      border: "2px solid white",
                      borderRadius: "25px",
                      "&:before": {
                        display: "none",
                      },
                      "& .MuiAccordionSummary-root": {
                        minHeight: "60px",
                        borderRadius: "25px",
                      },
                      "& .MuiAccordionDetails-root": {
                        paddingTop: 0,
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon
                          sx={{ color: "white", fontSize: "2rem" }}
                        />
                      }
                      sx={{
                        color: "white",
                        "& .MuiAccordionSummary-content": {
                          justifyContent: "center",
                        },
                      }}
                    >
                      <Typography sx={{ fontSize: "1.2rem", fontWeight: 300 }}>
                        Læs mere
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "0.95rem",
                          lineHeight: 1.6,
                        }}
                      >
                        {activity.description}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
