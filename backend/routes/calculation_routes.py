from fastapi import APIRouter
from calculations.shelf_life import (
    calculate_quality
)

router = APIRouter()

@router.get("/test")

def test_calculation():

    quality = calculate_quality(
        model="first",
        k_ref=0.02,
        Ea=45000,
        storage_temp=10,
        days_stored=5
    )

    return {
        "quality": quality
    }