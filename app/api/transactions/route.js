import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiUrl = `http://localhost:5261/api/v1/transaction/get-transactions`;

    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Failed to fetch transactions");

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}
