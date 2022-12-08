import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";

import LodgelinkImage from './portfolio/lodgelink/lodgelink home.PNG';
import AutismImage from './portfolio/autism/autism.jpg';
import FungalImage from './portfolio/fungal/fungal-growth-preview.png';
import LodestoneImage from './portfolio/lodestone/lodestone-preview.PNG';

function Portfolio() {

    const portfolioList = [
        {
            title: "G3 Pipeline",
            subtitle: "UX + Front End Lead",
            info: "Getting grain where it needs to be",
            image: LodgelinkImage,
            writeup: "Testing writeup"
        },
        {
            title: "Lodgelink",
            subtitle: "UX + Front End Lead",
            info: "Connecting people to places, wherever",
            image: LodgelinkImage,
            writeup: `LodgeLink is a convenient online booking and accommodations management site, with two major goals: to help find quality accommodations that best meets the needs of workers and help owners of accommodations fill their open rooms.\n
            As the front-end lead for the team in charge of the admin-facing sites, I created wireframes and protoypes of each step, contributed and in some cases led meetings about data-structure and interaction, and finally created the two web-apps through React.
            I worked with another company who was commissioned to help create the customer facing portion of the site to ensure consistency and interaction between every layer.`
        },
        {
            title: "My Autism Passport",
            subtitle: "UX Design",
            info: "Navigating a challenging time",
            image: AutismImage,
            writeup: `My Autism Passport (MAP) is an innovative patient journey app designed to help parents overcome barriers, stay on the same page with caregivers, and play an active role in their child’s care.\n
            As one of the UX designers on this project, it was my role to create the wireframes and flow for the app, allowing ease of use and reliability for parents on information and assistance with their childs care.`
        },
        {
            title: "Fungal Growth",
            subtitle: "Front End Animation",
            info: "Beauty in Visualization",
            image: FungalImage,
            writeup: `Fungal Growth is a univeristy art project that visualizes the colour composition of a photograph.\n
            Simply upload your desired photo, and a network graph showing the pixel colours and their connected neighbours will start to grow onscreen.`
        },
        {
            title: "Lodestone",
            subtitle: "Front End Visualizations",
            info: "An expandable tool for data visualization",
            image: LodestoneImage,
            writeup: `Lodestone is a data exploration tool designed to investigate a variety of data, including the bottom-up analysis of large multifaceted social and conversational datasets. Lodestone leverages scalable front-end Web technologies, a variety of visualization libraries, and supports multiple data sources. The Lodestone Visualization Platform is flexible so code-savvy users can write custom plugins for data-sources, visualizations, and interactions.`
        },
    ]

    const portfolioRender = (item, index) => (
        <Grid item key={item.title + index}>
            <Card sx={{ maxWidth: 345, width: '100%' }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={item.title}
                        height="140"
                        image={item.image}
                    />
                    <CardContent sx={{ pb: 1 }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {item.subtitle}
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                            {item.info}
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