"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DeleteUserById } from "@/services/api";
import { DeleteUserProps } from "@/types/users";
import { useState } from "react";

export function AlertDialogDelete({
  userId,
  userName,
  isOpen,
  onClose,
  onSuccess,
}: DeleteUserProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!userId) return;

    setIsDeleting(true);
    try {
      await DeleteUserById(userId);
      onSuccess(userId);
      onClose();
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure to delete **{userName}**?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500 hover:bg-red-800 text-white"
          >
            {isDeleting ? "Deleting..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
