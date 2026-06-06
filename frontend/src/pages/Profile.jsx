import { getToken } from "../utils/auth";

function Profile() {

    const token = getToken();

    return (

        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">

                User Profile

            </h1>

            <div className="bg-white p-6 rounded-lg shadow">

                <div className="mb-4">

                    <label className="font-semibold">

                        Name

                    </label>

                    <p>

                        {localStorage.getItem("name") || "N/A"}

                    </p>

                </div>

                <div className="mb-4">

                    <label className="font-semibold">

                        Role

                    </label>

                    <p>

                        {localStorage.getItem("role") || "N/A"}

                    </p>

                </div>

                <div>

                    <label className="font-semibold">

                        Token Status

                    </label>

                    <p>

                        {token ? "Logged In" : "Not Logged In"}

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Profile;