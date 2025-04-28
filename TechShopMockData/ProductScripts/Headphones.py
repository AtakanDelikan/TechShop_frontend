import csv
import random

# Possible values for each field
brands = ["Sony", "Bose", "Sennheiser", "JBL", "Apple", "Beats", "Audio-Technica", "Jabra", "Samsung", "LG"]
connector_types = ["3.5mm", "USB-C", "Wireless"]
cord_lengths = [1.2, 1.5, 1.8, 2.0]
styles = ["Over-ear", "On-ear", "In-ear"]
noise_cancelling_list = ["Yes", "No"]
images = [  "https://techshopimages.blob.core.windows.net/techshop/Headphones1.png",
            "https://techshopimages.blob.core.windows.net/techshop/Headphones2.png",
            "https://techshopimages.blob.core.windows.net/techshop/Headphones3.png",
            "https://techshopimages.blob.core.windows.net/techshop/Headphones4.png",
            "https://techshopimages.blob.core.windows.net/techshop/Headphones5.png" ]

# Function to generate a random headphone
def generate_headphone(id):
    brand = random.choice(brands)
    connector_type = random.choice(connector_types)
    cord_length = random.choice(cord_lengths) if connector_type != "Wireless" else 0.0
    style = random.choice(styles)
    noise_cancelling = random.choice(noise_cancelling_list)
    price = random.randint(50, 600)  # Random price between $50 and $600
    name = f"{brand} {random.choice(['WH-1000XM4', 'QuietComfort 45', 'HD 660 S', 'Live 650BTNC', 'AirPods Max', 'Solo Pro', 'ATH-M50X', 'Elite 85h', 'WF-1000XM4', 'SoundSport Wireless'])}"
    description = f"{style} {connector_type} headphones with{"out" if noise_cancelling == "No" else ""} noise cancelling."

    num_images = random.randint(2, 5)
    selected_images = random.sample(images, num_images)
    image_string = "|".join(selected_images)

    return {
        "Category" : "Headphones",
        "Name": name,
        "Description": description,
        "Price": price,
        "Brand": brand,
        "Connector type": connector_type,
        "Cord length (m)": cord_length,
        "Style": style,
        "Noise cancelling": noise_cancelling,
        "Images" : image_string
    }

# Generate 400 headphones
headphones = [generate_headphone(i) for i in range(1, 401)]

# Save to CSV
with open("Headphones.csv", "w", newline="") as csvfile:
    fieldnames = ["Category", "Name", "Description", "Images", "Price", "Brand", "Connector type", "Cord length (m)", "Style", "Noise cancelling"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for headphone in headphones:
        writer.writerow(headphone)

print("Mockup data generated and saved to headphones.csv!")