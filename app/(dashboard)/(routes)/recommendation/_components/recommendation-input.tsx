'use client';

import axios from "axios";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import toast from "react-hot-toast";
import { Combobox } from "@/components/ui/combobox";
import { useState } from "react";
import Link from "next/link";
import Image from 'next/image';
import logo from "@/public/images/logo.png"
import { Combobox2 } from "@/components/ui/combobox2";

interface RecommendationInputProps {
  options: {
    label: string;
    value: string
  }[]
}

interface ApiResponse {
  id: string;
  title: string;
  description: string;
  requirement: string;
  state: string;
  reason: string;
}

interface ApiResponse2 {
  id: string;
  title: string;
  suitable: string;
  reason: string;
}


const formSchema = z.object({
  message: z.string().min(1, {
      message: "Prompt is required",
  }),
  categoryId: z.string().min(1, {
    message: "category is required",
}),
  method: z.string().min(1, {
    message: "method is required",
}),
});

export const RecommendationInput = ({
  options
}: RecommendationInputProps) => {
  const [responseData, setResponseData] = useState<ApiResponse | null>(null);
  const [responseData2, setResponseData2] = useState<ApiResponse2[] | null>(null);
  const [isShowing, setIsShowing] = useState(false);
  const [method, setMethod] = useState<String | null>(null);
  const [category, setCategory] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      categoryId: "",
      method: ""
    }
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsShowing(false);
    setResponseData(null);
    setResponseData2(null);
    setMethod(null);

    try {
      if(values.method === "1") {
        const response = await axios.post('/api/recommendation', { messages: values.message, categoryId: values.categoryId });
        console.log(response.data);      
        setResponseData(response.data);
      } else {
        const response = await axios.post('/api/recommendations', { messages: values.message, categoryId: values.categoryId });
        console.log(response.data);      
        setResponseData2(response.data);
        console.log(category)
      }
      setIsShowing(true);
      setMethod(values.method)
      
    } catch(error: any) {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 gap-5">
      <div className="flex flex-col text-center">
        <p className="text-xl font-bold ">
          Internify AI Job Recommendation
        </p>
        <p className="text-sm text-muted-foreground">
          Write down your requirement and job category to find the most suitable job for you.
        </p>
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
                  <FormLabel>Requirement</FormLabel>
                  <FormControl className="m-0 p-0">
                    <Textarea
                      placeholder="I'm interested in computer science field, specifically in software engineering"
                      className="resize-none w-full p-2"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="categoryId"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Listing Category</FormLabel>
                  <FormControl>
                    <Combobox2
                      onLabel={(category) => setCategory(category)}
                      options={...options}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recommendation Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose recommendation method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Most suitable listing</SelectItem>
                      <SelectItem value="2">Comment for all listing</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="col-span-12 lg:col-span-2 w-full transition bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% hover:bg-gradient-to-r hover:from-indigo-400 hover:from-10% hover:via-sky-400 hover:via-30% hover:to-emerald-400 hover:to-90%" type="submit" disabled={!isValid || isSubmitting} size="icon">
              Generate
            </Button>
            <p className="text-xs text-muted-foreground italic text-center">
              The result might not be 100% accurate. Use at your own risks.
            </p>
          </form>
        </Form>
      </div>
      <div>
        {isSubmitting && <>
          <div className='h-full flex flex-col gap-y-4 items-center justify-center mt-5'>
            <div className='w-10 h-10 relative animate-spin'>
              <Image
                alt='logo'
                fill
                src={logo}
              />
            </div>
            <p className='text-sm text-muted-foreground'>
                Internify AI is thinking...
            </p>
          </div>
        </>}
      </div>

      {/* No Result method 1*/}
      {!isSubmitting && isShowing && method==="1" && responseData && responseData.id ==='' && (
        <div className="rounded-xl p-2 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
          <div className="rounded-lg bg-white p-6 flex flex-col gap-2 text-center">
            <p>
              {responseData.reason} 
            </p>
            <p className="text-slate-500 italic text-sm">
              Please try another category
            </p>
          </div>
        </div>
      )}

      {/* Result method 2*/}
      {!isSubmitting && isShowing && method==="1" && responseData && responseData.id !=="" && (
        <div className="rounded-xl p-2 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% w-4/5">  
          <div className="rounded-lg bg-white p-6 flex flex-col gap-2 text-center">
            <div className="flex flex-col">
              <p className="text-lg font-bold">
                {responseData.title} 
              </p>
              <p>
              {responseData.state} 
            </p>
            </div>  
            <div className="flex flex-col text-left pt-2">
              <p className="font-bold">Description</p>
              <p>
                {responseData.description} 
              </p>
            </div>
            <div className="flex flex-col text-left pt-2">
              <p className="font-bold">Requirement</p>
              <p> 
                {responseData.requirement} 
              </p>
            </div>
            <div className="flex flex-col text-left pt-2 pb-4">
              <p className="font-bold">Internify AI Explanation</p>
              <p> 
                {responseData.reason}  
              </p>
            </div>
            
          <Link
            href={`/listing/${responseData.id}`}
            target="_blank"
          >
            <Button variant="default" className="w-full">
              View Job 
            </Button>
          </Link>
          </div>
          <div>
            {/* {responseData} */}
          </div>
        </div>
      )}

      {/* No Result method 2*/}
      {!isSubmitting && isShowing && method==="2" && responseData2 && responseData2.length===0 && (
        <div className="rounded-xl p-2 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
          <div className="rounded-lg bg-white p-6 flex flex-col gap-2 text-center">
            <p>
              No job listing in {category} category
            </p>
            <p className="text-slate-500 italic text-sm">
              Please try another category
            </p>
          </div>
        </div>
      )}
    </div>
  )
}