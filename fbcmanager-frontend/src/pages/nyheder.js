import React, {useState } from "react";
import Navbar from "../components/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ProfileColumn from "../components/ProfileColumn";
import "../scss/style.scss"
import "../scss/newsPage.scss"
import NewsCard from "../components/newsCard"
import { Grid } from "@mui/material"
import { Helmet } from 'react-helmet';
import axios from "axios"


function NewsPage() {
  //const [value, onChange] = useState(new Date());
  const [news, setNews] = useState([])

  React.useEffect(() => {
    axios.get("http://130.225.170.74:80/api/News").then((response) => {
      setNews(response.data)
    })})

  const navigate = useNavigate()

  const toEvents = () => {
    navigate('/events')
  }

  return (
    <div>
      <Helmet>
        <title>News | NemSport</title>
      </Helmet>
      <Navbar />
      <div className="body">
        <div className="main-grid-container">
          {/* XXXXXX MIDDLE COLLUMN START XXXXXX*/}
          <div className="news-grid">
            <Grid container spacing={4}>
                {news.map(news =>
                  <NewsCard key={news.id} news={news} />
              )}
            </Grid>
          </div>
          {/* XXXXXX MIDDLE COLLUMN END XXXXXX*/}


          {/* XXXXXX RIGHT COLLUMN START XXXXXX*/}
          <div className="main-grid-item">
            {/* Profile */}
            <ProfileColumn />
          </div>
          {/* XXXXXX RIGHT COLLUMN END XXXXXX*/}
        
        </div>
      </div>
    </div>
  );
};

export default NewsPage;