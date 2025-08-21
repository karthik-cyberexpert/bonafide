export type RequestStatus =
  | "Pending Tutor Approval"
  | "Pending HOD Approval"
  | "Pending Admin Approval"
  | "Approved"
  | "Returned by Tutor"
  | "Returned by HOD"
  | "Returned by Admin";

export interface BonafideRequest {
  id: string;
  studentName: string;
  studentId: string;
  date: string;
  reason: string;
  status: RequestStatus;
}