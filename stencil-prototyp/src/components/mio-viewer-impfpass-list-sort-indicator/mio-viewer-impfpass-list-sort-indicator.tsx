import { Component, Host, h, Prop, getAssetPath } from "@stencil/core";

const upArrowInactivePath = getAssetPath("../../assets/arrow_drop_up_inactive.svg");
const upArrowActivePath = getAssetPath("../../assets/arrow_drop_up_active.svg");
const downArrowInactivePath = getAssetPath("../../assets/arrow_drop_down_inactive.svg");
const downArrowActivePath = getAssetPath("../../assets/arrow_drop_down_active.svg");

@Component({
  tag: "mio-viewer-impfpass-list-sort-indicator",
  styleUrl: "mio-viewer-impfpass-list-sort-indicator.css",
  shadow: true,
  assetsDirs: ["../../assets"],
})
export class MioViewerImpfpassListSortIndicator {
  @Prop() active: boolean;
  @Prop() reversed: boolean;

  get upArrowPath(): string {
    if (this.active && this.reversed) {
      return upArrowActivePath;
    }
    return upArrowInactivePath;
  }

  get downArrowPath(): string {
    if (this.active && !this.reversed) {
      return downArrowActivePath;
    }
    return downArrowInactivePath;
  }

  render() {
    return (
      <Host>
        <img
          id="mio-viewer-img"
          src={this.upArrowPath}
        />
        <img
          id="mio-viewer-img"
          src={this.downArrowPath}
        />
      </Host>
    );
  }
}
