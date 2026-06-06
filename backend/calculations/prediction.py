from calculations.arrhenius import (
    arrhenius_rate
)

from calculations.decay import (
    zero_order_decay,
    first_order_decay,
    second_order_decay
)


# QUALITY PREDICTION
def predict_quality(

    initial_quality,

    model,

    k_ref,

    Ea,

    current_temperature,

    storage_days

):

    k = arrhenius_rate(

        k_ref,

        Ea,

        current_temperature

    )

    if model == "zero":

        quality = zero_order_decay(
            initial_quality,
            k,
            storage_days
        )

    elif model == "first":

        quality = first_order_decay(
            initial_quality,
            k,
            storage_days
        )

    elif model == "second":

        quality = second_order_decay(
            initial_quality,
            k,
            storage_days
        )

    else:

        quality = initial_quality

    return max(
        round(quality, 2),
        0
    )


# SPOILAGE PREDICTION
def predict_spoilage(

    current_temperature,

    optimal_temperature,

    storage_days,

    shelf_life

):

    spoilage = (

        abs(
            current_temperature -
            optimal_temperature
        )

        +

        (storage_days / shelf_life) * 100

    )

    return round(
        min(spoilage, 100),
        2
    )


# TRANSPORT QUALITY
def predict_transport_quality(

    transport_temperature,

    optimal_temperature,

    travel_hours

):

    quality = 100 - (

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


# REMAINING SHELF LIFE
def predict_remaining_shelf_life(

    shelf_life,

    storage_days

):

    remaining_days = (
        shelf_life -
        storage_days
    )

    return max(
        remaining_days,
        0
    )


# TEMPERATURE STATUS
def check_temperature_status(

    current_temperature,

    min_temperature,

    max_temperature

):

    if current_temperature < min_temperature:

        return "Low Temperature"

    elif current_temperature > max_temperature:

        return "High Temperature"

    else:

        return "Optimal"


# CHILLING INJURY CHECK
def check_chilling_injury(

    current_temperature,

    min_temperature

):

    if current_temperature < min_temperature:

        return "Chilling Injury Risk"

    return "Safe"


# DISPATCH PRIORITY
def calculate_dispatch_priority(

    quality,

    shelf_life_remaining

):

    if quality < 50:

        return "Immediate Dispatch"

    elif shelf_life_remaining < 3:

        return "Priority Dispatch"

    else:

        return "Normal Dispatch"