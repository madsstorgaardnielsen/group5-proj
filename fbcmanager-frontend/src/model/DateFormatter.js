export function getFullDate(date){
    let year = date.slice(0,4)
    let month = date.slice(5,7)
    let day = date.slice(8,10)
    return day + '/' + month + '/' + year
}

export function getDate(date){
    let month = date.slice(5,7)
    let day = date.slice(8,10)
    return day + '/' + month
}

export function getTime(time){
    time = time.slice(-8,-3)
    return time
}