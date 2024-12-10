import moment from "moment";


export const parseTime = (time: string): number => {
    const now = new Date();

    if (time.includes(":")) {
        // Format: "08:38"
        const [hours, minutes] = time.split(":").map(Number);
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes).getTime();
    } else if (time.match(/^\d{2}\s[A-Za-z]+$/)) {
        // Format: "02 Apr"
        const [day, month] = time.split(" ");
        const monthIndex = new Date(`${month} 1, ${now.getFullYear()}`).getMonth();
        return new Date(now.getFullYear(), monthIndex, Number(day)).getTime();
    } else if (!isNaN(Number(time))) {
        // Format: "22" (assume it's hours)
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), Number(time)).getTime();
    }

    return 0; // Default fallback for invalid time formats
};


export function formatCreatedAt(createdAt: string) {
    // Get the current date and time
    const now = moment();

    // Calculate the difference in days between now and createdAt
    const diffInDays = now.diff(moment(createdAt), 'days');

    // If createdAt is within the current day, use 'LT' format
    if (diffInDays === 0) {
        return moment(createdAt).format('LT');
    }

    // If createdAt is exactly one day ago, return "Yesterday"
    if (diffInDays === 1) {
        return "Yesterday";
    }

    // If createdAt is within a week (but more than one day ago), return the day of the week
    if (diffInDays > 1 && diffInDays <= 7) {
        return moment(createdAt).format('dddd');
    }

    // If createdAt is more than a week ago, use 'L' format
    return moment(createdAt).format('L');
}