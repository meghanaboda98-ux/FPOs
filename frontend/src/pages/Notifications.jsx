import { useEffect, useState } from "react";

function Notifications() {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        const dummyNotifications = [

            {
                id: 1,
                message: "Banana Batch B101 nearing expiry",
                type: "WARNING"
            },

            {
                id: 2,
                message: "Cold Storage Temperature High",
                type: "CRITICAL"
            }

        ];

        setNotifications(
            dummyNotifications
        );

    }, []);

    return (

        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">

                Notifications

            </h1>

            <div className="bg-white rounded-lg shadow p-4">

                {
                    notifications.length === 0
                        ? (
                            <p>
                                No Notifications
                            </p>
                        )
                        : (
                            notifications.map(
                                (notification) => (

                                    <div
                                        key={notification.id}
                                        className="border-b py-3"
                                    >

                                        <p className="font-medium">

                                            {notification.message}

                                        </p>

                                        <span
                                            className={`text-sm ${
                                                notification.type === "CRITICAL"
                                                    ? "text-red-600"
                                                    : "text-yellow-600"
                                            }`}
                                        >

                                            {notification.type}

                                        </span>

                                    </div>

                                )
                            )
                        )
                }

            </div>

        </div>
    );
}

export default Notifications;