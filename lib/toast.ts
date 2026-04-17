// lib/toast.ts
import { toast } from "sonner";

type ToastOptions = {
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
};

export function showToast({ title, description, action }: ToastOptions) {
  toast(title || "", {
    description,
    action,
  });
}
