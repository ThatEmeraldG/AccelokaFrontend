import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const bookedTicketId = searchParams.get("bookedTicketId");

        if (!bookedTicketId) {
            return NextResponse.json({ error: "No bookedTicketId provided." }, { status: 400 });
        }

        const response = await fetch(`http://localhost:5261/api/v1/get-booked-ticket/${bookedTicketId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch booked ticket from .NET API");
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}