import { User } from "@/types/users";

import Image from "next/image";
import { Button } from "./ui/button";
import { Trash2, UserPen } from "lucide-react";

interface TableFormProps {
  users: User[];
}

export function TableForm({ users }: TableFormProps) {
  return (
    <>
      {users.map((user) => {
        return (
          <tr
            key={user.id}
            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
          >
            <td className="px-3 py-2.5 md:px-4 md:py-2 align-middle [&:has([role=checkbox])]:pr-0">
              <div className="fi gap-2 flex items-center">
                <span className="relative flex shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={user.avatar}
                    alt={user.first_name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </span>
                <h1 className="pl-1">
                  {user.first_name} {user.last_name}
                </h1>
              </div>
            </td>
            <td className="px-3 py-2.5 md:px-4 md:py-2 align-middle [&:has([role=checkbox])]:pr-0">
              <p className="max-w-62.5 line-clamp-2">{user.email}</p>
            </td>
            <td className="px-3 py-2.5 md:px-4 md:py-2 align-middle [&:has([role=checkbox])]:pr-0">
              <div className="flex justify-end gap-2">
                <Button className="h-8 w-8 border bg-background hover:bg-accent hover:text-accent-foreground transition-colors">
                  <UserPen size={16} color="white" />
                </Button>
                <Button className="h-8 w-8 border bg-red-800 hover:bg-red-900 hover:text-accent-foreground transition-colors">
                  <Trash2 size={16} color="white" />
                </Button>
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
}
