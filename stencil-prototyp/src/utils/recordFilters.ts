import {
  ConditionRecordData,
  RecordData,
  RecordDataByDisease,
  VaccinationRecordData,
  getLatestRecordDataDate,
} from "./recordData";

export enum TypeFilter {
  vaccination,
  illness,
  antibodies,
}

export enum LifePhaseFilter {
  infant,
  toddler,
  child,
}

export type FilterCounts = {
  typeFilters: { [filter in TypeFilter]: number };
  lifePhaseFilters: { [filter in LifePhaseFilter]: number };
};

export type FilterStates = {
  typeFilters: { [filter in TypeFilter]: boolean };
  lifePhaseFilters: { [filter in LifePhaseFilter]: boolean };
};

export const initialFilterStates: FilterStates = {
  typeFilters: {
    [TypeFilter.vaccination]: false,
    [TypeFilter.illness]: false,
    [TypeFilter.antibodies]: false,
  },
  lifePhaseFilters: {
    [LifePhaseFilter.infant]: false,
    [LifePhaseFilter.toddler]: false,
    [LifePhaseFilter.child]: false,
  },
};

export type RecordFilterFunc = (record: RecordData) => boolean;

type FilterDict = {
  typeFilters: { [filter in TypeFilter]: RecordFilterFunc };
  lifePhaseFilters: { [filter in LifePhaseFilter]: RecordFilterFunc };
};

const baseFilters: FilterDict = {
  typeFilters: {
    [TypeFilter.vaccination]: record => {
      return record instanceof VaccinationRecordData;
    },
    [TypeFilter.illness]: record => {
      return record instanceof ConditionRecordData;
    },
    [TypeFilter.antibodies]: () => {
      return false;
    },
  },
  lifePhaseFilters: {
    [LifePhaseFilter.infant]: () => {
      return false;
    },
    [LifePhaseFilter.toddler]: () => {
      return false;
    },
    [LifePhaseFilter.child]: () => {
      return false;
    },
  },
};

export type FilterMultiList = RecordFilterFunc[][];

export function generateFilterMultiList(filterStates: FilterStates): FilterMultiList {
  return [
    Object.entries(baseFilters.typeFilters)
      .filter(([filterName, _]) => filterStates.typeFilters[filterName])
      .map(([_, filter]) => filter),
    Object.entries(baseFilters.lifePhaseFilters)
      .filter(([filterName, _]) => filterStates.lifePhaseFilters[filterName])
      .map(([_, filter]) => filter),
  ];
}

export function applyRecordFilters(
  records: RecordDataByDisease,
  filterStates: FilterStates,
) {
  const filterMultiList = generateFilterMultiList(filterStates);

  const filteredData: RecordDataByDisease = {};
  for (const [disease, data] of Object.entries(records)) {
    const records = data.records.filter(record => {
      return filterMultiList.every(filterList => {
        if (filterList.length === 0) return true;
        return filterList.some(filter => filter(record));
      });
    });
    if (records.length > 0) {
      filteredData[disease] = {
        records: records,
        latestRecordDate: getLatestRecordDataDate(records),
      };
    }
  }
  return filteredData;
}

export function countFilteredRecords(records: RecordData[]): FilterCounts {
  return {
    typeFilters: {
      [TypeFilter.vaccination]: records.filter(
        baseFilters.typeFilters[TypeFilter.vaccination],
      ).length,
      [TypeFilter.illness]: records.filter(baseFilters.typeFilters[TypeFilter.illness])
        .length,
      [TypeFilter.antibodies]: records.filter(
        baseFilters.typeFilters[TypeFilter.antibodies],
      ).length,
    },
    lifePhaseFilters: {
      [LifePhaseFilter.infant]: records.filter(
        baseFilters.lifePhaseFilters[LifePhaseFilter.infant],
      ).length,
      [LifePhaseFilter.toddler]: records.filter(
        baseFilters.lifePhaseFilters[LifePhaseFilter.toddler],
      ).length,
      [LifePhaseFilter.child]: records.filter(
        baseFilters.lifePhaseFilters[LifePhaseFilter.child],
      ).length,
    },
  };
}
