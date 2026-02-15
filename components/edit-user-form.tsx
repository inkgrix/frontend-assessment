import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GetUserById, UpdateUser } from "@/services/api";
import { EditUserModalProps } from "@/types/users";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

export function DialogEditUser({
  userId,
  initialName,
  isOpen,
  onClose,
  onSuccess,
}: EditUserModalProps) {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (initialName) {
        setName(initialName);
        setJob("Developer");
      } else if (userId) {
        setIsFetching(true);
        try {
          const res = await GetUserById(userId);
          setName(`${res.data.first_name} ${res.data.last_name}`);
        } finally {
          setIsFetching(false);
        }
      }
    };

    if (isOpen) loadData();
  }, [isOpen, userId, initialName]);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!userId) return;

    setIsSubmitting(true);
    try {
      await UpdateUser(userId, { name, job });
      onSuccess({ name, job });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogTrigger asChild></DialogTrigger> */}
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="pb-2">Edit User</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <FieldGroup className="pb-4">
            <Field>
              <Label htmlFor="name-1">Name</Label>
              {isFetching ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <Input
                  id="name-1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-neutral-800 border-neutral-700"
                />
              )}
            </Field>
            <Field>
              <Label htmlFor="job-1">Job</Label>
              {isFetching ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <Input
                  id="job-1"
                  name="job"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                  required
                />
              )}
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isFetching}>
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
