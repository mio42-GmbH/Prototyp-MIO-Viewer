import { Component, Host, h, Prop, State, Watch, getAssetPath } from "@stencil/core";
import { PatientDetails } from "../../utils/patientData";

const appLogoPath = getAssetPath("../../assets/Logo_Impfpass.svg");
const menuIconPath = getAssetPath("../../assets/menu.svg");

@Component({
  tag: "mio-viewer-impfpass-header",
  styleUrl: "mio-viewer-impfpass-header.css",
  shadow: true,
  assetsDirs: ["../../assets"],
})
export class MioViewerImpfpassHeader {
  @Prop() patient: PatientDetails | undefined;

  @State() showExtraMenu: boolean = false;

  @Watch("patient")
  watchPatientHandler(
    newValue: PatientDetails | undefined,
    oldValue: PatientDetails | undefined,
  ) {
    if (newValue !== oldValue) {
      this.showExtraMenu = false;
    }
  }

  get patientGender(): string {
    switch (this.patient.gender) {
      case "male":
        return "männlich";
      case "female":
        return "weiblich";
      case "other":
        return "divers";
      case "unknown":
      default:
        return "unbekannt";
    }
  }

  render() {
    return (
      <Host>
        <div id="mio-viewer-header-app-logo">
          <img src={appLogoPath} />
        </div>
        <div id="mio-viewer-header-main">
          {this.patient && (
            <div id="mio-viewer-header-patient">
              <div id="mio-viewer-header-title">{this.patient.fullName}</div>
              <div id="mio-viewer-header-subtitle">
                <span class="mio-viewer-header-detail">
                  <span class="mio-viewer-header-detail-description">Gebutsdatum:</span>
                  <span class="mio-viewer-header-detail-content">
                    {this.patient.birthDate} ({this.patient.age} Jahre)
                  </span>
                </span>
                <span class="mio-viewer-header-detail">
                  <span class="mio-viewer-header-detail-description">Geschlecht:</span>
                  <span class="mio-viewer-header-detail-content">
                    {this.patientGender}
                  </span>
                </span>
                <span class="mio-viewer-header-detail">
                  <span class="mio-viewer-header-detail-description">
                    Versichertennummer:
                  </span>
                  <span class="mio-viewer-header-detail-content">
                    {this.patient.gkv}
                  </span>
                </span>
              </div>
            </div>
          )}
          <div id="mio-viewer-extra-menu">
            <img
              src={menuIconPath}
              onClick={() => {
                this.showExtraMenu = !this.showExtraMenu;
              }}
            />
            {this.showExtraMenu && (
              <mio-viewer-impfpass-dismissable-card
                dismissMenuCallback={() => {
                  this.showExtraMenu = false;
                }}
              >
                <mio-viewer-impfpass-extra-menu />
              </mio-viewer-impfpass-dismissable-card>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
