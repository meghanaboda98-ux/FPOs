import math

# Zero-order decay
def zero_order_decay(
    C0,
    k,
    t
):
    Ct = C0 - (k * t)
    return max(
        round(Ct, 2),
        0
    )

# First-order decay
def first_order_decay(
    C0,
    k,
    t
):
    Ct = C0 * math.exp(
        -k * t
    )
    return max(
        round(Ct, 2),
        0
    )

# Second-order decay
def second_order_decay(
    C0,
    k,
    t
):

    Ct = C0 / (
        1 + (k * C0 * t)
    )

    return max(
        round(Ct, 2),
        0
    )