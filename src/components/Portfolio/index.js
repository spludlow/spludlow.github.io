import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";

function Portfolio() {

    const portfolioList = [
        { title: "G3 Pipeline", subtitle: "UX + Front End Lead", writeup: "" },
        { title: "Lodgelink", subtitle: "UX + Front End Lead", writeup: "" },
        { title: "My Autism Passport", subtitle: "UX Design", writeup: "" },
        { title: "Fungal Growth", subtitle: "Front End Animation", writeup: "" },
        { title: "Lodestone", subtitle: "Front End Visualizations", writeup: "" },
    ]

    const portfolioRender = (item, index) => (
        <Grid item key={item.title + index}>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={item.title}
                        height="140"
                        image=""
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {item.subtitle}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </CardActionArea>
            </Card>
        </Grid>);


    return (
        <Box id="Portfolio"
            sx={{
                px: 3,
                py: 6,
            }}>
            <Grid container justifyContent="center">
                <Grid item xs={12} md={8} lg={6}>
                    <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                        <code>Portfolio</code>
                    </Typography>
                </Grid>
            </Grid>
            <Grid container justifyContent="center">
                <Grid item xs={12} md={10} lg={8}>
                    <Grid container spacing={3} justifyContent="center">
                        {portfolioList.map(portfolioRender)}
                    </Grid>
                </Grid>
            </Grid>
        </Box>);
}

export default Portfolio;