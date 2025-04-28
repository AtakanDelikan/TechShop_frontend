import csv
import random

# Possible values for each field
brands = ["Apple", "Samsung", "Garmin", "Fitbit", "Huawei", "Amazfit", "Fossil", "Xiaomi", "TicWatch", "Polar"]
battery_lives = [24, 48, 72, 120, 168]
screen_sizes = [1.2, 1.4, 1.6, 1.8, 2.0]
sim_list = ["Yes", "No"]
images = [  "https://techshopimages.blob.core.windows.net/techshop/Smartwatches1.png",
            "https://techshopimages.blob.core.windows.net/techshop/Smartwatches2.png",
            "https://techshopimages.blob.core.windows.net/techshop/Smartwatches3.png",
            "https://techshopimages.blob.core.windows.net/techshop/Smartwatches4.png",
            "https://techshopimages.blob.core.windows.net/techshop/Smartwatches5.png" ]

# Function to generate a random smartwatch
def generate_smartwatch(id):
    brand = random.choice(brands)
    battery_life = random.choice(battery_lives)
    screen_size = random.choice(screen_sizes)
    sim = random.choice(sim_list)
    price = random.randint(100, 600)  # Random price between $100 and $600
    name = f"{brand} {random.choice(['Watch Series', 'Galaxy Watch', 'Venu', 'Sense', 'Watch GT', 'GTR', 'Gen', 'Mi Watch', 'Pro', 'Vantage'])} {random.choice(['8', '5', '2 Plus', '2', '3 Pro', '4', '6', 'Ultra', 'V2'])}"
    description = f"{screen_size}-inch {brand} smartwatch with {battery_life}h battery life."

    num_images = random.randint(2, 5)
    selected_images = random.sample(images, num_images)
    image_string = "|".join(selected_images)

    return {
        "Category" : "Smartwatches",
        "Name": name,
        "Description": description,
        "Price": price,
        "Brand": brand,
        "Battery life (h)": battery_life,
        "Screen size (inches)": screen_size,
        "SIM": sim,
        "Images" : image_string
    }

# Generate 400 smartwatches
smartwatches = [generate_smartwatch(i) for i in range(1, 401)]

# Save to CSV
with open("Smartwatches.csv", "w", newline="") as csvfile:
    fieldnames = ["Category", "Name", "Description", "Images", "Price", "Brand", "Battery life (h)", "Screen size (inches)", "SIM"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for smartwatch in smartwatches:
        writer.writerow(smartwatch)

print("Mockup data generated and saved to smartwatches.csv!")