export const bookTicket = async (ticketCode, quantity) => {
    try {
        const response = await fetch("http://localhost:5261/api/v1/book-ticket", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify([{ ticketCode, quantity }]),
        });

        if (!response.ok) {
            throw new Error("Failed to book ticket");
        }

        const data = await response.json();
        console.log("Ticket booked successfully:", data);
        return data;
    } catch (error) {
        console.error("Booking failed:", error);
        return null;
    }
};