export const fetchUsers = async () => {
    try {
        const response = await fetch(`/api/users`);

        if (!response.ok) throw new Error("Failed to fetch users");

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching users:", error);
        return { data: [] };
    }
};
