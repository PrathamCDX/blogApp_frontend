"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { redirect } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <div className="z-10 sticky top-0 opacity-90 h-[80px] bg-purple-400 flex justify-between items-center">
      <div className=" hover:bg-purple-700 cursor-pointer mx-2 p-2 px-4 text-xl font-bold rounded-lg bg-purple-600">
        {/* <Link href="/">Home</Link> */}
        <div onClick={() => router.push("/")}>HOME</div>
      </div>
      {/* button */}
      <div className="m-2">
        <Button>
          {/* <Link href="/post">+Post a Blog</Link> */}
          <div onClick={() => router.push("/post")}>+Post a Blog</div>
        </Button>
      </div>
    </div>
  );
}
