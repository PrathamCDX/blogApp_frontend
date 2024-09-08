"use client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(2, {
    message: "Content must be at least 2 characters.",
  }),
});

export default function NewEditForm(props: {
  id: number;
  title: string;
  content: string;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: props.title,
      content: props.content,
    },
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // console.log(props);
      setLoading(true);
      console.log(values);
      await axios.put("https://blogapp-backend-n7sv.onrender.com/api/posts", {
        id: props.id,
        title: values.title,
        content: values.content,
      });
      setLoading(false);
      alert("Post Edited successfully");
      router.push("/");
    } catch (err) {
      console.log(err);
      alert("Post could not be Edited ");
    }
  }

  // if (loading) {
  //   return (
  //     <div className="text-xl text-center font-extrabold">Saving Edit...</div>
  //   );
  // }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Input placeholder="Content" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {loading ? (
          <Button type="submit">Saving blog</Button>
        ) : (
          <Button type="submit">Confirm Edit</Button>
        )}
        {/* <Button type="submit">Edit Blog</Button> */}
      </form>
    </Form>
  );
}
