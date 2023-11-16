import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import CreateInvoice from "./pages/create-invoice/CreateInvoice";
import CreditInvoices from "./pages/credit-invoices/CreditInvoices";
import DebtInvoices from "./pages/debt-invoices/DebtInvoices";
import "./App.css";


const App = () => {
    return (
        <>
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
                <Route path="/dashboard/create-invoice" element={
                    <ProtectedRoute>
                        <CreateInvoice />
                    </ProtectedRoute>
                } />
                <Route path="/dashboard/credit-invoices" element={
                    <ProtectedRoute>
                        <CreditInvoices />
                    </ProtectedRoute>
                } />
                <Route path="/dashboard/debt-invoices" element={
                    <ProtectedRoute>
                        <DebtInvoices />
                    </ProtectedRoute>
                } />
            </Routes>
            <div className="bg">
                {
                    Array(10).fill().map(() => (
                        <span className="square"></span>
                    ))
                }
            </div>
            <ToastContainer className="toast" />
        </>
    );
};


const ProtectedRoute = ({children}) => {
    if (JSON.parse(localStorage.getItem("userAuth"))) {
        return children;
    }
    return <Navigate to="/" replace />;
};


export default App;