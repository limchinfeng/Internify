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
import { Listing } from "@prisma/client";
import { Editor } from "@/components/description-editor";
import { Preview } from "@/components/description-preview";

interface CompanyListingRequirementProps {
  initialData: Listing;
  listingId: string;
}

const formSchema = z.object({
  requirement: z.string().min(1, {
    message: "Listing Requirement is required",
  }),
});

export const CompanyListingRequirement = ({
  initialData, listingId
}: CompanyListingRequirementProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requirement: initialData?.requirement || ""
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

  return (
    <div className="border rounded-md p-4 mt-6">
      <div className="font-medium text-sm flex items-center justify-between">
        Listing requirement
        <div className="flex flex-row gap-2 items-center justify-between">
          <Button onClick={toggleEdit} variant="ghost" size="sm"> 
            {isEditing ? (
              <>Cancel</>
              ) : (
                <>
                <Pencil className="w-4 h-4 mr-2" />
                Edit Requirement
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
        <p className={cn("text-xl font-medium", !initialData.requirement && "text-slate-500 italic text-sm")}>
          {!initialData.requirement && "No requirement"}
          {initialData.requirement && (
            <Preview 
              value={initialData.requirement}
            />
          )}
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
              name="requirement"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Editor 
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