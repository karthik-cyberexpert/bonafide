import {
  StudentProfile,
  HodProfile,
  TutorProfile,
  Department,
  Batch,
} from "@/lib/types";

// Set one date to the past to demonstrate auto-progression
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const yesterdayString = yesterday.toISOString().split("T")[0];

const futureDate = new Date();
futureDate.setMonth(futureDate.getMonth() + 4);
const futureDateString = futureDate.toISOString().split("T")[0];

export const dummyBatches: Batch[] = [
  {
    id: "B001",
    name: "2021-2025",
    tutor: "Dr. Evelyn Reed",
    studentCount: 62,
    status: "Active",
    currentSemester: 7,
    semesterFromDate: "2024-01-15",
    semesterToDate: yesterdayString, // This semester has ended
    sections: [
      { id: "S001A", name: "A", tutor: "Prof. John Doe", studentCount: 31 },
      { id: "S001B", name: "B", tutor: "Prof. Jane Smith", studentCount: 31 },
    ],
  },
  {
    id: "B002",
    name: "2022-2026",
    tutor: "Dr. Samuel Chen",
    studentCount: 58,
    status: "Active",
    currentSemester: 5,
    semesterFromDate: "2024-07-01",
    semesterToDate: futureDateString,
    sections: [
      { id: "S002A", name: "A", tutor: "Prof. Alan Turing", studentCount: 29 },
      { id: "S002B", name: "B", tutor: "Prof. Ada Lovelace", studentCount: 29 },
    ],
  },
  {
    id: "B003",
    name: "2023-2027",
    tutor: "Dr. Maria Garcia",
    studentCount: 65,
    status: "Active",
    currentSemester: 3,
    semesterFromDate: "2024-07-01",
    semesterToDate: futureDateString,
    sections: [
      { id: "S003A", name: "A", tutor: "Prof. Grace Hopper", studentCount: 32 },
      {
        id: "S003B",
        name: "B",
        tutor: "Prof. Charles Babbage",
        studentCount: 33,
      },
    ],
  },
  {
    id: "B004",
    name: "2020-2024",
    tutor: "Dr. Alan Grant",
    studentCount: 55,
    status: "Inactive",
    currentSemester: 8,
    semesterFromDate: "2023-12-01",
    semesterToDate: "2024-05-15",
    sections: [
      { id: "S004A", name: "A", tutor: "Prof. Ian Malcolm", studentCount: 27 },
      {
        id: "S004B",
        name: "B",
        tutor: "Prof. Ellie Sattler",
        studentCount: 28,
      },
    ],
  },
];

export const dummyDepartments: Department[] = [
  { id: "D001", name: "Computer Science" },
  { id: "D002", name: "Mechanical Engineering" },
  { id: "D003", name: "Civil Engineering" },
  { id: "D004", name: "Electrical Engineering" },
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

export const dummyTutors: TutorProfile[] = [
  {
    name: "Dr. Evelyn Reed",
    username: "evelyn_r",
    department: "Computer Science",
    batchAssigned: "2021-2025",
    email: "evelyn.r@example.com",
    phoneNumber: "+91 987 654 321",
  },
  {
    name: "Dr. Samuel Chen",
    username: "samuel_c",
    department: "Computer Science",
    batchAssigned: "2022-2026",
    email: "samuel.c@example.com",
    phoneNumber: "+91 987 123 456",
  },
  {
    name: "Dr. Maria Garcia",
    username: "maria_g",
    department: "Computer Science",
    batchAssigned: "2023-2027",
    email: "maria.g@example.com",
    phoneNumber: "+91 987 654 789",
  },
  {
    name: "Dr. Alan Grant",
    username: "alan_g",
    department: "Computer Science",
    batchAssigned: "2020-2024",
    email: "alan.g@example.com",
    phoneNumber: "+91 987 321 654",
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