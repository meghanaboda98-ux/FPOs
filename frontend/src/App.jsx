import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Products from "./pages/Products";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";
import Recommendations from "./pages/Recommendations";
import Shipments from "./pages/Shipments";
import Warehouses from "./pages/Warehouses";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* DEFAULT PAGE */}

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/register"
                            replace
                        />
                    }
                />

                {/* AUTH ROUTES */}

                <Route
                    path="/login"
                    element={
                        <AuthLayout>
                            <Login />
                        </AuthLayout>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <AuthLayout>
                            <Register />
                        </AuthLayout>
                    }
                />

                {/* PROTECTED ROUTES */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        index
                        element={<Dashboard />}
                    />

                </Route>

                <Route
                    path="/inventory"
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        index
                        element={<Inventory />}
                    />
                </Route>

                <Route
                    path="/products"
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        index
                        element={<Products />}
                    />
                </Route>

                <Route
                    path="/analytics"
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        index
                        element={<Analytics />}
                    />
                </Route>

                <Route
                    path="/alerts"
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        index
                        element={<Alerts />}
                    />
                </Route>

                <Route
                    path="/recommendations"
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        index
                        element={<Recommendations />}
                    />
                </Route>

                <Route
                    path="/shipments"
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        index
                        element={<Shipments />}
                    />
                </Route>

                <Route
                    path="/warehouses"
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        index
                        element={<Warehouses />}
                    />
                </Route>

                <Route
                    path="/notifications"
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        index
                        element={<Notifications />}
                    />
                </Route>

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        index
                        element={<Profile />}
                    />
                </Route>

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/register"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
