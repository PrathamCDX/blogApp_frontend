"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NewSkeleton from "@/components/NewSkeleton";
import NewEditForm from "@/components/NewEditForm";

type Post = {
  id: number;
  title: string;
  content: string;
};

export default function Page({ params }: { params: { postid: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Post[]>([{ id: 0, title: "", content: "" }]);
  useEffect(() => {
    try {
      const fetchPost = async () => {
        const response = await axios.get<Post[]>(
          "https://blogapp-backend-n7sv.onrender.com/api/posts/" + params.postid
        );
        // console.log(response.data);
        if (!response.data || Object.keys(response.data).length === 0) {
          router.push("/notfound");
        }
        setPost(response.data);
        await setLoading(false);
      };

      fetchPost();
    } catch (err) {
      console.log(err);
    }
  }, []);

  if (loading)
    return (
      <div className="p-4">
        Loading...
        <NewSkeleton />
      </div>
    );

  return (
    <div>
      <div className="p-4">
        <NewEditForm
          id={post[0].id}
          title={post[0].title}
          content={post[0].content}
        />
      </div>
    </div>
  );
}
