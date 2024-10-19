import { Suspense, useState } from "react";
import { Navbar } from "../components/common";
import { PostCard, PostCardSkeleton } from "../components/post";

export default function Forum() {
  const [test, setTest] = useState(true);

  setTimeout(() => {
    setTest(false);
  }, 1000);

  if (test)
    return (
      <div className="flex flex-col items-center">
        <Navbar />
        <div className="flex flex-col gap-6">
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </div>
      </div>
    );

  return (
    <div className="flex flex-col items-center overflow-hidden">
      <Navbar />
      <div className="flex flex-col gap-6">
        <Suspense fallback={<PostCardSkeleton />}>
          <PostCard
            id={post1.id}
            username={post1.username}
            title={post1.title}
            content={post1.content}
            timePassed={post1.timePassed}
            likeCount={post1.likes}
            tags={post1.tags}
          />
        </Suspense>
        <Suspense fallback={<PostCardSkeleton />}>
          <PostCard
            id={post2.id}
            username={post2.username}
            title={post2.title}
            content={post2.content}
            timePassed={post2.timePassed}
            likeCount={post2.likes}
            tags={post2.tags}
          />
        </Suspense>
        <Suspense fallback={<PostCardSkeleton />}>
          <PostCard
            id={post3.id}
            username={post3.username}
            title={post3.title}
            content={post3.content}
            timePassed={post3.timePassed}
            likeCount={post3.likes}
            tags={post3.tags}
          />
        </Suspense>
      </div>
    </div>
  );
}

const post1 = {
  id: 1,
  username: "@alitariksahin",
  title: "Mastering Vocabulary: 10 Words to Learn Today",
  content:
    "Learning new words every day can significantly improve your vocabulary. Today's words include 'serendipity', 'eloquent', and 'ubiquitous'. Practice using them in sentences to reinforce your learning!",
  timePassed: "1 hour ago",
  likes: 150,
  tags: ["@Vocabulary", "@Daily Words"],
};

const post2 = {
  id: 2,
  username: "@elifnd",
  title: "Top 5 Tips for Learning New Words in Any Language",
  content:
    "Learning vocabulary in a new language can be challenging, but using techniques like spaced repetition, mnemonic devices, and context-based learning can make the process easier. Start by setting small daily goals!",
  timePassed: "3 days ago",
  likes: 200,
  tags: ["@Vocabulary Tips"],
};

const post3 = {
  id: 3,
  username: "@yunushocam",
  title: "The Power of Flashcards in Learning New Words",
  content:
    "Flashcards are an effective tool to memorize new vocabulary. By consistently reviewing and testing yourself, you can retain words for the long term. Try using apps like Anki or Quizlet for better results!",
  timePassed: "5 minutes ago",
  likes: 75,
  tags: ["@Flashcards", "@Memorization"],
};

