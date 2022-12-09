import { Box, Button, Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import "./contact.scss";

import GithubLogo from './github.png';

function Contact() {

    const mailHref = `mailto:spludlow@hotmail.com` +
        `?subject=Reaching out from your website`
        + `&body=${encodeURI("Hello Shelby,\nMy name is _____. I'm reaching out to you because _____.")}`;

    return (
        <>
            <Box id="Contact"
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
                                    <code>Contact</code>
                                </Typography>
                                <Typography gutterBottom>
                                    Want to get in touch or have a cool project in mind? Just want to say hey?
                                </Typography>
                                <Grid container sx={{ pt: 2 }} justifyContent="center">
                                    <Grid item xs={12} sm={6}>
                                        <Button color="primary" variant="contained" fullWidth href={mailHref}>
                                            Send me an email
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            <Box id="Github"
                sx={{
                    px: 3,
                    pb: 4,
                    pt: 1,
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                <IconButton href="https://www.github.com/spludlow" target="_blank">
                    <img class="githubLogo" src={GithubLogo} alt="My Github" width="32" height="32" />
                </IconButton>
            </Box>
        </>);
}

export default Contact;