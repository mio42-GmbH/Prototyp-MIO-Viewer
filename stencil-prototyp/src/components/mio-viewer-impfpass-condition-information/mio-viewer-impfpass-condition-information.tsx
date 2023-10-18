import { Component, Host, h, getAssetPath, Prop } from "@stencil/core";

const infoBox = getAssetPath("../../assets/infoBox.svg");
@Component({
  tag: "mio-viewer-impfpass-condition-information",
  styleUrl: "mio-viewer-impfpass-condition-information.css",
  shadow: true,
  assetsDirs: ["../../assets"],
})
export class MioViewerInformation {
  @Prop() infoText: string;
  @Prop() infoHead: string;

  render() {
    return (
      <Host>
        <div class="mio-viewer-infoBox">
          <div class="mio-viewer-infoBoxTitel">{this.infoHead}</div>
          <div class="mio-viewer-textInfoBox">{this.infoText}</div>
        </div>
        <div>
          <img
            class="mio-viewer-infoBoxArrow"
            src={infoBox}
          />
        </div>
      </Host>
    );
  }
}
