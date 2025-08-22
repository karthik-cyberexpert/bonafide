import * as React from "react";

export type RequestStatus =
  | "Pending Tutor Approval"
  | "Pending HOD Approval"
  | "Pending Admin Approval"
  | "Pending Principal Approval"
  | "Approved"
  | "Returned by Tutor"
  | "Returned by HOD"
  | "Returned by Admin"
  | "Returned by Principal";

export interface BonafideRequest {
  id: string;
  studentName: string;
  studentId: string;
  date: string;
  type: string;
  subType?: string;
  reason: string;
  status: RequestStatus;
  templateId?: string;
  returnReason?: string;
}

export interface CertificateTemplate {
  id: string;
  name: string;
  content: string;
}

export interface StudentProfile {
  name: string;
  username: string;
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
  username: string;
  department: string;
  batchAssigned: string;
  email: string;
  phoneNumber: string;
}

export interface HodProfile {
  name: string;
  username: string;
  email: string;
  mobileNumber: string;
  department: string;
}

export interface AdminProfile {
  name: string;
  username: string;
  email: string;
  phoneNumber: string;
}

export interface PrincipalProfile {
  name: string;
  username: string;
  email: string;
  phoneNumber: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

export interface Department {
  id: string;
  name: string;
}

export interface Batch {
  id: string;
  name: string;
  section?: string;
  tutor: string;
  studentCount: number;
  totalSections?: number;
  status: "Active" | "Inactive";
  currentSemester?: number;
  semesterFromDate?: string;
  semesterToDate?: string;
}