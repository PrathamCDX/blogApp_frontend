"use client";
import { useContext, useState } from "react";
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
import { renderContext } from "@/app/page";

// type setRenderType = (prevRender: number) => number;

export default function DeleteButton({ id }: { id: number }) {
  const [loading, setLoading] = useState(false);
  const context = useContext(renderContext);
  if (!context) return null;

  const {  setRender } = context;

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `https://blogapp-backend-n7sv.onrender.com/api/posts/${id}`
      );

      if (response.status === 200) {
        setRender({ reRender: true });
      } else {
        console.error("Failed to delete the post.");
      }
      setLoading(false);
      alert("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting the post:", error);
      alert("Post deletetion unsuccessful");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Blog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the post
            and remove the post from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick}>
            {loading ? <div>Deleting..</div> : <div>Continue</div>}
            {/* <div>Continue</div> */}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
