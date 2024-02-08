import { UserCircleIcon } from "@heroicons/react/16/solid";

export async function FriendsList() {
  const friends = await getFriends();

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {friends.map((friend: any) => (
        <li key={friend.id} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <UserCircleIcon
              className="h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {friend.name}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {friend.email}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

async function getFriends() {
  const allUsers = await getUsers();

  const friendIds = [2, 6, 9];
  return allUsers.filter((user: any) => friendIds.includes(user.id));
}

async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const users = await res.json();

  return users;
}
