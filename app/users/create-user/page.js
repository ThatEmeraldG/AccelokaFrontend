"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const CreateUser = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);

        const response = await fetch("/api/users/create-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userName: data.username,
                userEmail: data.email,
                userPassword: data.password
            }),
        });

        setLoading(false);

        if (response.ok) {
            alert("User Created Successfully!");
        } else {
            alert("Error Creating User.");
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Create New User</h2>
            </div>
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2.5">
                            <Label>Username</Label>
                            <Input {...register("username", { required: true })} placeholder="Enter Username" />
                            {errors.username && <p className="text-red-500 text-sm">Username is required</p>}
                        </div>

                        <div className="space-y-2.5">
                            <Label>Email</Label>
                            <Input type="email" {...register("email", { required: true })} placeholder="Enter Email" />
                            {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
                        </div>

                        <div className="space-y-2.5">
                            <Label>Password</Label>
                            <Input type="password" {...register("password", { required: true })} placeholder="Enter Password" />
                            {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
                        </div>

                        <div className="flex justify-center">
                            <Button
                                size="lg"
                                type="submit"
                                className="mt-2 w-full text-white text-md hover:cursor-pointer"
                                disabled={loading}>
                                {loading ? "Creating..." : "Create User"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default CreateUser;