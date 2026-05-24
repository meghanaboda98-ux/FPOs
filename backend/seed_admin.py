from database import db
from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

users_collection = db["users"]

# Admin details
admin_data = {
    "name": "Super Admin",
    "email": "admin@gmail.com",
    "password": "admin123",
    "role": "SUPER_ADMIN"
}

# Check if admin already exists
existing_admin = users_collection.find_one({
    "email": admin_data["email"]
})

if existing_admin:
    print("Admin already exists")

else:
    # Hash password
    hashed_password = pwd_context.hash(
        admin_data["password"]
    )

    # Create admin document
    new_admin = {
        "name": admin_data["name"],
        "email": admin_data["email"],
        "password": hashed_password,
        "role": admin_data["role"]
    }

    # Insert into MongoDB
    users_collection.insert_one(new_admin)

    print("SUPER_ADMIN seeded successfully")