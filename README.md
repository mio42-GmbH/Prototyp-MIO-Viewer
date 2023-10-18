# Anzeige-MIO-Impfpass (Deutsch)

Dies ist das Repository für den JavaScript Prototypen für die Anzeige des MIO Impfpass.
Es handelt sich bei diesem Prototypen um eine Webkomponente basierend auf den aktuellen Webstandards HTML5 und JavaScript, welche MIO-Daten aus Base64-codierten Datenstring einliest.
Für das Einlesen der MIO-Daten wird intern der MIOParser genutzt.
Falls eine flexiblere Nutzung bzw. Einbindung im System gewünscht wird, so können ebenfalls die Unterkomponenten einzeln genutzt werden.
Diese werden als eine Bibliothek von Webkomponenten ebenfalls mitgeliefert.

Für die Entwicklung der Webkomponenten wird TypeScript mit StencilJS genutzt.

Diese README soll einen Überblick über die wichtigsten technischen Informationen zur Nutzung der App geben.
Weitere Informationen finden Sie in unserer [Storybook-Dokumentation](https://mio42-gmbh.github.io/Anzeige-MIO-Impfpass)

## Verwendete Bibliotheken / Pakete (Dependencies)

Dependencies der Komponenten:
- [StencilJS](http://stenciljs.com) 4.0
- [MIO Parser](https://github.com/kassenaerztliche-bundesvereinigung/MIOParser) 1.8

Die Webkomponenten werden von StencilJS in eine Bibliothek von Standard-Webkomponenten (HTML5 + JS) kompiliert und können als solche genutzt werden.

Dependencies für die Entwicklung:
- NodeJs 18 LTS
- TypeScript 4.9
- [Jest](https://jestjs.io) 27
- Jest-CLI 27
- Puppeteer 20

Die technische Dokumentation wurde mit [StorybookJS](https://storybook.js.org/docs/react/get-started/install/) umgesetzt.

Für eine komplette Übersicht der Peer-Dependencies der einzelnen Bibliotheken liefern wir die `stencil-prototyp/package-lock.json` mit.

## Nutzung der Viewer Webkomponente als Blackbox (Production Build) 

Die einfachste Nutzung des MIO Viewer ist über die statische Webkomponente `mio-viewer-impfpass`.
Dafür enthält das Repository den Production Build des Prototypen in der ZIP-Datei: `mio-viewer-impfpass-build.zip`
Diese Webkomponente kann wie herkömmliche Komponenten in einer Web-App bzw. Webseiten eingebunden oder gehostet werden. Eine Einbindung in andere Stacks / Systemumgebungen ist über entsprechende Web-Interfaces ebenfalls möglich.

**Beispielintegrationen sind im Ordner `example-integrations` enthalten. Wir werden diese fortlaufend erweitern.**

### Übergeben der MIO-Daten

In der ZIP-Datei ist neben den Komponenten ein MIO-Beispiel als Base64-codierter String in `example-mio.txt` enthalten.
Dieser String kann der Webkomponente als Wert für die Property `base-6-4-fhir-data` folgenderweise übergeben werden:

```
<mio-viewer-impfpass base-6-4-fhir-data="<base64StringGoesHere>" />
```

Die Webkomponente erwartet als Eingabe ein FHIR-Bundle konform zum Profil `KBV_PR_MIO_Vaccination_Bundle_Entry`. Dieses kann von dem Primärsystem in eigener Weise geladen und in Base64 codiert werden und dann an die Komponenten übergeben werden.

### Anpassen der Darstellung / des Designs

Das Design kann per CSS-Variablen konfiguriert werden.
Die aktuelle Auswahl und Standardwerte der angebotenen CSS-Variable finden Sie in `stencil-prototyp/src/global.css`

## Nutzung der Unterkomponenten als Webkomponenten

Die Viewer-Komponente agiert als eine übergreifende Rahmenkomponente, welche Unterkomponenten enthält.
Diese wurden ebenfalls mit StencilJS erstellt und können einzeln genutzt oder angepasst werden.
Die Verwendung der Komponenten ist equivalent zur Verwendung der Viewer-Komponente selbst.
Die genauen Properties, Parameter und Funktionen der Unterkomponenten, finden Sie in unserer [technischen Dokumentation](https://storybook.js.org/docs/react/get-started/install/)


## Weiterentwicklung / Development Setup

Die folgenden Abschnitte sind vor allem relevant für die aktive Entwicklung / Build der Komponenten von einer eigenen Maschine.

### NodeJS

Installieren Sie eine aktuelle Version von NodeJs. Wir empfehlen den Download der LTS-Version von der [offiziellen Webseite](https://nodejs.org/en/)

### Installieren der Dependencies

Navigieren Sie mit dem Terminal / der Kommandozeile in den `stencil-prototyp` Ordner.
Führen Sie anschließend einmalig `npm install` aus.
Es sollten alle benötigten Pakete installiert werden.

### Editor

Für die Frontend-Entwicklung empfehlen wir die Verwendung von [VSCode](https://code.visualstudio.com/download)

### VS Code Erweiterungen (Empfohlen)

Für einheitlichen Code-Stil empfehlen wir die Nutzung von Formatierungs- und Linting-Plugins.
Bitte installieren Sie [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
Bitte installieren Sie [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
Um Prettier automatisch als Formatierer zu verwenden, ist die Datei `.vscode/settings.json` im Repository enthalten.
Regeln für das Zusammenspiel von Prettier und ESLint werden in der `frontend/package.json` konfiguriert

### Lokales Ausführen der Applikation

Öffnen Sie ein Terminal / eine Kommandozeile und navigieren Sie in den Ordner `stencil-prototyp`.
Falls noch nicht geschehen, installieren Sie einmalig alle Dependencies mit `npm install`.
Starten Sie den Entwicklungsserver mit `npm start`

Die StencilJS-App sollte auf `localhost:3333` verfügbar sein.

### Entwicklung - Arbeitsablauf

Öffnen Sie das gesamte Repository in Ihrem Editor.
Zum Ausführen der Applikation, folgen Sie dem vorherigen Abschnitt.

Wenn Sie die Dateien bearbeiten, sollte die Web-Applikation in Ihrem Browser automatisch aktualisiert werden.

Sie können neue Komponenten über das Terminal erstellen, indem Sie `stencil generate` verwenden.
Für weitere Informationen empfehlen wir die Dokumentation der [Stencil CLI](https://stenciljs.com/docs/cli)

### Erzeugen der Statischen Anwendungsdateien (Production Build)

Aktuell werden für den Build durch den MIOParser 6GB benötigt.
Wir arbeiten an der Optimierung dessen.
Führen Sie `npm --max_old_space_size=6144 run build` aus.
Wir haben alle `output_targets` von StencilJS aktiviert: `dist`, `dist-custom-elements`, `www` und hoffen damit Flexibilität in der Nutzung zu ermöglichen.
Mehr Informationen zu den Output Targets hier: https://stenciljs.com/docs/output-targets
Die Dateien werden in den `stencil-prototyp/dist` sowie in den `stencil-prototyp/www` Ordner erzeugt.

# Anzeige-MIO-Impfpass (English)

This is the repository for the JavaScript prototype for the visualization of the MIO Vaccination Pass.
This prototype consists of a web component based on current HTML5 and JavaScript web standards reading MIO data from a base64 encoded data string.
The data is read using the MIO Parser package.
In case you require more flexibility in the use or integration in your system, you can also use the sub-components individually.
These are also delivered as a library of web components.

For the development of the webcomponents, we used TypeScript and StencilJS

This README shall present an overview of the most important technical information for using the application.
You can find further information and guides in our [storybook documentation](https://mio42-gmbh.github.io/Anzeige-MIO-Impfpass)

## Used Libraries / Packages (Dependencies)

Dependencies of the webcomponents:
- [StencilJS](http://stenciljs.com) 4.0
- [MIO Parser](https://github.com/kassenaerztliche-bundesvereinigung/MIOParser) 1.8

The webcomponents are being compiled by StencilJS to a library of standard webcomponents (HTML5 + JS) and can be used as such.

Dependencies for development:
- NodeJs 18 LTS
- TypeScript 4.9
- [Jest](https://jestjs.io) 27
- Jest-CLI 27
- Puppeteer 20

The technical documentation was realized with [StorybookJS](https://storybook.js.org/docs/react/get-started/install/).

For a complete overview of peer dependencies of libraries and packages, please refer to the `stencil-prototyp/package-lock.json`.

## Using the Viewer Webcomponent as a Blackbox (Production Build)

The most straightforward use of the application is via the static webcomponent `mio-viewer-impfpass`.
Therefore the repository contains the production build in the zip-file: `mio-viewer-impfpass-build.zip`
This webcomponent can be integrated or hosted in webapps or webpages like regular webcomponents. An integration into other tech stacks or systems is also possible via web interfaces.

**Example integrations are available in the folder `example-integrations`. We will extend these over time.**

### Handover of MIO Data

Within the zip-file, apart from the components, you can find a MIO example as a base64-encoded string in `example-mio.txt`.
This string can be handed to the webcomponent as a value for the property `base-6-4-fhir-data` in the following manner:
```
<mio-viewer-impfpass base-6-4-fhir-data="<base64StringGoesHere>" />
```

The webcomponent expects a FHIR bundle conforming with the profile `KBV_PR_MIO_Vaccination_Bundle_Entry` as input. This can be loaded and transformed to base64 by the integrating system in a custom manner and handed to the webcomponent.

### Adapting the Design / Theme

The design can be adapted using CSS-variables.
The currently offered variables and their default values can be found in:
`stencil-prototyp/src/global.css`

## Using the Subcomponents as Webcomponents

The viewer component acts as an overarching component, containing further subcomponents.
These have also been created using StencilJS and can be used and adapted individually.
The consumption of these components is equivalent to using the overarching viewer component.
You can find the specific properties, parameters and functionalities of the subcomponents in our [technical Documentation](https://storybook.js.org/docs/react/get-started/install/)

## Development Setup

The following sections are primarily targeted at development / building the components on your own machine.

### NodeJS

Install a recent version of NodeJs, we recommend downloading the LTS from [the official page](https://nodejs.org/en/)

### Installing the Dependencies

Using the terminal, navigate into the `stencil-prototyp` folder.
Afterwards run the following command: `npm install` .
All dependencies should be installed.

### Editor

For frontend development, we recommend using [VSCode](https://code.visualstudio.com/download).

### VS Code Extensions (Recommended)

For uniform coding style we recommend using formatting and linting-plugins in VS Code.
Please install [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
Please install [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
To automatically use Prettier as a formatter, the `.vscode/settings.json` file is included in the repository.
Rules for Prettier and ESLint to work together neatly are configured in the `frontend/package.json`

### Running the App Locally

Open a terminal and navigate into the `stencil-prototyp` folder.
If not done yet, install all dependencies using `npm install`
Start the development server using `npm start`

The StencilJS app should be available at `localhost:3333`.

### Development - Workflow

Open the complete repository in your editor.
To run the application, please follow the previous section.

When editing the files, the application running in the browser should update automatically.

You can create new components via the terminal by running `stencil generate` .
For further information, please refer to the documentation of [Stencil CLI](https://stenciljs.com/docs/cli)

### Generate Static Application Files (Production Build)

Currently, building the components from source requires 6GB due to the bundling of the MIOParser.
We are working on optimization for this.
To build the components, run `npm --max_old_space_size=6144 run build`.
We activated all `output_targets` of StencilJS: `dist`, `dist-custom-elements`, `www` with the hope of offering the maximum flexibility for you.
More on the output targets can be found here: https://stenciljs.com/docs/output-targets
The files are being generated into the `stencil-prototyp/dist` as well as the `stencil-prototyp/www` folder.
