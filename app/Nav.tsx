"use client";

import { usePathname } from "next/navigation";
import { HomeIcon, UsersIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const navigation = [
  { name: "Profile", href: "/", icon: HomeIcon },
  { name: "Feed", href: "/feed", icon: UsersIcon },
];

function classNames(...classes: String[]) {
  return classes.filter(Boolean).join(" ");
}

export function Nav() {
  const pathname = usePathname();
  return (
    <ul role="list" className="-mx-2 space-y-1">
      {navigation.map((item) => (
        <li key={item.name}>
          <Link
            href={item.href}
            className={classNames(
              pathname === item.href
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800",
              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
            )}
          >
            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
