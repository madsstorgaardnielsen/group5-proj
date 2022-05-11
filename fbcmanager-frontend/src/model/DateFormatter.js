// 15/04/2022
export function getFullDate(date){
    let year = date.slice(0,4)
    let month = date.slice(5,7)
    let day = date.slice(8,10)
    return day + '/' + month + '/' + year
}

// 15/04
export function getFullDateDash(date){
    let year = date.slice(0,4)
    let month = date.slice(5,7)
    let day = date.slice(8,10)
    return year + '-' + month + '-' + day
}

export function getDate(date){
    let month = date.slice(5,7)
    let day = date.slice(8,10)
    return day + '/' + month
}

// 12:40
export function getTime(time){
    time = time.slice(-8,-3)
    return time
}

// From datepicker to DB
export function datePickerToDB(date){
    let month =date.getDate().toString()
    let day = date.getMonth().toString()
    let hours = date.getHours().toString()
    let minutes = date.getMinutes().toString()
    if (day.length < 2){
        day = 0 + day}
    if (month.length < 2){
        month = 0 + month}
    if (hours.length < 2){
        hours = 0 + hours}
    if (minutes.length < 2){
        minutes = 0 + minutes}
    date = date.getFullYear() + "-" + day + "-" + month + "T" + hours + ":" + minutes + ":00";
    return date
}