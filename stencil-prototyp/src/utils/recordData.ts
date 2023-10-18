import { ParserUtil, Vaccination } from "@kbv/mioparser";
import { TerminologyGerman } from "@kbv/mioparser/dist/Definitions/KBVBase/1.1.1/Extension";
import { BundleEntry } from "./bundleData";
import {
  PractitionerEntry,
  getAttesterUUID,
  getPractitionerRoleEntry,
  getPractitionerByUUID,
  getPractitionerName,
  getConditionProvenance,
  OrganisationEntry,
  getOrganisationByUUID,
  getOrganisationAdress,
  getPractitionerQualification,
} from "./attesterData";

export type VaccinationRecord =
  | Vaccination.V1_1_0.Profile.RecordPrime
  | Vaccination.V1_1_0.Profile.RecordAddendum;

export type ConditionRecord = Vaccination.V1_1_0.Profile.Condition;

export type Record = VaccinationRecord | ConditionRecord;

export type ConditionCodeSnomedCT = Vaccination.V1_1_0.Profile.ConditionCodeSnomedCT;

export class VaccinationRecordData {
  public diseases: string[];
  public occurrenceDateTime: string;
  public codeDisplay: string;
  public note: string;
  public lotNumber: string;
  public attesterName: string;
  public adress: string[];
  public organisationName: string;
  public qualification: string;

  constructor({
    diseases,
    occurrenceDateTime,
    codeDisplay,
    note,
    lotNumber,
    attesterName,
    adress,
    organisationName,
    qualification,
  }: {
    diseases: string[];
    occurrenceDateTime: string;
    codeDisplay: string;
    note: string;
    lotNumber: string;
    attesterName: string;
    adress: string[];
    organisationName: string;
    qualification: string;
  }) {
    this.diseases = diseases;
    this.occurrenceDateTime = occurrenceDateTime;
    this.codeDisplay = codeDisplay;
    this.note = note;
    this.lotNumber = lotNumber;
    this.attesterName = attesterName;
    this.adress = adress;
    this.organisationName = organisationName;
    this.qualification = qualification;
  }

  get dateTime(): string {
    return this.occurrenceDateTime;
  }
}

export class ConditionRecordData {
  public diseases: string[];
  public recordedDate: string;
  public stageOfLife: string;
  public provenance: string;

  constructor({
    diseases,
    recordedDate,
    stageOfLife,
    provenance,
  }: {
    diseases: string[];
    recordedDate: string;
    stageOfLife: string;
    provenance: string;
  }) {
    this.diseases = diseases;
    this.recordedDate = recordedDate;
    this.stageOfLife = stageOfLife;
    this.provenance = provenance;
  }

  get dateTime(): string {
    return this.recordedDate;
  }
}

export type RecordData = VaccinationRecordData | ConditionRecordData;

export type RecordDataByDisease = {
  [disease: string]: {
    records: RecordData[];
    latestRecordDate: string;
  };
};

export type DiseaseRecordSummary = {
  disease: string;
  recordCount: number;
  latestRecordDate: string;
};

const uctZero = "1970-01-01T00:00:00.000Z";

function recordIsCondition(record: Record): record is ConditionRecord {
  return Vaccination.V1_1_0.Profile.Condition.is(record);
}

export function getVaccinationTargetDiseases(record: VaccinationRecord): string[] {
  return record.protocolApplied[0].targetDisease.map(targetDisease => {
    if (
      targetDisease.coding[0]._display &&
      targetDisease.coding[0]._display?.extension
    ) {
      const terminologyExtension = targetDisease.coding[0]._display
        ?.extension[0] as TerminologyGerman;
      if (terminologyExtension.extension) {
        return terminologyExtension.extension[0].valueString || "-";
      }
    }
    return "-";
  });
}

export function getConditionDisease(condition: ConditionRecord): string {
  const snomedCoding =
    ParserUtil.getSlice<Vaccination.V1_1_0.Profile.ConditionCodeSnomedCT>(
      Vaccination.V1_1_0.Profile.ConditionCodeSnomedCT,
      condition.code.coding,
    );
  if (snomedCoding && snomedCoding._display && snomedCoding._display.extension) {
    const terminologyExtension = snomedCoding._display
      .extension[0] as TerminologyGerman;
    if (
      terminologyExtension.extension &&
      terminologyExtension.extension[0].valueString
    ) {
      return terminologyExtension.extension[0].valueString || "";
    }
  }
  return "";
}

function getPZNCoding(record: VaccinationRecord) {
  if (Vaccination.V1_1_0.Profile.RecordPrime.is(record)) {
    return ParserUtil.getSlice<Vaccination.V1_1_0.Profile.RecordPrimeVaccineCodePharmazentralnummerpzn>(
      Vaccination.V1_1_0.Profile.RecordPrimeVaccineCodePharmazentralnummerpzn,
      record.vaccineCode.coding,
    );
  }
  return ParserUtil.getSlice<Vaccination.V1_1_0.Profile.RecordAddendumVaccineCodePharmazentralnummerpzn>(
    Vaccination.V1_1_0.Profile.RecordAddendumVaccineCodePharmazentralnummerpzn,
    record.vaccineCode.coding,
  );
}

function getVaccinationDisplay(record: VaccinationRecord): string {
  const vaccinationCoding = getPZNCoding(record);
  return vaccinationCoding ? vaccinationCoding.display : "-";
}

function getRecordTime(record: RecordData): number {
  if (record instanceof ConditionRecordData) {
    return new Date(record.recordedDate).getTime();
  }
  return new Date(record.occurrenceDateTime).getTime();
}

function recordSortValue(record: RecordData): number {
  if (record instanceof ConditionRecordData) {
    return 1;
  } else if (record instanceof VaccinationRecordData) {
    return 2;
  }
}

export function getRecordData(
  records: Record[],
  practitioners: PractitionerEntry[],
  organisations: OrganisationEntry[],
  bundle: BundleEntry[],
): RecordData[] {
  let recordData: RecordData[] = [];

  records.forEach(record => {
    if (recordIsCondition(record)) {
      recordData.push(
        new ConditionRecordData({
          diseases: [getConditionDisease(record)],
          recordedDate: record.recordedDate,
          stageOfLife: record.onsetString,
          provenance: getConditionProvenance(bundle, record.id),
        }),
      );
    } else {
      let note = "";
      if (record.note && record.note[1]) {
        note = record.note[1].text;
      }

      const practitionerRole = getPractitionerRoleEntry(
        bundle,
        getAttesterUUID(record),
      );
      const attester = getPractitionerByUUID(
        practitioners,
        practitionerRole.practitioner.reference,
      );
      const attesterName = attester ? getPractitionerName(attester) : "-";

      const attesterOrganisation = getOrganisationByUUID(
        organisations,
        practitionerRole.organization.reference,
      );

      const adress = getOrganisationAdress(attesterOrganisation);
      const attesterQualifikation = getPractitionerQualification(attester);
      recordData.push(
        new VaccinationRecordData({
          diseases: getVaccinationTargetDiseases(record),
          occurrenceDateTime: record.occurrenceDateTime,
          codeDisplay: getVaccinationDisplay(record),
          note: note,
          lotNumber: record.lotNumber || "-",
          attesterName: attesterName,
          adress: adress,
          organisationName: attesterOrganisation.name,
          qualification: attesterQualifikation,
        }),
      );
    }
  });

  return recordData;
}

export function constructRecordDataDict(records: RecordData[]): RecordDataByDisease {
  const dataByDisease: RecordDataByDisease = new Proxy(
    {},
    {
      get: (dict, disease) => {
        if (!(disease in dict)) {
          dict[disease] = {
            records: [],
            latestRecordDate: uctZero,
          };
        }
        return dict[disease];
      },
    },
  );

  records.forEach(record => {
    if (record instanceof ConditionRecordData) {
      const diseaseData = dataByDisease[record.diseases[0]];
      diseaseData.records.push(record);
      if (record.recordedDate > diseaseData.latestRecordDate) {
        diseaseData.latestRecordDate = record.recordedDate;
      }
    } else {
      record.diseases.forEach(disease => {
        let diseaseData = dataByDisease[disease];
        diseaseData.records.push(record);
        if (record.occurrenceDateTime > diseaseData.latestRecordDate) {
          diseaseData.latestRecordDate = record.occurrenceDateTime;
        }
      });
    }
  });

  for (const [_, diseaseData] of Object.entries(dataByDisease)) {
    diseaseData.records
      .sort((a, b) => {
        return getRecordTime(a) - getRecordTime(b);
      })
      .sort((a, b) => {
        return recordSortValue(a) - recordSortValue(b);
      });
  }

  return dataByDisease;
}

export function getDiseaseRecordSummaries(
  recordsByDisease: RecordDataByDisease,
): DiseaseRecordSummary[] {
  return Object.entries(recordsByDisease)
    .map(([disease, recordData]) => {
      return {
        disease: disease,
        recordCount: recordData.records.length,
        latestRecordDate: recordData.latestRecordDate,
      };
    })
    .filter(summary => summary.recordCount > 0);
}

export function getLatestRecordDataDate(records: RecordData[]): string {
  let latestDate = uctZero;

  for (let record of records) {
    if (record instanceof ConditionRecordData) {
      if (record.recordedDate > latestDate) {
        latestDate = record.recordedDate;
      }
    } else {
      if (record.occurrenceDateTime > latestDate) {
        latestDate = record.occurrenceDateTime;
      }
    }
  }
  return latestDate;
}
