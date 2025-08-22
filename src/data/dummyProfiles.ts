import {
  StudentProfile,
  TutorProfile,
  HodProfile,
  AdminProfile,
} from "@/lib/types";

export const dummyStudentProfile: StudentProfile = {
  name: "Alice Johnson",
  username: "alice_j",
  registerNumber: "S12345",
  email: "alice.j@example.com",
  phoneNumber: "+91 234 567 890",
  parentName: "David Johnson",
  department: "Computer Science",
  batch: "2021-2025 A",
  currentSemester: "7th",
  tutor: "Dr. Evelyn Reed",
  hod: "Dr. Robert Clark",
};

export const dummyTutorProfile: TutorProfile = {
  name: "Dr. Evelyn Reed",
  username: "evelyn_r",
  department: "Computer Science",
  batchAssigned: "2021-2025 A",
  email: "evelyn.r@example.com",
  phoneNumber: "+91 987 654 321",
};

export const dummyHodProfile: HodProfile = {
  name: "Dr. Robert Clark",
  username: "robert_c",
  department: "Computer Science",
  email: "robert.c@example.com",
  mobileNumber: "+91 555 666 777",
};

export const dummyAdminProfile: AdminProfile = {
  name: "Principal Thompson",
  username: "principal_t",
  email: "principal@example.com",
  phoneNumber: "+91 111 222 333",
};