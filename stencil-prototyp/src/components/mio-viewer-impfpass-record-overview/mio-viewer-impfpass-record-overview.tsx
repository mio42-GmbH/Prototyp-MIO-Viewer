import {
  Component,
  Host,
  h,
  Prop,
  State,
  Event,
  EventEmitter,
  Watch,
} from "@stencil/core";
import {
  DiseaseRecordSummary,
  RecordDataByDisease,
  getDiseaseRecordSummaries,
} from "../../utils/recordData";

enum SortMode {
  LatestRecord,
  RecordCount,
  TargetDisease,
}

function getSummaryCompareFn(
  sortMode: SortMode,
): (a: DiseaseRecordSummary, b: DiseaseRecordSummary) => number {
  switch (sortMode) {
    case SortMode.LatestRecord:
      return (a, b) =>
        new Date(b.latestRecordDate).getTime() - new Date(a.latestRecordDate).getTime();
    case SortMode.RecordCount:
      return (a, b) => b.recordCount - a.recordCount;
    case SortMode.TargetDisease:
      return (a, b) => a.disease.localeCompare(b.disease);
    default:
      return (_0, _1) => 0;
  }
}

// ==============================================

@Component({
  tag: "mio-viewer-impfpass-record-overview",
  styleUrl: "mio-viewer-impfpass-record-overview.css",
  shadow: true,
})
export class MioViewerImpfpassRecordOverview {
  @Prop() recordDataByDisease: RecordDataByDisease;
  @Prop() selectedDisease: string;

  @State() sortMode: SortMode = SortMode.LatestRecord;
  @State() sortReversed: boolean = false;
  sortedRecordSummaries: DiseaseRecordSummary[] = [];

  @Event() diseaseSelected: EventEmitter<string>;

  changeSortMode(newSortMode: SortMode) {
    if (newSortMode === this.sortMode) {
      this.sortReversed = !this.sortReversed;
      this.sortedRecordSummaries.reverse();
    } else {
      this.sortReversed = false;
      this.sortedRecordSummaries.sort(getSummaryCompareFn(newSortMode));
      this.sortMode = newSortMode;
    }
  }

  @Watch("recordDataByDisease")
  setupSortedRecordSummaries() {
    this.sortedRecordSummaries = getDiseaseRecordSummaries(this.recordDataByDisease);
    this.sortedRecordSummaries.sort(getSummaryCompareFn(this.sortMode))
    if (this.sortReversed) this.sortedRecordSummaries.reverse();
  }

  componentWillLoad() {
    this.setupSortedRecordSummaries();
  }

  render() {
    return (
      <Host>
        <table id="mio-viewer-container">
          <thead>
            <tr id="mio-viewer-overview-head">
              <th
                class="mio-viewer-th-targetdisease"
                onClick={_ => {
                  this.changeSortMode(SortMode.TargetDisease);
                }}
              >
                Impfrelevante Krankheiten
                <mio-viewer-impfpass-list-sort-indicator
                  active={SortMode.TargetDisease === this.sortMode}
                  reversed={this.sortReversed}
                />
              </th>
              <th
                class="mio-viewer-th"
                onClick={_ => {
                  this.changeSortMode(SortMode.LatestRecord);
                }}
              >
                Letzter Eintrag
                <mio-viewer-impfpass-list-sort-indicator
                  active={SortMode.LatestRecord === this.sortMode}
                  reversed={this.sortReversed}
                />
              </th>
              <th
                class="mio-viewer-th"
                onClick={_ => {
                  this.changeSortMode(SortMode.RecordCount);
                }}
              >
                Einträge
                <mio-viewer-impfpass-list-sort-indicator
                  active={SortMode.RecordCount === this.sortMode}
                  reversed={this.sortReversed}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {this.sortedRecordSummaries.map(summary => (
              <tr
                class={
                  this.selectedDisease === summary.disease
                    ? "mio-viewer-overview-body-selected"
                    : "mio-viewer-overview-body"
                }
                onClick={() => this.diseaseSelected.emit(summary.disease)}
              >
                <td class="mio-viewer-overview-td">{summary.disease}</td>
                <td class="mio-viewer-overview-lr">
                  {new Date(summary.latestRecordDate).toLocaleDateString("de-DE", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </td>
                <td class="mio-viewer-overview-rc">{summary.recordCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Host>
    );
  }
}
