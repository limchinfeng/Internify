"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react"


const formSchema = z.object({
  email: z.string().min(1, {
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
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
      signIn('credentials', {
        ...values,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.ok) {
            toast.success('Logged in');
            router.refresh();
            router.push("/");
          }

          if (callback?.error) {
            toast.error(callback.error);
          }
        })

    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="w-full flex flex-col gap-5 items-center justify-center h-full">
      <div className=" mb-12 mx-auto">
        <h1 className="text-3xl font-bold text-center text-primary">
          Login
        </h1>
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
                      className="w-full h-12 text-md md:w-96"
                      type="password"
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
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </form>
        </Form>
        <div className="text-primary text-center font-light pt-4">
          <span
            onClick={() => router.push("/forgotpw")}
            className="text-primary cursor-pointer underline"
          >
            Forgot your password?
          </span>
        </div>
        <div className="flex flex-col gap-4 mt-5 w-full">
          <hr />
          <div className="text-center font-light">
            <p>First time using Internify?&nbsp;
              <span
                onClick={() => router.push("/register")}
                className="text-primary cursor-pointer underline"
              >
                Create an account
              </span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;