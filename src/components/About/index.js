import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

function About() {

    return (
        <Box id="About"
            sx={{
                display: 'flex',
                px: 3,
                py: 6,
            }}>
            <Grid container justifyContent="center">
                <Grid item xs={12} md={8} lg={6}>
                    <Card elevation={3} >
                        <CardContent>
                            <Typography variant="h4" gutterBottom>
                                <code>About Me</code>
                            </Typography>
                            <Typography>
                                Technically, working through challenges is something I enjoy.
                                Being able to break a concept down, and figure out how it should
                                work is an experience I appreciate. This translates particularly
                                well to the world of design and front-end development.<br /><br />
                                <code>"How do we match client and user requirements?
                                    What makes this process as smooth as possible for the user?
                                    How do we make this into maintainable, readable, reusable
                                    code in order to get the most ‘bang for our buck’?"</code><br /><br />Answering all these questions makes my job both challenging, and highly enjoyable.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>);
}

export default About;