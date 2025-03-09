export async function DELETE(req) {
  try {
    const body = await req.json();
    const { bookedTicketId, ticketCode, qty } = body;

    if (!bookedTicketId || !ticketCode || !qty) {
      return NextResponse.json({ error: "Missing revoke-ticket parameters" }, { status: 400 });
    }

    var apiUrl = `http://localhost:5261/api/v1/revoke-ticket/${bookedTicketId}/${ticketCode}/${qty}`;

    const response = await fetch(apiUrl, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Failed to revoke ticket in .NET API");
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}