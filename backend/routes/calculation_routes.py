from fastapi import APIRouter

from calculations.prediction import (

    predict_quality,
    predict_spoilage,
    predict_transport_quality,
    predict_remaining_shelf_life,
    calculate_dispatch_priority,
    check_temperature_status,
    check_chilling_injury
)

router = APIRouter()

@router.post("/quality")
def quality_prediction(data: dict):

    quality = predict_quality(

        data["initial_quality"],
        data["model"],
        data["k_ref"],
        data["Ea"],
        data["current_temperature"],
        data["storage_days"]

    )

    return {
        "quality": quality
    }


@router.post("/spoilage")
def spoilage_prediction(data: dict):

    spoilage = predict_spoilage(
        data["current_temperature"],
        data["optimal_temperature"],
        data["storage_days"],
        data["shelf_life"]
    )

    return {
        "spoilage": spoilage
    }


@router.post("/transport")
def transport_prediction(data: dict):

    quality = predict_transport_quality(
        data["transport_temperature"],
        data["optimal_temperature"],
        data["travel_hours"]
    )

    return {
        "transport_quality": quality
    }

@router.post("/shelf-life")
def shelf_life_prediction(data: dict):

    remaining = predict_remaining_shelf_life(
        data["shelf_life"],
        data["storage_days"]
    )

    return {
        "remaining_shelf_life": remaining
    }


@router.post("/dispatch-priority")
def dispatch_priority(data: dict):

    priority = calculate_dispatch_priority(
        data["quality"],
        data["shelf_life_remaining"]
    )

    return {
        "dispatch_priority": priority
    }

@router.post("/temperature-status")
def temperature_status(data: dict):

    status = check_temperature_status(
        data["current_temperature"],
        data["min_temperature"],
        data["max_temperature"]
    )

    return {
        "status": status
    }


@router.post("/chilling-injury")
def chilling_injury(data: dict):

    status = check_chilling_injury(
        data["current_temperature"],
        data["min_temperature"]
    )

    return {
        "status": status
    }