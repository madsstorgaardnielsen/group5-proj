import React, {useState } from "react";
import Navbar from "../components/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ProfileColumn from "../components/ProfileColumn";
import "../scss/style.scss"
import "../scss/newsPage.scss"
import NewsCard from "../components/newsCardd"
import { Grid } from "@mui/material"
import axios from "axios"



function NewsPage() {
  //const [value, onChange] = useState(new Date());
  const [news, setNews] = useState([
    { id: 0, title: 'Ny bane', day: 5, month: 4, year: 2022, text: "Se den helt nye bane i fælledparken"},
    { id: 1, title: 'Nye fritter', day: 12, month: 2, year: 2022, text: "Alle vores cafeterier har nu bbq curly fries"},
    { id: 2, title: 'Events', day: 29, month: 1, year: 2022, text: "Vi har lagt en masse arrangementer ind. Håber at I vil tilmelde jer :D"},
    { id: 3, title: 'Fed hjemmeside', day: 27, month: 12, year: 2021, text: "Vores nye hjemmeside begynder at ligne noget. Herre fedt!"},
    { id: 4, title: 'Solskin i Danmark', day: 20, month: 7, year: 2021, text: "Endelig en dag med sol. Ses på banen"}
  ])

  const navigate = useNavigate()

  const toEvents = () => {
    navigate('/events')
  }




  React.useEffect(() => {
    axios.get("https://localhost:7285/api/News").then((response) => {
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
           {/* <Grid container spacing={4}>
                {news.map(news =>
                  <NewsCard key={news.id} news={news} />
              )}
            </Grid>*/}
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