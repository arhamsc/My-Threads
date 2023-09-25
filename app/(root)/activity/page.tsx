import { currentUser } from "@clerk/nextjs";
import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  const activity = await getActivity(userInfo._id);
  return (
    <section>
      <h1 className={"mb-10 head-text"}>Activity</h1>
      <section className={"mt-10 flex flex-col gap-5"}>
        {activity.length > 0 ? (
          <>
            {activity.map((ac) => (
              <Link key={ac._id} href={`/thread/${ac.parentId}`}>
                <article className={"activity-card"}>
                  <Image
                    src={ac.author.image}
                    alt="Profile"
                    width={20}
                    height={20}
                    className={"rounded-full object-cover"}
                  />
                  <p className={"!text-small-regular text-light-1"}>
                    <span className={"mr-1 text-primary-500"}>
                      {ac.author.name}
                    </span>
                    Replied to your thread{" "}
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className={"no-result !text-base-regular text-light-3"}>
            No Activity
          </p>
        )}
      </section>
    </section>
  );
};

export default Page;
