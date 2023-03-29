import{M as a}from"./chunk-PCJTTTQV-10e11de6.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as e,a as s,F as p}from"./jsx-runtime-7b332bd4.js";import{u as d}from"./index-16c8d5db.js";import"./iframe-edb52593.js";import"../sb-preview/runtime.mjs";import"./index-edfb89d8.js";import"./_commonjsHelpers-725317a4.js";import"./_baseIsEqual-ed00ab3a.js";import"./index-d475d2ea.js";import"./index-f3096be8.js";import"./index-356e4a49.js";function c(r={}){const{wrapper:i}=Object.assign({},d(),r.components);return i?e(i,{...r,children:e(o,{})}):o();function o(){const n=Object.assign({h1:"h1",p:"p",h2:"h2",strong:"strong",a:"a"},d(),r.components);return s(p,{children:[e(a,{title:"Entwicklung/Komponentenbasiertes Arbeiten"}),`
`,e(n.h1,{children:"Komponentenbasiertes Arbeiten"}),`
`,e(n.p,{children:`Eine Zielstellung der Visualisierungen von MIOs ist eine konsistente Designerfahrung für Nutzer über die verschiedenen MIOs.
Dafür haben wir uns entschieden, eine übergreifende Designbibliothek mit wiederverwendbaren Elementen und Komponenten zu entwickeln.`}),`
`,e(n.p,{children:"Dementsprechend ist die technische Lösung komponentenbasiert und mit Fokus auf Wiederverwendbarkeit entwickelt."}),`
`,e(n.p,{children:"Folgend wird ein Überblick über die Arbeit mit Komponenten gegeben."}),`
`,e(n.h2,{children:"Erstellen einer Komponente"}),`
`,e(n.p,{children:'Eine Komponente kann per Terminal-Befehl erstellt werden. Dafür sollte das Terminal in den "react-prototype" Ordner navigiert werden. Anschließend kann folgender Befehl genutzt werden:'}),`
`,e("code",{children:"npx generate-react-cli component MyComponent"}),`
`,e(n.p,{children:`Anschließend wird ein Unterordner für die Komponente im Ordner "components" erstellt.
Dieser Unterordner sieht wie folgt aus:`}),`
`,e("img",{src:"./componentDirectory.png",alt:"Struktur des Ordners einer React Komponente"}),`
`,e(n.p,{children:"Die Dateien haben folgende Zwecke:"}),`
`,e(n.p,{children:'*.scss: Hier werden Styles (CSS-Klassen und Regeln, beispielsweise Farben und Abstände) für diese Komponente definiert. Die Regeln in dieser Datei sind nicht global sondern nur für die Komponente gültig. Globale Styles können in der "index.css" Datei im "src" Ordner definiert werden.'}),`
`,e("strong",{children:e(n.p,{children:`*.tsx: Hauptdatei der Komponente, hier ist der Platz für die React-Logik der
Komponente`})}),`
`,e(n.h2,{children:"Struktur einer Komponente"}),`
`,e(n.p,{children:'In unserem Projekt nutzen wir "Functional Components". Das bedeutet, dass es keine Klasse ("class") pro Komponente gibt, sondern eine Komponente schlicht eine Methode/Funktion ist.'}),`
`,e(n.p,{children:"Die *.tsx Datei einer Komponente ist wie folgt strukturiert:"}),`
`,e("img",{src:"./componentStructure.png",alt:"Struktur einer React Komponente"}),`
`,e(n.p,{children:`In dem obigen Beispiel ist zu sehen, wie Daten in die Komponente hineingegeben werden können.
In diesem Fall wird ein String als "text" Property hineingegeben und im JSX (HTML+JS) Part der Komponente eingesetzt. Dafür werden geschweifte Klammern innerhalb der HTML Struktur genutzt und die entsprechende Variable eingesetzt.`}),`
`,e(n.p,{children:"Diese Komponente kann nun in anderen Komponenten (sowie in der App Komponente auf dem höchsten Level) importiert und verwendet werden:"}),`
`,e("img",{src:"./componentUse.png",alt:"Nutzung einer React Komponente"}),`
`,e("br",{}),`
`,s(n.p,{children:[e(n.strong,{children:"Nächste Seite"}),e("br",{}),`
`,e(n.a,{href:"../?path=/docs/entwicklung-mio-parser--docs",children:"MIO Parser"})]})]})}}const l=()=>{throw new Error("Docs-only story")};l.parameters={docsOnly:!0};const t={title:"Entwicklung/Komponentenbasiertes Arbeiten",tags:["stories-mdx"],includeStories:["__page"]};t.parameters=t.parameters||{};t.parameters.docs={...t.parameters.docs||{},page:c};const x=["__page"];export{x as __namedExportsOrder,l as __page,t as default};
//# sourceMappingURL=WorkingWithComponents.stories-d02dd645.js.map
