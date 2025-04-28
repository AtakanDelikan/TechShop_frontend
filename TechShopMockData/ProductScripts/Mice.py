import csv
import random

# Possible values for each field
brands = ["Logitech", "Razer", "Corsair", "SteelSeries", "Glorious", "HyperX", "ASUS", "Microsoft", "HP", "Dell"]
connector_types = ["USB-A", "USB-C", "Wireless"]
wireless_list = ["Yes", "No"]
cord_lengths = [1.2, 1.5, 1.8, 2.0]
dpi_list = [800, 1600, 3200, 6400, 12000]
weights = [70, 80, 90, 100, 120]
images = [  "https://techshopimages.blob.core.windows.net/techshop/Mice1.png",
            "https://techshopimages.blob.core.windows.net/techshop/Mice2.png",
            "https://techshopimages.blob.core.windows.net/techshop/Mice3.png",
            "https://techshopimages.blob.core.windows.net/techshop/Mice4.png",
            "https://techshopimages.blob.core.windows.net/techshop/Mice5.png" ]

# Function to generate a random mouse
def generate_mouse(id):
    brand = random.choice(brands)
    connector_type = random.choice(connector_types)
    wireless = random.choice(wireless_list)
    cord_length = random.choice(cord_lengths) if wireless == "No" else 0.0
    dpi = random.choice(dpi_list)
    weight = random.choice(weights)
    price = random.randint(20, 150)  # Random price between $20 and $150
    name = f"{brand} {random.choice(['G Pro X', 'DeathAdder', 'Dark Core', 'Rival', 'Model O', 'Pulsefire', 'Gladius', 'MX Master', 'Basilisk', 'Harpoon'])}"
    description = f"{connector_type} mouse with {dpi} DPI and {weight}g weight."

    num_images = random.randint(2, 5)
    selected_images = random.sample(images, num_images)
    image_string = "|".join(selected_images)

    return {
        "Category" : "Mice",
        "Name": name,
        "Description": description,
        "Price": price,
        "Brand": brand,
        "Connector type": connector_type,
        "Wireless": wireless,
        "Cord length (m)": cord_length,
        "DPI": dpi,
        "Weight (g)": weight,
        "Images" : image_string
    }

# Generate 400 mice
mice = [generate_mouse(i) for i in range(1, 401)]

# Save to CSV
with open("Mice.csv", "w", newline="") as csvfile:
    fieldnames = ["Category", "Name", "Description", "Images", "Price", "Brand", "Connector type", "Wireless", "Cord length (m)", "DPI", "Weight (g)"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for mouse in mice:
        writer.writerow(mouse)

print("Mockup data generated and saved to mice.csv!")