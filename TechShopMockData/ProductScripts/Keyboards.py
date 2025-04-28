import csv
import random

# Possible values for each field
brands = ["Logitech", "Corsair", "Razer", "Keychron", "Ducky", "HyperX", "SteelSeries", "Anne Pro", "Glorious", "Cooler Master"]
connector_types = ["USB-C", "USB-A", "Wireless"]
wireless_list = ["Yes", "No"]
layouts = ["Full-size", "Tenkeyless", "60%"]
cord_lengths = [1.2, 1.5, 1.8, 2.0]
backlight_list = ["Yes", "No"]
images = [  "https://techshopimages.blob.core.windows.net/techshop/Keyboards1.png",
            "https://techshopimages.blob.core.windows.net/techshop/Keyboards2.png",
            "https://techshopimages.blob.core.windows.net/techshop/Keyboards3.png",
            "https://techshopimages.blob.core.windows.net/techshop/Keyboards4.png",
            "https://techshopimages.blob.core.windows.net/techshop/Keyboards5.png" ]

# Function to generate a random keyboard
def generate_keyboard(id):
    brand = random.choice(brands)
    connector_type = random.choice(connector_types)
    wireless = random.choice(wireless_list)
    layout = random.choice(layouts)
    backlight = random.choice(backlight_list)
    cord_length = random.choice(cord_lengths) if wireless == "No" else 0.0
    price = random.randint(50, 200)  # Random price between $50 and $200
    name = f"{brand} {random.choice(['G Pro X', 'K95 RGB', 'Huntsman', 'K6', 'One 2 Mini', 'Alloy FPS', 'Apex 7', 'Anne Pro 2', 'GMMK', 'CK550'])}"
    description = f"{layout} {connector_type} keyboard with {backlight.lower()} backlight."

    num_images = random.randint(2, 5)
    selected_images = random.sample(images, num_images)
    image_string = "|".join(selected_images)

    return {
        "Category" : "Keyboards",
        "Name": name,
        "Description": description,
        "Price": price,
        "Brand": brand,
        "Connector type": connector_type,
        "Wireless": wireless,
        "Layout": layout,
        "Cord length (m)": cord_length,
        "Backlight": backlight,
        "Images" : image_string
    }

# Generate 400 keyboards
keyboards = [generate_keyboard(i) for i in range(1, 401)]

# Save to CSV
with open("Keyboards.csv", "w", newline="") as csvfile:
    fieldnames = ["Category", "Name", "Description", "Images", "Price", "Brand", "Connector type", "Wireless", "Layout", "Cord length (m)", "Backlight"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for keyboard in keyboards:
        writer.writerow(keyboard)

print("Mockup data generated and saved to keyboards.csv!")