import { Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import "./portfolio.scss";

function PortfolioModal({ open, handleClose, item }) {

    const image = <img class="modal-image" src={item.image} alt={item.title + " image"} />;

    const information = (
        <>
            <DialogTitle>
                {item.title}
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.primary.main,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ overflow: 'scroll', maxHeight: "60vh" }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {item.subtitle}
                </Typography>
                <Typography variant="body2" color="text.primary" gutterBottom>
                    {item.info}
                </Typography>
                <Typography>
                    {item.writeup}
                </Typography>
            </DialogContent>
        </>
    );

    return (
        <Dialog onClose={handleClose} open={open} maxWidth={'lg'} fullWidth scroll='paper'>
            <Grid container spacing={0} sx={{ display: { xs: 'none', sm: 'flex' } }}>
                <Grid item xs={7}>
                    {image}
                </Grid>
                <Grid item xs={5}>
                    {information}
                </Grid>
            </Grid>
            <Grid container spacing={0} sx={{ display: { xs: 'flex', sm: 'none' } }}>
                <Grid item>
                    {information}
                </Grid>
                <Grid item>
                    {image}
                </Grid>
            </Grid>
        </Dialog>
    );
}

export default PortfolioModal;