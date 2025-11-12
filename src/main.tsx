import { BrowserRouter, Route, Routes } from "react-router";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import { Login } from "./views/Login.tsx";
import {Register} from "./views/Register.tsx";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route index element={<Login />} />
        <Route path='register' element={<Register />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
