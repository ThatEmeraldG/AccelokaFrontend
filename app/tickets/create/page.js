"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Dropdown from "@/components/Dropdown";
import DateTimePicker from "@/components/DateTimePicker";
import { Card, CardContent } from "@/components/ui/card";

const categoryOptions = [
    { label: "Cinema", value: "Cinema" },
    { label: "Transportasi Darat", value: "Transportasi Darat" },
    { label: "Transportasi Laut", value: "Transportasi Laut" },
    { label: "Hotel", value: "Hotel" },
    { label: "Concert", value: "Concert" },
    { label: "Pesawat", value: "Pesawat" },
];

// const FormSchema = z.object({
//     dob: z.date({
//         required_error: "a Date is required.",
//     }),
// })

export default function CreateTicket() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [categoryName, setCategoryName] = useState(categoryOptions[0].value);
    const [eventStart, setEventStart] = useState(new Date());
    const [eventEnd, setEventEnd] = useState(new Date());

    const onSubmit = async (data) => {
        const requestData = {
            ...data,
            categoryName,
            eventStart,
            eventEnd,
        };

        const response = await fetch("/api/v1/ticket/create-ticket", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
        });

        if (response.ok) {
            alert("Ticket Created Successfully!");
        } else {
            alert("Error Creating Ticket.");
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Create New Ticket</h2>
            </div>
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2.5">
                            <Label>Ticket Code</Label>
                            <Input {...register("ticketCode", { required: true })} placeholder="Enter Ticket Code" />
                            {errors.ticketCode && <p className="text-red-500 text-sm">Ticket Code is required</p>}
                        </div>

                        <div className="space-y-2.5">
                            <Label>Ticket Name</Label>
                            <Input {...register("ticketName", { required: true })} placeholder="Enter Ticket Name" />
                            {errors.ticketName && <p className="text-red-500 text-sm">Ticket Name is required</p>}
                        </div>

                        <div className="space-y-2.5">
                            <Label>Category</Label>
                            <Dropdown value={categoryName} onChange={setCategoryName} options={categoryOptions} placeholder="Select a category" label="Category" />
                        </div>

                        <div className="space-y-2.5">
                            <Label>Price</Label>
                            <Input type="number" {...register("price", { required: true, valueAsNumber: true })} placeholder="Enter Price" />
                            {errors.price && <p className="text-red-500 text-sm">Price is required</p>}
                        </div>

                        <div className="space-y-2.5">
                            <Label>Quota</Label>
                            <Input type="number" {...register("quota", { required: true, valueAsNumber: true })} placeholder="Enter Quota" />
                            {errors.quota && <p className="text-red-500 text-sm">Quota is required</p>}
                        </div>

                        <div className="space-y-2.5">
                            <Label>Event Start</Label>
                            <DateTimePicker
                                value={eventStart}
                                onChange={setEventStart}
                            />
                        </div>

                        <div className="space-y-2.5">
                            <Label>Event End</Label>
                            <DateTimePicker
                                value={eventEnd}
                                onChange={setEventEnd}
                            />
                        </div>

                        <div className="flex justify-center">
                            <Button
                                size="lg"
                                type="submit"
                                className="mt-2 w-full text-white text-md hover:cursor-pointer">
                                Create Ticket
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}