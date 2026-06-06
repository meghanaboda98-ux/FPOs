from calculations.prediction import (
    predict_quality,
    predict_spoilage,
    predict_transport_quality,
    predict_remaining_shelf_life,
    calculate_dispatch_priority,
    check_temperature_status,
    check_chilling_injury
)

def process_inventory_prediction(

    product,
    current_temperature,
    storage_days

):

    quality = predict_quality(
        initial_quality=100,
        model=product.model,
        k_ref=product.k_ref,
        Ea=product.Ea,
        current_temperature=current_temperature,
        storage_days=storage_days
    )

    spoilage = predict_spoilage(
        current_temperature=current_temperature,
        optimal_temperature=product.optimal_temperature,
        storage_days=storage_days,
        shelf_life=product.shelf_life
    )

    remaining_shelf_life = predict_remaining_shelf_life(
        shelf_life=product.shelf_life,
        storage_days=storage_days
    )

    dispatch_priority = calculate_dispatch_priority(
        quality,
        remaining_shelf_life
    )

    temperature_status = check_temperature_status(
        current_temperature,
        product.min_temperature,
        product.max_temperature
    )

    chilling_injury = check_chilling_injury(
        current_temperature,
        product.min_temperature
    )

    return {

        "quality": quality,

        "spoilage": spoilage,

        "remaining_shelf_life":
        remaining_shelf_life,

        "dispatch_priority":
        dispatch_priority,

        "temperature_status":
        temperature_status,

        "chilling_injury":
        chilling_injury
    }

def process_transport_prediction(

    transport_temperature,
    optimal_temperature,
    travel_hours

):

    transport_quality = predict_transport_quality(
        transport_temperature,
        optimal_temperature,
        travel_hours
    )

    return transport_quality