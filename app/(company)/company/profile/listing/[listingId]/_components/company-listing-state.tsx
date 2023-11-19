"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Listing, Project } from "@prisma/client";
import { Combobox } from "@/components/ui/combobox";

interface CompanyListingStateProps {
  initialData: Listing;
  listingId: string;
  options: {
    label: string;
    value: string
  }[]
}

const formSchema = z.object({
  state: z.string().min(1),
});

export const CompanyListingState = ({
  initialData, listingId, options
}: CompanyListingStateProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      state: initialData.state || ""
    }
  });

  const {isSubmitting, isValid} = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/service/company/profile/listing/${listingId}`, values);
      toast.success("Listing updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  const selectedOption = options.find((option) => option.value === initialData.state)

return (
    <div className="mt-6 border rounded-md p-4">
      <div className="font-medium text-sm flex items-center justify-between">
        Listing state
        <div className="flex flex-row gap-2 items-center justify-between">
          <Button onClick={toggleEdit} variant="ghost" size="sm"> 
            {isEditing ? (
              <>Cancel</>
              ) : (
                <>
                <Pencil className="w-4 h-4 mr-2" />
                Edit State
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
        <p className={cn("text-xl font-medium", !initialData.state && "text-slate-500 italic text-sm")}>
          {selectedOption?.label || "No category"}
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
              name="state"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Combobox 
                      options={...options}
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