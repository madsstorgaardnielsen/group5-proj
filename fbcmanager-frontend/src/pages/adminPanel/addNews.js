import React from "react";
import Navbar from "../../components/Navbar";
import "../../scss/style.scss"
import {Helmet} from 'react-helmet';
import ProfileColumn from "../../components/ProfileColumn";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "../../scss/adminPanel.scss";
import {useNavigate, useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';


function AdminPanel () {
    const navigate = useNavigate()
    const navBack = () => {
        navigate('/adminPanel')
    }

    function addToDB(e, header, subheader, description, id) {
        e.preventDefault();
        if (id === ""){ // if purpose is to add new
            const object = {
                "Date": "2022-05-02T11:00:00",
                "Header": header,
                "Subheader": subheader,
                "Content": description,
            };
            axios.post(
                "http://localhost:7285/api/News",
                object
            ).then((response) => console.log(response.data));
        } else { // if purpose is to edit existing
            const object = {
                "id" : id,
                "Date": "2022-05-02T11:00:00",
                "Header": header,
                "Subheader": subheader,
                "Content": description,
            };
            axios.put(
                "http://localhost:7285/api/News",
                object
            ).then((response) => console.log(response.data));
        }
    }

    let pageHeader = "Opret nyhed";
    let pageButton = "OPRET";
    let helper = "All fields must be filled out";
    let defaultHeader, defaultSubHeader, defaultBody, id;
    defaultHeader = defaultSubHeader = defaultBody = id = "";
    const [Header, setHeaderInput] = React.useState('');
    const handleHeaderInputChange = event => {
        setHeaderInput(event.target.value);
    };
    const [SubHeader, setSubHeaderInput] = React.useState('');
    const handleSubHeaderInputChange = event => {
        setSubHeaderInput(event.target.value);
    };
    const [Description, setTextInput] = React.useState('');
    const handleTextInputChange = event => {
        setTextInput(event.target.value);
    };

    const location = useLocation();
    try {
        if (location.state.news != null) {
            let news = location.state.news
            helper = "OBS: All fields must be changed before save"
            defaultHeader =  news.header;
            defaultSubHeader =  news.subheader;
            defaultBody = news.content;
            id = news.newsId;
            pageHeader = "Rediger din nyhed";
            pageButton = "Opdater";
        }
    } catch  {}


    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
    const [submitPressed,setSubmitPressed]=React.useState(false)
    const [waiting,setWaiting]=React.useState(false)

    return (
        <div>
            <Helmet>
                <title>AdminPanel | NemSport</title>
            </Helmet>
            <Navbar />
            <div className="body">
                <div className="main-grid-container">
                    <div className="adminPanel-content">
                        <h1>{pageHeader}</h1>
                        <Box
                            className="addBox"
                            sx={{
                                maxWidth: 600
                            }}
                        >
                            <h6 className="adminAdd">Skriv en passende overskrift</h6>
                            <TextField
                                fullWidth
                                multiline
                                rows={1}
                                label="Overskrift"
                                onChange={handleHeaderInputChange}
                                defaultValue={defaultHeader}
                                id="Headline"
                                variant="outlined"
                                style={{marginBottom: 20,
                                    backgroundColor: "white"}}
                            />

                            <h6 className="adminAdd">Skriv en passende underoverskrift</h6>
                            <TextField
                                fullWidth
                                multiline
                                rows={1}
                                label="Underoverskrift"
                                onChange={handleSubHeaderInputChange}
                                defaultValue={defaultSubHeader}
                                id="Headline"
                                variant="outlined"
                                style={{marginBottom: 20,
                                    backgroundColor: "white"}}
                            />

                            <h6 className="adminAdd">Skriv din nyhed</h6>
                            <TextField
                                fullWidth
                                multiline
                                rows={10}
                                label="Nyhed"
                                onChange={handleTextInputChange}
                                defaultValue={defaultBody}
                                id="Body"
                                variant="outlined"
                                style={{backgroundColor: "white"}}
                            />
                            <p className="helper" >{helper}</p>
                        </Box>

                        {
                            waiting?<CircularProgress color="primary" />:null //Simple feedback for when submit button is pressed
                        }
                        {
                            submitPressed?<Alert severity="success" sx={{ maxWidth: 600 }}>Added successfully</Alert>:null
                        }
                        <Button variant="contained"
                                size="large"
                                hidden={submitPressed || waiting}
                                disabled={!Header || !SubHeader || !Description}
                                onClick={(e) => {
                                    setWaiting(true)
                                    addToDB(e, Header, SubHeader, Description, id);
                                    delay(1000).then(() => setWaiting(false));
                                    delay(1000).then(() => setSubmitPressed(true));
                                    delay(2500).then(() => navBack());
                                }}
                        >
                            {pageButton}
                        </Button>
                    </div>
                    <div className="main-grid-item">
                        <ProfileColumn />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;