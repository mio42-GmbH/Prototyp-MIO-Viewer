# mio-viewer-impfpass-record-overview



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute          | Description | Type                                                                           | Default     |
| --------------------- | ------------------ | ----------- | ------------------------------------------------------------------------------ | ----------- |
| `recordDataByDisease` | --                 |             | `{ [disease: string]: { records: RecordData[]; latestRecordDate: string; }; }` | `undefined` |
| `selectedDisease`     | `selected-disease` |             | `string`                                                                       | `undefined` |


## Events

| Event             | Description | Type                  |
| ----------------- | ----------- | --------------------- |
| `diseaseSelected` |             | `CustomEvent<string>` |


## Dependencies

### Used by

 - [mio-viewer-impfpass](../mio-viewer-impfpass)

### Depends on

- [mio-viewer-impfpass-list-sort-indicator](../mio-viewer-impfpass-list-sort-indicator)

### Graph
```mermaid
graph TD;
  mio-viewer-impfpass-record-overview --> mio-viewer-impfpass-list-sort-indicator
  mio-viewer-impfpass --> mio-viewer-impfpass-record-overview
  style mio-viewer-impfpass-record-overview fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
