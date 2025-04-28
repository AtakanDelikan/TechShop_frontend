import csv
import random

# Possible values for each field
brands = ["Secretlab", "DXRacer", "Herman Miller", "AndaSeat", "Razer", "Noblechairs", "AKRacing", "Cougar", "GT Racing", "Respawn"]
weight_limits = [100, 120, 130, 150, 200]
height_limits = [150, 160, 170, 180, 200]
materials = ["Leather", "Fabric", "Mesh", "PU Leather"]
images = [  "https://techshopimages.blob.core.windows.net/techshop/Chairs1.png",
            "https://techshopimages.blob.core.windows.net/techshop/Chairs2.png",
            "https://techshopimages.blob.core.windows.net/techshop/Chairs3.png",
            "https://techshopimages.blob.core.windows.net/techshop/Chairs4.png",
            "https://techshopimages.blob.core.windows.net/techshop/Chairs5.png" ]

# Function to generate a random gaming chair
def generate_gaming_chair(id):
    brand = random.choice(brands)
    weight_limit = random.choice(weight_limits)
    height_limit = random.choice(height_limits)
    material = random.choice(materials)
    price = random.randint(100, 1500)  # Random price between $100 and $1500
    name = f"{brand} {random.choice(['Titan Evo', 'Master Series', 'Embody', 'Kaiser', 'Iskur', 'Hero', 'Masters Series', 'Armor S', 'GT099', '110'])}"
    description = f"{material} gaming chair by {brand} with a weight limit of {weight_limit}kg and height limit of {height_limit}cm."

    num_images = random.randint(2, 5)
    selected_images = random.sample(images, num_images)
    image_string = "|".join(selected_images)

    return {
        "Category" : "Gaming chairs",
        "Name": name,
        "Description": description,
        "Price": price,
        "Brand": brand,
        "User weight max (kg)": weight_limit,
        "User height (cm)": height_limit,
        "Material": material,
        "Images" : image_string
    }

# Generate 400 gaming chairs
gaming_chairs = [generate_gaming_chair(i) for i in range(1, 401)]

# Save to CSV
with open("Gaming_chairs.csv", "w", newline="") as csvfile:
    fieldnames = ["Category", "Name", "Description", "Images", "Price", "Brand", "User weight max (kg)", "User height (cm)", "Material"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for chair in gaming_chairs:
        writer.writerow(chair)

print("Mockup data generated and saved to gaming_chairs.csv!")