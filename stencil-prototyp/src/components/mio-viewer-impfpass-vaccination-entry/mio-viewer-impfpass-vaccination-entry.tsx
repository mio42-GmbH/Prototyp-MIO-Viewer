import {
  Component,
  Host,
  h,
  Prop,
  Watch,
  State,
  getAssetPath,
  Listen,
} from "@stencil/core";
import { VaccinationRecordData } from "../../utils/recordData";

const chevronUpPath = getAssetPath("../../assets/chevron_up_blue.svg");
const chevronDownPath = getAssetPath("../../assets/chevron_down_blue.svg");
const vaccinationIconPath = getAssetPath("../../assets/Icon_Eintragstyp.svg");

@Component({
  tag: "mio-viewer-impfpass-vaccination-entry",
  styleUrl: "mio-viewer-impfpass-vaccination-entry.css",
  shadow: true,
  assetsDirs: ["../../assets"],
})
export class MioViewerImpfpassVaccinationEntry {
  @Prop() vaccination: VaccinationRecordData;
  @Prop() diseaseName: string;
  @State() expanded: boolean = false;
  @State() showOverlay: boolean = false;

  @Watch("diseaseName")
  diseaseNameHandler(_0: string, _1: string) {
    this.expanded = false;
  }

  get expandLogoPath(): string {
    if (this.expanded) return chevronUpPath;

    return chevronDownPath;
  }

  @Listen("closePractitioner")
  closePractitioner(_: CustomEvent) {
    this.showOverlay = false;
  }

  render() {
    return (
      <Host>
        <table
          id="mio-viewer-vaccination-entry"
          cellPadding={0}
          cellspacing={0}
        >
          <tr class="mio-viewer-entry-row">
            <td id="mio-viewer-entry-icon">
              <img src={vaccinationIconPath} />
            </td>
            <td class="mio-viewer-entry-cell">
              <div class="mio-viewer-entry-cell-content">
                <div id="mio-viewer-entry-vaccination-title">Impfung</div>
                <div class="mio-viewer-entry-paragraph">
                  {(this.vaccination.occurrenceDateTime &&
                    new Date(this.vaccination.occurrenceDateTime).toLocaleDateString(
                      "de-DE",
                      {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      },
                    )) ||
                    "-"}
                </div>
              </div>
            </td>
            <td class="mio-viewer-entry-cell">
              <div class="mio-viewer-entry-cell-content">
                <div class="mio-viewer-entry-descriptor">Impfstoff:</div>
                <div class="mio-viewer-entry-paragraph">
                  {this.vaccination.codeDisplay}
                </div>
              </div>
            </td>
            <td class="mio-viewer-details-button-container">
              <div
                id="mio-viewer-details-button"
                onClick={() => {
                  this.expanded = !this.expanded;
                }}
              >
                <div id="mio-viewer-details-button-text">
                  <div>Details</div>
                  {this.vaccination.note && <div>(1 Anmerkung)</div>}
                </div>
                <img
                  class="mio-viewer-expandLogo"
                  src={this.expandLogoPath}
                />
              </div>
            </td>
          </tr>
          {this.expanded && (
            <tr>
              <td />
              <td class="mio-viewer-entry-cell">
                <div class="mio-viewer-entry-cell-content">
                  <div class="mio-viewer-entry-descriptor">Charge</div>
                  <span class="mio-viewer-entry-paragraph">
                    {this.vaccination.lotNumber}
                  </span>
                </div>
              </td>
              <td class="mio-viewer-entry-cell">
                <div class="mio-viewer-entry-cell-content">
                  <div class="mio-viewer-entry-descriptor">Behandelnde:r</div>
                  <div
                    id="mio-viewer-entry-practitioner"
                    onClick={() => {
                      this.showOverlay = !this.showOverlay;
                    }}
                  >
                    {this.vaccination.attesterName}
                  </div>
                </div>
              </td>
              <td class="mio-viewer-details-button-container" />
            </tr>
          )}
          {this.expanded && this.vaccination.note && (
            <tr>
              <td />
              <td colSpan={3}>
                <div class="mio-viewer-note">{this.vaccination.note}</div>
              </td>
            </tr>
          )}
        </table>
        {this.showOverlay && (
          <div class="mio-viewer-overlay">
            <div class="mio-viewer-practitioner ">
              <mio-viewer-impfpass-practitioner
                practitioner={this.vaccination.attesterName}
                adress={this.vaccination.adress}
                organisationName={this.vaccination.organisationName}
                qualification={this.vaccination.qualification}
              />
            </div>
          </div>
        )}
      </Host>
    );
  }
}
