import MIOParser, { MIOEntry, MIOParserResult, ParserUtil, Vaccination } from '@kbv/mioparser'
import { TerminologyGerman } from '@kbv/mioparser/dist/Definitions/KBVBase/1.1.1/Extension'

export const parseXMLData = async (xmlData: string) => {
  const mioParser = new MIOParser()
  const result: MIOParserResult = await mioParser.parseString(xmlData)
  const mio = result.value

  if (Vaccination.V1_1_0.Profile.BundleEntry.is(mio)) {
    return mio as Vaccination.V1_1_0.Profile.BundleEntry
  } else {
    throw new Error('Data was not a valid Vaccination Bundle')
  }
}

export const loadXMLData = async (paths: string[]) => {
  const bundlePromises: Promise<Vaccination.V1_1_0.Profile.BundleEntry>[] = paths.map(async (path) => {
    const xmlData = await fetch(path, {
      headers: {
        'Content-Type': 'application/xml',
        Accept: 'application/xml',
      },
    })
    const xmlDataText = await xmlData.text()
    return await parseXMLData(xmlDataText)
  })
  return await Promise.all(bundlePromises)
}

export const getMostRecentPatient = (bundles: Vaccination.V1_1_0.Profile.BundleEntry[]) => {
  if (bundles.length === 0) return undefined
  const mostCurrentBundle = bundles.reduce((previousBundle, currentBundle) =>
    previousBundle.timestamp > currentBundle.timestamp ? previousBundle : currentBundle,
  )
  const patientEntry = ParserUtil.getEntry(mostCurrentBundle, [Vaccination.V1_1_0.Profile.Patient])
  if (Vaccination.V1_1_0.Profile.Patient.is(patientEntry?.resource)) {
    return patientEntry?.resource
  }
  return undefined
}

const getDateTime = (
  record:
    | Vaccination.V1_1_0.Profile.Condition
    | Vaccination.V1_1_0.Profile.RecordAddendum
    | Vaccination.V1_1_0.Profile.RecordPrime,
) => {
  if (Vaccination.V1_1_0.Profile.Condition.is(record)) {
    return new Date(record.recordedDate).getTime()
  } else {
    return new Date(record.occurrenceDateTime).getTime()
  }
}

export const getRecords = (bundles: Vaccination.V1_1_0.Profile.BundleEntry[]) => {
  const records = bundles.flatMap((bundle) => {
    const bundleRecordsEntries = ParserUtil.getEntries<
      | Vaccination.V1_1_0.Profile.RecordPrime
      | Vaccination.V1_1_0.Profile.RecordAddendum
      | Vaccination.V1_1_0.Profile.Condition
    >(bundle, [
      Vaccination.V1_1_0.Profile.RecordPrime,
      Vaccination.V1_1_0.Profile.RecordAddendum,
      Vaccination.V1_1_0.Profile.Condition,
    ])
    if (bundleRecordsEntries.length) {
      const bundleRecordsEntriesResources = bundleRecordsEntries.map((entry) => entry.resource)
      return bundleRecordsEntriesResources
    }
    return []
  })
  return records.sort((a, b) => getDateTime(b) - getDateTime(a))
}

export const getPractitionerEntries = (bundles: Vaccination.V1_1_0.Profile.BundleEntry[]) => {
  return bundles.flatMap((bundle) => {
    return ParserUtil.getEntries(bundle, [
      Vaccination.V1_1_0.Profile.Practitioner,
      Vaccination.V1_1_0.Profile.PractitionerAddendum,
    ]) as (
      | MIOEntry<Vaccination.V1_1_0.Profile.Practitioner>
      | MIOEntry<Vaccination.V1_1_0.Profile.PractitionerAddendum>
    )[]
    // if (practitionerEntries) {
    //   const practitionerResources = practitionerEntries.map(
    //     (entry) =>
    //       entry.resource as Vaccination.V1_1_0.Profile.Practitioner | Vaccination.V1_1_0.Profile.PractitionerAddendum,
    //   )
    //   return practitionerResources
    // }
    // return []
  })
}

export const getFullName = (patient: Vaccination.V1_1_0.Profile.Patient) => {
  const nameSlice = ParserUtil.getSlice(
    Vaccination.V1_1_0.Profile.PatientName,
    patient?.name,
  ) as Vaccination.V1_1_0.Profile.PatientName
  return nameSlice.text || '-'
}

export const getBirthName = (patient: Vaccination.V1_1_0.Profile.Patient) => {
  const nameSlice = ParserUtil.getSlice(
    Vaccination.V1_1_0.Profile.PatientGeburtsnameFamilyNachname,
    patient?.name,
  ) as Vaccination.V1_1_0.Profile.PatientGeburtsnameFamilyNachname
  if (nameSlice) {
    return nameSlice.valueString || '-'
  }
  return '-'
}

export const getBirthDate = (patient: Vaccination.V1_1_0.Profile.Patient) => {
  if (!patient.birthDate) {
    return '-'
  }
  return new Date(patient.birthDate).toLocaleDateString()
}

export const getGkv = (patient: Vaccination.V1_1_0.Profile.Patient) => {
  const gkv = ParserUtil.getSlice(
    Vaccination.V1_1_0.Profile.PatientVersichertenIdGKV,
    patient.identifier,
  ) as Vaccination.V1_1_0.Profile.PatientVersichertenIdGKV
  return gkv.value || '-'
}

const getPZNCoding = (record: Vaccination.V1_1_0.Profile.RecordPrime | Vaccination.V1_1_0.Profile.RecordAddendum) => {
  if (Vaccination.V1_1_0.Profile.RecordPrime.is(record)) {
    return ParserUtil.getSlice<Vaccination.V1_1_0.Profile.RecordPrimeVaccineCodePharmazentralnummerpzn>(
      Vaccination.V1_1_0.Profile.RecordPrimeVaccineCodePharmazentralnummerpzn,
      record.vaccineCode.coding,
    )
  }
  return ParserUtil.getSlice<Vaccination.V1_1_0.Profile.RecordAddendumVaccineCodePharmazentralnummerpzn>(
    Vaccination.V1_1_0.Profile.RecordAddendumVaccineCodePharmazentralnummerpzn,
    record.vaccineCode.coding,
  )
}

export const getVaccinationDisplay = (
  record: Vaccination.V1_1_0.Profile.RecordPrime | Vaccination.V1_1_0.Profile.RecordAddendum,
) => {
  const vaccinationCoding = getPZNCoding(record)
  return vaccinationCoding ? vaccinationCoding.display : '-'
}

export const getPZN = (record: Vaccination.V1_1_0.Profile.RecordPrime | Vaccination.V1_1_0.Profile.RecordAddendum) => {
  const vaccinationCoding = getPZNCoding(record)
  return vaccinationCoding ? vaccinationCoding.code : '-'
}

export const getVaccineEntryType = (record: Vaccination.V1_1_0.Profile.RecordPrime) => {
  const entryType = ParserUtil.getSlice(
    Vaccination.V1_1_0.Extension.EntryType,
    record.extension,
  ) as Vaccination.V1_1_0.Extension.EntryType
  return entryType.valueCodeableConcept.coding[0].display || '-'
}

export const getVaccineType = (record: Vaccination.V1_1_0.Profile.RecordPrime) => {
  const vaccinationCoding = ParserUtil.getSlice(
    Vaccination.V1_1_0.Profile.RecordPrimeVaccineCodeSnomedCT,
    record.vaccineCode.coding,
  ) as Vaccination.V1_1_0.Profile.RecordPrimeVaccineCodeSnomedCT
  if (vaccinationCoding._display?.extension) {
    const terminologyGerman = (vaccinationCoding._display?.extension[0] as TerminologyGerman).extension
    return terminologyGerman ? (terminologyGerman[0].valueString as string) : '-'
  }
  return '-'
}

export const getVaccinationTargetDiseases = (
  record: Vaccination.V1_1_0.Profile.RecordPrime | Vaccination.V1_1_0.Profile.RecordAddendum,
) => {
  return record.protocolApplied[0].targetDisease.map((targetDisease) => {
    if (targetDisease.coding[0]._display && targetDisease.coding[0]._display?.extension) {
      const terminologyExtension = targetDisease.coding[0]._display?.extension[0] as TerminologyGerman
      if (terminologyExtension.extension) return terminologyExtension.extension[0].valueString || '-'
    }
    return '-'
  })
}

export const getAttesterUUID = (
  record: Vaccination.V1_1_0.Profile.RecordPrime | Vaccination.V1_1_0.Profile.RecordAddendum,
) => {
  if (Vaccination.V1_1_0.Profile.RecordPrime.is(record)) {
    const attesterExtension = ParserUtil.getSlice<Vaccination.V1_1_0.Extension.Attester>(
      Vaccination.V1_1_0.Extension.Attester,
      record.extension,
    )
    if (!attesterExtension) return ''
    const attesterParty = ParserUtil.getSlice<Vaccination.V1_1_0.Extension.AttesterParty>(
      Vaccination.V1_1_0.Extension.AttesterParty,
      attesterExtension.extension,
    )
    if (!attesterParty) return ''
    const uuid = attesterParty.valueReference.reference
    return uuid
  }
  if (Vaccination.V1_1_0.Profile.RecordAddendum.is(record)) {
    const attesterExtension = ParserUtil.getSlice<Vaccination.V1_1_0.Extension.AttesterAddendum>(
      Vaccination.V1_1_0.Extension.AttesterAddendum,
      record.extension,
    )
    if (!attesterExtension) return ''
    const attesterParty = ParserUtil.getSlice<Vaccination.V1_1_0.Extension.AttesterAddendumParty>(
      Vaccination.V1_1_0.Extension.AttesterAddendumParty,
      attesterExtension.extension,
    )
    if (!attesterParty) return ''
    const uuid = attesterParty.valueReference.reference
    return uuid
  }
  return ''
}

export const getPractitionerByUUID = (
  practitioners: (
    | MIOEntry<Vaccination.V1_1_0.Profile.Practitioner>
    | MIOEntry<Vaccination.V1_1_0.Profile.PractitionerAddendum>
  )[],
  uuid: string,
) => {
  // practitioners.forEach((practitioner) => console.log(practitioner.fullUrl))
  return practitioners.find((practitioner) => practitioner.fullUrl === uuid)?.resource
}

export const getPractitionerName = (
  practitioner: Vaccination.V1_1_0.Profile.Practitioner | Vaccination.V1_1_0.Profile.PractitionerAddendum,
) => {
  const practitionerName = ParserUtil.getSlice(
    [Vaccination.V1_1_0.Profile.PractitionerName, Vaccination.V1_1_0.Profile.PractitionerAddendumName],
    practitioner.name,
  ) as Vaccination.V1_1_0.Profile.PractitionerName | Vaccination.V1_1_0.Profile.PractitionerAddendumName
  return practitionerName.text || '-'
}

export const getConditionDisease = (condition: Vaccination.V1_1_0.Profile.Condition) => {
  const snomedCoding = ParserUtil.getSlice<Vaccination.V1_1_0.Profile.ConditionCodeSnomedCT>(
    Vaccination.V1_1_0.Profile.ConditionCodeSnomedCT,
    condition.code.coding,
  )
  if (snomedCoding && snomedCoding._display && snomedCoding._display.extension) {
    const terminologyExtension = snomedCoding._display.extension[0] as TerminologyGerman
    if (terminologyExtension.extension && terminologyExtension.extension[0].valueString) {
      return terminologyExtension.extension[0].valueString || ''
    }
  }
  return ''
}

export const getDiseaseOverview = (
  records: (
    | Vaccination.V1_1_0.Profile.RecordPrime
    | Vaccination.V1_1_0.Profile.RecordAddendum
    | Vaccination.V1_1_0.Profile.Condition
  )[],
) => {
  const diseaseOverview: {
    [key: string]: { lastRecord: string; recordCount: number }
  } = {}
  records.forEach((record) => {
    let targetDiseases: string[] = []
    let dateTime = '1970-01-01T00:00:00.000Z' // UTC dateTime of 0
    if (Vaccination.V1_1_0.Profile.Condition.is(record)) {
      targetDiseases = [getConditionDisease(record)]
    } else {
      targetDiseases = getVaccinationTargetDiseases(record)
      dateTime = record.occurrenceDateTime
    }
    targetDiseases.forEach((targetDisease) => {
      if (targetDisease in diseaseOverview) {
        diseaseOverview[targetDisease].recordCount++
        if (dateTime > diseaseOverview[targetDisease].lastRecord) {
          diseaseOverview[targetDisease].lastRecord = dateTime
        }
      } else {
        diseaseOverview[targetDisease] = {
          lastRecord: dateTime,
          recordCount: 1,
        }
      }
    })
  })
  const diseaseOverviewArray = Object.entries(diseaseOverview).map(([key, value], index) => ({
    targetDisease: key,
    ...value,
  }))
  return diseaseOverviewArray.sort((a, b) => new Date(b.lastRecord).getTime() - new Date(a.lastRecord).getTime())
}
