"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { bookTicket } from "@/lib/bookTickets";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const TicketDetailsPage = () => {
    const { ticketCode } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!ticketCode) {
            setError("Invalid ticket code.");
            setLoading(false);
            return;
        }

        async function fetchTicketDetails() {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`/api/tickets?ticketCode=${ticketCode}`);

                if (!response.ok) throw new Error("Failed to fetch ticket details");

                const data = await response.json();

                const ticketsArray = data?.data;
                if (!ticketsArray || !Array.isArray(ticketsArray) || ticketsArray.length === 0) {
                    setError("Ticket not found.");
                    setTicket(null);
                    return;
                }

                setTicket(ticketsArray[0]);
            } catch (error) {
                setError("Failed to fetch ticket details.");
                setTicket(null);
            } finally {
                setLoading(false);
                console.log(ticket);
            }
        }

        fetchTicketDetails();
    }, [ticketCode]);

    return (
        <div className="max-w-3xl mx-auto p-6">
            <Card>
                <CardContent className="flex justify-center items-center min-h-[250px]">
                    {loading ? (
                        <p className="text-lg font-semibold text-gray-500">Loading...</p>
                    ) : !ticket ? (
                        <p className="text-lg font-semibold text-red-500">Ticket not found.</p>
                    ) : (
                        <div className="space-y-2 w-full">
                            <h2 className="text-primary text-2xl font-bold">
                                Ticket {ticket.categoryName} | {ticket.ticketCode}
                            </h2>
                            <p className="text-lg font-bold">Ticket Name: {ticket.ticketName}</p>
                            <p>Category: {ticket.categoryName}</p>
                            <p>Price: Rp {new Intl.NumberFormat("id-ID").format(ticket.price)}</p>
                            <p>Quota: {ticket.quota}</p>
                            <p>Event Start: {new Date(ticket.eventStart).toLocaleString('en-US', {
                                timeZone: 'Asia/Bangkok',
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: false,
                            })} GMT+7</p>
                            <p>Event End: {new Date(ticket.eventEnd).toLocaleString('en-US', {
                                timeZone: 'Asia/Bangkok',
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: false,
                            })} GMT+7</p>
                            <p>Created At: {new Date(ticket.createdAt).toLocaleString('en-US', {
                                timeZone: 'Asia/Bangkok',
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: false,
                            })} GMT+7</p>
                            <p>Created By: {ticket.createdBy}</p>
                            <p>Updated At: {new Date(ticket.updatedAt).toLocaleString('en-US', {
                                timeZone: 'Asia/Bangkok',
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: false,
                            })} GMT+7</p>
                            <p>Updated By: {ticket.updatedBy}</p>
                            <div className="mt-4 flex justify-between items-center">
                                <div className="text-sm font-medium space-y-2.5">
                                    <Label>Booking Quantity</Label>
                                    <Input type="number"
                                        placeholder="Enter Quantity"
                                        min={1}
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                        className="w-20" />
                                </div>
                                <Button size="lg"
                                    className="bg-primary text-foreground hover:cursor-pointer"
                                    onClick={() => {
                                        bookTicket(ticket.ticketCode, quantity);
                                    }}>
                                    Book Ticket
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default TicketDetailsPage;
