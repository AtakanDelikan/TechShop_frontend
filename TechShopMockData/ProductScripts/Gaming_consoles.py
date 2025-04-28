import csv
import random

# Possible values for each field
brands = ["Sony", "Microsoft", "Nintendo", "Valve", "Sega", "Atari", "Ouya", "Neo Geo", "Commodore", "Amstrad"]
handheld_list = ["Yes", "No"]
storages = [64, 128, 256, 512, 1024]
resolutions = ["720p", "1080p", "1440p", "4K"]
cpus = ["AMD Zen 2", "AMD Jaguar", "ARM Cortex", "ARM11", "Intel Core i5", "AMD Ryzen"]
gpus = ["AMD RDNA 2", "NVIDIA Tegra", "AMD GCN", "PowerVR", "PICA200", "Intel UHD Graphics"]
release_years = list(range(2013, 2024))

images = [  "https://techshopimages.blob.core.windows.net/techshop/Consoles1.png",
            "https://techshopimages.blob.core.windows.net/techshop/Consoles2.png",
            "https://techshopimages.blob.core.windows.net/techshop/Consoles3.png",
            "https://techshopimages.blob.core.windows.net/techshop/Consoles4.png",
            "https://techshopimages.blob.core.windows.net/techshop/Consoles5.png" ]

# Function to generate a random gaming console
def generate_console(id):
    brand = random.choice(brands)
    handheld = random.choice(handheld_list)
    storage = random.choice(storages)
    resolution = random.choice(resolutions)
    cpu = random.choice(cpus)
    gpu = random.choice(gpus)
    release_year = random.choice(release_years)
    price = random.randint(100, 800)  # Random price between $100 and $800
    name = f"{brand} {random.choice(['PlayStation', 'Xbox', 'Switch', 'Vita', '3DS', 'Steam Deck', 'Genesis', 'Lynx', 'Amiga', 'CPC'])} {random.choice(['5', 'Series X', 'OLED', 'Lite', 'Pro', 'One X', 'XL', 'Deck', 'Mini', 'Classic'])}"
    description = f"{brand} gaming console with {storage}GB storage, {resolution} resolution, and {cpu} CPU."

    num_images = random.randint(2, 5)
    selected_images = random.sample(images, num_images)
    image_string = "|".join(selected_images)

    return {
        "Category" : "Gaming consoles",
        "Name": name,
        "Description": description,
        "Price": price,
        "Brand": brand,
        "Handheld": handheld,
        "Storage (GB)": storage,
        "Resolution": resolution,
        "CPU": cpu,
        "GPU": gpu,
        "Release Year": release_year,
        "Images" : image_string
    }

# Generate 400 gaming consoles
consoles = [generate_console(i) for i in range(1, 401)]

# Save to CSV
with open("Gaming_consoles.csv", "w", newline="") as csvfile:
    fieldnames = ["Category", "Name", "Description", "Images", "Price", "Brand", "Handheld", "Storage (GB)", "Resolution", "CPU", "GPU", "Release Year"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for console in consoles:
        writer.writerow(console)

print("Mockup data generated and saved to gaming_consoles.csv!")