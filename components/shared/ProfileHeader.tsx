import Image from "next/image";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: "User" | "Community";
}

const ProfileHeader = ({
  authUserId,
  imgUrl,
  bio,
  accountId,
  username,
  name,
  type,
}: Props) => {
  return (
    <div className={"flex flex-col w-full justify-start"}>
      <div className={"flex items-center justify-between"}>
        <div className={"flex items-center gap-3"}>
          <div className={"relative h-20 w-20 object-cover"}>
            <Image
              src={imgUrl}
              alt="Profile Image"
              fill
              className={"rounded-full object-cover shadow-2xl"}
            />
          </div>
          <div className={"flex-1"}>
            <h2 className={"text-left text-heading3-bold text-light-1"}>
              {name}
            </h2>
            <p className={"text-base-medium text-gray-1"}>@{username}</p>
          </div>
        </div>
        {/*  TODO: Community */}
      </div>
      <p className={"mt-6 max-w-lg text-base-regular text-light-2"}>{bio}</p>
      <div className={"mt-2 h-0.5 w-full bg-dark-3"} />
    </div>
  );
};

export default ProfileHeader;