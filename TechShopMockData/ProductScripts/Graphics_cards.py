import csv
import random

# Possible values for each field
brands = ["NVIDIA", "AMD", "ASUS", "MSI", "Gigabyte", "EVGA", "ZOTAC", "Sapphire", "PowerColor", "XFX"]
chipsets = ["GeForce RTX 3060", "GeForce RTX 3070", "GeForce RTX 3080", "GeForce RTX 3090", "GeForce GTX 1660 Super", 
            "Radeon RX 6700 XT", "Radeon RX 6800", "Radeon RX 6900 XT", "Radeon RX 6600 XT", "Radeon RX 6500 XT"]
vram_sizes = [4, 6, 8, 12, 16, 24]
vram_types = ["GDDR5", "GDDR6", "GDDR6X"]
images = [  "https://techshopimages.blob.core.windows.net/techshop/Graphics_Cards1.png",
            "https://techshopimages.blob.core.windows.net/techshop/Graphics_Cards2.png",
            "https://techshopimages.blob.core.windows.net/techshop/Graphics_Cards3.png",
            "https://techshopimages.blob.core.windows.net/techshop/Graphics_Cards4.png",
            "https://techshopimages.blob.core.windows.net/techshop/Graphics_Cards5.png" ]

# Function to generate a random graphics card
def generate_graphics_card(id):
    brand = random.choice(brands)
    chipset = random.choice(chipsets)
    vram_size = random.choice(vram_sizes)
    vram_type = random.choice(vram_types)
    price = random.randint(150, 2000)  # Random price between $150 and $2000
    name = f"{brand} {random.choice(['GeForce', 'Radeon'])} {chipset}"
    description = f"{vram_size}GB {vram_type} {chipset} graphics card by {brand}."

    num_images = random.randint(2, 5)
    selected_images = random.sample(images, num_images)
    image_string = "|".join(selected_images)

    return {
        "Category" : "Graphics cards",
        "Name": name,
        "Description": description,
        "Price": price,
        "Brand": brand,
        "Chipset": chipset,
        "VRAM size (GB)": vram_size,
        "VRAM type": vram_type,
        "Images" : image_string
    }

# Generate 400 graphics cards
graphics_cards = [generate_graphics_card(i) for i in range(1, 401)]

# Save to CSV
with open("Graphics_cards.csv", "w", newline="") as csvfile:
    fieldnames = ["Category", "Name", "Description", "Images", "Price", "Brand", "Chipset", "VRAM size (GB)", "VRAM type"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for card in graphics_cards:
        writer.writerow(card)

print("Mockup data generated and saved to graphics_cards.csv!")