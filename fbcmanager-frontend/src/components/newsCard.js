import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Grid} from "@mui/material";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function NewsCard({ news }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const date = new Date(news.date)
    const month_name = ["januar", "februar", "marts", "april", "maj", "juni", "juli",
        "august", "september", "oktober", "november", "december"]

    return (
        <Grid item sm={12} md={6}>
            <Card sx={{ maxWidth: 345 }} className="newscard" onClick={handleExpandClick}>
                <CardHeader
                    action={
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more">
                            <ExpandMoreIcon />
                        </ExpandMore>
                    }
                    title={news.header}
                    subheader={`${date.getHours()}:${date.getMinutes()} • ${date.getDay()}. ${month_name[date.getMonth()]} ${date.getFullYear()}`}
                />
                <CardContent>
                    <Typography>
                        {news.subheader}
                    </Typography>
                </CardContent>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography color="text.secondary"> {news.content} </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </Grid>
    )
}