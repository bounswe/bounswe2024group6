import { http, HttpResponse } from "msw";
import { BASE_URL } from "../lib/baseURL";

const backend = (path: string) => `${BASE_URL}${path}`;

export const handlers = [
  http.get(backend("/feed"), () => {
    return HttpResponse.json({
      feed: [
        {
          id: 1,
          title: "MockTitle",
          description: "MockDescription",
          author: "MockAuthor",
          created_at: "2024-11-23T15:20:27.949581Z",
          like_count: 0,
          tags: ["#Challenges", "#C1"],
          is_liked: false,
          is_bookmarked: false,
          comments: [],
        },
      ],
    });
  }),
  http.post(backend("/post/like/"), () => {
    return HttpResponse.json({
      detail: "Post liked successfully.",
      like_count: 1,
      is_liked: true,
      is_bookmarked: false,
    });
  }),
];
