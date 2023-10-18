# mio-viewer-impfpass-record-list



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute      | Description | Type           | Default     |
| --------------- | -------------- | ----------- | -------------- | ----------- |
| `diseaseName`   | `disease-name` |             | `string`       | `undefined` |
| `recordDetails` | --             |             | `RecordData[]` | `undefined` |


## Events

| Event           | Description | Type               |
| --------------- | ----------- | ------------------ |
| `detailsHidden` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [mio-viewer-impfpass](../mio-viewer-impfpass)

### Depends on

- [mio-viewer-impfpass-condition-entry](../mio-viewer-impfpass-condition-entry)
- [mio-viewer-impfpass-vaccination-entry](../mio-viewer-impfpass-vaccination-entry)

### Graph
```mermaid
graph TD;
  mio-viewer-impfpass-record-list --> mio-viewer-impfpass-condition-entry
  mio-viewer-impfpass-record-list --> mio-viewer-impfpass-vaccination-entry
  mio-viewer-impfpass-condition-entry --> mio-viewer-impfpass-condition-information
  mio-viewer-impfpass-vaccination-entry --> mio-viewer-impfpass-practitioner
  mio-viewer-impfpass --> mio-viewer-impfpass-record-list
  style mio-viewer-impfpass-record-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
