import React from "react";
import Navbar from "../../components/Navbar";
import "../../scss/style.scss"
import {Helmet} from 'react-helmet';
import ProfileColumn from "../../components/ProfileColumn";
import "../../scss/adminPanel.scss";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Card, CardContent, Grid} from '@mui/material';
import Button from "@mui/material/Button";
import "../../scss/eventPage.scss";
import {getFullDate, getTime} from "../../model/DateFormatter";



export default function EditNewsPage () {
    const [news, setNews] = React.useState([])

    const navigate = useNavigate()
    const navToEditEvent = (news) => {
        navigate('/addNews', {
            state: {
                news: news,
            }
        })
    }


    React.useEffect(() => {
        axios.get("http://130.225.170.74:80/api/News").then((response) => {
            setNews(response.data)
        })})


    function deleteNews(e, id){
        e.preventDefault();
        console.log("!!!!")
        const token = localStorage.getItem("token");
        const object = {
            "Id": id
        };
        console.log(token)
        axios.delete("https://localhost:7285/api/News", object,
            {headers: { Authorization: `Bearer ${token}` }}).then((response) => console.log(response.data)).catch(function (error) {
            if (error.response) {
                console.log(error.response.data.title);
                console.log(error.response.status);
                console.log(error.response.data);
            }
        });
    }

    function editNews(e, news){
        e.preventDefault();
        console.log("eddiiiiitt")
        navToEditEvent(news)
    }


    const NewsCard = ({ news }) => {
        return (
            <Grid item sm={12}>
                <Button variant="outlined"
                        onClick={() => {console.log("LOGGING")}}
                >
                    Outlined</Button>
                <Card>
                    <CardContent>
                        <Button sx={{mr: 1}}
                                className="addButton" variant="contained" size="small" color="warning"
                                onClick={(e) => {editNews(e,news)}}
                        >
                            Edit
                        </Button>
                        <Button
                                className="addButton" variant="contained" size="small" color="error"
                                onClick={(e) => {console.log("abc")
                                    deleteNews(e,news.Id)}}
                        >
                            Delete
                        </Button>
                        {` ${news.header} | ${news.subheader} | ${getFullDate(news.date)} - ${getTime(news.date)}`}
                    </CardContent>
                </Card>
            </Grid>
        )
    }

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
                                <NewsCard key={newss.id} news={newss}
                                />
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

}



