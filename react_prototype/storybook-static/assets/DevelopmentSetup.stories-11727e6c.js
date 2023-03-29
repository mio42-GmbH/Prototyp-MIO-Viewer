import{M as a}from"./chunk-PCJTTTQV-10e11de6.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as n,a as i,F as s}from"./jsx-runtime-7b332bd4.js";import{u as l}from"./index-16c8d5db.js";import"./iframe-edb52593.js";import"../sb-preview/runtime.mjs";import"./index-edfb89d8.js";import"./_commonjsHelpers-725317a4.js";import"./_baseIsEqual-ed00ab3a.js";import"./index-d475d2ea.js";import"./index-f3096be8.js";import"./index-356e4a49.js";function c(t={}){const{wrapper:o}=Object.assign({},l(),t.components);return o?n(o,{...t,children:n(d,{})}):d();function d(){const e=Object.assign({h1:"h1",p:"p",code:"code",h2:"h2",a:"a",em:"em",strong:"strong"},l(),t.components);return i(s,{children:[n(a,{title:"Entwicklung/Development Setup"}),`
`,n(e.h1,{children:"Development Setup"}),`
`,i(e.p,{children:["Die Ressourcen der Applikation befinden sich im Ordner ",n(e.code,{children:"react_prototype"}),`.
Die App wurde mit NodeJs, ReactJs und TypeScript entwickelt.
Das Projekt folgt der Standardstruktur eines Vite-Projektes mit Komponenten, die mit `,n(e.code,{children:"generate-react-cli"}),` erstellt wurden.
Für das Einlesen der MIO-Daten wird intern der MIO Parser genutzt, die Darstellung nutzt Bootstrap.`]}),`
`,n(e.h2,{children:"NodeJS"}),`
`,i(e.p,{children:["Installieren Sie eine aktuelle Version von NodeJs. Wir empfehlen den Download der LTS-Version von der ",n(e.a,{href:"https://nodejs.org/en/",children:"offiziellen Webseite"})]}),`
`,n(e.h2,{children:"Installieren der Dependencies"}),`
`,i(e.p,{children:["Navigieren Sie mit dem Terminal / der Kommandozeile in den ",n(e.code,{children:"react_prototype"}),` Ordner.
Führen Sie anschließend einmalig `,n(e.code,{children:"npm install"}),` aus.
Es sollten alle benötigten Pakete installiert werden.`]}),`
`,n(e.h2,{children:"Editor"}),`
`,i(e.p,{children:["Für die Frontend-Entwicklung empfehlen wir die Verwendung von ",n(e.a,{href:"https://code.visualstudio.com/download",children:"VSCode"})]}),`
`,n(e.h2,{children:"VS Code Erweiterungen (Empfohlen)"}),`
`,i(e.p,{children:[`Für einheitlichen Code-Stil empfehlen wir die Nutzung von Formatierungs- und Linting-Plugins.
Bitte installieren Sie `,n(e.a,{href:"https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode",children:"Prettier - Code formatter"}),`
Bitte installieren Sie `,n(e.a,{href:"https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint",children:"ESLint"}),`
Um Prettier automatisch als Formatierer zu verwenden, ist die Datei `,n(e.code,{children:".vscode/settings.json"}),` im Repository enthalten.
Regeln für das Zusammenspiel von Prettier und ESLint werden in der `,n(e.code,{children:"frontend/package.json"})," konfiguriert"]}),`
`,n(e.h2,{children:"Browser Plugin (Empfohlen)"}),`
`,n(e.p,{children:"Wir empfehlen, das React Developer Tools Plugin für den Browser Ihrer Wahl zu installieren:"}),`
`,i(e.p,{children:[n(e.a,{href:"https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi",children:"React Developer Tools für Chrome"}),`
`,n(e.a,{href:"https://addons.mozilla.org/en-US/firefox/addon/react-devtools",children:"React Developer Tools für Firefox"})]}),`
`,n(e.h2,{children:"Lokales Ausführen der Applikation"}),`
`,i(e.p,{children:["Öffnen Sie ein Terminal / eine Kommandozeile und navigieren Sie in den Repository Ordner (Oberstes Level, ",n(e.em,{children:"nicht"})," im ",n(e.code,{children:"react_prototype"}),` Ordner).
Starten Sie einen HTTP-Datei-Server, z.B. via `,n(e.code,{children:"npx http-server"}),`.
Der HTTP-Datei-Server macht die MIO-Beispieldateien während der Entwicklung für die Applikation verfügbar.`]}),`
`,i(e.p,{children:["Öffnen Sie ein zweites Terminal / eine zweite Kommandozeile und navigieren Sie in den ",n(e.code,{children:"react_prototype"}),` Ordner.
Falls noch nicht geschehen, installieren Sie einmalig alle Dependencies mit `,n(e.code,{children:"npm install"}),`.
Starten Sie den Entwicklungsserver mit `,n(e.code,{children:"npm run dev"})]}),`
`,n(e.p,{children:"Die React-App sollte auf einem lokalen Port verfügbar sein."}),`
`,n(e.h2,{children:"Entwicklung - Arbeitsablauf"}),`
`,n(e.p,{children:`Öffnen Sie das gesamte Repository in Ihrem Editor.
Zum Ausführen der Applikation, folgen Sie dem vorherigen Abschnitt.`}),`
`,n(e.p,{children:"Wenn Sie die Dateien bearbeiten, sollte die Web-Applikation in Ihrem Browser automatisch aktualisiert werden."}),`
`,i(e.p,{children:["Sie können neue Komponenten über das Terminal erstellen, indem Sie ",n(e.code,{children:"npx generate-react-cli component MyComponent"}),` verwenden.
Beim ersten Mal, müssen Sie möglicherweise `,n(e.code,{children:"generate-react-cli"}),` installieren.
Die neue Komponente wird in einem Ordner mit eigener SCSS- und TSX-Datei erstellt und kann dort bearbeitet werden.`]}),`
`,n(e.h2,{children:"Erzeugen der Statischen Anwendungsdateien (Production Build)"}),`
`,i(e.p,{children:["Führen Sie ",n(e.code,{children:"npm run build"}),` aus.
Die Dateien werden in den `,n(e.code,{children:"react_prototype/dist"}),` Ordner erzeugt.
Standardmäßig werden die MIO-Beispieldateien in diesen Ordner kopiert.
Sie können diese aus dem `,n(e.code,{children:"dist"})," Ordner löschen und die ",n(e.code,{children:"config.json"})," für Ihre eigene Daten anpassen."]}),`
`,n("br",{}),`
`,i(e.p,{children:[n(e.strong,{children:"Nächste Seite"}),n("br",{}),`
`,n(e.a,{href:"../?path=/docs/entwicklung-development-workflow--docs",children:"Development Workflow"})]})]})}}const p=()=>{throw new Error("Docs-only story")};p.parameters={docsOnly:!0};const r={title:"Entwicklung/Development Setup",tags:["stories-mdx"],includeStories:["__page"]};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:c};const O=["__page"];export{O as __namedExportsOrder,p as __page,r as default};
//# sourceMappingURL=DevelopmentSetup.stories-11727e6c.js.map
