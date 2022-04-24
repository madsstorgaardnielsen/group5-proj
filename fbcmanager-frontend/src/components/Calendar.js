import React, {Component} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import "../scss/calendar.scss";

class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewType: "Week",
            durationBarVisible: false,
            weekStarts: 0,
            cellHeight: 15,
            locale: "da-dk",
            heightSpec: "BusinessHours",
            //height: 1000,
            dayBeginsHour: 20,
            businessBeginsHour: 11,
            businessEndsHour: 22,
        
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