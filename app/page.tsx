import Link from "next/link";
import LikeButton from "./ui/LikeButton";
import DislikeButton from "./ui/DislikeButton";
import { getBlogs } from "./service/getBlogs";

export default function Home() {

  console.log("Root ROute");
  
  return (
    <div>
      Hello Next JS
      <div>
        Blog page: <Link href={"/blogs"}>Blogs</Link>
      </div>
      <LikeButton></LikeButton>

      <DislikeButton blogSlug="1"></DislikeButton>
    </div>
  );
}
