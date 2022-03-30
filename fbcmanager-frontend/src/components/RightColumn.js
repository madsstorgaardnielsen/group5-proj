import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {CardActionArea} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import UserPic from "../res/img/events/event-pic.jpg";

import "../scss/style.scss";


export default function RightColumn() {
    return(
        <div className="right_column">
            <div className="column_top">
                <div>
                    <div className="avatar_dropdown">
                        <Avatar alt="Profile Picture" src={UserPic} variant="rounded"/>
                    </div>
                    <div className="avatar_dropdown">
                        <DropdownMenu/>
                    </div>
                </div>
                <p className="right_align">Mette Frederiksen</p>
                <p className="right_align">Medlemsskab: Aktiv</p>
                <p className="right_align">U12</p>
            </div>

            <div className="bulletin_card_grid">
                <p className="bulletin_header">Opslagstavle</p>
                <FormRow/>
            </div>
        </div>
    )
}


//Inspiration from mui.com/components/buttons/
function DropdownMenu() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                "arrow"
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </div>
    );
}

const numberOfCards = 4;
function FormRow() {
    return (
        <React.Fragment>
                <section className="bulletin_card_grid">
                    {Array.from({ length: numberOfCards }, (_, i) => <span key={i}>
                            <EventCard/>
                        </span>)}
                </section>
        </React.Fragment>
    );
}

function EventCard() {
    const navigate = useNavigate()
    const toHome = () => {
        navigate('/home')
    }

    return (
        <Card sx={{ maxWidth: 400 }} className="bulletin_card">
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    Pølsehorn og snacks
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Tag dine forældre med til pølsehorn og snacks ved klubhuset på onsdag!
                </Typography>


                <div className="grid-container">
                    <div>
                        <Typography variant="subtitle2" color="text.secondary">
                            <p className="bulletin_date">29/9 kl. 13:00</p>
                        </Typography></div>

                </div>

            </CardContent>
        </Card>
    );
}









