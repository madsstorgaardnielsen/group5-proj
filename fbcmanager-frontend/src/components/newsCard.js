import {Card, CardHeader, CardContent, CardAction, Typography, Grid} from '@mui/material';
import "../scss/newsPage.scss"

const NewsCard = ({ news }) => {
    return (
        <Grid item sm={12} md={6}>
            <Card className="newscard">
                <CardHeader title={news.header} subheader={`${news.day}/${news.month}/${news.year}`}/>
                <CardContent>
                    {news.text}
                </CardContent>
            </Card>     
        </Grid>  
        )
  }

  

export default NewsCard