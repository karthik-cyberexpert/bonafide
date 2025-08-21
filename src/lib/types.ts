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

export interface StudentProfile {
  name: string;
  registerNumber: string;
  email: string;
  phoneNumber: string;
  parentName: string;
  department: string;
  batch: string;
  currentSemester: string;
  tutor: string;
  hod: string;
}

export interface TutorProfile {
  name: string;
  department: string;
  batchAssigned: string;
  email: string;
  phoneNumber: string;
}

export interface HodProfile {
  name: string;
  email: string;
  mobileNumber: string;
  department: string;
}

export interface AdminProfile {
  name: string;
  email: string;
  phoneNumber: string;
}