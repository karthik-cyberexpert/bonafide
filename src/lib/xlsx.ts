import * as xlsx from "xlsx";
import { StudentProfile } from "./types";

const studentTemplateHeaders = [
  "name",
  "username",
  "registerNumber",
  "email",
  "phoneNumber",
  "parentName",
  "department",
  "batch",
  "currentSemester",
  "tutor",
  "hod",
];

/**
 * Generates and downloads an XLSX template for student bulk upload.
 */
export const downloadStudentTemplate = () => {
  const worksheet = xlsx.utils.aoa_to_sheet([studentTemplateHeaders]);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, "Students");
  xlsx.writeFile(workbook, "student_upload_template.xlsx");
};

/**
 * Parses an uploaded XLSX file and returns an array of student profiles.
 * @param file The uploaded file object.
 * @returns A promise that resolves to an array of StudentProfile objects.
 */
export const parseStudentFile = (file: File): Promise<StudentProfile[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = event.target?.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json<StudentProfile>(worksheet);
        resolve(json);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsArrayBuffer(file);
  });
};