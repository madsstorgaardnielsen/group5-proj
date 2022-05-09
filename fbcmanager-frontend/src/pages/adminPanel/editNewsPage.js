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
    const [news, setNews] = React.useState([]);

    const navigate = useNavigate()
    const navToEditNews = (news) => {
        navigate('/addNews', {
            state: {
                news: news,
            }
        })
    }

    React.useEffect(() => {
        axios.get("http://130.225.170.74:80/api/News").then((response) => {
            setNews(response.data)
        })},[]);


    function deleteNews(e, id){
        e.preventDefault();
        const token = localStorage.getItem("token");
        const object = {
            "Id": id
        };
        axios.delete("http://130.225.170.74:80/api/News",
            {data: object, headers: { Authorization: `Bearer ${token}` }}).then((response) => console.log(response.data))
    }

    function editNews(e, news){
        e.preventDefault();
        navToEditNews(news)
    }


    const AdminNewsCard = ({ news }) => {
        return (
            <Grid item sm={12}>
                <Card className="newscard">
                    <CardContent>
                        <Button sx={{mr: 1}}
                                className="addButton" variant="contained" size="small" color="warning"
                                onClick={(e) => {editNews(e,news)}}
                        >
                            Edit
                        </Button>
                        <Button
                            className="addButton" variant="contained" size="small" color="error"
                            onClick={(e) => {deleteNews(e,news.id)}}
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
                                <AdminNewsCard key={newss.id} news={newss}/>
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



