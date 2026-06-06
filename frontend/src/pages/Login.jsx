import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { saveToken } from "../utils/auth";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await loginUser(formData);

            console.log("LOGIN RESPONSE:", response);

            if (response.access_token) {

                saveToken(
                    response.access_token,
                    response.user?.role || "",
                    response.user?.name || ""
                );

                alert("Login Successful");

                navigate("/dashboard");

            } else {

                alert("Access token missing");
            }

        } catch (error) {

            console.log("LOGIN ERROR:", error);

            alert(
                error?.response?.data?.detail ||
                "Invalid Credentials"
            );
        }
    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-96"
            >

                <h2 className="text-2xl font-bold mb-6 text-center">

                    Login

                </h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border p-3 mb-4 rounded"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border p-3 mb-4 rounded"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded"
                >

                    Login

                </button>

                <p className="text-center mt-4">

                    New User?

                    <span
                        className="text-blue-600 cursor-pointer ml-2 font-semibold"
                        onClick={() => navigate("/register")}
                    >
                        Register Here
                    </span>

                </p>

            </form>

        </div>
    );
}

export default Login;