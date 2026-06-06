# TOTAL AVAILABLE SPACE
def calculate_available_capacity(

    total_capacity,

    occupied_capacity

):

    available_capacity = (

        total_capacity -
        occupied_capacity

    )

    return round(
        available_capacity,
        2
    )


# OCCUPANCY PERCENTAGE
def calculate_occupancy_percentage(

    total_capacity,

    occupied_capacity

):

    percentage = (

        occupied_capacity /
        total_capacity

    ) * 100

    return round(
        percentage,
        2
    )


# REMAINING SPACE
def calculate_remaining_space(

    total_capacity,

    occupied_capacity

):

    remaining_space = (

        total_capacity -
        occupied_capacity

    )

    return round(
        remaining_space,
        2
    )


# WAREHOUSE STATUS
def warehouse_status(

    total_capacity,

    occupied_capacity

):

    occupied_percentage = (

        occupied_capacity /
        total_capacity

    ) * 100

    if occupied_percentage >= 90:

        return "Full"

    elif occupied_percentage >= 70:

        return "Limited Space"

    else:

        return "Available"