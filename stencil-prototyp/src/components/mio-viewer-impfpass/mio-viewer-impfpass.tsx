import {
  Component,
  Host,
  h,
  Prop,
  State,
  Watch,
  Listen,
  getAssetPath,
} from "@stencil/core";
import { getBundleRecords, parseBase64FhirInput } from "../../utils/bundleData";
import { PatientDetails, getPatientDetails } from "../../utils/patientData";
import {
  getPractitionerEntries,
  getOrganisationEntries,
} from "../../utils/attesterData";
import {
  RecordDataByDisease,
  getRecordData,
  constructRecordDataDict,
} from "../../utils/recordData";
import {
  FilterCounts,
  FilterStates,
  applyRecordFilters,
  countFilteredRecords,
  initialFilterStates,
} from "../../utils/recordFilters";

const searchIconPath = getAssetPath("../../assets/search.svg");
const filterIconPath = getAssetPath("../../assets/filter.svg");

@Component({
  tag: "mio-viewer-impfpass",
  styleUrl: "mio-viewer-impfpass.css",
  shadow: true,
  assetsDirs: ["../../assets"],
})
export class MioViewerImpfpass {
  @Prop() base64FhirData: string | string[];

  filterStates: FilterStates = initialFilterStates;

  patientDetails: PatientDetails | undefined;

  filterCounts: FilterCounts;
  recordDataByDisease: RecordDataByDisease = {};
  @State() filteredRecordData: RecordDataByDisease = {};

  @State() selectedDisease: string = "";
  @State() showDetails: boolean = false;
  @State() showFilterMenu: boolean = false;

  // ============================================

  async parseNewFhirInput() {
    let fhirBundles = await parseBase64FhirInput(this.base64FhirData);
    this.patientDetails = getPatientDetails(fhirBundles);
    let records = getBundleRecords(fhirBundles);
    let practitioners = getPractitionerEntries(fhirBundles);
    let organisations = getOrganisationEntries(fhirBundles);
    let recordData = getRecordData(records, practitioners, organisations, fhirBundles);
    this.filterCounts = countFilteredRecords(recordData);
    this.recordDataByDisease = constructRecordDataDict(recordData);
    this.filteredRecordData = this.recordDataByDisease;
  }

  resetUserInputs() {
    this.selectedDisease = "";
    this.showDetails = false;
    this.showFilterMenu = false;
    this.filterStates = initialFilterStates;
  }

  hideDetails() {
    this.showDetails = false;
    this.selectedDisease = "";
  }

  @Watch("base64FhirData")
  async watchFhirDataHandler(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.resetUserInputs();
      await this.parseNewFhirInput();
    }
  }

  async componentWillLoad() {
    await this.parseNewFhirInput();
  }

  filterRecords() {
    this.filteredRecordData = applyRecordFilters(
      this.recordDataByDisease,
      this.filterStates,
    );
    if (!(this.selectedDisease in this.filteredRecordData)) {
      this.hideDetails();
    }
  }

  @Listen("filtersApplied")
  filtersAppliedHandler(event: CustomEvent<FilterStates>) {
    this.showFilterMenu = false;
    this.filterStates = Object.assign({}, event.detail);
    this.filterRecords();
  }

  @Listen("diseaseSelected")
  diseaseSelectedHandler(event: CustomEvent<string>) {
    this.selectedDisease = event.detail;
    this.showDetails = true;
  }

  @Listen("detailsHidden")
  detailsHiddenHandler(_: CustomEvent) {
    this.hideDetails();
  }

  render() {
    return (
      <Host>
        <mio-viewer-impfpass-header patient={this.patientDetails} />
        <div id="mio-viewer-body">
          <div id="mio-viewer-body-filler" />
          <div id="mio-viewer-body-container">
            <div id="mio-viewer-menu-bar">
              <div id="mio-viewer-search-menu">
                <img src={searchIconPath} />
              </div>
              <div id="mio-viewer-filter-menu">
                <img
                  src={filterIconPath}
                  onClick={() => {
                    this.showFilterMenu = !this.showFilterMenu;
                  }}
                />
                {this.showFilterMenu && (
                  <mio-viewer-impfpass-dismissable-card
                    dismissMenuCallback={() => {
                      this.showFilterMenu = false;
                    }}
                  >
                    <mio-viewer-impfpass-filter-menu
                      initialFilterStates={this.filterStates}
                      filterCounts={this.filterCounts}
                    />
                  </mio-viewer-impfpass-dismissable-card>
                )}
              </div>
            </div>
            <div id="mio-viewer-side-by-side-layout">
              <mio-viewer-impfpass-record-overview
                recordDataByDisease={this.filteredRecordData}
                selectedDisease={this.selectedDisease}
              />
              {this.showDetails && (
                <mio-viewer-impfpass-record-list
                  recordDetails={this.filteredRecordData[this.selectedDisease].records}
                  diseaseName={this.selectedDisease}
                />
              )}
            </div>
            <br></br>
          </div>
        </div>
      </Host>
    );
  }
}
