import React from "react";
import { ChevronRightIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

type Post = {
  id: number;
  author: string;
  content: string;
};

export default async function Feed() {
  const posts = await getPosts();

  return (
    <div className="z-10 mt-24 max-w-prose m-auto w-full items-center justify-between text-sm">
      <div className="flow-root m-auto">
        <ul role="list" className="-mb-8">
          {posts.map((postItem: Post, postItemIdx: number) => (
            <Link href={`feed/${postItem.id}`}>
              <li key={postItem.id}>
                <div className="relative pb-8">
                  {postItemIdx !== posts.length - 1 ? (
                    <span
                      className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex items-start space-x-3">
                    <>
                      <div className="relative">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                          <UserCircleIcon
                            className="h-5 w-5 text-gray-500"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm">
                            <span className="font-medium text-gray-900">
                              {postItem.author}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <p className="line-clamp-2">{postItem.content}</p>
                        </div>
                      </div>
                    </>
                    <ChevronRightIcon
                      className="h-5 w-5 flex-none text-gray-400 m-auto"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

async function getPosts() {
  const friendsPosts = await getFriendsPosts();
  const users = await getUsers();

  const posts = friendsPosts.map((post: any) => {
    const author = users.find((friend: any) => friend.id === post.userId);
    return {
      id: post.id,
      author: author.name,
      content: post.body,
    };
  });

  return posts.sort(() => Math.random() - 0.5);
}

async function getFriendsPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const allPosts: any = await res.json();

  const friendIds = [2, 6, 9];
  return allPosts.filter((post: any) => friendIds.includes(post.userId));
}

async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const users = await res.json();

  return users;
}
