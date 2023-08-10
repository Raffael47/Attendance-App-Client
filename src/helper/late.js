export const calculateLate = (startHour) => {
    let offset = 7 * 60 * 60 * 1000
    const today = new Date (year, month, day, startHour).getTime() + offset
    const clockInTime = new Date(Date.now()).getTime() + offset
    const lateMinute = (clockInTime - today) / 1000 / 60
    return Math.floor(lateMinute)
}