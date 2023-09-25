import Image from "next/image";
import { currentUser, UserButton } from "@clerk/nextjs";
import { fetchPosts } from "@/lib/actions/thread.actions";
import ThreadCard from "@/components/cards/ThreadCard";

const Home = async () => {
  const user = await currentUser();
  const result = await fetchPosts(1, 30);
  return (
    <main>
      <h1 className={"head-text text-left"}>Home</h1>
      <section className={"mt-9 flex flex-col gap-10"}>
        {result.posts.length === 0 ? (
          <p className={"no-result"}>No threads found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUser={user?.id || ""}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>
    </main>
  );
};

export default Home;
