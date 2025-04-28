import csv
import random

# Possible values for each field
brands = ["Dell", "HP", "Lenovo", "Apple", "Asus", "Acer", "MSI", "Razer"]
processors = ["Intel i5", "Intel i7", "Intel i9", "AMD Ryzen 5", "AMD Ryzen 7", "AMD Ryzen 9", "Apple M1", "Apple M2"]
gpus = ["NVIDIA GTX 1650", "NVIDIA GTX 1660", "NVIDIA RTX 3060", "NVIDIA RTX 3070", "AMD Radeon RX 550", "AMD Radeon RX 580", "Integrated", "Apple M1 GPU"]
os_list = ["Windows", "Ubuntu", "Mac OS", "DOS"]
ram_list = [4, 8, 16, 32]
storage_list = [128, 256, 512, 1024, 2048]
wifi_list = ["Yes", "No"]
images = [  "https://techshopimages.blob.core.windows.net/techshop/PCs1.png",
            "https://techshopimages.blob.core.windows.net/techshop/PCs2.png",
            "https://techshopimages.blob.core.windows.net/techshop/PCs3.png",
            "https://techshopimages.blob.core.windows.net/techshop/PCs4.png",
            "https://techshopimages.blob.core.windows.net/techshop/PCs5.png" ]

# Function to generate a random PC
def generate_pc(id):
    brand = random.choice(brands)
    processor = random.choice(processors)
    os = random.choice(os_list)
    gpu = random.choice(gpus)
    ram = random.choice(ram_list)
    storage = random.choice(storage_list)
    wifi = random.choice(wifi_list)
    price = random.randint(500, 3000)  # Random price between $500 and $3000
    name = f"{brand} {random.choice(['XPS', 'Pavilion', 'ThinkPad', 'MacBook', 'ROG', 'Predator'])} {random.randint(10, 99)}"
    description = f"High-performance {brand} PC with {processor}, {ram}GB RAM, and {storage}GB storage."

    num_images = random.randint(2, 5)
    selected_images = random.sample(images, num_images)
    image_string = "|".join(selected_images)

    return {
        "Category" : "Personal computers",
        "Name": name,
        "Description": description,
        "Price": price,
        "Brand": brand,
        "Processor": processor,
        "Operating System": os,
        "GPU": gpu,
        "RAM (GB)": ram,
        "Storage (GB)": storage,
        "Wifi": wifi,
        "Images" : image_string
    }

# Generate 400 PCs
pcs = [generate_pc(i) for i in range(1, 401)]

# Save to CSV
with open("Personal_computers.csv", "w", newline="") as csvfile:
    fieldnames = ["Category", "Name", "Description", "Images", "Price", "Brand", "Processor", "Operating System", "GPU", "RAM (GB)", "Storage (GB)", "Wifi"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for pc in pcs:
        writer.writerow(pc)

print("Mockup data generated and saved to pcs.csv!")