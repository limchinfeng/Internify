"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";



const formSchema = z.object({
    email: z.string().min(1, {
        message: "Email is required",
    }),
});

export default function ForgotPw() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });
    const { isSubmitting, isValid } = form.formState;


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        try {
            await axios.post("/api/forgotPw", values);
            toast.success('Check Your Email to Login!');
            router.refresh();
            router.push("/login");

        } catch {
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="w-full flex flex-col gap-5 items-center justify-center h-full">
            <div className=" mb-12 mx-auto">
                <h1 className="text-3xl font-bold text-center text-primary">
                    Reset your password
                </h1>
                <p>Enter your user accounts verified email address and we will send you a password reset link.</p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 mt-8 w-full"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-full h-12 text-md"
                                            disabled={isSubmitting || isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="">
                            <Button
                                size="xl"
                                type="submit"
                                disabled={!isValid || isSubmitting || isLoading}
                                className="w-full"
                            >
                                Get Reset link
                            </Button>
                        </div>
                    </form>
                </Form>
                <div className="flex flex-col gap-4 mt-5 w-full">
                    <hr />
                    <div className="text-neutral-500 text-center font-light">
                        <p>Never mind!&nbsp;
                            <span
                                onClick={() => router.push("/login")}
                                className="text-neutral-800 cursor-pointer hover:underline"
                            >
                                Take me back to login
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        // <ResetPassword></ResetPassword>
    )
}
