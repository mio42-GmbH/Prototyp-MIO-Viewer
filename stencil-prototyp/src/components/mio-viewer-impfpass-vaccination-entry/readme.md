# mio-viewer-impfpass-vaccination-entry



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type                    | Default     |
| ------------- | -------------- | ----------- | ----------------------- | ----------- |
| `diseaseName` | `disease-name` |             | `string`                | `undefined` |
| `vaccination` | --             |             | `VaccinationRecordData` | `undefined` |


## Dependencies

### Used by

 - [mio-viewer-impfpass-record-list](../mio-viewer-impfpass-record-list)

### Depends on

- [mio-viewer-impfpass-practitioner](../mio-viewer-impfpass-practitioner)

### Graph
```mermaid
graph TD;
  mio-viewer-impfpass-vaccination-entry --> mio-viewer-impfpass-practitioner
  mio-viewer-impfpass-record-list --> mio-viewer-impfpass-vaccination-entry
  style mio-viewer-impfpass-vaccination-entry fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
