from database import SessionLocal
from models.user_model import User
from auth import hash_password
db = SessionLocal()

# =========================================
# ADMIN DETAILS
# =========================================

admin_data = {
    "name": "Super Admin",
    "email": "admin@gmail.com",
    "password": "admin123",
    "role": "SUPER_ADMIN"
}

# =========================================
# CHECK IF ADMIN EXISTS
# =========================================
existing_admin = db.query(User).filter(
    User.email == admin_data["email"]

).first()

if existing_admin:
    print("Admin already exists")


else:
    hashed_password = hash_password(
        admin_data["password"]
    )

    new_admin = User(
        name=admin_data["name"],
        email=admin_data["email"],
        password=hashed_password,
        role=admin_data["role"]
    )

    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)
    print(
        "SUPER_ADMIN seeded successfully"
    )


db.close()