export async function GET() {
    try {
        const apiUrl = `http://localhost:5261/api/v1/user/get-users`;

        const response = await fetch(apiUrl, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) throw new Error("Failed to fetch users");

        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        console.error("Error fetching users:", error);
        return Response.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}
