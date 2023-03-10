import React from 'react'
import ReactDOM from 'react-dom/client'
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from "react-router-dom";

import './index.css'
import './custom.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
// import DiseaseOverview from './components/DiseaseOverview/DiseaseOverview'
// import DiseaseDetails from './components/DiseaseDetails/DiseaseDetails'
import { BrowserRouter } from 'react-router-dom'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "overview",
//         element: <DiseaseOverview />,
//       },
//       {
//         path: "details",
//         element: <DiseaseDetails />,
//       }
//     ]
//   }
// ]
//   createRoutesFromElements(
//     <Route path="/" element={}>
//       <Route path="overview" element={<DiseaseOverview />} />
//       <Route path="dashboard" element={<DiseaseDetails />} />
//     </Route>
//   )
// );

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
