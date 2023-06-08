export const getFormattedDate = () => {
    const rawDate = new Date();
    const options: any = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    };
    const chatDate = rawDate.toLocaleString("en-US", options);
    return chatDate;
};
