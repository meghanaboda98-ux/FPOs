def calculate_available_capacity(

    total_capacity,
    occupied_capacity
):

    available_capacity = (

        total_capacity -
        occupied_capacity
    )

    return max(available_capacity, 0)


def calculate_warehouse_status(

    occupied_capacity,
    total_capacity

):

    if total_capacity == 0:
        return "EMPTY"
    utilization = (
        occupied_capacity /
        total_capacity
    ) * 100

    if utilization >= 90:
        return "FULL"
    elif utilization >= 70:
        return "NEAR_FULL"
    return "AVAILABLE"