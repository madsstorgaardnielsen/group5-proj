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
        const object = {
            "Id": id
        };
        axios.delete("https://localhost:7285/api/News", object).then((response) => console.log(response.data))
    }

    function editNews(e, news){
        e.preventDefault();
        navToEditEvent(news)
    }


    const NewsCard = ({ news }) => {
        return (
            <Grid item sm={12}>
                <Card className="newscard">
                    <CardContent>
                        <Button sx={{ p: 0, mr: 1}}
                                className="addButton" variant="contained" size="large" color="warning"
                                onClick={(e) => {editNews(e,news)}}
                        >
                            Edit
                        </Button>
                        <Button sx={{ p: 0 }}
                                className="addButton" variant="contained" size="large" color="error"
                                onClick={(e) => {deleteNews(e,news.Id)}}
                        >
                            Delete
                        </Button>
                        {` ${news.header} | ${news.subheader} | ${news.content} | ${news.date}`}
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



