import { BrowserRouter, Route, Routes } from "react-router";
import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";
import { Login } from "./views/Login.tsx";
import { Register } from "./views/Register.tsx";
import { AuthenticatedScreen } from "./views/AuthenticatedScreen.tsx";
import { HomeScreen } from "./views/HomeScreen.tsx";
import { IndexProfile } from "./views/Profile/index.tsx";
import { ProfileScreen } from "./views/Profile/ProfileScreen.tsx";
import { PasswordScreen } from "./views/Profile/PasswordScreen.tsx";
import { PaymentsScreen } from "./views/Profile/PaymentsScreen.tsx";
import { GradesScreen } from "./views/Profile/GradesScreen.tsx";
import { AdminIndex } from "./views/Admin/index.tsx";
import { AdminModules } from "./views/Admin/AdminModules.tsx";
import { ModulesIndex } from "./views/Admin/modules/index.tsx";
import { InfoModule } from "./views/Admin/modules/InfoModule.tsx";
import { TasksModule } from "./views/Admin/modules/TasksModule.tsx";
import { ExamModule } from "./views/Admin/modules/ExamModule.tsx";
import { MeetingsModule } from "./views/Admin/modules/meetings/MeetingsModule.tsx";
import { MeetingsIndex } from "./views/Admin/modules/meetings/index.tsx";
import { MeetingInfo } from "./views/Admin/modules/meetings/MeetingInfo.tsx";
import {StudentsScreen} from "./views/Admin/StudentsScreen.tsx";
import {StudentIndex} from "./views/Admin/student/index.tsx";
import {StudentModules} from "./views/Admin/student/StudentModules.tsx";

const root = document.getElementById("root")!;

const queryClient = new QueryClient();

ReactDOM.createRoot(root).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="home" element={<AuthenticatedScreen />}>
            <Route index element={<HomeScreen />} />
            <Route path="profile" element={<IndexProfile />}>
              <Route path="main" element={<ProfileScreen />} />
              <Route path="password" element={<PasswordScreen />} />
              <Route path="payments" element={<PaymentsScreen />} />
              <Route path="grades" element={<GradesScreen />} />
            </Route>
            <Route path="admin" element={<AdminIndex />}>
              <Route path="modules" element={<AdminModules />} />
              <Route path="module/:id" element={<ModulesIndex />}>
                <Route path="info" element={<InfoModule />} />
                <Route path="tasks" element={<TasksModule />} />
                <Route path="exam" element={<ExamModule />} />
                <Route path="meetings" element={<MeetingsIndex />}>
                  <Route index element={<MeetingsModule />} />
                  <Route path=":meetingId" element={<MeetingInfo />} />
                </Route>
              </Route>
              <Route path="students" element={<StudentsScreen />}/>
              <Route path="student/:id" element={<StudentIndex />}>
                <Route index element={<StudentModules />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
