def generate_alert_message(

    farmer_name,
    product_name,
    warehouse_name,
    status

):

    return (
        f"Hello {farmer_name}, "
        f"your product "
        f"{product_name} "
        f"in warehouse "
        f"{warehouse_name} "
        f"is currently in "
        f"{status} condition."
    )


def generate_temperature_alert(

    product_name,
    current_temperature,
    status

):

    return (
        f"Temperature Alert: "
        f"{product_name} is in "
        f"{status} temperature condition "
        f"at {current_temperature}°C."
    )


def generate_dispatch_alert(

    product_name,
    remaining_shelf_life

):

    return (
        f"Urgent Dispatch Required for "
        f"{product_name}. "
        f"Remaining shelf life: "
        f"{remaining_shelf_life} days."
    )