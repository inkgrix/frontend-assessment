export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UserListResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

export interface EditUserModalProps {
  userId: number | null;
  initialName: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: { name: string; job: string }) => void;
}

export interface DeleteUserProps {
  userId: number | null;
  userName: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (id: number) => void;
}
