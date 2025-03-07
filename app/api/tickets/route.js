export async function GET(req) {
    try {
      const { searchParams } = new URL(req.url);
      const queryParams = new URLSearchParams(searchParams);
  
      const apiUrl = `http://localhost:5261/api/v1/ticket/get-available-ticket?${queryParams}`;
  
      const response = await fetch(apiUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) throw new Error("Failed to fetch tickets");
  
      const data = await response.json();
      return Response.json(data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      return Response.json({ error: "Failed to fetch tickets" }, { status: 500 });
    }
  }
  