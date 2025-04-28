import csv
import random

# Possible values for each field
brands = ["Noctua", "Cooler Master", "Corsair", "be quiet!", "NZXT", "Deepcool", "Arctic", "Thermaltake", "Scythe", "EVGA"]
tdp_ratings = [100, 150, 200, 250, 300]
cooler_heights = [120, 140, 160, 180, 200]
sockets = ["LGA 1200", "LGA 1700", "AM4", "AM5", "LGA 1151", "TR4"]
fan_diameters = [80, 120, 140, 200]
images = [  "https://techshopimages.blob.core.windows.net/techshop/Coolers1.png",
            "https://techshopimages.blob.core.windows.net/techshop/Coolers2.png",
            "https://techshopimages.blob.core.windows.net/techshop/Coolers3.png",
            "https://techshopimages.blob.core.windows.net/techshop/Coolers4.png",
            "https://techshopimages.blob.core.windows.net/techshop/Coolers5.png" ]

# Function to generate a random CPU cooler
def generate_cooler(id):
    brand = random.choice(brands)
    tdp = random.choice(tdp_ratings)
    cooler_height = random.choice(cooler_heights)
    socket = random.choice(sockets)
    fan_diameter = random.choice(fan_diameters)
    price = random.randint(30, 200)  # Random price between $30 and $200
    name = f"{brand} {random.choice(['NH-D15', 'Hyper 212', 'H150i', 'Dark Rock Pro', 'Kraken', 'AS500', 'Freezer 34', 'Water 3.0', 'Fuma 2', 'MasterLiquid'])}"
    description = f"{cooler_height}mm {socket} cooler with {tdp}W TDP and {fan_diameter}mm fan."

    num_images = random.randint(2, 5)
    selected_images = random.sample(images, num_images)
    image_string = "|".join(selected_images)

    return {
        "Category": "Coolers",
        "Name": name,
        "Description": description,
        "Price": price,
        "Brand": brand,
        "Rated power (TDP)": tdp,
        "Cooler Height (mm)": cooler_height,
        "Supported CPU socket": socket,
        "Fan diameter (mm)": fan_diameter,
        "Images" : image_string
    }

# Generate 400 CPU coolers
coolers = [generate_cooler(i) for i in range(1, 401)]

# Save to CSV
with open("Coolers.csv", "w", newline="") as csvfile:
    fieldnames = ["Category", "Name", "Description", "Images", "Price", "Brand", "Rated power (TDP)", "Cooler Height (mm)", "Supported CPU socket", "Fan diameter (mm)"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for cooler in coolers:
        writer.writerow(cooler)

print("Mockup data generated and saved to coolers.csv!")