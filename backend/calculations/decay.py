import math

# First-order decay
def first_order_decay(
    C0,
    k,
    t
):

    Ct = C0 * math.exp(-k * t)

    return Ct

# Zero-order decay
def zero_order_decay(
    C0,
    k,
    t
):

    Ct = C0 - (k * t)

    return max(Ct, 0)