export async function POST(req) {
  try {
    const body = await req.json();

    const requiredFields = ["TicketCode", "TicketName", "CategoryName", "EventStart", "EventEnd", "Price", "Quota"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return new Response(JSON.stringify({ error: `${field} is required` }), { status: 400 });
      }
    }

    body.EventStart = new Date(body.EventStart).toISOString();
    body.EventEnd = new Date(body.EventEnd).toISOString();

    const response = await fetch("http://localhost:5261/api/v1/user/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(JSON.stringify({ message: "Error creating ticket", error: errorText }), { status: response.status });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}