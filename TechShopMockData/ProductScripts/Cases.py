import csv
import random

# Possible values for each field
brands = ["NZXT", "Corsair", "Fractal Design", "Cooler Master", "Lian Li", "Phanteks", "Thermaltake", "be quiet!", "SilverStone", "Antec"]
case_types = ["Mid Tower", "Full Tower", "Mini Tower", "SFF"]
gpu_lengths = [250, 300, 350, 400, 450]
cpu_cooler_lengths = [150, 160, 170, 180, 190]
materials = ["Steel", "Aluminum", "Tempered Glass", "Plastic"]
images = [  "https://techshopimages.blob.core.windows.net/techshop/Cases1.png",
            "https://techshopimages.blob.core.windows.net/techshop/Cases2.png",
            "https://techshopimages.blob.core.windows.net/techshop/Cases3.png",
            "https://techshopimages.blob.core.windows.net/techshop/Cases4.png",
            "https://techshopimages.blob.core.windows.net/techshop/Cases5.png" ]

# Function to generate a random PC case
def generate_case(id):
    brand = random.choice(brands)
    case_type = random.choice(case_types)
    gpu_length = random.choice(gpu_lengths)
    cpu_cooler_length = random.choice(cpu_cooler_lengths)
    material = random.choice(materials)
    price = random.randint(50, 300)  # Random price between $50 and $300
    name = f"{brand} {random.choice(['H510', '4000D', 'Meshify', 'H500P', 'O11', 'Enthoo', 'H210', 'Define', 'NR200', 'Obsidian'])}"
    description = f"{case_type} case with support for GPUs up to {gpu_length}mm and CPU coolers up to {cpu_cooler_length}mm, made of {material}."

    num_images = random.randint(2, 5)
    selected_images = random.sample(images, num_images)
    image_string = "|".join(selected_images)

    return {
        "Category" : "Cases",
        "Name": name,
        "Description": description,
        "Price": price,
        "Brand": brand,
        "Case type": case_type,
        "Maximum GPU length (mm)": gpu_length,
        "Maximum CPU cooler length (mm)": cpu_cooler_length,
        "Material": material,
        "Images" : image_string
    }

# Generate 400 PC cases
cases = [generate_case(i) for i in range(1, 401)]

# Save to CSV
with open("Cases.csv", "w", newline="") as csvfile:
    fieldnames = ["Category", "Name", "Description", "Images", "Price", "Brand", "Case type", "Maximum GPU length (mm)", "Maximum CPU cooler length (mm)", "Material"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for case in cases:
        writer.writerow(case)

print("Mockup data generated and saved to cases.csv!")