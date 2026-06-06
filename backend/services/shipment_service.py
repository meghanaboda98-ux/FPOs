from calculations.prediction import (
    predict_transport_quality
)
def monitor_shipment(

    shipment,
    transport_temperature,
    travel_hours,
    optimal_temperature

):

    transport_quality = predict_transport_quality(
        transport_temperature,
        optimal_temperature,
        travel_hours
    )

    shipment.transport_quality = (
        transport_quality
    )

    # TEMPERATURE STATUS
    if transport_temperature > (
        optimal_temperature + 5
    ):

        shipment.temperature_status = "HIGH"

    elif transport_temperature < (
        optimal_temperature - 5
    ):

        shipment.temperature_status = "LOW"

    else:

        shipment.temperature_status = "OPTIMAL"

    # QUALITY STATUS
    if transport_quality <= 40:
        shipment.shipment_status = "CRITICAL"
    elif transport_quality <= 70:
        shipment.shipment_status = "WARNING"
    else:
        shipment.shipment_status = "SAFE"

    return shipment