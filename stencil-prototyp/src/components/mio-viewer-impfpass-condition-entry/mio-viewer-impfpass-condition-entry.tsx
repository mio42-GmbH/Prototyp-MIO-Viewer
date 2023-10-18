import {
  Component,
  Host,
  h,
  Prop,
  State,
  Watch,
  getAssetPath,
  Listen,
  Event,
  EventEmitter,
  Element,
} from "@stencil/core";
import { ConditionRecordData } from "../../utils/recordData";

const chevronUpPath = getAssetPath("../../assets/chevron_up_blue.svg");
const chevronDownPath = getAssetPath("../../assets/chevron_down_blue.svg");
const illness = getAssetPath("../../assets/Icon_Illness.svg");
const info = getAssetPath("../../assets/SmallIcon_Info.svg");

@Component({
  tag: "mio-viewer-impfpass-condition-entry",
  styleUrl: "mio-viewer-impfpass-condition-entry.css",
  shadow: true,
  assetsDirs: ["../../assets"],
})
export class MioViewerImpfpassConditionEntry {
  @Prop() condition: ConditionRecordData;
  @Prop() diseaseName: string;

  @State() expanded: boolean = false;
  @State() showInformation: boolean = false;
  @State() clicked: boolean = false;

  @Event() closeInformation: EventEmitter;

  @Watch("diseaseName")
  diseaseNameHandler(_0: string, _1: string) {
    this.expanded = false;
  }

  @Listen("closeInformation")
  hiddenInformation() {
    if (this.clicked && this.showInformation) {
      this.showInformation = false;
      this.clicked = false;
    }
  }

  @Element() cardElement: HTMLElement;

  @Listen("click", { target: "window" })
  outsideClickHandler(event: globalThis.Event) {
    for (let target of event.composedPath()) {
      if (!(target instanceof Node)) {
        continue;
      }
      if (this.cardElement.contains(target as HTMLElement)) {
        return;
      }
    }
    this.showInformation = false;
    this.clicked = false;
  }
  get expandLogoPath(): string {
    if (this.expanded) return chevronUpPath;

    return chevronDownPath;
  }
  stagelife(code: string) {
    let infoText: string;
    let infoHead: string;

    switch (code) {
      case "41847000":
        infoText = "ab Beginn des 19. Lebensjahres";
        infoHead = "Erwachsener";
        break;
      case "263659003":
        infoText = "ab Beginn des 13. bis zum vollendeten 18. Lebensjahres";
        infoHead = "Jugendlicher";
        break;
      case "255398004":
        infoText = "ab Beginn des 4. bis zum vollendeten 12. Lebensjahres";
        infoHead = "Kind";
        break;
      case "713153009":
        infoText = "ab Beginn des 13. Lebensmonat bis zum vollendeten 3. Lebensjahr";
        infoHead = "Kleinkind";
        break;
      case "3658006":
        infoText = "ab Beginn des 29. Lebenstages bis zum vollendeten 12. Lebensmonat";
        infoHead = "Säugling";
        break;
      case "255407002":
        infoText = "bis zum vollendeten 28. Lebenstag";
        infoHead = "Neugeborenes";
        break;
      case "271872005":
        infoText = "mit Beginn des 65. Lebensjahres";
        infoHead = "Ältere Person/ Senioren";
        break;
      default:
        infoText = "Es wurde keine Lebensphase angegeben";
        infoHead = "";
    }

    return [infoText, infoHead];
  }

  render() {
    return (
      <Host>
        <div
          class="mio-viewer-container"
          onClick={() => this.closeInformation.emit()}
        >
          <div class="mio-viewer-small-column">
            <img src={illness} />
          </div>
          <div class="mio-viewer-column">
            <div class="mio-viewer-textErkrankung">Erkrankung</div>
            <div class="mio-viewer-text">
              <span>Zeitraum:{this.stagelife(this.condition.stageOfLife)[1]}</span>
              <div class="mio-viewer-anchor-container">
                <img
                  class="mio-viewer-info"
                  src={info}
                  onMouseOver={() => {
                    this.showInformation = true;
                  }}
                  onMouseOut={() => {
                    if (!this.clicked) {
                      this.showInformation = false;
                    }
                  }}
                  onClick={event => {
                    event.stopPropagation();
                    this.showInformation = true;
                    this.clicked = true;
                  }}
                />

                {this.showInformation && (
                  <mio-viewer-impfpass-condition-information
                    class="mio-viewer-anchored"
                    infoText={this.stagelife(this.condition.stageOfLife)[0]}
                    infoHead={this.stagelife(this.condition.stageOfLife)[1]}
                  />
                )}
              </div>
            </div>
          </div>

          <br />
          <div class="mio-viewer-columnDetails mio-viewer-textDetails">
            Details
            <img
              class="mio-viewer-expandLogo"
              src={this.expandLogoPath}
              onClick={() => {
                this.expanded = !this.expanded;
              }}
            />
          </div>
        </div>

        {this.expanded && (
          <div class="mio-viewer-container">
            <div class="mio-viewer-small-column" />
            <div class="mio-viewer-columnDetailsExpanded  mio-viewer-textHead">
              Dokumentiert am
              <br />
              <div class="mio-viewer-text">
                {(this.condition.recordedDate &&
                  new Date(this.condition.recordedDate).toLocaleDateString("de-DE", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })) ||
                  "-"}
              </div>
            </div>

            <div class="mio-viewer-columnDetailsExpanded  mio-viewer-textHead">
              Quelle der Information
              <br />
              <div class="mio-viewer-text">{this.condition.provenance}</div>
            </div>
            <div class="mio-viewer-columnDetailsExpanded " />
          </div>
        )}
      </Host>
    );
  }
}
