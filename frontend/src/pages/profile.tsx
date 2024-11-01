import Navbar from "../components/common/navbar.tsx";
import { Tabs, Tab, Avatar, Button, Divider, Card } from "@nextui-org/react";
import { Suspense, useState, useEffect } from "react";
import PostCard from "../components/post/post-card.tsx";
import PostCardSkeleton from "../components/post/post-card-skeleton.tsx";
import axios from "axios";
import { BASE_URL } from "../lib/baseURL";
import type { Profile } from "../types.ts";
import {
  IconBookmark,
  IconSquareRoundedCheck,
  IconBorderAll,
  IconClipboardText,
} from "@tabler/icons-react";

export default function Profile() {
  const [activeSection, setActiveSection] = useState("posts");
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/profile_mock/`)
      .then((response) => {
        const data = response.data.profile;
        console.log(data);
        setProfile(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="h-full w-full items-center overflow-hidden flex flex-col">
      <Navbar />
      {profile && (
        <div className="flex justify-center gap-6 items-center w-full px-32 py-5">
          <div className="flex items-center px-5 bg-white rounded-lg">
            <Avatar
              src="https://nextui.org/avatars/avatar-1.png"
              className="mr-3 w-24 h-24"
            />
            <div className="mx-4">
              <h3 className="text-xl font-semibold">{profile.username}</h3>
              <p className="text-gray-500">@{profile.level}</p>
            </div>
          </div>
          <div className="flex flex-row pl-36 gap-6">
            <Button
              variant="light"
              className="border-2 rounded-lg font-bold text-blue-900 px-8 py-6 "
            >
              {profile.following} Following
            </Button>
            <Button
              variant="light"
              className="border-2 rounded-lg font-bold text-blue-900 px-8 py-6 "
            >
              {profile.followers} Followers
            </Button>
          </div>
        </div>
      )}
      <Divider className="my-4 w-1/2 border-t-4 p-[0.75px] rounded-2xl border-gray-400" />
      <div className="flex w-full flex-col items-center">
        <Tabs aria-label="Options">
          <Tab
            key="quiz"
            title={
              <div className="flex items-center space-x-2">
                <IconClipboardText size={20} stroke={1.5} />
                <span>Quizzes</span>
              </div>
            }
          >
            <p>Quizzes</p>
          </Tab>
          <Tab
            key="post"
            title={
              <div className="flex items-center space-x-2">
                <IconBorderAll size={20} stroke={1.5} />
                <span>Posts</span>
              </div>
            }
          >
            {profile && (
              <div className="flex flex-col p-5 items-center">
                {activeSection === "quizzes" ? (
                  <div className="p-5">
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 items-center">
                    {profile &&
                      profile.posts.map((post) => (
                        <Suspense key={post.id} fallback={<PostCardSkeleton />}>
                          <PostCard
                            key={post.id}
                            id={post.id}
                            username={post.author.username}
                            content={post.post.content}
                            timePassed={post.post.timestamp}
                            likeCount={post.engagement.likes}
                            tags={post.post.tags} // if exists
                          />
                        </Suspense>
                      ))}
                  </div>
                )}
              </div>
            )}
          </Tab>
          <Tab
            key="solved"
            title={
              <div className="flex items-center space-x-2">
                <IconSquareRoundedCheck size={20} stroke={1.5} />
                <span>Solved</span>
              </div>
            }
          >
            <p>Solved</p>
          </Tab>
          <Tab
            key="saved"
            title={
              <div className="flex items-center space-x-2">
                <IconBookmark size={20} stroke={1.5} />
                <span>Saved</span>
              </div>
            }
          >
            <p>Saved</p>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
