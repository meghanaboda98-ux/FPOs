import math

# Gas constant
R = 8.314

# Reference temperature
# 20°C = 293.15K
T_REF = 293.15

def calculate_decay_constant(
    k_ref,
    Ea,
    storage_temp
):

    # Convert Celsius to Kelvin
    T = storage_temp + 273.15

    k = k_ref * math.exp(
        -(Ea / R) * (
            (1 / T) - (1 / T_REF)
        )
    )

    return k