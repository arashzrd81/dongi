import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import "./App.css";


const App = () => {
    return (
        <Routes>
            <Route path="/" element={
                JSON.parse(localStorage.getItem("userAuth")) ?
                <Navigate to="/dashboard" replace /> :
                <Login />
            } />
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            } />
        </Routes>
    );
};


const ProtectedRoute = ({children}) => {
    if (JSON.parse(localStorage.getItem("userAuth"))) {
        return children;
    }
    return <Navigate to="/" replace />;
};


export default App;