def calculate_transport_quality(
    initial_quality,
    transport_temperature,
    optimal_temperature,
    travel_hours
):
    quality = initial_quality - (
        abs(
            transport_temperature -
            optimal_temperature
        )
        +
        travel_hours * 1.5
    )
    return max(
        round(quality, 2),
        0
    )
def calculate_transport_spoilage(
    quality
):
    spoilage = 100 - quality
    return round(
        spoilage,
        2
    )