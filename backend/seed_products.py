from database import SessionLocal
from models.product_model import Product

products = [

    {
        "name": "Tomato",
        "category": "Vegetable",
        "optimal_temperature": 10,
        "humidity": 90,
        "shelf_life": 14,
        "respiration_rate": 28,
        "storage_type": "Cold Storage",
        "min_temperature": 8,
        "max_temperature": 12,
        "quality_threshold": 70
    },

    {
        "name": "Chilli",
        "category": "Vegetable",
        "optimal_temperature": 8,
        "humidity": 85,
        "shelf_life": 12,
        "respiration_rate": 24,
        "storage_type": "Cold Storage",
        "min_temperature": 7,
        "max_temperature": 10,
        "quality_threshold": 72
    },

    {
        "name": "Carrot",
        "category": "Vegetable",
        "optimal_temperature": 0,
        "humidity": 95,
        "shelf_life": 60,
        "respiration_rate": 12,
        "storage_type": "Cold Storage",
        "min_temperature": 0,
        "max_temperature": 2,
        "quality_threshold": 85
    },

    {
        "name": "Beetroot",
        "category": "Vegetable",
        "optimal_temperature": 0,
        "humidity": 95,
        "shelf_life": 50,
        "respiration_rate": 10,
        "storage_type": "Cold Storage",
        "min_temperature": 0,
        "max_temperature": 2,
        "quality_threshold": 85
    },

    {
        "name": "Cucumber",
        "category": "Vegetable",
        "optimal_temperature": 10,
        "humidity": 95,
        "shelf_life": 10,
        "respiration_rate": 30,
        "storage_type": "Cold Storage",
        "min_temperature": 8,
        "max_temperature": 12,
        "quality_threshold": 68
    },

    {
        "name": "Corn",
        "category": "Vegetable",
        "optimal_temperature": 0,
        "humidity": 90,
        "shelf_life": 8,
        "respiration_rate": 35,
        "storage_type": "Cold Storage",
        "min_temperature": 0,
        "max_temperature": 2,
        "quality_threshold": 65
    },

    {
        "name": "Cabbage",
        "category": "Vegetable",
        "optimal_temperature": 1,
        "humidity": 98,
        "shelf_life": 90,
        "respiration_rate": 8,
        "storage_type": "Cold Storage",
        "min_temperature": 0,
        "max_temperature": 2,
        "quality_threshold": 90
    },

    {
        "name": "Spinach",
        "category": "Vegetable",
        "optimal_temperature": 2,
        "humidity": 95,
        "shelf_life": 7,
        "respiration_rate": 45,
        "storage_type": "Cold Storage",
        "min_temperature": 0,
        "max_temperature": 3,
        "quality_threshold": 60
    },

    {
        "name": "Banana",
        "category": "Fruit",
        "optimal_temperature": 13,
        "humidity": 90,
        "shelf_life": 14,
        "respiration_rate": 40,
        "storage_type": "Cold Storage",
        "min_temperature": 12,
        "max_temperature": 14,
        "quality_threshold": 70
    },

    {
        "name": "Mango",
        "category": "Fruit",
        "optimal_temperature": 12,
        "humidity": 90,
        "shelf_life": 21,
        "respiration_rate": 35,
        "storage_type": "Cold Storage",
        "min_temperature": 10,
        "max_temperature": 13,
        "quality_threshold": 75
    },

    {
        "name": "Lemon",
        "category": "Fruit",
        "optimal_temperature": 5,
        "humidity": 85,
        "shelf_life": 60,
        "respiration_rate": 6,
        "storage_type": "Cold Storage",
        "min_temperature": 4,
        "max_temperature": 7,
        "quality_threshold": 88
    },

    {
        "name": "Pomegranate",
        "category": "Fruit",
        "optimal_temperature": 5,
        "humidity": 90,
        "shelf_life": 90,
        "respiration_rate": 5,
        "storage_type": "Cold Storage",
        "min_temperature": 4,
        "max_temperature": 6,
        "quality_threshold": 90
    },

    {
        "name": "Grapes",
        "category": "Fruit",
        "optimal_temperature": 0,
        "humidity": 95,
        "shelf_life": 60,
        "respiration_rate": 4,
        "storage_type": "Cold Storage",
        "min_temperature": -1,
        "max_temperature": 1,
        "quality_threshold": 92
    },

    {
        "name": "Kiwi",
        "category": "Fruit",
        "optimal_temperature": 0,
        "humidity": 90,
        "shelf_life": 120,
        "respiration_rate": 5,
        "storage_type": "Controlled Atmosphere",
        "min_temperature": -1,
        "max_temperature": 1,
        "quality_threshold": 94
    },

    {
        "name": "Milk",
        "category": "Dairy",
        "optimal_temperature": 4,
        "humidity": 80,
        "shelf_life": 7,
        "respiration_rate": 0,
        "storage_type": "Refrigerated",
        "min_temperature": 2,
        "max_temperature": 5,
        "quality_threshold": 95
    },

    {
        "name": "Paneer",
        "category": "Dairy",
        "optimal_temperature": 4,
        "humidity": 80,
        "shelf_life": 10,
        "respiration_rate": 0,
        "storage_type": "Refrigerated",
        "min_temperature": 2,
        "max_temperature": 5,
        "quality_threshold": 90
    },

    {
        "name": "Cheese",
        "category": "Dairy",
        "optimal_temperature": 4,
        "humidity": 75,
        "shelf_life": 180,
        "respiration_rate": 0,
        "storage_type": "Refrigerated",
        "min_temperature": 2,
        "max_temperature": 6,
        "quality_threshold": 96
    },

    {
        "name": "Butter",
        "category": "Dairy",
        "optimal_temperature": 4,
        "humidity": 75,
        "shelf_life": 120,
        "respiration_rate": 0,
        "storage_type": "Refrigerated",
        "min_temperature": 2,
        "max_temperature": 6,
        "quality_threshold": 96
    },

    {
        "name": "Chicken",
        "category": "Meat",
        "optimal_temperature": -2,
        "humidity": 85,
        "shelf_life": 10,
        "respiration_rate": 0,
        "storage_type": "Frozen Storage",
        "min_temperature": -4,
        "max_temperature": 0,
        "quality_threshold": 85
    },

    {
        "name": "Mutton",
        "category": "Meat",
        "optimal_temperature": -2,
        "humidity": 85,
        "shelf_life": 12,
        "respiration_rate": 0,
        "storage_type": "Frozen Storage",
        "min_temperature": -4,
        "max_temperature": 0,
        "quality_threshold": 85
    },

    {
        "name": "Fish",
        "category": "Meat",
        "optimal_temperature": -2,
        "humidity": 90,
        "shelf_life": 7,
        "respiration_rate": 0,
        "storage_type": "Frozen Storage",
        "min_temperature": -5,
        "max_temperature": -1,
        "quality_threshold": 82
    },

    {
        "name": "Beef",
        "category": "Meat",
        "optimal_temperature": -2,
        "humidity": 85,
        "shelf_life": 15,
        "respiration_rate": 0,
        "storage_type": "Frozen Storage",
        "min_temperature": -4,
        "max_temperature": 0,
        "quality_threshold": 88
    },

    {
        "name": "Pork",
        "category": "Meat",
        "optimal_temperature": -2,
        "humidity": 85,
        "shelf_life": 14,
        "respiration_rate": 0,
        "storage_type": "Frozen Storage",
        "min_temperature": -4,
        "max_temperature": 0,
        "quality_threshold": 88
    }

]
db = SessionLocal()

for item in products:

    existing = db.query(Product).filter(
        Product.name == item["name"]
    ).first()

    if existing:
        continue

    product = Product(
        name=item["name"],
        category=item["category"],
        optimal_temperature=item["optimal_temperature"],
        humidity=item["humidity"],
        shelf_life=item["shelf_life"],
        respiration_rate=item["respiration_rate"],
        storage_type=item["storage_type"],
        min_temperature=item["min_temperature"],
        max_temperature=item["max_temperature"],
        quality_threshold=item["quality_threshold"],
        model="first",

        k_ref={
            "Tomato": 0.008,
            "Banana": 0.010,
            "Mango": 0.009,
            "Grapes": 0.004,
            "Lemon": 0.003,
            "Milk": 0.015,
            "Paneer": 0.018,
            "Cheese": 0.002,
            "Chicken": 0.020,
            "Fish": 0.025
        }.get(item["name"], 0.005),

        Ea={
            "Tomato": 50000,
            "Banana": 52000,
            "Mango": 51000,
            "Grapes": 47000,
            "Lemon": 45000,
            "Milk": 55000,
            "Paneer": 58000,
            "Cheese": 42000,
            "Chicken": 60000,
            "Fish": 65000
        }.get(item["name"], 45000)
    )

    db.add(product)

db.commit()
db.close()

print("Products seeded successfully")