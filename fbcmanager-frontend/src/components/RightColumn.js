import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

import Avatar from '@mui/material/Avatar';
import UserPic from "../res/img/events/eventPic.jpg";
import DropdownIcon from "../res/img/navbar/home.svg";





export default function RightColumn() {
    return(
        <nav className="RightColumn">
            <Avatar alt="Mette Frederiksen" src={UserPic} variant="rounded"/>
            <p>Mette Frederiksen</p>
            <p>Medlemsskab: Aktiv</p>
            <p>U12</p>
            <p>Opslagstavle</p>

            <DropdownMenu/>

        </nav>
    )
}



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
                +
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








