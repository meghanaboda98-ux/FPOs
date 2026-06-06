function WarehouseCard({
    warehouse
}) {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">
                {warehouse.warehouse_name}

            </h2>

            <div className="space-y-2">

                <p>

                    Total Capacity:
                    {" "}
                    <strong>

                        {warehouse.total_capacity}

                    </strong>

                </p>

                <p>

                    Occupied Capacity:
                    {" "}
                    <strong>

                        {warehouse.occupied_capacity}

                    </strong>

                </p>

                <p>

                    Available Capacity:
                    {" "}
                    <strong>

                        {warehouse.available_capacity}

                    </strong>

                </p>

                <p>

                    Utilization:
                    {" "}
                    <strong>

                        {warehouse.utilization_percentage}%

                    </strong>

                </p>

            </div>

        </div>
    );
}
export default WarehouseCard;