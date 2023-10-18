import {
  Component,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  getAssetPath,
} from "@stencil/core";
import { RecordData, ConditionRecordData } from "../../utils/recordData";

const closeLogoPath = getAssetPath("../../assets/close_cross.svg");

@Component({
  tag: "mio-viewer-impfpass-record-list",
  styleUrl: "mio-viewer-impfpass-record-list.css",
  shadow: true,
  assetsDirs: ["../../assets"],
})
export class MioViewerImpfpassRecordList {
  @Prop() recordDetails: RecordData[];
  @Prop() diseaseName: string;

  @Event() detailsHidden: EventEmitter;

  render() {
    return (
      <Host>
        <div class="mio-viewer-impfpass-header">
          {this.diseaseName}
          <div class="mio-viewer-impfpass-closeLogo">
            <img
              src={closeLogoPath}
              onClick={() => this.detailsHidden.emit()}
            />
          </div>
        </div>
        <div id="mio-viewer-impfpass-record-list">
          {this.recordDetails.map(record => {
            if (record instanceof ConditionRecordData) {
              return (
                <div class="mio-viewer-impfpass-record-list-entry">
                  <mio-viewer-impfpass-condition-entry
                    condition={record}
                    diseaseName={this.diseaseName}
                  />
                </div>
              );
            } else {
              return (
                <div class="mio-viewer-impfpass-record-list-entry">
                  <mio-viewer-impfpass-vaccination-entry
                    vaccination={record}
                    diseaseName={this.diseaseName}
                  />
                </div>
              );
            }
          })}
        </div>
      </Host>
    );
  }
}
