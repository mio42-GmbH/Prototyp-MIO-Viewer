import { ParserUtil, MIOEntry, Vaccination } from "@kbv/mioparser";
import { BundleEntry } from "./bundleData";
import { VaccinationRecord } from "./recordData";

export type Practitioner =
  | Vaccination.V1_1_0.Profile.Practitioner
  | Vaccination.V1_1_0.Profile.PractitionerAddendum;

export type PractitionerEntry =
  | MIOEntry<Vaccination.V1_1_0.Profile.Practitioner>
  | MIOEntry<Vaccination.V1_1_0.Profile.PractitionerAddendum>;

export type OrganisationEntry = MIOEntry<Vaccination.V1_1_0.Profile.Organization>;

export type Organisation = Vaccination.V1_1_0.Profile.Organization;

export function getPractitionerEntries(bundles: BundleEntry[]): PractitionerEntry[] {
  return bundles.flatMap(
    bundle =>
      ParserUtil.getEntries(bundle, [
        Vaccination.V1_1_0.Profile.Practitioner,
        Vaccination.V1_1_0.Profile.PractitionerAddendum,
      ]) as PractitionerEntry[],
  );
}

export function getOrganisationEntries(bundles: BundleEntry[]): OrganisationEntry[] {
  return bundles.flatMap(
    bundle =>
      ParserUtil.getEntries(bundle, [
        Vaccination.V1_1_0.Profile.Organization,
      ]) as OrganisationEntry[],
  );
}

export function getAttesterUUID(record: VaccinationRecord): string {
  if (Vaccination.V1_1_0.Profile.RecordPrime.is(record)) {
    const attesterExtension =
      ParserUtil.getSlice<Vaccination.V1_1_0.Extension.Attester>(
        Vaccination.V1_1_0.Extension.Attester,
        record.extension,
      );
    if (!attesterExtension) return "";
    const attesterParty =
      ParserUtil.getSlice<Vaccination.V1_1_0.Extension.AttesterParty>(
        Vaccination.V1_1_0.Extension.AttesterParty,
        attesterExtension.extension,
      );
    if (!attesterParty) return "";
    return attesterParty.valueReference.reference;
  } else {
    const attesterExtension =
      ParserUtil.getSlice<Vaccination.V1_1_0.Extension.AttesterAddendum>(
        Vaccination.V1_1_0.Extension.AttesterAddendum,
        record.extension,
      );
    if (!attesterExtension) return "";
    const attesterParty =
      ParserUtil.getSlice<Vaccination.V1_1_0.Extension.AttesterAddendumParty>(
        Vaccination.V1_1_0.Extension.AttesterAddendumParty,
        attesterExtension.extension,
      );
    if (!attesterParty) return "";
    return attesterParty.valueReference.reference;
  }
}

export function getPractitionerRoleEntry(
  bundle: BundleEntry[],
  parctitionerRolleUuid: string,
) {
  const practitionerRoleEntry = bundle.map(bundleentry =>
    ParserUtil.getEntry(bundleentry, [Vaccination.V1_1_0.Profile.Practitionerrole]),
  );
  const practitioner = practitionerRoleEntry.find(
    e => e.fullUrl === parctitionerRolleUuid,
  );

  return practitioner.resource as Vaccination.V1_1_0.Profile.Practitionerrole;
}

export function getPractitionerByUUID(
  practitioners: PractitionerEntry[],
  uuid: string,
): Practitioner | undefined {
  return practitioners.find(practitioner => practitioner.fullUrl === uuid)?.resource;
}

export function getOrganisationByUUID(
  organisations: OrganisationEntry[],
  uuid: string,
): Organisation | undefined {
  return organisations.find(practitioner => practitioner.fullUrl === uuid)?.resource;
}

export function getPractitionerName(practitioner: Practitioner): string {
  const practitionerName = ParserUtil.getSlice(
    Vaccination.V1_1_0.Profile.PractitionerName,
    practitioner.name,
  ) as
    | Vaccination.V1_1_0.Profile.PractitionerName
    | Vaccination.V1_1_0.Profile.PractitionerAddendumName;
  const practitionerFullName =
    practitionerName?.prefix +
    " " +
    practitionerName?.family +
    " " +
    practitionerName?.given;
  return practitionerFullName;
}

export function getOrganisationAdress(organisation: Organisation): string[] {
  const organisationAdress = ParserUtil.getSlice(
    Vaccination.V1_1_0.Profile.OrganizationStrassenanschrift,
    organisation.address,
  ) as Vaccination.V1_1_0.Profile.OrganizationStrassenanschrift;

  return [
    organisationAdress.line[0],
    organisationAdress.postalCode,
    organisationAdress.city,
  ];
}

export function getPractitionerQualification(practitioner: Practitioner): string {
  const attesterQualification = practitioner.qualification[0].code.coding[0].display;

  return attesterQualification;
}

export function getConditionProvenance(bundle: BundleEntry[], uuid: string) {
  let conditionProvenance: Vaccination.V1_1_0.Profile.Provenance;
  const fullUrl = "urn:uuid:" + uuid;
  const conditionProvenanceEntries = bundle.map(bundleentry =>
    ParserUtil.getEntry(bundleentry, [Vaccination.V1_1_0.Profile.Provenance]),
  );

  conditionProvenanceEntries.forEach(entry => {
    if (entry != undefined) {
      conditionProvenance = entry.resource as Vaccination.V1_1_0.Profile.Provenance;
    }
  });
  const provenanceTarget = ParserUtil.getSlice(
    Vaccination.V1_1_0.Profile.ProvenanceTargetReference,
    conditionProvenance.target,
  ) as Vaccination.V1_1_0.Profile.ProvenanceTargetReference;

  if (provenanceTarget.reference === fullUrl) {
    const role = conditionProvenance.agent[0].role[0].coding.find(e => e.display);

    return role.display;
  }

  return "-";
}
