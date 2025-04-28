import csv
import random

# Possible values for each field
brands = ["Corsair", "G.Skill", "Kingston", "Crucial", "Team Group", "Patriot", "ADATA", "HyperX"]
types = ["DDR4", "DDR5"]
capacities = [4, 8, 16, 32, 64]
form_factors = ["DIMM", "SODIMM"]
speeds = [2133, 2400, 2666, 3000, 3200, 3600, 4000, 4800, 5200]
latencies = [14, 15, 16, 17, 18, 19]
images = [  "https://techshopimages.blob.core.windows.net/techshop/RAMs1.png",
            "https://techshopimages.blob.core.windows.net/techshop/RAMs2.png",
            "https://techshopimages.blob.core.windows.net/techshop/RAMs3.png",
            "https://techshopimages.blob.core.windows.net/techshop/RAMs4.png",
            "https://techshopimages.blob.core.windows.net/techshop/RAMs5.png" ]

# Function to generate a random RAM module
def generate_ram(id):
    brand = random.choice(brands)
    type = random.choice(types)
    capacity = random.choice(capacities)
    form_factor = random.choice(form_factors)
    speed = random.choice(speeds)
    latency = random.choice(latencies)
    price = random.randint(15, 300)  # Random price between $15 and $300
    name = f"{brand} {random.choice(['Vengeance', 'Trident Z', 'HyperX', 'Ballistix', 'Dominator', 'Ripjaws', 'ValueRAM', 'Aegis'])} {capacity}GB"
    description = f"{capacity}GB {type} {form_factor} RAM with {speed}MHz speed and CL{latency} latency."

    num_images = random.randint(2, 5)
    selected_images = random.sample(images, num_images)
    image_string = "|".join(selected_images)

    return {
        "Category" : "RAMs",
        "Name": name,
        "Description": description,
        "Price": price,
        "Brand": brand,
        "Type": type,
        "Capacity (GB)": capacity,
        "Form factor": form_factor,
        "Speed (MHz)": speed,
        "Latency (CL)": latency,
        "Images" : image_string
    }

# Generate 400 RAM modules
ram_modules = [generate_ram(i) for i in range(1, 401)]

# Save to CSV
with open("RAMs.csv", "w", newline="") as csvfile:
    fieldnames = ["Category", "Name", "Description", "Images", "Price", "Brand", "Type", "Capacity (GB)", "Form factor", "Speed (MHz)", "Latency (CL)"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for ram in ram_modules:
        writer.writerow(ram)

print("Mockup data generated and saved to ram_modules.csv!")