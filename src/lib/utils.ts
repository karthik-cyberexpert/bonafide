import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type RequestStatus } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStatusVariant = (
  status: RequestStatus
): "success" | "secondary" | "destructive" | "default" => {
  switch (status) {
    case "Approved":
      return "success";
    case "Pending Tutor Approval":
    case "Pending HOD Approval":
    case "Pending Admin Approval":
      return "secondary";
    case "Returned by Tutor":
    case "Returned by HOD":
    case "Returned by Admin":
      return "destructive";
    default:
      return "default";
  }
};