"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const BookingPage = () => {
  const [bookedTicketId, setBookedTicketId] = useState(0);
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchBooking = async () => {
    if (!bookedTicketId) return alert("Please enter a Booked Ticket ID (numbers)");
    console.log("BookedTicketId in bookings/page.js: ", bookedTicketId);
    
    setLoading(true);
    try {
      const response = await fetch(`/api/bookings/get-booked-ticket?bookedTicketId=${bookedTicketId}`);
      if (!response.ok) throw new Error("Failed to fetch booking data");
      const data = await response.json();
      setBookingData(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeTicket = async (ticketCode, qty) => {
    if (!bookedTicketId || !ticketCode || !qty) return alert("Invalid parameters");

    try {
      const response = await fetch(
        `/api/bookings/revoke-ticket?bookedTicketId=${bookedTicketId}&ticketCode=${ticketCode}&qty=${qty}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to revoke ticket");
      alert("Ticket revoked successfully");
      handleFetchBooking();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEditBooking = async () => {
    try {
      const response = await fetch(`/api/bookings/update-ticket`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookedTicketId,
        }),
      });
      if (!response.ok) throw new Error("Failed to edit booking");
      alert("Booking updated successfully!");
      handleFetchBooking();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Booked Ticket Details</h2>

      <div className="flex items-center space-x-4 mb-4">
        <Label className="min-w-[140px]">Booked Ticket ID</Label>
        <Input
          type="number"
          min={1}
          className="flex-1 max-w-[200px] mx-4"
          value={bookedTicketId}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= 1) {
              setBookedTicketId(value);
            }
          }}
          placeholder="Enter Booked Ticket ID"
        />
        <Button size="lg" className="text-white hover:cursor-pointer" onClick={handleFetchBooking} disabled={loading}>
          {loading ? "Loading..." : "Fetch Booking"}
        </Button>
      </div>

      {bookingData && (
        <div className="space-y-4">
          <p><strong>BookedTicketId:</strong> {bookingData.bookedTicketId}</p>
          <p><strong>Created At:</strong> {bookingData.createdAt}</p>
          <p><strong>Created By:</strong> {bookingData.createdBy}</p>

          <div>
            <strong>Categories:</strong>
            {bookingData.categories?.map((cat) => (
              <div key={cat.categoryName} className="mt-2 p-2 border rounded">
                <p>Category Name: {cat.categoryName}</p>
                <p>Qty per Category: {cat.qtyPerCategory}</p>
                <div className="ml-4">
                  {cat.tickets?.map((ticket) => (
                    <div key={ticket.ticketCode} className="border-b py-2">
                      <p>Ticket Code: {ticket.ticketCode}</p>
                      <p>Ticket Name: {ticket.ticketName}</p>
                      <p>Event Start: {ticket.eventStart}</p>
                      <p>Event End: {ticket.eventEnd}</p>
                      <p>Quantity: {ticket.quantity}</p>
                      <Button
                        variant="destructive"
                        onClick={() => handleRevokeTicket(ticket.ticketCode, 1)}
                        className="mt-1"
                      >
                        Revoke 1 Ticket
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Button onClick={handleEditBooking} variant="secondary">
            Edit Booked Ticket
          </Button>
        </div>
      )}
    </div>
  )
}

export default BookingPage