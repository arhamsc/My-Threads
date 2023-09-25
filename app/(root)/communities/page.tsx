import UserCard from "@/components/cards/UserCard";
import { currentUser } from "@clerk/nextjs";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { fetchCommunities } from "@/lib/actions/community.actions";
import CommunityCard from "@/components/cards/CommunityCard";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchCommunities({
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });
  return (
    <section>
      <h1 className={"head-text"}>Communities</h1>
      <div className={"mt-14 flex flex-col gap-9"}>
        {result.communities.length === 0 ? (
          <p className={"no-result"}>No Users</p>
        ) : (
          <>
            {result.communities.map((person) => (
              <CommunityCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                bio={person.bio}
                members={person.members}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Page;
