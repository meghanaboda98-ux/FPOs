from database import db

products_collection = db["product_master"]

products = [

    {
        "product_name": "Tomato",
        "category": "Vegetable",
        "optimal_temp": 10,
        "model": "first",
        "k_ref": 0.02,
        "Ea": 45000,
        "quality_limit": 0.3
    },

    {
        "product_name": "Chilli",
        "category": "Vegetable",
        "optimal_temp": 8,
        "model": "first",
        "k_ref": 0.018,
        "Ea": 44000,
        "quality_limit": 0.3
    },

    {
        "product_name": "Carrot",
        "category": "Vegetable",
        "optimal_temp": 0,
        "model": "first",
        "k_ref": 0.005,
        "Ea": 42000,
        "quality_limit": 0.25
    },

    {
        "product_name": "Beetroot",
        "category": "Vegetable",
        "optimal_temp": 0,
        "model": "first",
        "k_ref": 0.006,
        "Ea": 42000,
        "quality_limit": 0.25
    },

    {
        "product_name": "Cucumber",
        "category": "Vegetable",
        "optimal_temp": 10,
        "model": "first",
        "k_ref": 0.025,
        "Ea": 46000,
        "quality_limit": 0.35
    },

    {
        "product_name": "Corn",
        "category": "Vegetable",
        "optimal_temp": 0,
        "model": "first",
        "k_ref": 0.03,
        "Ea": 47000,
        "quality_limit": 0.35
    },

    {
        "product_name": "Cabbage",
        "category": "Vegetable",
        "optimal_temp": 1,
        "model": "first",
        "k_ref": 0.007,
        "Ea": 41000,
        "quality_limit": 0.25
    },

    {
        "product_name": "Spinach",
        "category": "Vegetable",
        "optimal_temp": 2,
        "model": "first",
        "k_ref": 0.04,
        "Ea": 48000,
        "quality_limit": 0.4
    },

    {
        "product_name": "Banana",
        "category": "Fruit",
        "optimal_temp": 13,
        "model": "first",
        "k_ref": 0.03,
        "Ea": 50000,
        "quality_limit": 0.4
    },

    {
        "product_name": "Mango",
        "category": "Fruit",
        "optimal_temp": 12,
        "model": "first",
        "k_ref": 0.028,
        "Ea": 49000,
        "quality_limit": 0.35
    },

    {
        "product_name": "Lemon",
        "category": "Fruit",
        "optimal_temp": 5,
        "model": "first",
        "k_ref": 0.01,
        "Ea": 43000,
        "quality_limit": 0.2
    },

    {
        "product_name": "Pomegranate",
        "category": "Fruit",
        "optimal_temp": 5,
        "model": "first",
        "k_ref": 0.009,
        "Ea": 43000,
        "quality_limit": 0.2
    },

    {
        "product_name": "Grapes",
        "category": "Fruit",
        "optimal_temp": 0,
        "model": "first",
        "k_ref": 0.006,
        "Ea": 42000,
        "quality_limit": 0.2
    },

    {
        "product_name": "Kiwi",
        "category": "Fruit",
        "optimal_temp": 0,
        "model": "first",
        "k_ref": 0.005,
        "Ea": 42000,
        "quality_limit": 0.2
    },

    {
        "product_name": "Milk",
        "category": "Dairy",
        "optimal_temp": 4,
        "model": "zero",
        "k_ref": 0.12,
        "Ea": 35000,
        "quality_limit": 0.1
    },

    {
        "product_name": "Paneer",
        "category": "Dairy",
        "optimal_temp": 4,
        "model": "zero",
        "k_ref": 0.1,
        "Ea": 35000,
        "quality_limit": 0.1
    },

    {
        "product_name": "Cheese",
        "category": "Dairy",
        "optimal_temp": 4,
        "model": "zero",
        "k_ref": 0.02,
        "Ea": 34000,
        "quality_limit": 0.05
    },

    {
        "product_name": "Butter",
        "category": "Dairy",
        "optimal_temp": 4,
        "model": "zero",
        "k_ref": 0.01,
        "Ea": 33000,
        "quality_limit": 0.05
    },

    {
        "product_name": "Chicken",
        "category": "Meat",
        "optimal_temp": -2,
        "model": "second",
        "k_ref": 0.04,
        "Ea": 52000,
        "quality_limit": 0.4
    },

    {
        "product_name": "Mutton",
        "category": "Meat",
        "optimal_temp": -2,
        "model": "second",
        "k_ref": 0.035,
        "Ea": 52000,
        "quality_limit": 0.4
    },

    {
        "product_name": "Fish",
        "category": "Meat",
        "optimal_temp": -2,
        "model": "second",
        "k_ref": 0.05,
        "Ea": 53000,
        "quality_limit": 0.45
    },

    {
        "product_name": "Beef",
        "category": "Meat",
        "optimal_temp": -2,
        "model": "second",
        "k_ref": 0.03,
        "Ea": 52000,
        "quality_limit": 0.35
    },

    {
        "product_name": "Pork",
        "category": "Meat",
        "optimal_temp": -2,
        "model": "second",
        "k_ref": 0.03,
        "Ea": 52000,
        "quality_limit": 0.35
    }
]

# Clear old product master
products_collection.delete_many({})

# Insert products
products_collection.insert_many(products)

print("Product master seeded successfully")