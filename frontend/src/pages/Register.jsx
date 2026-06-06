import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        name: "",
        email: "",
        password: "",
        role: "FPO_MANAGER"

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

            await registerUser(formData);

            alert("Registration Successful");

            navigate("/login");

        } catch (error) {

            console.log(error);

            alert(
                error?.response?.data?.detail ||
                "Registration Failed"
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

                    Register

                </h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border p-3 mb-4 rounded"
                    required
                />

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

                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full border p-3 mb-4 rounded"
                >

                    <option value="SUPER_ADMIN">
                        SUPER_ADMIN
                    </option>

                    <option value="FPO_MANAGER">
                        FPO_MANAGER
                    </option>

                    <option value="CAAS_OPERATOR">
                        CAAS_OPERATOR
                    </option>

                    <option value="TRANSPORTER">
                        TRANSPORTER
                    </option>

                </select>

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white p-3 rounded"
                >

                    Register

                </button>

                <p className="text-center mt-4">

                    Already Registered?

                    <span
                        className="text-blue-600 cursor-pointer ml-2 font-semibold"
                        onClick={() => navigate("/login")}
                    >
                        Login Here
                    </span>

                </p>

            </form>

        </div>
    );
}

export default Register;