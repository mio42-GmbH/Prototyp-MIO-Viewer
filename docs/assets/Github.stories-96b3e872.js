import{M as h}from"./chunk-PCJTTTQV-10e11de6.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as e,a as i,F as o}from"./jsx-runtime-7b332bd4.js";import{u as l}from"./index-16c8d5db.js";import"./iframe-edb52593.js";import"../sb-preview/runtime.mjs";import"./index-edfb89d8.js";import"./_commonjsHelpers-725317a4.js";import"./_baseIsEqual-ed00ab3a.js";import"./index-d475d2ea.js";import"./index-f3096be8.js";import"./index-356e4a49.js";function c(r={}){const{wrapper:s}=Object.assign({},l(),r.components);return s?e(s,{...r,children:e(a,{})}):a();function a(){const n=Object.assign({h1:"h1",p:"p",a:"a",h2:"h2",h3:"h3",h4:"h4",strong:"strong"},l(),r.components);return i(o,{children:[e(h,{title:"Entwicklung/Arbeit mit Github"}),`
`,e(n.h1,{children:"Arbeit mit GitHub"}),`
`,i(n.p,{children:["Den Quellcode für den Prototypen finden Sie im ",e(n.a,{href:"https://github.com/mio42-GmbH/Prototyp-MIO-Anzeige-Impfpass-JSSPA",children:"zugehörigen GitHub Repository"})]}),`
`,e(n.h2,{children:"Github Account Erstellen"}),`
`,i(n.p,{children:[`Um an diesem Projekt zu mitzuentwickeln, wird ein GitHub Account benötigt.
Dieser kann einfach auf `,e(n.a,{href:"https://github.com",children:"GitHub"}),' erstellt werden, unter "Sign up" oben rechts.']}),`
`,e("img",{src:"./githubSignUp.png",alt:"Bei GitHub über 'Sign Up' registieren"}),`
`,e(n.h2,{children:"Lokales Git Installieren"}),`
`,i(n.p,{children:[`Weiterhin muss Git auf dem lokalen Rechner installiert sein.
Dazu empfehlen wir die Installation eines grafischen Git-Clients wie `,e(n.a,{href:"https://desktop.github.com",children:"GitHub-Desktop"}),`
Dieser Client von GitHub installiert eine gebündelte Version von Git auf dem System.`]}),`
`,i(n.p,{children:["Alternativ kann mit anderen Clients wie ",e(n.a,{href:"https://www.sourcetreeapp.com/",children:"SourceTree"}),`, der integrierten Git-Funktionalität in VS Code, oder ohne grafische Oberfläche auf dem Terminal gearbeitet werden.
In diesen Fällen muss eventuell eine separate Git-Installation auf dem Betriebssystem erfolgen.
Für Windows geht das beispielsweise mit `,e(n.a,{href:"https://git-scm.com/download/win",children:"Git for Windows"})]}),`
`,e(n.p,{children:"Für Mac OSX, empfehlen wir die Installation von Git per Homebrew mit"}),`
`,e("code",{children:"brew install git"}),`
`,e(n.p,{children:"Für Linux empfiehlt sich die Installation per Standard Package Manager, für Ubuntu beispielsweise"}),`
`,e("code",{children:"sudo apt-get install git"}),`
`,e(n.h2,{children:"Lokal mit dem Git Repository arbeiten"}),`
`,e(n.p,{children:"Um das Repository lokal zu bearbeiten, wird dieses geklont. Dazu kann es über die Webseite in GitHub Desktop geöffnet werden:"}),`
`,e("img",{src:"./openWithGithubDesktop.png",alt:"'Open with Github Desktop' Option auf GitHub.com"}),`
`,e(n.p,{children:"Anschließend zeigt GitHub Desktop je nach aktuellem Status des Projektes entweder eine Übersicht um den Code zu öffnen:"}),`
`,e("img",{src:"./openInVSCode.png",alt:"'Open in Visual Studio Code' Option in GitHub Desktop"}),`
`,e(n.p,{children:"oder eine Übersicht der Änderungen zum Committen und Pushen auf GitHub:"}),`
`,e("img",{src:"./githubDesktopCommit.png",alt:"Commit-Ansicht in GitHub Desktop"}),`
`,e(n.p,{children:"Committen und Pushen ist auch in VSCode integriert möglich:"}),`
`,e(n.p,{children:"Committen:"}),`
`,e("img",{src:"./vsCodeCommit.png",alt:"Commit-Ansicht in VS Code"}),`
`,e(n.p,{children:"Pushen/Pullen:"}),`
`,e("img",{src:"./vsCodePushPull.png",alt:"Push/Pull-Knopf in VS Code"}),`
`,e(n.h2,{children:"Branches"}),`
`,e(n.h3,{children:"Branch erstellen"}),`
`,e(n.p,{children:"Da mehrere Entwickler an diesem Projekt gleichzeitig arbeiten, empfiehlt es sich, nicht direkt auf dem master-Branch zu arbeiten."}),`
`,e(n.p,{children:"Ein neuer Branch sollte bei der Arbeit an neuen Features/Fixes erstellt werden und einen sinnvollen sprechenden Namen erhalten."}),`
`,e(n.h4,{children:"Branch erstellen in GitHub Desktop"}),`
`,e("img",{src:"./githubDesktopCreateBranch.png",alt:"Branch in GitHub Desktop erstellen"}),`
`,e(n.h4,{children:"Branch erstellen in VS Code"}),`
`,e(n.p,{children:"Aktueller Branch wird unten links in Statusleiste angezeigt, zum Branch wechseln anklicken:"}),`
`,e("img",{src:"./vsCodeBranchButton.png",alt:"Knopf um Branch in VS Code zu wechseln"}),`
`,e(n.p,{children:'Anschließend "Neuen Branch erstellen" wählen und einen Branchnamen eingeben'}),`
`,e("img",{src:"./vsCodeCreateBranch.png",alt:"Neuen Branch in VS Code erstellen"}),`
`,e(n.p,{children:"Neuer Branchname sollte in Statusleiste angezeigt werden"}),`
`,e("img",{src:"./vsCodePublishBranchButton.png",alt:"Neuen Branch in VS Code veröffentlichen"}),`
`,e(n.h3,{children:"Branches Mergen"}),`
`,e(n.p,{children:"Nachdem die Arbeit auf dem Branch abgeschlossen wurde und ein funktionierender Stand hergestellt wurde, kann der Branch wieder in den Master-Branch gemerged werden."}),`
`,e(n.p,{children:"Dazu müssen alle Änderungen committed werden."}),`
`,e(n.p,{children:"Anschließend muss jeweils der Master-Branch, in den gemerged werden soll, wieder ausgewählt werden."}),`
`,e(n.h4,{children:"Branches Mergen in GitHub Desktop"}),`
`,e("img",{src:"./githubDesktopMergeBranch.png",alt:"Branches in GitHub Desktop mergen"}),`
`,e(n.h4,{children:"Branches Mergen in VS Code"}),`
`,e(n.p,{children:"In VSCode können Branches über das Kontextmenü in der Quellcodeverwaltung gemerged werden:"}),`
`,e("img",{src:"./vsCodeBranchMenu.png",alt:"Branch Kontextmenü in VS Code"}),`
`,e(n.p,{children:'anschließend "Branch" > "Branch zusammenführen" auswählen'}),`
`,e("br",{}),`
`,i(n.p,{children:[e(n.strong,{children:"Nächste Seite"}),e("br",{}),`
`,e(n.a,{href:"../?path=/docs/entwicklung-komponentenbasiertes-arbeiten--docs",children:"Komponentenbasiertes Arbeiten"})]})]})}}const d=()=>{throw new Error("Docs-only story")};d.parameters={docsOnly:!0};const t={title:"Entwicklung/Arbeit mit Github",tags:["stories-mdx"],includeStories:["__page"]};t.parameters=t.parameters||{};t.parameters.docs={...t.parameters.docs||{},page:c};const D=["__page"];export{D as __namedExportsOrder,d as __page,t as default};
//# sourceMappingURL=Github.stories-96b3e872.js.map
