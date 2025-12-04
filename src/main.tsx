import { BrowserRouter, Route, Routes } from "react-router";
import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";
import { Login } from "./views/Login.tsx";
import { Register } from "./views/Register.tsx";
import { AuthenticatedScreen } from "./views/AuthenticatedScreen.tsx";
import { HomeScreen } from "./views/HomeScreen.tsx";
import { LibraryScreen } from "./views/LibraryScreen.tsx";

import { IndexProfile } from "./views/Profile/index.tsx";
import { ProfileScreen } from "./views/Profile/ProfileScreen.tsx";
import { PasswordScreen } from "./views/Profile/PasswordScreen.tsx";
import { PaymentsScreen } from "./views/Profile/PaymentsScreen.tsx";
import { GradesScreen } from "./views/Profile/GradesScreen.tsx";
import { ExamGradesProfile } from "./views/Profile/ExamGradesProfile.tsx";
import { TaskGradesProfile } from "./views/Profile/TaskGradesProfile.tsx";
import { MeetingsScreen } from "./views/Profile/MeetingsScreen.tsx";

import { AdminIndex } from "./views/Admin/index.tsx";
import { AdminModules } from "./views/Admin/AdminModules.tsx";
import { StudentsScreen } from "./views/Admin/StudentsScreen.tsx";
import { ModulesIndex } from "./views/Admin/modules/index.tsx";
import { InfoModule } from "./views/Admin/modules/InfoModule.tsx";
import { TasksModule } from "./views/Admin/modules/TasksModule.tsx";
import { ExamModule } from "./views/Admin/modules/ExamModule.tsx";
import { MeetingsModule } from "./views/Admin/modules/meetings/MeetingsModule.tsx";
import { MeetingsIndex } from "./views/Admin/modules/meetings/index.tsx";
import { MeetingInfo } from "./views/Admin/modules/meetings/MeetingInfo.tsx";
import { PaymentIndex } from "./views/Admin/payments/index.tsx";
import { PaymentsAdmin } from "./views/Admin/payments/PaymentsAdmin.tsx";
import { PaymentStudent } from "./views/Admin/payments/PaymentStudent.tsx";
import { StudentModule } from "./views/Admin/student/StudentModule.tsx";
import { StudentExam } from "./views/Admin/student/StudentExam.tsx";
import { StudentsTasks } from "./views/Admin/student/StudentsTasks.tsx";
import { StudentMeetings } from "./views/Admin/student/StudentMeetings.tsx";
import { StudentIndex } from "./views/Admin/student/index.tsx";
import { StudentModules } from "./views/Admin/student/StudentModules.tsx";
import { ExcelUploader } from "./views/Admin/ExcelView.tsx";
import { AdminGradesIndex } from "./views/Admin/grades/index.tsx";
import { AdminExamGrades } from "./views/Admin/grades/AdminExamGrades.tsx";
import { GradesStudents } from "./views/Admin/grades/Students.tsx";
import { StudentGrades } from "./views/Admin/grades/StudentGrades.tsx";
import { AdminTasksGrades } from "./views/Admin/grades/AdminTasksGrades.tsx";

import { ModulesScreen } from "./views/ModulesScreen.tsx";
import { ModuleStudentIndex } from "./views/modules/index.tsx";
import { ModuleInfoStudent } from "./views/modules/ModuleInfoStudent.tsx";
import { ModuleTaskStudent } from "./views/modules/ModuleTaskStudent.tsx";
import { ModuleExamStudent } from "./views/modules/ModuleExamStudent.tsx";
import { ModuleExamScreen } from "./views/modules/ModuleExamScreen.tsx";
import { ReviewExamProfile } from "./views/Profile/ReviewExamProfile.tsx";

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
              <Route path="grades" element={<GradesScreen />}>
                <Route path="exams" element={<ExamGradesProfile />} />
                <Route path="tasks" element={<TaskGradesProfile />} />
              </Route>
              <Route path="review/exam/:id" element={<ReviewExamProfile />} />
              <Route path="meetings" element={<MeetingsScreen />} />
            </Route>
            <Route path="admin" element={<AdminIndex />}>
              <Route path="modules" element={<AdminModules />} />
              <Route path="excel" element={<ExcelUploader />} />
              <Route path="module/:id" element={<ModulesIndex />}>
                <Route path="info" element={<InfoModule />} />
                <Route path="tasks" element={<TasksModule />} />
                <Route path="exam" element={<ExamModule />} />
                <Route path="meetings" element={<MeetingsIndex />}>
                  <Route index element={<MeetingsModule />} />
                  <Route path=":meetingId" element={<MeetingInfo />} />
                </Route>
              </Route>
              <Route path="students" element={<StudentsScreen />} />
              <Route path="student/:id" element={<StudentIndex />}>
                <Route path="modules" element={<StudentModules />} />
                <Route path="meetings" element={<StudentMeetings />} />
                <Route path="module/:moduleId" element={<StudentModule />}>
                  <Route path="exam" element={<StudentExam />} />
                  <Route path="tasks" element={<StudentsTasks />} />
                </Route>
              </Route>
              <Route path="payments" element={<PaymentIndex />}>
                <Route index element={<PaymentsAdmin />} />
                <Route path=":id" element={<PaymentStudent />} />
              </Route>
              <Route path="grades" element={<AdminGradesIndex />}>
                <Route path="exams" element={<AdminExamGrades />} />
                <Route path="tasks" element={<AdminTasksGrades />} />
                <Route path="students" element={<GradesStudents />} />
                <Route path="student/:id" element={<StudentGrades />} />
              </Route>
            </Route>
            <Route path="modules" element={<ModulesScreen />} />
            <Route path="module/:id" element={<ModuleStudentIndex />}>
              <Route path="info" element={<ModuleInfoStudent />} />
              <Route path="tasks" element={<ModuleTaskStudent />} />
              <Route path="exam" element={<ModuleExamStudent />} />
              <Route path="exam/:examId" element={<ModuleExamScreen />} />
            </Route>
            <Route path="library" element={<LibraryScreen />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
