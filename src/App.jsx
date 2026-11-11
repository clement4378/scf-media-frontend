import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import EventDetails from "./pages/EventDetails";
import Events from "./pages/Events";
import FindMyPhotos from "./pages/FindMyPhotos";
import MyPhotos from "./pages/MyPhotos";
import PendingApproval from "./pages/PendingApproval";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* PUBLIC HOME */}
                <Route
                    path="/"
                    element={
                        <>
                            <Navbar />
                            <Home />
                        </>
                    }
                />

                {/* PUBLIC AUTH */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* PENDING APPROVAL */}
                <Route
                    path="/pending-approval"
                    element={<PendingApproval />}
                />

                {/* PROTECTED — user dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* PROTECTED — events list */}
                <Route
                    path="/events"
                    element={
                        <ProtectedRoute>
                            <Events />
                        </ProtectedRoute>
                    }
                />

                {/* PROTECTED — event details */}
                <Route
                    path="/events/:id"
                    element={
                        <ProtectedRoute>
                            <EventDetails />
                        </ProtectedRoute>
                    }
                />

                {/* PROTECTED — find my photos */}
                <Route
                    path="/find-my-photos"
                    element={
                        <ProtectedRoute>
                            <FindMyPhotos />
                        </ProtectedRoute>
                    }
                />

                {/* PROTECTED — my photos */}
                <Route
                    path="/my-photos"
                    element={
                        <ProtectedRoute>
                            <MyPhotos />
                        </ProtectedRoute>
                    }
                />

                {/* ADMIN */}
                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/users"
                    element={
                        <AdminRoute>
                            <AdminUsers />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/events/:id"
                    element={
                        <AdminRoute>
                            <EventDetails />
                        </AdminRoute>
                    }
                />

                 <Route
    path="/profile"
    element={
        <ProtectedRoute>
            <Profile />
        </ProtectedRoute>
    }
/>
                 
                {/* 404 CATCH-ALL — must be last */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;