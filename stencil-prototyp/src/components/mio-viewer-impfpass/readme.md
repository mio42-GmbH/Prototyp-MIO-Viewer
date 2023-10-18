# mio-viewer-impfpass



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute            | Description | Type                 | Default     |
| ---------------- | -------------------- | ----------- | -------------------- | ----------- |
| `base64FhirData` | `base-6-4-fhir-data` |             | `string \| string[]` | `undefined` |


## Dependencies

### Depends on

- [mio-viewer-impfpass-header](../mio-viewer-impfpass-header)
- [mio-viewer-impfpass-dismissable-card](../mio-viewer-impfpass-dismissable-card)
- [mio-viewer-impfpass-filter-menu](../mio-viewer-impfpass-filter-menu)
- [mio-viewer-impfpass-record-overview](../mio-viewer-impfpass-record-overview)
- [mio-viewer-impfpass-record-list](../mio-viewer-impfpass-record-list)

### Graph
```mermaid
graph TD;
  mio-viewer-impfpass --> mio-viewer-impfpass-header
  mio-viewer-impfpass --> mio-viewer-impfpass-dismissable-card
  mio-viewer-impfpass --> mio-viewer-impfpass-filter-menu
  mio-viewer-impfpass --> mio-viewer-impfpass-record-overview
  mio-viewer-impfpass --> mio-viewer-impfpass-record-list
  mio-viewer-impfpass-header --> mio-viewer-impfpass-dismissable-card
  mio-viewer-impfpass-header --> mio-viewer-impfpass-extra-menu
  mio-viewer-impfpass-record-overview --> mio-viewer-impfpass-list-sort-indicator
  mio-viewer-impfpass-record-list --> mio-viewer-impfpass-condition-entry
  mio-viewer-impfpass-record-list --> mio-viewer-impfpass-vaccination-entry
  mio-viewer-impfpass-condition-entry --> mio-viewer-impfpass-condition-information
  mio-viewer-impfpass-vaccination-entry --> mio-viewer-impfpass-practitioner
  style mio-viewer-impfpass fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
