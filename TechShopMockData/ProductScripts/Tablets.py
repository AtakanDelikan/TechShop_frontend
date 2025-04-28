import csv
import random

# Possible values for each field
brands = ["Apple", "Samsung", "Microsoft", "Lenovo", "Amazon", "Huawei", "Google", "Xiaomi", "Asus", "Acer"]
sizes = [8.0, 9.7, 10.1, 10.5, 11.0, 12.9, 13.0, 14.6]
storages = [32, 64, 128, 256, 512]
rams = [2, 4, 6, 8, 12]
batteries = [5000, 6000, 7000, 8000, 10000]
resolutions = ["800x1280", "1200x1920", "1600x2560", "2048x2732", "1440x2160", "1848x2960"]
weights = [300, 400, 500, 600, 700]
headphone_jacks = ["Yes", "No"]
network_types = ["Wi-Fi Only", "4G LTE", "5G"]
images = [  "https://techshopimages.blob.core.windows.net/techshop/Tablets1.png",
            "https://techshopimages.blob.core.windows.net/techshop/Tablets2.png",
            "https://techshopimages.blob.core.windows.net/techshop/Tablets3.png",
            "https://techshopimages.blob.core.windows.net/techshop/Tablets4.png",
            "https://techshopimages.blob.core.windows.net/techshop/Tablets5.png" ]

# Function to generate a random tablet
def generate_tablet(id):
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
    name = f"{brand} {random.choice(['iPad', 'Galaxy Tab', 'Surface', 'Tab', 'Fire HD', 'MatePad', 'Pixel Slate', 'Pad', 'ZenPad', 'Iconia'])} {random.choice(['Pro', 'Air', 'S8', 'P11', '10', '12.6', 'Slate', '5', 'A8', 'HD 10'])}"
    description = f"{size}-inch {brand} tablet with {storage}GB storage, {ram}GB RAM, and {battery}mAh battery."
    
    num_images = random.randint(2, 5)
    selected_images = random.sample(images, num_images)
    image_string = "|".join(selected_images)

    return {
        "Category" : "Tablets",
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

# Generate 400 tablets
tablets = [generate_tablet(i) for i in range(1, 401)]

# Save to CSV
with open("Tablets.csv", "w", newline="") as csvfile:
    fieldnames = ["Category", "Name", "Description", "Images", "Price", "Brand", "Size (inches)", "Storage (GB)", "RAM (GB)", "Battery (mAh)", "Resolution", "Weight (g)", "Headphone jack", "Network type"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for tablet in tablets:
        writer.writerow(tablet)

print("Mockup data generated and saved to tablets.csv!")