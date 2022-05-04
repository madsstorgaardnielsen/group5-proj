import React from "react";
import Navbar from "../../components/Navbar";
import "../../scss/style.scss"
import {Helmet} from 'react-helmet';
import ProfileColumn from "../../components/ProfileColumn";
import "../../scss/adminPanel.scss";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Card, CardHeader, CardContent, CardAction, Typography, Grid} from '@mui/material';
import Button from "@mui/material/Button";
import "../../scss/eventPage.scss";


function AdminPanel () {
    const [news, setNews] = React.useState([])

    const navigate = useNavigate()
    const navBack = () => {
        navigate('/adminPanel')
    }

    React.useEffect(() => {
        axios.get("https://localhost:7285/api/News").then((response) => {
            setNews(response.data)
        })})



    return (
        <div>
            <Helmet>
                <title>AdminPanel | NemSport</title>
            </Helmet>
            <Navbar />
            <div className="body">
                <div className="main-grid-container">
                    <div className="adminPanel-content">
                        <h1>Ændre på en nyhed</h1>
                        <Grid container spacing={1}>
                            {news.map(newss =>
                                <NewsCard key={newss.NewsId} news={newss} />
                            )}
                        </Grid>

                    </div>
                    <div className="main-grid-item">
                        <ProfileColumn />
                    </div>
                </div>
            </div>
        </div>
    );
};

const NewsCard = ({ news }) => {
    function deleteNews(e, id){
        e.preventDefault();
        axios.delete("http://localhost:7285/api/News", id).then((response) => console.log(response.data));
    }

    function editNews(e, id){
        e.preventDefault();
        console.log(id);
        axios.get("http://localhost:7285/api/News/"+id).then((response) => console.log(response.data));
    }

    return (
        <Grid item sm={12}>
            <Card className="newscard">
                <CardContent>
                    <Button sx={{ p: 0, mr: 1}}
                            className="addButton" variant="contained" size="large" color="warning"
                            onClick={(e) => { editNews(e,news.id) }}
                    >
                        Edit
                    </Button>
                    <Button sx={{ p: 0 }}
                            className="addButton" variant="contained" size="large" color="error"
                            onClick={(e) => { deleteNews(e,news.id) }}
                    >
                        Delete
                    </Button>
                    {` ${news.id} | ${news.subheader} | ${news.content} | ${news.date}`}
                </CardContent>
            </Card>
        </Grid>
    )
}

export default AdminPanel;