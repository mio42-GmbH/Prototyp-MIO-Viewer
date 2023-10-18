import { ParserUtil, Vaccination } from "@kbv/mioparser";
import { BundleEntry, getMostRecentBundle } from "./bundleData";

export type Patient = Vaccination.V1_1_0.Profile.Patient;

export class PatientDetails {
  public fullName: string;
  public birthDate: string;
  public age: string;
  public gender: string;
  public gkv: string;

  constructor({
    fullName,
    birthDate,
    age,
    gender,
    gkv,
  }: {
    fullName: string;
    birthDate: string;
    age: string;
    gender: string;
    gkv: string;
  }) {
    this.fullName = fullName;
    this.birthDate = birthDate;
    this.age = age;
    this.gender = gender;
    this.gkv = gkv;
  }
}

function getFullName(patient: Patient): string {
  const nameSlice = ParserUtil.getSlice(
    Vaccination.V1_1_0.Profile.PatientName,
    patient?.name,
  ) as Vaccination.V1_1_0.Profile.PatientName;
  return nameSlice.text || "-";
}

function getBirthDate(patient: Patient): Date | undefined {
  if (!patient.birthDate) {
    return undefined;
  }
  return new Date(patient.birthDate);
}

function calculateAge(birthDate: Date): number {
  const today = new Date();
  let yearDifference = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  // Did not have birthday in current year yet
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    yearDifference -= 1;
  }
  return yearDifference;
}

function getGkv(patient: Patient): string {
  const gkv = ParserUtil.getSlice(
    Vaccination.V1_1_0.Profile.PatientVersichertenIdGKV,
    patient.identifier,
  ) as Vaccination.V1_1_0.Profile.PatientVersichertenIdGKV;
  return gkv.value || "-";
}

function getBundlePatient(bundle: BundleEntry[]): Patient | undefined {
  if (bundle.length === 0) {
    return undefined;
  }
  const mostRecentbundle = getMostRecentBundle(bundle);
  const patientEntry = ParserUtil.getEntry(mostRecentbundle, [
    Vaccination.V1_1_0.Profile.Patient,
  ]);
  if (Vaccination.V1_1_0.Profile.Patient.is(patientEntry?.resource)) {
    return patientEntry?.resource;
  }
  return undefined;
}

export function getPatientDetails(bundle: BundleEntry[]): PatientDetails | undefined {
  const patient = getBundlePatient(bundle);
  if (!patient) {
    return undefined;
  }

  const birthDate = getBirthDate(patient);
  const birthDateString = birthDate.toLocaleDateString("de-DE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  let age = "-";
  if (birthDate) {
    age = calculateAge(birthDate).toString();
  }

  return new PatientDetails({
    fullName: getFullName(patient),
    birthDate: birthDateString,
    age: age,
    gender: patient.gender || "unbekannt",
    gkv: getGkv(patient),
  });
}
