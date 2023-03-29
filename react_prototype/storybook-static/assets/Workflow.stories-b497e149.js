import{M as c}from"./chunk-PCJTTTQV-10e11de6.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as n,a as r,F as s}from"./jsx-runtime-7b332bd4.js";import{u as a}from"./index-16c8d5db.js";import"./iframe-edb52593.js";import"../sb-preview/runtime.mjs";import"./index-edfb89d8.js";import"./_commonjsHelpers-725317a4.js";import"./_baseIsEqual-ed00ab3a.js";import"./index-d475d2ea.js";import"./index-f3096be8.js";import"./index-356e4a49.js";function l(t={}){const{wrapper:o}=Object.assign({},a(),t.components);return o?n(o,{...t,children:n(d,{})}):d();function d(){const e=Object.assign({h1:"h1",p:"p",a:"a",h2:"h2",em:"em",code:"code",strong:"strong"},a(),t.components);return r(s,{children:[n(c,{title:"Entwicklung/Development Workflow"}),`
`,n(e.h1,{children:"Development Workflow"}),`
`,r(e.p,{children:["Für die lokale Entwicklung werden beim Prototypen ",n(e.a,{href:"https://vitejs.dev/",children:"Vite"}),", ",n(e.a,{href:"https://www.npmjs.com/package/http-server",children:"http-server"})," sowie ",n(e.a,{href:"https://github.com/arminbro/generate-react-cli",children:"generate-react-cli"})," verwendet."]}),`
`,n(e.h2,{children:"Lokales Ausführen der Applikation"}),`
`,r(e.p,{children:["Öffnen Sie ein Terminal / eine Kommandozeile und navigieren Sie in den Repository Ordner (Oberstes Level, ",n(e.em,{children:"nicht"})," im ",n(e.code,{children:"react_prototype"}),` Ordner).
Starten Sie einen HTTP-Datei-Server, z.B. via `,n(e.code,{children:"npx http-server"}),`.
Der HTTP-Datei-Server macht die MIO-Beispieldateien während der Entwicklung für die Applikation verfügbar.`]}),`
`,r(e.p,{children:["Öffnen Sie ein zweites Terminal / eine zweite Kommandozeile und navigieren Sie in den ",n(e.code,{children:"react_prototype"}),` Ordner.
Falls noch nicht geschehen, installieren Sie einmalig alle Dependencies mit `,n(e.code,{children:"npm install"}),`.
Starten Sie den Entwicklungsserver mit `,n(e.code,{children:"npm run dev"})]}),`
`,n(e.p,{children:"Die React-App sollte auf einem lokalen Port verfügbar sein."}),`
`,n(e.h2,{children:"Bearbeiten der Applikation"}),`
`,n(e.p,{children:`Öffnen Sie das gesamte Repository in Ihrem Editor.
Zum Ausführen der Applikation, folgen Sie dem vorherigen Abschnitt.`}),`
`,n(e.p,{children:"Wenn Sie die Dateien bearbeiten, sollte die Web-Applikation in Ihrem Browser automatisch aktualisiert werden."}),`
`,r(e.p,{children:["Sie können neue Komponenten über das Terminal erstellen, indem Sie ",n(e.code,{children:"npx generate-react-cli component MyComponent"}),` verwenden.
Beim ersten Mal, müssen Sie möglicherweise `,n(e.code,{children:"generate-react-cli"}),` installieren.
Die neue Komponente wird in einem Ordner mit eigener SCSS- und TSX-Datei erstellt und kann dort bearbeitet werden.`]}),`
`,n(e.h2,{children:"Erzeugen der Statischen Anwendungsdateien (Production Build)"}),`
`,r(e.p,{children:["Führen Sie ",n(e.code,{children:"npm run build"}),` aus.
Die Dateien werden in den `,n(e.code,{children:"react_prototype/dist"}),` Ordner erzeugt.
Standardmäßig werden die MIO-Beispieldateien in diesen Ordner kopiert.
Sie können diese aus dem `,n(e.code,{children:"dist"})," Ordner löschen und die ",n(e.code,{children:"config.json"})," für Ihre eigene Daten anpassen."]}),`
`,n("br",{}),`
`,r(e.p,{children:[n(e.strong,{children:"Nächste Seite"}),n("br",{}),`
`,n(e.a,{href:"../?path=/docs/entwicklung-dependencies--docs",children:"Dependencies"})]})]})}}const p=()=>{throw new Error("Docs-only story")};p.parameters={docsOnly:!0};const i={title:"Entwicklung/Development Workflow",tags:["stories-mdx"],includeStories:["__page"]};i.parameters=i.parameters||{};i.parameters.docs={...i.parameters.docs||{},page:l};const _=["__page"];export{_ as __namedExportsOrder,p as __page,i as default};
//# sourceMappingURL=Workflow.stories-b497e149.js.map
