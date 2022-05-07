import Card from "@mui/material/Card";
import {CardActionArea, CardHeader, Grid} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import eventPic from "../res/img/events/event-pic.jpg";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";
import {styled} from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import {getFullDate, getTime} from "./DateFormatter";


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function EventCard({ event }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Grid item sm={12} md={6}>
            <Card sx={{ maxWidth: 400 }} className="eventCard">
                <CardActionArea onClick={handleExpandClick}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={eventPic}
                        alt="Event picture"
                    />
                    <CardHeader
                        action={
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more">
                                <ExpandMoreIcon />
                            </ExpandMore>
                        }
                        title={event.header}
                    />
                    <CardContent>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography color="text.secondary"> {event.description} </Typography>
                            </CardContent>
                        </Collapse>
                        <div className="grid-container">
                            <p className="cardDate">pris: {event.price} DKK</p>
                        </div>
                        <div className="grid-container">
                            <div>
                                <Typography variant="subtitle2" color="text.secondary">
                                    <p className="cardDate">{getFullDate(event.from)} - {getTime(event.from)}</p>
                                </Typography></div>
                            <div className="cardLocation">
                                <Typography variant="subtitle2" color="text.secondary" >
                                    <p className="cardLocation">{event.location}</p>
                                </Typography></div>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}