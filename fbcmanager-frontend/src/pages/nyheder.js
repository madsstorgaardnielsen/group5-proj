import React, {useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import ProfileColumn from "../components/ProfileColumn";
import "../scss/style.scss"
import "../scss/newsPage.scss"
import NewsCard from "../components/newsCard"
import { Grid } from "@mui/material"
import axios from "axios"



function NewsPage() {
  //const [value, onChange] = useState(new Date());
  const [news, setNews] = useState([])

  const navigate = useNavigate()

  const toEvents = () => {
    navigate('/events')
  }

  React.useEffect(() => {
    axios.get("http://130.225.170.74:80/api/News").then((response) => {
      setNews(response.data)
    })})

  return (
    <div>
      <Navbar />
      <div className="body">
        <div className="grid-container-news">
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
          <div className="grid-item-news">
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