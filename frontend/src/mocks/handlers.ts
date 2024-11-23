import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/feed", () => {
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
];
