export const fetchTransactions = async () => {
    try {
        const response = await fetch(`/api/transactions`);

        if (!response.ok) {
            console.error("Fetch failed with status: ", response.status);
            throw new Error("Failed to fetch transactions");
        }

        const data = await response.json();
        console.log("Fetched transactions:", data);
        return data;
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return { data: [] };
    }
};
