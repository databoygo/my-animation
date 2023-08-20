import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Transition from './CssAnimation/transition';
import Animation from './CssAnimation/animation'

const router = createBrowserRouter([ //router对象创建匹配规则
  {
    path: "/",
    element:<Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "css/1",
        element: <Transition />
      },
      {
        path: "css/2",
        element: <Animation />
      }
    ]
  },
  
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
