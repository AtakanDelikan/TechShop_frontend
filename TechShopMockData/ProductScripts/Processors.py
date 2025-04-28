import csv
import random

# Possible values for each field
brands = ["Intel", "AMD"]
sockets = ["LGA 1200", "LGA 1700", "AM4", "AM5", "LGA 1151", "TR4"]
cpu_speeds = [2.0, 2.2, 2.6, 3.0, 3.2, 3.5, 4.0, 4.3, 4.5, 5.0]
cores_list = [2, 4, 6, 8, 12, 16]
threads_list = [4, 8, 12, 16, 24, 32]
integrated_graphics_list = ["Yes", "No"]
images = [  "https://techshopimages.blob.core.windows.net/techshop/Processors1.png",
            "https://techshopimages.blob.core.windows.net/techshop/Processors2.png",
            "https://techshopimages.blob.core.windows.net/techshop/Processors3.png",
            "https://techshopimages.blob.core.windows.net/techshop/Processors4.png",
            "https://techshopimages.blob.core.windows.net/techshop/Processors5.png" ]

# Function to generate a random processor
def generate_processor(id):
    brand = random.choice(brands)
    socket = random.choice(sockets)
    cpu_speed = random.choice(cpu_speeds)
    cores = random.choice(cores_list)
    threads = random.choice(threads_list)
    integrated_graphics = random.choice(integrated_graphics_list)
    price = random.randint(50, 750)  # Random price between $50 and $1000
    name = f"{brand} {random.choice(['Core i7', 'Ryzen 9', 'Core i5', 'Ryzen 5', 'Core i9', 'Ryzen 7', 'Core i3', 'Ryzen 3'])}-{random.randint(1000, 9999)}{random.choice(['K', 'G', 'X', ''])}"
    description = f"{cores}-core {brand} processor with {cpu_speed}GHz base speed with{"out" if integrated_graphics == "No" else ""} integrated graphics."

    num_images = random.randint(2, 5)
    selected_images = random.sample(images, num_images)
    image_string = "|".join(selected_images)

    return {
        "Category" : "Processors",
        "Name": name,
        "Description": description,
        "Price": price,
        "Brand": brand,
        "Socket": socket,
        "CPU speed (GHz)": cpu_speed,
        "Number of cores": cores,
        "Number of threads": threads,
        "Integrated graphics": integrated_graphics,
        "Images" : image_string
    }

# Generate 400 processors
processors = [generate_processor(i) for i in range(1, 401)]

# Save to CSV
with open("Processors.csv", "w", newline="") as csvfile:
    fieldnames = ["Category", "Name", "Description", "Images", "Price", "Brand", "Socket", "CPU speed (GHz)", "Number of cores", "Number of threads", "Integrated graphics"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for processor in processors:
        writer.writerow(processor)

print("Mockup data generated and saved to processors.csv!")