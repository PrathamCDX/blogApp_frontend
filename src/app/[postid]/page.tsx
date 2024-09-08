"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NewSkeleton from "@/components/NewSkeleton";

type Post = {
  id: number;
  title: string;
  content: string;
};

export default function Page({ params }: { params: { postid: string } }) {
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Post[]>([{ id: 0, title: "", content: "" }]);
  const router = useRouter();
  useEffect(() => {
    try {
      const fetchPost = async () => {
        await setLoading(true);
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

  useEffect(() => {
    console.log(post);
  }, [post]);

  const handleClick = async () => {
    try {
      setDeleting(true);
      // await setLoading(true);
      await axios.delete(
        "https://blogapp-backend-n7sv.onrender.com/api/posts/" + params.postid
      );
      alert("Post deleted successfully");
      setDeleting(true);
      router.push("/");
    } catch (err) {
      alert("Post deletion unsuccessful");
      console.log(err);
    }
  };
  if (!post)
    return (
      <>
        <div>Blank</div>
      </>
    );

  if (loading)
    return (
      <div className="p-4">
        Loading...
        <NewSkeleton />
      </div>
    );
  return (
    <div>
      <div className="flex justify-start items-center">
        <div className="mx-2 h-[70px] text-2xl items-center flex font-extrabold">
          {post[0].title}
        </div>
        <div className="ml-10">
          {/* <Button onClick={handleClick} variant="destructive">
            Delete Blog
          </Button> */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                {deleting ? <div>Deleting....</div> : <div>Delete Blog</div>}
              </Button>
            </AlertDialogTrigger>
            <span
              onClick={() => {
                router.push(`/edit/${post[0].id}`);
              }}
              className="ml-5 px-3"
            >
              <Button variant="constructive">Edit Blog</Button>
            </span>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClick}>
                  {deleting ? <div>Deleting..</div> : <div>Continue</div>}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="mx-2  text-lg">{post[0].content}</div>
    </div>
  );
}
