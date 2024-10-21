import Navbar from "../components/common/navbar.tsx";
import { Suspense } from "react";
import PostCard from "../components/post/post-card.tsx";
import PostCardSkeleton from "../components/post/post-card-skeleton.tsx";
import { Card } from "@nextui-org/react";
import { IconChevronDown } from "@tabler/icons-react";

export default function Post() {
  return (
    <div className="flex flex-col items-center overflow-hidden">
      <Navbar />
      <div className="flex flex-col gap-6">
        <Suspense key={mockData.post.id} fallback={<PostCardSkeleton />}>
          <PostCard
            id={mockData.post.id}
            username={mockData.post.username}
            title={mockData.post.title}
            content={mockData.post.content}
            timePassed={mockData.post.timePassed}
            likeCount={mockData.post.likes}
            tags={mockData.post.tags}
          />
        </Suspense>
        <div className="flex justify-center">
          <Card className="py-1 pl-4 pr-3 rounded-full">
            <div className="flex gap-1 items-center text-default-600">
              <div>Comments</div>
              <IconChevronDown size={20} />
            </div>
          </Card>
        </div>
        {mockData.comments.map((comment) => (
          <Suspense key={comment.id} fallback={<PostCardSkeleton />}>
            <PostCard
              id={comment.id}
              username={comment.username}
              content={comment.content}
              timePassed={comment.timePassed}
              likeCount={comment.likes}
            />
          </Suspense>
        ))}
      </div>
    </div>
  );
}

const mockData = {
  post: {
    id: 1,
    username: "@alitariksahin",
    title: "Mastering Vocabulary: 10 Words to Learn Today",
    content:
      "Learning new words every day can significantly improve your vocabulary. Today's words include 'serendipity', 'eloquent', and 'ubiquitous'. Practice using them in sentences to reinforce your learning!",
    timePassed: "1 hour ago",
    likes: 150,
    tags: ["@Vocabulary", "@Daily Words"],
  },
  comments: [
    {
      id: 4,
      username: "@elifnd",
      content:
        "Great post! I've been using these words in my daily conversations and I can already see a difference in my vocabulary. Thanks for sharing!",
      timePassed: "30 minutes ago",
      likes: 25,
    },
    {
      id: 5,
      username: "@yunusemreozdemir",
      content:
        "For those looking for the meaning of the words mentioned in the post, here are the definitions: Serendipity: the occurrence and development of events by chance in a happy or beneficial way. Eloquent: fluent or persuasive in speaking or writing. Ubiquitous: present, appearing, or found everywhere.",
      timePassed: "45 minutes ago",
      likes: 15,
    },
  ],
};
