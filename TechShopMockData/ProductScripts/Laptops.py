import csv
import random

# Possible values for each field
brands = ["Dell", "HP", "Lenovo", "Apple", "Asus", "Acer", "MSI", "Razer"]
processors = ["Intel i5", "Intel i7", "Intel i9", "AMD Ryzen 5", "AMD Ryzen 7", "AMD Ryzen 9", "Apple M1", "Apple M2"]
gpus = ["NVIDIA GTX 1650", "NVIDIA GTX 1660", "NVIDIA RTX 3060", "NVIDIA RTX 3070", "AMD Radeon RX 550", "AMD Radeon RX 580", "Integrated", "Apple M2 GPU"]
os_list = ["Windows", "Ubuntu", "Mac OS", "DOS"]
ram_list = [4, 8, 16, 32]
storage_list = [128, 256, 512, 1024, 2048]
screen_sizes = [11, 13, 15, 17, 18]
resolutions = ["1280x720", "1920x1080", "2560x1440", "3840x2160"]
refresh_rates = [60, 120, 144, 210, 240]
touch_screen_list = ["Yes", "No"]
images = [  "https://techshopimages.blob.core.windows.net/techshop/Laptops1.png",
            "https://techshopimages.blob.core.windows.net/techshop/Laptops2.png",
            "https://techshopimages.blob.core.windows.net/techshop/Laptops3.png",
            "https://techshopimages.blob.core.windows.net/techshop/Laptops4.png",
            "https://techshopimages.blob.core.windows.net/techshop/Laptops5.png" ]

# Function to generate a random laptop
def generate_laptop(id):
    brand = random.choice(brands)
    processor = random.choice(processors)
    os = random.choice(os_list)
    gpu = random.choice(gpus)
    ram = random.choice(ram_list)
    storage = random.choice(storage_list)
    screen_size = random.choice(screen_sizes)
    resolution = random.choice(resolutions)
    refresh_rate = random.choice(refresh_rates)
    touch_screen = random.choice(touch_screen_list)
    price = random.randint(500, 3000)  # Random price between $500 and $3000
    name = f"{brand} {random.choice(['XPS', 'Spectre', 'ThinkPad', 'MacBook', 'ROG', 'Swift', 'Blade', 'Inspiron'])} {random.randint(10, 99)}"
    description = f"High-performance {brand} laptop with {processor}, {ram}GB RAM, and {storage}GB storage."

    num_images = random.randint(2, 5)
    selected_images = random.sample(images, num_images)
    image_string = "|".join(selected_images)

    return {
        "Category" : "Laptops",
        "Name": name,
        "Description": description,
        "Price": price,
        "Brand": brand,
        "Processor": processor,
        "Operating System": os,
        "GPU": gpu,
        "RAM (GB)": ram,
        "Storage (GB)": storage,
        "Screen size (inches)": screen_size,
        "Resolution": resolution,
        "Refresh rate (Hz)": refresh_rate,
        "Touch screen": touch_screen,
        "Images" : image_string
    }

# Generate 400 laptops
laptops = [generate_laptop(i) for i in range(1, 400)]

# Save to CSV
with open("Laptops.csv", "w", newline="") as csvfile:
    fieldnames = ["Category", "Name", "Description", "Images", "Price", "Brand", "Processor", "Operating System", "GPU", "RAM (GB)", "Storage (GB)", "Screen size (inches)", "Resolution", "Refresh rate (Hz)", "Touch screen"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for laptop in laptops:
        writer.writerow(laptop)

print("Mockup data generated and saved to laptops.csv!")