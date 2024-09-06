"use client";
import { useRouter } from "next/navigation";
import NewCard from "@/components/NewCard";
import axios from "axios";
import { useEffect, useState, createContext, ReactNode } from "react";

// Define Post type
type Post = {
  id: number;
  title: string;
  content: string;
};

type RenderContextType = {
  render: number;
  setRender: (
    value: number
  ) => void | React.Dispatch<React.SetStateAction<number>>;
};

// Create the renderContext with the correct type
export const renderContext = createContext<RenderContextType | null>(null);

export default function Home() {
  const router = useRouter();
  const [render, setRender] = useState(0);
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  // Fetch posts and update when `render` changes
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get<Post[]>(
          "http://localhost:7676/api/posts"
        );
        setAllPosts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPost();
  }, [render]);

  return (
    <renderContext.Provider value={{ render, setRender }}>
      <div className="p-4 bg-black flex flex-wrap justify-evenly items-center">
        {/* Render all posts */}
        {allPosts.map((post) => (
          <div
            onClick={(e) => {
              router.push(`/${post.id}`);
            }}
            key={post.id}
          >
            <NewCard id={post.id} title={post.title} content={post.content} />
          </div>
        ))}

        {/* Div for manually triggering re-render */}
        {/* <div
          onClick={() => setRender((render) => render + 1)}
          className="p-2 bg-white text-black cursor-pointer mt-4"
        >
          Force Re-render
        </div> */}
      </div>
    </renderContext.Provider>
  );
}
