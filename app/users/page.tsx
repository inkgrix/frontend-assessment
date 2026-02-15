"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ListUsers } from "@/services/api";
import { User, UserListResponse } from "@/types/users";
import { TableForm } from "@/components/table-form";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DialogEditUser } from "@/components/edit-user-form";
import { AlertDialogDelete } from "@/components/delete-user-form";

export default function UserList() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [listResponse, setListResponse] = useState<UserListResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [editName, setEditName] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await ListUsers(page);
      setUsers(res.data);
      setListResponse(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loginTimeStamp = localStorage.getItem("loginTimestamp");
    const now = new Date().getTime();
    const EXP_TIME = 60 * 60 * 1000;

    if (
      !token ||
      !loginTimeStamp ||
      now - parseInt(loginTimeStamp) > EXP_TIME
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("loginTimestamp");
      router.push("/signin");
      return;
    }

    if (token && loginTimeStamp && now - parseInt(loginTimeStamp) <= EXP_TIME) {
      if (!isAuth) setIsAuth(true);
      fetchData();
    }
  }, [router, fetchData, isAuth]);

  const handleEditClick = (id: number, name: string) => {
    setSelectedUserId(id);
    setEditName(name);
    setIsEditOpen(true);
  };

  const handleUpdateSuccess = (updatedUser: { name: string; job: string }) => {
    const updatedList = users.map((user) =>
      user.id === selectedUserId
        ? { ...user, first_name: updatedUser.name, last_name: "" }
        : user,
    );
    setUsers(updatedList);
  };

  const handleDeleteClick = (id: number, name: string) => {
    setSelectedDeleteId(id);
    setSelectedUserName(name);
    setIsDeleteOpen(true);
  };

  const handleDeleteSuccess = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginTimestamp");
    window.location.href = "/";
  };

  if (!isAuth) {
    return null;
  }
  return (
    <div className="min-h-screen bg-[#0a0c10] text-white p-4 md:p-10">
      <div className="max-w-4xl mx-auto w-full">
        <div className="p-5">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-800">
            <h1 className="text-2xl font-bold">List Users</h1>
            <Button
              onClick={handleLogout}
              className="cursor-pointer bg-red-800 hover:bg-red-900 text-white"
            >
              Logout
            </Button>
          </div>
          <div className="space-y-2">
            <div className="rounded-md border bg-card shadow-sm relative">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm min-h-20">
                  <thead className="bg-muted/50">
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <th className="h-11 px-4 text-left align-middle font-medium text-muted-foreground">
                        Name
                      </th>
                      <th className="h-11 px-4 text-left align-middle font-medium text-muted-foreground">
                        Email
                      </th>
                      <th className="h-11 px-4 text-left align-middle font-medium text-muted-foreground"></th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {isLoading ? (
                      <tr>
                        <td colSpan={3} className="p-4">
                          <div className="flex w-full flex-col gap-4">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <TableForm
                        users={users}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                      />
                    )}
                  </tbody>
                </table>
              </div>
              <hr />
              <div className="flex items-center px-3 py-2 z-1 relative">
                <Button
                  onClick={() => setPage((prev) => prev - 1)}
                  className="h-8 w-8 border bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                  size={"icon"}
                  disabled={listResponse?.page === 1 || isLoading}
                >
                  <ChevronLeft className="text-foreground" />
                </Button>
                <div className="flex flex-1 items-center justify-center text-subtitle">
                  Page {listResponse?.page} of {listResponse?.total_pages}
                </div>
                <Button
                  onClick={() => setPage((prev) => prev + 1)}
                  className="h-8 w-8 border bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                  size={"icon"}
                  disabled={
                    listResponse?.page === listResponse?.total_pages ||
                    isLoading
                  }
                >
                  <ChevronRight className="text-foreground" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DialogEditUser
        userId={selectedUserId}
        initialName={editName}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSuccess={handleUpdateSuccess}
      />
      <AlertDialogDelete
        userId={selectedDeleteId}
        userName={selectedUserName}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onSuccess={handleDeleteSuccess}
      />
    </div>
  );
}
