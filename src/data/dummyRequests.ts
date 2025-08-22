import { BonafideRequest } from "@/lib/types";

export const dummyRequests: BonafideRequest[] = [
  {
    id: "REQ001",
    studentName: "Alice Johnson",
    studentId: "S12345",
    date: "2023-10-26",
    type: "Passport Application",
    reason:
      "Applying for a new passport for an upcoming international conference.",
    status: "Approved",
    templateId: "TPL002",
  },
  {
    id: "REQ002",
    studentName: "Bob Smith",
    studentId: "S67890",
    date: "2023-10-27",
    type: "Bank Loan",
    reason:
      "Need to apply for an education loan to cover tuition fees for the next academic year.",
    status: "Pending Tutor Approval",
  },
  {
    id: "REQ003",
    studentName: "Charlie Brown",
    studentId: "S11223",
    date: "2023-10-28",
    type: "Scholarship",
    reason: "Applying for the National Merit Scholarship.",
    status: "Pending HOD Approval",
  },
  {
    id: "REQ004",
    studentName: "Diana Prince",
    studentId: "S44556",
    date: "2023-10-29",
    type: "Internship Application",
    reason: "Required by the company for a summer internship application.",
    status: "Pending Admin Approval",
  },
  {
    id: "REQ005",
    studentName: "Alice Johnson",
    studentId: "S12345",
    date: "2023-10-30",
    type: "Visa Application",
    reason: "Applying for a student visa for an exchange program.",
    status: "Returned by Tutor",
    returnReason:
      "The attached documents are not clear. Please re-upload with better quality scans.",
  },
];