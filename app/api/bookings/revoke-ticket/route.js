import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const bookedTicketId = searchParams.get("bookedTicketId");
    const ticketCode = searchParams.get("ticketCode");
    const qty = searchParams.get("qty");

    if (!bookedTicketId || !ticketCode || !qty) {
      return NextResponse.json({ error: "Missing revoke-ticket parameters" }, { status: 400 });
    }

    const response = await fetch(`http://localhost:5261/api/v1/revoke-ticket/${bookedTicketId}/${ticketCode}/${qty}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to revoke ticket in .NET API");
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}