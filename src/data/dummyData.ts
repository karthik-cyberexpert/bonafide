import { StudentProfile, HodProfile } from "@/lib/types";

export interface Batch {
  id: string;
  name: string;
  tutor: string;
  studentCount: number;
  status: "Active" | "Inactive";
}

export const dummyBatches: Batch[] = [
  {
    id: "B001",
    name: "2021-2025",
    tutor: "Dr. Evelyn Reed",
    studentCount: 62,
    status: "Active",
  },
  {
    id: "B002",
    name: "2022-2026",
    tutor: "Dr. Samuel Chen",
    studentCount: 58,
    status: "Active",
  },
  {
    id: "B003",
    name: "2023-2027",
    tutor: "Dr. Maria Garcia",
    studentCount: 65,
    status: "Active",
  },
  {
    id: "B004",
    name: "2020-2024",
    tutor: "Dr. Alan Grant",
    studentCount: 55,
    status: "Inactive",
  },
];

export const dummyHods: HodProfile[] = [
  {
    name: "Dr. Robert Clark",
    username: "robert_c",
    department: "Computer Science",
    email: "robert.c@example.com",
    mobileNumber: "+91 555 666 777",
  },
  {
    name: "Dr. Eleanor Vance",
    username: "eleanor_v",
    department: "Mechanical Engineering",
    email: "eleanor.v@example.com",
    mobileNumber: "+91 555 111 222",
  },
  {
    name: "Dr. Marcus Thorne",
    username: "marcus_t",
    department: "Civil Engineering",
    email: "marcus.t@example.com",
    mobileNumber: "+91 555 333 444",
  },
];

export const dummyStudents: StudentProfile[] = [
  {
    name: "Alice Johnson",
    username: "alice_j",
    registerNumber: "S12345",
    email: "alice.j@example.com",
    phoneNumber: "+91 234 567 890",
    parentName: "David Johnson",
    department: "Computer Science",
    batch: "2021-2025",
    currentSemester: "7th",
    tutor: "Dr. Evelyn Reed",
    hod: "Dr. Robert Clark",
  },
  {
    name: "Bob Smith",
    username: "bob_s",
    registerNumber: "S67890",
    email: "bob.s@example.com",
    phoneNumber: "+91 345 678 901",
    parentName: "Sarah Smith",
    department: "Computer Science",
    batch: "2021-2025",
    currentSemester: "7th",
    tutor: "Dr. Evelyn Reed",
    hod: "Dr. Robert Clark",
  },
  {
    name: "Charlie Brown",
    username: "charlie_b",
    registerNumber: "S11223",
    email: "charlie.b@example.com",
    phoneNumber: "+91 456 789 012",
    parentName: "James Brown",
    department: "Computer Science",
    batch: "2022-2026",
    currentSemester: "5th",
    tutor: "Dr. Samuel Chen",
    hod: "Dr. Robert Clark",
  },
  {
    name: "Diana Prince",
    username: "diana_p",
    registerNumber: "S44556",
    email: "diana.p@example.com",
    phoneNumber: "+91 567 890 123",
    parentName: "Hippolyta Prince",
    department: "Computer Science",
    batch: "2023-2027",
    currentSemester: "3rd",
    tutor: "Dr. Maria Garcia",
    hod: "Dr. Robert Clark",
  },
];