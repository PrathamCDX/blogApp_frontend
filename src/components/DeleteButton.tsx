"use client";
import { useContext } from "react";
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
  const context = useContext(renderContext);
  if (!context) return null;

  const { render, setRender } = context;

  const handleClick = async () => {
    try {
      // Perform delete request
      const response = await axios.delete(
        `https://blogapp-backend-n7sv.onrender.com/api/posts/${id}`
      );

      // Check if deletion was successful
      if (response.status === 200) {
        // Update the render state to force re-fetching of posts
        setRender(render + 1);
      } else {
        console.error("Failed to delete the post.");
      }
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
          <AlertDialogAction onClick={handleClick}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
