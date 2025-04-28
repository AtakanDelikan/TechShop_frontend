import csv
import random

# Possible values for each field
brands = ["ASUS", "MSI", "Gigabyte", "ASRock", "Biostar", "EVGA", "Colorful"]
form_factors = ["ATX", "Micro-ATX", "Mini-ITX"]
sockets = ["LGA 1200", "LGA 1700", "AM4", "AM5", "LGA 1151", "TR4"]
chipsets = ["Z690", "B550", "X570", "H610", "B660", "Z790", "X670", "B450", "H510"]
ram_slots = [2, 4, 8]
memory_types = ["DDR4", "DDR5"]
wifi_list = ["Yes", "No"]
images = [  "https://techshopimages.blob.core.windows.net/techshop/Motherboards1.png",
            "https://techshopimages.blob.core.windows.net/techshop/Motherboards2.png",
            "https://techshopimages.blob.core.windows.net/techshop/Motherboards3.png",
            "https://techshopimages.blob.core.windows.net/techshop/Motherboards4.png",
            "https://techshopimages.blob.core.windows.net/techshop/Motherboards5.png" ]

# Function to generate a random motherboard
def generate_motherboard(id):
    brand = random.choice(brands)
    form_factor = random.choice(form_factors)
    socket = random.choice(sockets)
    chipset = random.choice(chipsets)
    ram_slots_count = random.choice(ram_slots)
    memory_type = random.choice(memory_types)
    wifi = random.choice(wifi_list)
    price = random.randint(50, 600)  # Random price between $50 and $600
    name = f"{brand} {random.choice(['ROG Strix', 'MAG', 'AORUS', 'Prime', 'MPG', 'Pro', 'Crosshair', 'Tomahawk'])} {chipset}"
    description = f"{form_factor} {socket} motherboard with {chipset} chipset and {wifi.lower()} WiFi."

    num_images = random.randint(2, 5)
    selected_images = random.sample(images, num_images)
    image_string = "|".join(selected_images)

    return {
        "Category" : "Motherboards",
        "Name": name,
        "Description": description,
        "Price": price,
        "Brand": brand,
        "Form factor": form_factor,
        "Socket": socket,
        "Chipset": chipset,
        "Number of RAM slots": ram_slots_count,
        "Supported memory type": memory_type,
        "Integrated Wifi": wifi,
        "Images" : image_string
    }

# Generate 400 motherboards
motherboards = [generate_motherboard(i) for i in range(1, 401)]

# Save to CSV
with open("Motherboards.csv", "w", newline="") as csvfile:
    fieldnames = ["Category", "Name", "Description", "Images", "Price", "Brand", "Form factor", "Socket", "Chipset", "Number of RAM slots", "Supported memory type", "Integrated Wifi"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for motherboard in motherboards:
        writer.writerow(motherboard)

print("Mockup data generated and saved to motherboards.csv!")