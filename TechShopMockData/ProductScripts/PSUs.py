import csv
import random

# Possible values for each field
brands = ["Corsair", "EVGA", "Seasonic", "Thermaltake", "Cooler Master", "be quiet!", "FSP", "Antec", "SilverStone", "NZXT"]
wattages = [400, 500, 600, 750, 850, 1000]
form_factors = ["ATX", "SFX", "TFX"]
efficiency_ratings = ["80+ Bronze", "80+ Silver", "80+ Gold", "80+ Platinum", "80+ Titanium"]
images = [  "https://techshopimages.blob.core.windows.net/techshop/PSUs1.png",
            "https://techshopimages.blob.core.windows.net/techshop/PSUs2.png",
            "https://techshopimages.blob.core.windows.net/techshop/PSUs3.png",
            "https://techshopimages.blob.core.windows.net/techshop/PSUs4.png",
            "https://techshopimages.blob.core.windows.net/techshop/PSUs5.png" ]

# Function to generate a random PSU
def generate_psu(id):
    brand = random.choice(brands)
    wattage = random.choice(wattages)
    form_factor = random.choice(form_factors)
    efficiency_rating = random.choice(efficiency_ratings)
    price = random.randint(30, 300)  # Random price between $30 and $300
    name = f"{brand} {random.choice(['RM', 'SuperNOVA', 'Focus', 'Toughpower', 'SF', 'CX', 'PRIME', 'Smart', 'HX', 'TX'])}{wattage}"
    description = f"{wattage}W {form_factor} PSU with {efficiency_rating} efficiency."

    num_images = random.randint(2, 5)
    selected_images = random.sample(images, num_images)
    image_string = "|".join(selected_images)

    return {
        "Category" : "PSUs",
        "Name": name,
        "Description": description,
        "Price": price,
        "Brand": brand,
        "Wattage": wattage,
        "Form factor": form_factor,
        "Efficiency rating": efficiency_rating,
        "Images" : image_string
    }

# Generate 400 PSUs
psus = [generate_psu(i) for i in range(1, 401)]

# Save to CSV
with open("PSUs.csv", "w", newline="") as csvfile:
    fieldnames = ["Category", "Name", "Description", "Images", "Price", "Brand", "Wattage", "Form factor", "Efficiency rating"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for psu in psus:
        writer.writerow(psu)

print("Mockup data generated and saved to psus.csv!")