import React from "react";
import { ProtectedRoute, Landing, Register, Error } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddJob, AllJobs, SharedLayout, Profile, Stats } from "./Dashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout></SharedLayout>
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats></Stats>}></Route>
          <Route path="all-jobs" element={<AllJobs></AllJobs>}></Route>
          <Route path="add-job" element={<AddJob></AddJob>}></Route>
          <Route path="profile" element={<Profile></Profile>}></Route>
        </Route>
        <Route path="landing" element={<Landing></Landing>}></Route>
        <Route path="register" element={<Register></Register>}></Route>
        <Route path="*" element={<Error></Error>}></Route>
      </Routes>
      <ToastContainer position="top-center"></ToastContainer>
    </BrowserRouter>
  );
}

export default App;
