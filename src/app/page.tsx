"use client";
import { useRouter } from "next/navigation";
import NewCard from "@/components/NewCard";
import axios from "axios";
import { useEffect, useState, createContext } from "react";
import NewSkeleton from "@/components/NewSkeleton";

type Post = {
  id: number;
  title: string;
  content: string;
};

type RenderContextType = {
  render: number;
  setRender: (
    render: number
  ) => void | React.Dispatch<React.SetStateAction<number>> | null;
};

export const renderContext = createContext<RenderContextType | null>(null);

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState(0);
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        await setLoading(true);
        const response = await axios.get<Post[]>(
          "https://blogapp-backend-n7sv.onrender.com/api/posts"
        );
        setAllPosts(response.data);
        await setLoading(false);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPost();
  }, [render]);

  if (loading)
    return (
      <div className="p-4">
        Loading...
        <NewSkeleton />
      </div>
    );

  return (
    <renderContext.Provider value={{ render, setRender }}>
      <div className="p-4 bg-black flex flex-wrap justify-evenly items-center">
        {/* Render all posts */}
        {allPosts.map((post) => (
          <div
            onClick={() => {
              router.push(`/${post.id}`);
            }}
            key={post.id}
          >
            <NewCard id={post.id} title={post.title} content={post.content} />
          </div>
        ))}
      </div>
    </renderContext.Provider>
  );
}
