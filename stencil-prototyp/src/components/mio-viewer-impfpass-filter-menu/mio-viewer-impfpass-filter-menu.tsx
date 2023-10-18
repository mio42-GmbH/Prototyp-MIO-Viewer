import { Component, Host, h, Event, EventEmitter, Prop } from "@stencil/core";
import {
  FilterStates,
  FilterCounts,
  TypeFilter,
  LifePhaseFilter,
} from "../../utils/recordFilters";

@Component({
  tag: "mio-viewer-impfpass-filter-menu",
  styleUrl: "mio-viewer-impfpass-filter-menu.css",
  shadow: true,
})
export class MioViewerImpfpassFilterMenu {
  @Prop() initialFilterStates: FilterStates;
  filterStates: FilterStates;

  @Prop() filterCounts: FilterCounts;

  @Event() filtersApplied: EventEmitter<FilterStates>;

  componentWillLoad() {
    this.filterStates = Object.assign({}, this.initialFilterStates);
  }

  generateTypeFilterCheckbox(filter: TypeFilter, label: string) {
    return (
      <div class="mio-viewer-filter-input">
        <input
          id={TypeFilter[filter]}
          type="checkbox"
          class="mio-viewer-filter-checkbox"
          onInput={_ =>
            (this.filterStates.typeFilters[filter] =
              !this.filterStates.typeFilters[filter])
          }
          checked={this.filterStates.typeFilters[filter]}
        />
        <label htmlFor={TypeFilter[filter]}>
          {label}&#032;({this.filterCounts.typeFilters[filter]})
        </label>
      </div>
    );
  }

  generateLifePhaseFilterCheckbox(filter: LifePhaseFilter, label: string) {
    return (
      <div class="mio-viewer-filter-input">
        <input
          id={LifePhaseFilter[filter]}
          type="checkbox"
          class="mio-viewer-filter-checkbox"
          onInput={_ =>
            (this.filterStates.lifePhaseFilters[filter] =
              !this.filterStates.lifePhaseFilters[filter])
          }
          checked={this.filterStates.lifePhaseFilters[filter]}
        />
        <label htmlFor={LifePhaseFilter[filter]}>
          {label}&#032;({this.filterCounts.lifePhaseFilters[filter]})
        </label>
      </div>
    );
  }

  render() {
    return (
      <Host>
        <div id="mio-viewer-filter-reset-link">x Zurücksetzen (nicht implementiert)</div>
        <div class="mio-viewer-filter-type">
          <div class="mio-viewer-filter-header">Eintragstyp</div>
          {this.generateTypeFilterCheckbox(TypeFilter.vaccination, "Impfungen")}
          {this.generateTypeFilterCheckbox(TypeFilter.illness, "Erkrankungen")}
          {this.generateTypeFilterCheckbox(TypeFilter.antibodies, "Antikörpernachweis")}
        </div>
        <div class="mio-viewer-filter-life-phase">
          <div class="mio-viewer-filter-header">Lebensphase (nicht implementiert)</div>
          {this.generateLifePhaseFilterCheckbox(LifePhaseFilter.infant, "Säugling")}
          {this.generateLifePhaseFilterCheckbox(LifePhaseFilter.toddler, "Kleinkind")}
          {this.generateLifePhaseFilterCheckbox(LifePhaseFilter.child, "Kind")}
        </div>
        <button
          class="mio-viewer-filter-button"
          onClick={_ => this.filtersApplied.emit(this.filterStates)}
        >
          Apply
        </button>
      </Host>
    );
  }
}
