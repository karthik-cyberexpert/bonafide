import { CertificateTemplate } from "@/lib/types";

export const dummyTemplates: CertificateTemplate[] = [
  {
    id: "TPL001",
    name: "Standard Bonafide",
    content:
      "This is to certify that {studentName} ({studentId}) is a bonafide student of our institution, pursuing a degree in the Department of Computer Science. This certificate is issued for the purpose of {reason}.",
  },
  {
    id: "TPL002",
    name: "Passport Application",
    content:
      "This is to certify that {studentName}, son/daughter of {parentName}, is a bonafide student of this college with registration number {studentId}. This certificate is issued upon their request for the purpose of applying for a passport.",
  },
  {
    id: "TPL003",
    name: "Bank Loan",
    content:
      "To whom it may concern, this letter confirms that {studentName} ({studentId}) is a full-time student in the 2021-2025 batch of the Computer Science department. This certificate is provided for the purpose of a bank loan application.",
  },
];