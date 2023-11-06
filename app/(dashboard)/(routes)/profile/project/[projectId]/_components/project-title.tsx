"use client"

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Project } from "@prisma/client";

interface ProjectTitleProps {
  initialData: {
    title: string
  };
  projectId: string
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export const ProjectTitle = ({
  initialData, projectId
}: ProjectTitleProps) => {

  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const {isSubmitting, isValid} = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/profile/project/${projectId}`, values);
      toast.success("Project updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="border  rounded-md p-4">
      <div className="font-medium text-sm flex items-center justify-between">
        Project title
        <div className="flex flex-row gap-2 items-center justify-between">
          <Button onClick={toggleEdit} variant="ghost" size="sm"> 
            {isEditing ? (
              <>Cancel</>
              ) : (
                <>
                <Pencil className="w-4 h-4 mr-2" />
                Edit Title
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
        <p className="text-xl font-medium ">
          {initialData.title}
        </p>
      )}
      {isEditing && (
        <Form {...form} >
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField 
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      disabled={isSubmitting}
                      placeholder="e.g. Your Project Name"
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