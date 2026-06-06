import math

# Universal Gas Constant
R = 8.314


def calculate_decay_constant(
    k_ref,
    Ea,
    temperature
):

    # Convert Celsius to Kelvin
    temp_kelvin = temperature + 273.15

    # Reference temperature (25°C)
    ref_kelvin = 25 + 273.15

    # Arrhenius Equation
    k = k_ref * math.exp(

        (-Ea / R) *
        (
            (1 / temp_kelvin) -
            (1 / ref_kelvin)
        )
    )

    return round(k, 6)


def arrhenius_rate(
    k_ref,
    Ea,
    temperature
):

    return calculate_decay_constant(
        k_ref,
        Ea,
        temperature
    )