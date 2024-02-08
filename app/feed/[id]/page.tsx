import { UserCircleIcon } from "@heroicons/react/16/solid";

export default async function Post({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  return (
    <div className="bg-white px-4 py-5 sm:px-6 max-w-prose m-auto mt-24">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <UserCircleIcon
            className="h-10 w-10 text-gray-300"
            aria-hidden="true"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-lg font-semibold text-gray-900 pb-2">
            <a href="#" className="hover:underline">
              {post.author}
            </a>
          </p>
          <p className="text-gray-500">{post.content}</p>
        </div>
      </div>
    </div>
  );
}

async function getPost(id: string) {
  const post = await getPostById(id);
  const author = await getAuthor(id);

  return {
    author: author.name,
    content: post.body,
  };
}

async function getAuthor(postId: string) {
  const post = await getPostById(postId);
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${post.userId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  const author = await res.json();

  return author;
}

async function getPostById(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const post = await res.json();

  return post;
}
