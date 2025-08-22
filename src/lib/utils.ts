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

/**
 * Calculates the current semester for a batch based on its name (e.g., "2023-2027") and the current date.
 * Assumes the academic year starts in July.
 * @param batchName The name of the batch.
 * @returns The calculated current semester (1-8).
 */
export const calculateCurrentSemesterForBatch = (batchName: string): number => {
  const nameParts = batchName.split("-");
  if (nameParts.length !== 2) return 0; // Invalid format

  const startYear = parseInt(nameParts[0], 10);
  if (isNaN(startYear)) return 0; // Invalid year

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-11 (January is 0)

  // Assuming academic year starts in July (month index 6)
  const isFirstHalfOfCalendarYear = currentMonth < 6; // Jan-June

  const academicYearOffset = currentYear - startYear;

  let semester;
  if (isFirstHalfOfCalendarYear) {
    // Jan-June: Belongs to the second (even) semester of the academic year.
    semester = academicYearOffset * 2;
  } else {
    // July-Dec: Belongs to the first (odd) semester of the academic year.
    semester = academicYearOffset * 2 + 1;
  }

  // Clamp the semester between 1 and 8, as a batch can't be in semester 0 or > 8.
  if (semester < 1) return 1;
  if (semester > 8) return 8;

  return semester;
};