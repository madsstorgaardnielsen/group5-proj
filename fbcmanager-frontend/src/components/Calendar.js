import React, {Component} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import "../scss/calendar.scss";
import axios from "axios";





var token = localStorage.getItem("token");
/*
export function Practises() {
    const [training, setTraining] = React.useState([]);

    React.useEffect(() => {
        axios.get("http://130.225.170.74:80/api/Practise",{
          headers: { Authorization: `Bearer ${token}` },
        }).then((response)=>setTraining(response.data)) //Setter data i training variable
      }, [])

    //console.log(training.map((row) => (
    //    [row.id]
    //))
    //)
    training.map((row) => (
        console.log(row.id)
    ))
    //console.log(training[0]['id'])
    
    return [training]
}
*/


class Calendar extends Component {

    constructor(props) {
        super(props);

        
        
        this.state = {
            viewType: "Week",
            durationBarVisible: false,
            cellHeight: 15,
            locale: "da-dk",
            heightSpec: "BusinessHours",
            //height: 1000,
            businessBeginsHour: 11, 
        
            // TODO: THESE EVENTS SHOULD BE LOADED AS A LIST OF JSON OBJECT FROM THE DATABASE.
            // See https://api.daypilot.org/daypilot-calendar-events-load/
            events: [
                {
                    id: 1,
                    text: "Træning U18",
                    start: "2022-03-30T90:30:00",
                    end: "2022-03-30T11:00:00"
                },
                {
                    id: 2,
                    text: "Træning Senior",
                    start: "2022-03-30T17:00:00",
                    end: "2022-03-30T20:00:00"
                },
                {
                    id: 3,
                    text: "Træning U18",
                    start: "2022-04-02T16:30:00",
                    end: "2022-04-02T18:00:00"
                },
                {
                    id: 4,
                    text: "Træning U18",
                    start: "2022-04-03T10:30:00",
                    end: "2022-04-03T13:00:00"
                },
                {
                    id: 5,
                    text: "Træning U18",
                    start: "2022-04-01T16:30:00",
                    end: "2022-04-01T19:00:00"
                }
            ]
        };
    }

    render() {
        const {...config} = this.state;
        return (
            <div>
                <DayPilotCalendar
                {...config}
                />
            </div>
        );
    }
}

export default Calendar;