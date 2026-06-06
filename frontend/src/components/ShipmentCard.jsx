import StatusBadge from "./StatusBadge";
function ShipmentCard({
    shipment

}) {
    return (
        <div className="bg-white rounded-xl shadow p-5">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">
                    {shipment.product_name}
                </h2>

                <StatusBadge
                    status={shipment.shipment_status}
                />

            </div>

            <div className="space-y-2 text-sm">

                <p>

                    Transporter:
                    {" "}
                    {shipment.transporter_name}

                </p>

                <p>

                    Current Temperature:
                    {" "}
                    {shipment.current_temperature}°C

                </p>

                <p>

                    Transport Quality:
                    {" "}
                    {shipment.transport_quality}

                </p>

                <p>

                    Source:
                    {" "}
                    {shipment.source_location}

                </p>

                <p>

                    Destination:
                    {" "}
                    {shipment.destination_location}

                </p>

            </div>

        </div>
    );
}
export default ShipmentCard;