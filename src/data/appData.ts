import {
  dummyRequests,
  dummyHods,
  dummyTutors,
  dummyStudents,
  dummyDepartments,
  dummyBatches,
} from "@/data/dummyData";
import {
  BonafideRequest,
  HodProfile,
  TutorProfile,
  StudentProfile,
  Department,
  Batch,
} from "@/lib/types";

// This file acts as a mock database.
// We are exporting mutable arrays so that changes made on one page
// are reflected on others.

export let requests: BonafideRequest[] = [...dummyRequests];
export let hods: HodProfile[] = [...dummyHods];
export let tutors: TutorProfile[] = [...dummyTutors];
export let students: StudentProfile[] = [...dummyStudents];
export let departments: Department[] = [...dummyDepartments];
export let batches: Batch[] = [...dummyBatches];