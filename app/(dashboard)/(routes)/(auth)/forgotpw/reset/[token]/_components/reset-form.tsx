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
import { Loader2 } from "lucide-react"

interface resetProps {
    token: string;
}

const formSchema = z.object({
    password: z.string().min(1, {
        message: "Password is required",
    }),
    confirmPassword: z.string().min(1, {
        message: "Same Password is required",
    }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ['confirmPassword'] // specify the field that the error is attached to
});

export default function ResetForm({
    token
}: resetProps) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });
    const { isSubmitting, isValid } = form.formState;

    useEffect(() => {
        if (isLoading) {
            setTimeout(() => {
                setIsLoading(false);
            }, 2500);
        }
    }, [isLoading]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        try {
            await axios.patch(`/api/forgotPw/reset/${token}`, values);
            toast.success('your password has been reset successfully!');
            router.refresh();
            router.push("/login");

        } catch {
            toast.error("Something went wrong");
        }
    }


    return (
        <div>
            <h1 className="text-3xl font-bold text-center text-primary">
                Change Your password
            </h1>

            <p>Enter your new password. After confirming, you will be asked to log in again.</p>
            <p></p>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 mt-8 w-full"
                >
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="w-full h-12 text-md"
                                        disabled={isSubmitting || isLoading}
                                        type="password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Confirm Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="w-full h-12 text-md"
                                        disabled={isSubmitting || isLoading}
                                        type="password"
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
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Pending...
                                </>
                            ) : (
                                "Change Password"
                            )}
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
    )
}
