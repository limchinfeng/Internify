"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";


interface ProfilePhoneProps {
  currentUser: User
}

const formSchema = z.object({
  phone: z.string().min(1, {
    message: "Phone is required",
  }),
});

export const ProfilePhone = ({
  currentUser
}: ProfilePhoneProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: currentUser?.phone || "",
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/service/profile`, values);
      toast.success("Phone updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  const {isSubmitting, isValid} = form.formState;

  return (
    <div className="border rounded-md p-4 w-full">
      <div className="font-medium text-sm flex items-center justify-between">
        Phone
        <div className="flex flex-row gap-2 items-center justify-between">
          <Button onClick={toggleEdit} variant="ghost" size="sm"> 
            {isEditing ? (
              <>Cancel</>
              ) : (
                <>
                <Pencil className="w-4 h-4 mr-2" />
                Edit 
              </>
            )}
          </Button>
          {isEditing && (
            <Button
              disabled={!isValid || isSubmitting}
              onClick={form.handleSubmit(onSubmit)}
              size="sm"
            >
              Save
            </Button>
          )}
        </div>
      </div>
      {!isEditing && (
        <p className={cn("text-xl font-medium", !currentUser.phone && "text-slate-500 italic text-sm")}>
          {currentUser.phone || "No phone number"}
        </p>
      )}
      {isEditing && (
        <Form {...form} >
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-2"
          >
            <FormField 
              control={form.control}
              name="phone"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      disabled={isSubmitting}
                      placeholder="e.g. 012345678"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}
    </div>
  )
}