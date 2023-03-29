# Anzeige-MIO-Impfpass (Deutsch)

Dies ist das Repository für den JavaScript SPA Prototypen für die Anzeige des MIO Impfpass.
Es handelt sich bei diesem Prototypen um eine ReactJs-App, welche MIO-Daten aus statischen XML-Dateien einliest.
Für das Einlesen der MIO-Daten wird intern der MIOParser genutzt, die Darstellung nutzt Bootstrap.

Diese README soll einen Überblick über die wichtigsten technischen Informationen zur Nutzung der App geben.
Weitere Informationen finden Sie in unserer [Storybook-Dokumentation](https://mio42-gmbh.github.io/Anzeige-MIO-Impfpass)

## Nutzung der Statischen App (Production Build) 

Die einfachste Nutzung der App ist über die statischen HTML, JS und CSS Dateien.
Dafür enthält das Repository den Production Build des Prototypen in der ZIP-Datei: mio-impfpass-anzeige-build.zip
Diese Dateien können wie herkömmliche Web-Apps bzw. Webseiten eingebunden oder gehostet werden.

### Lesen der MIO-Daten

In der ZIP-Datei sind neben der statischen App MIO-Beispieldateien im `data` Ordner enthalten.
Welche Dateien von der App gelesen werden sollen, kann in der `config.json` in folgendem Format angegeben werden:

```
{
    "XML_DATA": [
        "/path/to/MIO_Bundle1.xml",
        "/path/to/MIO_Bundle2.xml",
        ...
    ]
}
```

Somit können die Beispieldaten leicht ersetzt werden.

### Anpassen der Darstellung / des Designs

Ein konfigurierbares Design ist noch nicht umgesetzt, jedoch über CSS-Variablen für eine künftige Version vorgesehen.


## Ausführen und Entwicklung der React-App

Die Ressourcen der React-App befinden sich im Ordner `react_prototype`.
Die App verwendet TypeScript und folgt der Standardstruktur eines Vite-Projektes mit Komponenten, die mit `generate-react-cli` erstellt wurden.

### Verwendete Bibliotheken / Pakete (Dependencies)

Dependencies der App:
- React 18
- React-Bootstrap 2
- Bootstrap 5
- MIO Parser 1.8

Dependencies für die Entwicklung:
- NodeJs 18 LTS
- Vite 4
- TypeScript 4.9
- Generate React CLI 8
- ESLint 8 & Prettier 2
- SASS (CSS Pre-Processor)

Die technische Dokumentation wurde mit StorybookJS umgesetzt.

#### Dokumentation der verwendeten Bibliotheken / Pakete

- [Vite](https://vitejs.dev/guide) (für App-Setup, Development Server und Build) 
- [React Docs](https://react.dev)
- [React-Bootstrap](https://react-bootstrap.github.io/)
- [Bootstrap](https://getbootstrap.com/docs/5.2/getting-started/introduction/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Generate React CLI](https://github.com/arminbro/generate-react-cli)
- [MIO Parser](https://github.com/kassenaerztliche-bundesvereinigung/MIOParser)
- [StorybookJS](https://storybook.js.org/docs/react/get-started/install/)

### Technisches Setup

#### NodeJS

Installieren Sie eine aktuelle Version von NodeJs. Wir empfehlen den Download der LTS-Version von der [offiziellen Webseite](https://nodejs.org/en/)

#### Installieren der Dependencies

Navigieren Sie mit dem Terminal / der Kommandozeile in den `react_prototype` Ordner.
Führen Sie anschließend einmalig `npm install` aus.
Es sollten alle benötigten Pakete installiert werden.

#### Editor

Für die Frontend-Entwicklung empfehlen wir die Verwendung von [VSCode](https://code.visualstudio.com/download)

#### VS Code Erweiterungen (Empfohlen)

Für einheitlichen Code-Stil empfehlen wir die Nutzung von Formatierungs- und Linting-Plugins.
Bitte installieren Sie [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
Bitte installieren Sie [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
Um Prettier automatisch als Formatierer zu verwenden, ist die Datei `.vscode/settings.json` im Repository enthalten.
Regeln für das Zusammenspiel von Prettier und ESLint werden in der `frontend/package.json` konfiguriert

#### Browser Plugin (Empfohlen)

Wir empfehlen, das React Developer Tools Plugin für den Browser Ihrer Wahl zu installieren:

[React Developer Tools für Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
[React Developer Tools für Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools)

### Lokales Ausführen der Applikation

Öffnen Sie ein Terminal / eine Kommandozeile und navigieren Sie in den Repository Ordner (Oberstes Level, *nicht* im `react_prototype` Ordner).
Starten Sie einen HTTP-Datei-Server, z.B. via `npx http-server`.
Der HTTP-Datei-Server macht die MIO-Beispieldateien während der Entwicklung für die Applikation verfügbar.

Öffnen Sie ein zweites Terminal / eine zweite Kommandozeile und navigieren Sie in den `react_prototype` Ordner.
Falls noch nicht geschehen, installieren Sie einmalig alle Dependencies mit `npm install`.
Starten Sie den Entwicklungsserver mit `npm run dev`

Die React-App sollte auf einem lokalen Port verfügbar sein.

### Entwicklung - Arbeitsablauf

Öffnen Sie das gesamte Repository in Ihrem Editor.
Zum Ausführen der Applikation, folgen Sie dem vorherigen Abschnitt.

Wenn Sie die Dateien bearbeiten, sollte die Web-Applikation in Ihrem Browser automatisch aktualisiert werden.

Sie können neue Komponenten über das Terminal erstellen, indem Sie `npx generate-react-cli component MyComponent` verwenden.
Beim ersten Mal, müssen Sie möglicherweise `generate-react-cli` installieren.
Die neue Komponente wird in einem Ordner mit eigener SCSS- und TSX-Datei erstellt und kann dort bearbeitet werden.

### Erzeugen der Statischen Anwendungsdateien (Production Build)

Führen Sie `npm run build` aus.
Die Dateien werden in den `react_prototype/dist` Ordner erzeugt.
Standardmäßig werden die MIO-Beispieldateien in diesen Ordner kopiert.
Sie können diese aus dem `dist` Ordner löschen und die `config.json` für Ihre eigene Daten anpassen.

# Anzeige-MIO-Impfpass (English)

This is the repository for the JavaScript SPA prototype for the visualization of the MIO Vaccination Pass.
This prototype consists of a ReactJs application reading MIO data from static XML files.
The data is read using the MIO Parser package, the visualization is leveraging Bootstrap.

This README shall present an overview of the most important technical information for using the application.
You can find further information and guides in our [storybook documentation](https://mio42-gmbh.github.io/Anzeige-MIO-Impfpass)

## Using the Static App (Production Build)

The most straightforward use of the application is via the static build files (HTML, JS, CSS).
Therefore the repository contains the production build in the zip-file: mio-impfpass-anzeige-build.zip
These files can be used for hosting and integration like regular web-apps and websites.

### Reading the MIO Data

Within the zip-file, apart from the application data you can find MIO example data in the `data` folder.
Which files are to be read by the app can be configured in the `config.json` in the following format:

```
{
    "XML_DATA": [
        "/path/to/MIO_Bundle1.xml",
        "/path/to/MIO_Bundle2.xml",
        ...
    ]
}
```

The example data can thus easily be replaced

### Adapting the Design / Theme

A configurable theme is not yet implemented but planned in upcoming versions.

## Running and Developing the React App

The ressources of the react app are located inside the `react_prototype` folder.
The app uses TypeScript and follows the typical structure of a project set up with Vite.
The components are in separate folders, generated by `generate-react-cli`.

### Used Libraries / Packages (Dependencies)

Dependencies of the app:
- React 18
- React-Bootstrap 2
- Bootstrap 5
- MIO Parser 1.8

Dependencies for development:
- NodeJs 18 LTS
- Vite 4
- TypeScript 4.9
- Generate React CLI 8
- ESLint 8 & Prettier 2
- SASS (CSS Pre-Processor)

The technical documentation is made available using StorybookJS.

#### Documentation on the used Libraries / Packages

- [Vite](https://vitejs.dev/guide) (for app setup, development server and build) 
- [React Docs](https://react.dev)
- [React-Bootstrap](https://react-bootstrap.github.io/)
- [Bootstrap](https://getbootstrap.com/docs/5.2/getting-started/introduction/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Generate React CLI](https://github.com/arminbro/generate-react-cli)
- [MIO Parser](https://github.com/kassenaerztliche-bundesvereinigung/MIOParser)
- [StorybookJS](https://storybook.js.org/docs/react/get-started/install/)

### Technisches Setup

#### NodeJS

Install a recent version of NodeJs, we recommend downloading the LTS from [the official page](https://nodejs.org/en/)

#### Installing the Dependencies

Using the terminal, navigate into the `react_prototype` folder.
Afterwards run the following command: `npm install` .
All dependencies should be installed.

#### Editor

For frontend development, we recommend using [VSCode](https://code.visualstudio.com/download).

#### VS Code Extensions (Recommended)

For uniform coding style we recommend using formatting and linting-plugins in VS Code.
Please install [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
Please install [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
To automatically use Prettier as a formatter, the `.vscode/settings.json` file is included in the repository.
Rules for Prettier and ESLint to work together neatly are configured in the `frontend/package.json`

#### Browser Plugin (Recommended)

We recommend installing the React Developer Tools Plugin for your Browser of Choice:

[React Developer Tools for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
[React Developer Tools for Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools)

### Running the App Locally

Open the terminal and navigate into the root repository folder (*not* into the `react_prototype` folder).
Start a HTTP-file-server, e.g. via `npx http-server`.
The HTTP-file-server hosts the MIO example data during the development of the application.

Open a second terminal and navigate into the `react_prototype` folder.
If not done yet, install all dependencies using `npm install`
Start the development server using `npm run dev`

The react app should be available on a port on localhost.

### Development - Workflow

Open the complete repository in your editor.
To run the application, please follow the previous section.

When editing the files, the application running in the browser should update automatically.

You can create new components via the terminal by running `npx generate-react-cli component MyComponent`
At first execution, you migh be prompted to install `generate-react-cli` .
The new component will be created in an own folder with SCSS and TSX file and can be adapted using these files.

### Generate Static Application Files (Production Build)

To build the app, run `npm run build`.
The files will be generated in the `react_prototype/dist` folder.
Per default, the MIO example data will also be copied into this folder.
You may delete it from the `dist` folder and adapt the `config.json` for your own files.
