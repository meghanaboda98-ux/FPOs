from calculations.arrhenius import (
    calculate_decay_constant
)

from calculations.decay import (
    first_order_decay,
    zero_order_decay
)

# Initial quality
C0 = 1.0

def calculate_quality(
    model,
    k_ref,
    Ea,
    storage_temp,
    days_stored
):

    # Calculate decay constant
    k = calculate_decay_constant(
        k_ref,
        Ea,
        storage_temp
    )

    # Apply decay model
    if model == "first":

        quality = first_order_decay(
            C0,
            k,
            days_stored
        )

    elif model == "zero":

        quality = zero_order_decay(
            C0,
            k,
            days_stored
        )

    else:
        quality = 0

    return round(quality, 4)


def estimate_remaining_days(
    quality,
    quality_limit
):

    # Simple estimation logic

    remaining = (
        (quality - quality_limit) * 10
    )

    return max(round(remaining, 1), 0)