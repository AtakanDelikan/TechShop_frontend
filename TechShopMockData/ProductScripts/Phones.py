import csv
import random

# Possible values for each field
brands = ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi", "Sony", "LG", "Motorola", "Nokia", "Huawei"]
sizes = [5.5, 6.0, 6.2, 6.5, 6.7, 6.9]
storages = [64, 128, 256, 512, 1024]
rams = [4, 6, 8, 12, 16]
batteries = [3000, 4000, 4500, 5000, 6000]
resolutions = ["720x1280", "1080x1920", "1440x2560", "1440x3200"]
weights = [150, 170, 190, 200, 220]
headphone_jacks = ["Yes", "No"]
network_types = ["4G LTE", "5G"]
images = [  "https://techshopimages.blob.core.windows.net/techshop/Phones1.png",
            "https://techshopimages.blob.core.windows.net/techshop/Phones2.png",
            "https://techshopimages.blob.core.windows.net/techshop/Phones3.png",
            "https://techshopimages.blob.core.windows.net/techshop/Phones4.png",
            "https://techshopimages.blob.core.windows.net/techshop/Phones5.png" ]

# Function to generate a random phone
def generate_phone(id):
    brand = random.choice(brands)
    size = random.choice(sizes)
    storage = random.choice(storages)
    ram = random.choice(rams)
    battery = random.choice(batteries)
    resolution = random.choice(resolutions)
    weight = random.choice(weights)
    headphone_jack = random.choice(headphone_jacks)
    network_type = random.choice(network_types)
    price = random.randint(100, 1500)  # Random price between $100 and $1500
    name = f"{brand} {random.choice(['iPhone', 'Galaxy', 'Pixel', 'Nord', 'Redmi', 'Xperia', 'G', 'Moto', 'Lumia', 'Mate'])} {random.choice(['14 Pro', 'S22 Ultra', '7 Pro', '10 Pro', 'Note 11', 'SE', 'A53', '6a', '2T', 'X4 Pro'])}"
    description = f"{size}-inch {brand} phone with {storage}GB storage, {ram}GB RAM, and {battery}mAh battery."

    num_images = random.randint(2, 5)
    selected_images = random.sample(images, num_images)
    image_string = "|".join(selected_images)
    
    return {
        "Category" : "Phones",
        "Name": name,
        "Description": description,
        "Price": price,
        "Brand": brand,
        "Size (inches)": size,
        "Storage (GB)": storage,
        "RAM (GB)": ram,
        "Battery (mAh)": battery,
        "Resolution": resolution,
        "Weight (g)": weight,
        "Headphone jack": headphone_jack,
        "Network type": network_type,
        "Images" : image_string
    }

# Generate 400 phones
phones = [generate_phone(i) for i in range(1, 401)]

# Save to CSV
with open("Phones.csv", "w", newline="") as csvfile:
    fieldnames = ["Category", "Name", "Description", "Images", "Price", "Brand", "Size (inches)", "Storage (GB)", "RAM (GB)", "Battery (mAh)", "Resolution", "Weight (g)", "Headphone jack", "Network type"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for phone in phones:
        writer.writerow(phone)

print("Mockup data generated and saved to phones.csv!")