import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";

function Contact() {

    const mailHref = `mailto:spludlow@hotmail.com` +
        `?subject=Reaching out from your website`
        + `&body=${encodeURI("Hello Shelby,\nMy name is _____. I'm reaching out to you because _____.")}`;

    return (
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
        </Box>);
}

export default Contact;