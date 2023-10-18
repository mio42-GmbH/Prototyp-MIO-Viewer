import {
  Component,
  Host,
  h,
  Prop,
  getAssetPath,
  Event,
  EventEmitter,
} from "@stencil/core";

const closeIcon = getAssetPath("../../assets/close_cross.svg");

@Component({
  tag: "mio-viewer-impfpass-practitioner",
  styleUrl: "mio-viewer-impfpass-practitioner.css",
  shadow: true,
  assetsDirs: ["../../assets"],
})
export class MioViewerImpfpassPractitioner {
  @Prop() practitioner: string;
  @Prop() adress: string[];
  @Prop() organisationName: string;
  @Prop() qualification: string;
  @Event() closePractitioner: EventEmitter;

  render() {
    return (
      <Host>
        <div class="mio-viewer-header">
          <div class="mio-viewer-head">
            {" "}
            {this.practitioner}
            <br />{" "}
          </div>
          <div class="mio-viewer-closeIcon">
            <img
              src={closeIcon}
              onClick={() => {
                this.closePractitioner.emit();
              }}
            />
          </div>
        </div>
        <div class="mio-viewer-secondHead">{this.qualification}</div>
        <div class="mio-viewer-container">
          <div class="mio-viewer-column">
            <div class="mio-viewer-practitionerTitel">Einrichtung</div>
            <br />
            <div class="mio-viewer-textHead">
              Name
              <br />
              <div class="mio-viewer-text">{this.organisationName}</div>
              <br />
              Adresse
              <br />
              <div class="mio-viewer-text">
                {this.adress[0]}
                <br />
                {this.adress[1]} {this.adress[2]}
                <br />
              </div>
            </div>
          </div>
          <div class="mio-viewer-column">
            <div class="mio-viewer-practitionerTitel">Kontakt</div>
            <br />
            <div class="mio-viewer-textHead">
              Telefon
              <br />
              <div class="mio-viewer-text">-</div>
              <br />
              Email
              <br />
              <div class="mio-viewer-text">
                -
                <br />
              </div>
            </div>
          </div>
        </div>
        <div class="mio-viewer-line">
          <hr />
        </div>

        <button
          class="mio-viewer-button"
          type="button"
          onClick={() => {
            this.closePractitioner.emit();
          }}
        >
          Schließen
        </button>
      </Host>
    );
  }
}
