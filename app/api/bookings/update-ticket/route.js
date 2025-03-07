import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const body = await req.json();
    const { bookedTicketId } = body;

    if (!bookedTicketId) {
      return NextResponse.json({ error: "Missing bookedTicketId" }, { status: 400 });
    }

    const response = await fetch(`http://localhost:5261/api/v1/edit-booked-ticket/${bookedTicketId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to edit booked ticket in .NET API");
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
