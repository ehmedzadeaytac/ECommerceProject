import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

function HomePage() {
    const navigate = useNavigate();
    const [mostViewed, setMostViewed] = useState([]);

    useEffect(() => {
        const getMostViewed = async () => {
            try {
                const response = await api.get("/products/most-viewed", {
                    params: { count: 4 }
                });

                setMostViewed(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        getMostViewed();
    }, []);

    return (
        <Box>
            <Container
                maxWidth="lg"
                sx={{
                    minHeight: "80vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center"
                }}
            >
                <Box>
                    <Typography
                        variant="h2"
                        fontWeight="bold"
                        gutterBottom
                    >
                        Discover Your Style
                    </Typography>

                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ mb: 4 }}
                    >
                        Find everything you need in one place.
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate("/products")}
                    >
                        Shop Now
                    </Button>
                </Box>
            </Container>

            {mostViewed.length > 0 && (
                <Container maxWidth="lg" sx={{ pb: 10 }}>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{ mb: 4 }}
                    >
                        Most Viewed Products
                    </Typography>

                    <Grid container spacing={3}>
                        {mostViewed.map((product) => (
                            <Grid
                                key={product.id}
                                size={{
                                    xs: 12,
                                    sm: 6,
                                    md: 3
                                }}
                            >
                                <Card
                                    onClick={() =>
                                        navigate(`/products/${product.id}`)
                                    }
                                    sx={{
                                        height: "100%",
                                        cursor: "pointer",
                                        borderRadius: 3,
                                        overflow: "hidden",
                                        transition: "0.3s",
                                        "&:hover": {
                                            transform: "translateY(-6px)",
                                            boxShadow: 6
                                        }
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="180"
                                        image={product.imageUrl}
                                        alt={product.name}
                                    />

                                    <CardContent>
                                        <Typography
                                            variant="subtitle1"
                                            fontWeight="bold"
                                        >
                                            {product.name}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {product.viewCount.toLocaleString()}{" "}
                                            views
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            )}
        </Box>
    );
}

export default HomePage;