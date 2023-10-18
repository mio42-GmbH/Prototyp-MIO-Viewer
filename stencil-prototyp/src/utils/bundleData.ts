import { Record } from "./recordData";
import MIOParser, { MIOParserResult, ParserUtil, Vaccination } from "@kbv/mioparser";

export type BundleEntry = Vaccination.V1_1_0.Profile.BundleEntry;

async function parseBase64FhirBundle(base64Data: string): Promise<BundleEntry> {
  const xmlData = atob(base64Data);
  const mioParser = new MIOParser();
  const result: MIOParserResult = await mioParser.parseString(xmlData);
  const mio = result.value;

  if (Vaccination.V1_1_0.Profile.BundleEntry.is(mio)) {
    return mio as BundleEntry;
  } else {
    throw new Error("Data was not a valid Vaccination Bundle");
  }
}

export async function parseBase64FhirInput(
  base64Data: string | string[],
): Promise<BundleEntry[]> {
  if (!Array.isArray(base64Data)) {
    base64Data = base64Data.split(",");
  }
  const bundlePromises = base64Data.map(async b64 => await parseBase64FhirBundle(b64));
  return await Promise.all(bundlePromises);
}

export function getMostRecentBundle(bundles: BundleEntry[]): BundleEntry {
  return bundles.reduce((previousBundle, currentBundle) => {
    if (previousBundle.timestamp > currentBundle.timestamp) {
      return previousBundle;
    }
    return currentBundle;
  });
}

export function getBundleRecords(bundles: BundleEntry[]): Record[] {
  return bundles.flatMap(bundle =>
    ParserUtil.getEntries<Record>(bundle, [
      Vaccination.V1_1_0.Profile.RecordPrime,
      Vaccination.V1_1_0.Profile.RecordAddendum,
      Vaccination.V1_1_0.Profile.Condition,
    ]).map(entry => entry.resource),
  );
}
