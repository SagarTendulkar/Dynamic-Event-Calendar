export const getMonthDays = (date) => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const days = [];
    for (let i = start.getDate(); i <= end.getDate(); i++) {
        const current = new Date(date.getFullYear(), date.getMonth(), i);
        days.push({
            date: current,
            day: current.getDate(),
            isToday: current.toDateString() === new Date().toDateString(),
        });
    }

    return days;
};

export const formatDate = (date) => {
    // Using toLocaleDateString to ensure the date is in the correct format
    return date.toLocaleDateString('en-CA'); // This format is YYYY-MM-DD, which is ideal for your use case
};
