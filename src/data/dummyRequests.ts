import { BonafideRequest } from "@/lib/types";

export const dummyRequests: BonafideRequest[] = [
  {
    id: "REQ001",
    studentName: "Alice Johnson",
    studentId: "S12345",
    date: "2023-10-26",
    reason: "Passport Application",
    status: "Approved",
  },
  {
    id: "REQ002",
    studentName: "Bob Smith",
    studentId: "S67890",
    date: "2023-10-27",
    reason: "Bank Loan",
    status: "Pending Tutor Approval",
  },
  {
    id: "REQ003",
    studentName: "Charlie Brown",
    studentId: "S11223",
    date: "2023-10-28",
    reason: "Scholarship",
    status: "Pending HOD Approval",
  },
  {
    id: "REQ004",
    studentName: "Diana Prince",
    studentId: "S44556",
    date: "2023-10-29",
    reason: "Internship Application",
    status: "Pending Admin Approval",
  },
  {
    id: "REQ005",
    studentName: "Alice Johnson",
    studentId: "S12345",
    date: "2023-10-30",
    reason: "Visa Application",
    status: "Returned by Tutor",
  },
];