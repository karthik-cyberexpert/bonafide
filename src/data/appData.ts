import { supabase } from "@/integrations/supabase/client";
import {
  BonafideRequest,
  Profile,
  Department,
  Batch,
  CertificateTemplate,
  StudentDetails,
  TutorDetails,
  HodDetails,
} from "@/lib/types";

// This file will now contain functions to interact with Supabase.

export const fetchRequests = async (): Promise<BonafideRequest[]> => {
  const { data, error } = await supabase.from("requests").select("*");
  if (error) {
    console.error("Error fetching requests:", error);
    return [];
  }
  return data as BonafideRequest[];
};

export const fetchProfiles = async (role?: string): Promise<Profile[]> => {
  let query = supabase.from("profiles").select("*");
  if (role) {
    query = query.eq("role", role);
  }
  const { data, error } = await query;
  if (error) {
    console.error(`Error fetching ${role || ''} profiles:`, error);
    return [];
  }
  return data as Profile[];
};

export const fetchStudentDetails = async (studentId: string): Promise<StudentDetails | null> => {
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", studentId)
    .single();

  if (profileError || !profileData) {
    console.error("Error fetching student profile:", profileError);
    return null;
  }

  const { data: studentData, error: studentError } = await supabase
    .from("students")
    .select(`
      register_number,
      parent_name,
      batches(name, section, current_semester, departments(name)),
      tutors:profiles!students_tutor_id_fkey(first_name, last_name),
      hods:profiles!students_hod_id_fkey(first_name, last_name)
    `)
    .eq("id", studentId)
    .single();

  if (studentError || !studentData) {
    console.error("Error fetching student details:", studentError);
    return null;
  }

  const batch = studentData.batches as unknown as Batch;
  const department = (batch?.departments as unknown as Department);
  const tutor = studentData.tutors as unknown as Profile;
  const hod = studentData.hods as unknown as Profile;

  return {
    ...profileData,
    register_number: studentData.register_number,
    parent_name: studentData.parent_name,
    batch_id: batch?.id,
    batch_name: batch ? `${batch.name} ${batch.section || ''}`.trim() : undefined,
    current_semester: batch?.current_semester,
    department_id: department?.id,
    department_name: department?.name,
    tutor_id: tutor?.id,
    tutor_name: tutor ? `${tutor.first_name} ${tutor.last_name || ''}`.trim() : undefined,
    hod_id: hod?.id,
    hod_name: hod ? `${hod.first_name} ${hod.last_name || ''}`.trim() : undefined,
  } as StudentDetails;
};

export const fetchTutorDetails = async (tutorId: string): Promise<TutorDetails | null> => {
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select(`
      *,
      departments(name),
      batches(name, section)
    `)
    .eq("id", tutorId)
    .single();

  if (profileError || !profileData) {
    console.error("Error fetching tutor profile:", profileError);
    return null;
  }

  const department = profileData.departments as unknown as Department;
  const batch = profileData.batches as unknown as Batch;

  return {
    ...profileData,
    department_name: department?.name,
    batch_assigned_name: batch ? `${batch.name} ${batch.section || ''}`.trim() : undefined,
  } as TutorDetails;
};

export const fetchHodDetails = async (hodId: string): Promise<HodDetails | null> => {
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select(`
      *,
      departments(name)
    `)
    .eq("id", hodId)
    .single();

  if (profileError || !profileData) {
    console.error("Error fetching HOD profile:", profileError);
    return null;
  }

  const department = profileData.departments as unknown as Department;

  return {
    ...profileData,
    department_name: department?.name,
  } as HodDetails;
};


export const fetchDepartments = async (): Promise<Department[]> => {
  const { data, error } = await supabase.from("departments").select("*");
  if (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
  return data as Department[];
};

export const fetchBatches = async (): Promise<Batch[]> => {
  const { data, error } = await supabase.from("batches").select(`
    *,
    departments(name),
    tutors:profiles!batches_tutor_id_fkey(first_name, last_name)
  `);
  if (error) {
    console.error("Error fetching batches:", error);
    return [];
  }
  return data as Batch[];
};

export const fetchTemplates = async (): Promise<CertificateTemplate[]> => {
  const { data, error } = await supabase.from("templates").select("*");
  if (error) {
    console.error("Error fetching templates:", error);
    return [];
  }
  return data as CertificateTemplate[];
};

// Example functions for data manipulation
export const createRequest = async (newRequest: Omit<BonafideRequest, 'id' | 'created_at'>): Promise<BonafideRequest | null> => {
  const { data, error } = await supabase.from("requests").insert(newRequest).select().single();
  if (error) {
    console.error("Error creating request:", error);
    return null;
  }
  return data as BonafideRequest;
};

export const updateRequestStatus = async (requestId: string, status: RequestStatus, returnReason?: string): Promise<BonafideRequest | null> => {
  const updateData: Partial<BonafideRequest> = { status };
  if (returnReason) {
    updateData.return_reason = returnReason;
  }
  const { data, error } = await supabase.from("requests").update(updateData).eq("id", requestId).select().single();
  if (error) {
    console.error("Error updating request status:", error);
    return null;
  }
  return data as BonafideRequest;
};

export const updateProfile = async (userId: string, updates: Partial<Profile>): Promise<Profile | null> => {
  const { data, error } = await supabase.from("profiles").update(updates).eq("id", userId).select().single();
  if (error) {
    console.error("Error updating profile:", error);
    return null;
  }
  return data as Profile;
};

export const createDepartment = async (newDepartment: Omit<Department, 'id' | 'created_at'>): Promise<Department | null> => {
  const { data, error } = await supabase.from("departments").insert(newDepartment).select().single();
  if (error) {
    console.error("Error creating department:", error);
    return null;
  }
  return data as Department;
};

export const createBatch = async (newBatch: Omit<Batch, 'id' | 'created_at'>): Promise<Batch | null> => {
  const { data, error } = await supabase.from("batches").insert(newBatch).select().single();
  if (error) {
    console.error("Error creating batch:", error);
    return null;
  }
  return data as Batch;
};

export const updateBatch = async (batchId: string, updates: Partial<Batch>): Promise<Batch | null> => {
  const { data, error } = await supabase.from("batches").update(updates).eq("id", batchId).select().single();
  if (error) {
    console.error("Error updating batch:", error);
    return null;
  }
  return data as Batch;
};

export const createTemplate = async (newTemplate: Omit<CertificateTemplate, 'id' | 'created_at'>): Promise<CertificateTemplate | null> => {
  const { data, error } = await supabase.from("templates").insert(newTemplate).select().single();
  if (error) {
    console.error("Error creating template:", error);
    return null;
  }
  return data as CertificateTemplate;
};

export const updateTemplate = async (templateId: string, updates: Partial<CertificateTemplate>): Promise<CertificateTemplate | null> => {
  const { data, error } = await supabase.from("templates").update(updates).eq("id", templateId).select().single();
  if (error) {
    console.error("Error updating template:", error);
    return null;
  }
  return data as CertificateTemplate;
};

export const deleteTemplate = async (templateId: string): Promise<boolean> => {
  const { error } = await supabase.from("templates").delete().eq("id", templateId);
  if (error) {
    console.error("Error deleting template:", error);
    return false;
  }
  return true;
};

export const createStudent = async (profileData: Omit<Profile, 'id' | 'created_at' | 'updated_at'>, studentData: Omit<StudentDetails, 'id' | 'created_at' | 'role' | 'email' | 'first_name' | 'last_name' | 'username' | 'phone_number'>): Promise<StudentDetails | null> => {
  const { data: newProfile, error: profileError } = await supabase
    .from("profiles")
    .insert({ ...profileData, role: 'student' })
    .select()
    .single();

  if (profileError || !newProfile) {
    console.error("Error creating student profile:", profileError);
    return null;
  }

  const { data: newStudent, error: studentError } = await supabase
    .from("students")
    .insert({
      id: newProfile.id,
      register_number: studentData.register_number,
      parent_name: studentData.parent_name,
      batch_id: studentData.batch_id,
      tutor_id: studentData.tutor_id,
      hod_id: studentData.hod_id,
    })
    .select()
    .single();

  if (studentError || !newStudent) {
    console.error("Error creating student entry:", studentError);
    // Optionally, roll back profile creation here
    await supabase.from("profiles").delete().eq("id", newProfile.id);
    return null;
  }

  return { ...newProfile, ...newStudent } as StudentDetails;
};

export const fetchAllStudentsWithDetails = async (): Promise<StudentDetails[]> => {
  const { data, error } = await supabase
    .from("profiles")
    .select(`
      *,
      students(register_number, parent_name, batch_id, tutor_id, hod_id),
      batches(name, section, current_semester, departments(name)),
      tutors:profiles!students_tutor_id_fkey(first_name, last_name),
      hods:profiles!students_hod_id_fkey(first_name, last_name)
    `)
    .eq('role', 'student');

  if (error) {
    console.error("Error fetching all students with details:", error);
    return [];
  }

  return data.map((profile: any) => {
    const studentData = profile.students[0];
    const batch = profile.batches;
    const department = batch?.departments;
    const tutor = profile.tutors;
    const hod = profile.hods;

    return {
      ...profile,
      register_number: studentData?.register_number,
      parent_name: studentData?.parent_name,
      batch_id: batch?.id,
      batch_name: batch ? `${batch.name} ${batch.section || ''}`.trim() : undefined,
      current_semester: batch?.current_semester,
      department_id: department?.id,
      department_name: department?.name,
      tutor_id: tutor?.id,
      tutor_name: tutor ? `${tutor.first_name} ${tutor.last_name || ''}`.trim() : undefined,
      hod_id: hod?.id,
      hod_name: hod ? `${hod.first_name} ${hod.last_name || ''}`.trim() : undefined,
    } as StudentDetails;
  });
};

export const createTutor = async (profileData: Omit<Profile, 'id' | 'created_at' | 'updated_at'>, batchId?: string): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from("profiles")
    .insert({ ...profileData, role: 'tutor', batch_id: batchId })
    .select()
    .single();

  if (error) {
    console.error("Error creating tutor:", error);
    return null;
  }
  return data as Profile;
};

export const updateTutor = async (tutorId: string, updates: Partial<Profile>, batchId?: string): Promise<Profile | null> => {
  const updatePayload: Partial<Profile> = { ...updates };
  if (batchId !== undefined) {
    updatePayload.batch_id = batchId;
  }
  const { data, error } = await supabase.from("profiles").update(updatePayload).eq("id", tutorId).select().single();
  if (error) {
    console.error("Error updating tutor:", error);
    return null;
  }
  return data as Profile;
};

export const deleteTutor = async (tutorId: string): Promise<boolean> => {
  const { error } = await supabase.from("profiles").delete().eq("id", tutorId);
  if (error) {
    console.error("Error deleting tutor:", error);
    return false;
  }
  return true;
};

export const createHod = async (profileData: Omit<Profile, 'id' | 'created_at' | 'updated_at'>): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from("profiles")
    .insert({ ...profileData, role: 'hod' })
    .select()
    .single();

  if (error) {
    console.error("Error creating HOD:", error);
    return null;
  }
  return data as Profile;
};

export const updateHod = async (hodId: string, updates: Partial<Profile>): Promise<Profile | null> => {
  const { data, error } = await supabase.from("profiles").update(updates).eq("id", hodId).select().single();
  if (error) {
    console.error("Error updating HOD:", error);
    return null;
  }
  return data as Profile;
};

export const deleteHod = async (hodId: string): Promise<boolean> => {
  const { error } = await supabase.from("profiles").delete().eq("id", hodId);
  if (error) {
    console.error("Error deleting HOD:", error);
    return false;
  }
  return true;
};