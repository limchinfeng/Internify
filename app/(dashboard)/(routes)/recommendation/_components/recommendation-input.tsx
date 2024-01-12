'use client';

import axios from "axios";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";


const formSchema = z.object({
  message: z.string().min(1, {
      message: "Prompt is required",
  }),
});

export const RecommendationInput = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: ""
    }
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values.message);
    try {
      const response = await axios.post('/api/recommendation', { messages: values.message });
      console.log(response.data);
    } catch(error: any) {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 gap-5">
      <div>
        Heading
      </div>
      <div className="w-2/3">
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="rounded-lg w-full focus-within:shadow-sm flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem >
                  <FormControl className="m-0 p-0">
                    <Textarea
                      placeholder="I'm interested in computer science field, specifically in software engineering"
                      className="resize-none w-full"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={!isValid || isSubmitting} size="icon">
              Generate
            </Button>
          </form>
        </Form>
      </div>
      <div>
        {isSubmitting && (
          <div>
            Loading...
          </div>
        )}
      </div>
    </div>
  )
}