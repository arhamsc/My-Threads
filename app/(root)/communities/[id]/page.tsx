import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
// @ts-ignore
import { fetchUser } from "@/lib/actions/user.actions";
import Image from "next/image";
// @ts-ignore
import ProfileHeader from "@/components/shared/ProfileHeader";
// @ts-ignore
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// @ts-ignore
import { communityTabs } from "@/constants";
// @ts-ignore
import ThreadsTab from "@/components/shared/ThreadsTab";
// @ts-ignore
import { fetchCommunityDetails } from "@/lib/actions/community.actions";
// @ts-ignore
import UserCard from "@/components/cards/UserCard";

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  if (!user) return null;
  const communityDetails = await fetchCommunityDetails(params.id);

  return (
    <section>
      <ProfileHeader
        accountId={communityDetails.id}
        authUserId={communityDetails.id}
        name={communityDetails.name}
        username={communityDetails.username}
        imgUrl={communityDetails.image}
        bio={communityDetails.bio}
        type={"Community"}
      />
      <div className={"mt-9"}>
        <Tabs defaultValue="threads" className={"w-full"}>
          <TabsList className={"tab"}>
            {communityTabs.map((tab: any) => (
              <TabsTrigger key={tab.value} value={tab.value} className={"tab"}>
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className={"object-contain"}
                />
                <p className={"max-sm:hidden"}>{tab.label}</p>
                {tab.label === "Threads" && (
                  <p
                    className={
                      "ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2"
                    }
                  >
                    {communityDetails?.threads?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={"threads"} className={"w-full text-light-1"}>
            <ThreadsTab
              currentUserId={user.id}
              accountId={communityDetails._id}
              accountType={"Community"}
            />
          </TabsContent>
          <TabsContent value={"members"} className={"w-full text-light-1"}>
            <section className={"mt-9 flex flex-col gap-10"}>
              {communityDetails?.members?.map((member: any) => (
                <UserCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  username={member.username}
                  imgUrl={member.image}
                  personType={"User"}
                />
              ))}
            </section>
          </TabsContent>
          <TabsContent value={"requests"} className={"w-full text-light-1"}>
            <ThreadsTab
              currentUserId={user.id}
              accountId={communityDetails._id}
              accountType={"Community"}
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Page;
