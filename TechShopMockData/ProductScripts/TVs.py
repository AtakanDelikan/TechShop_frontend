import csv
import random

# Possible values for each field
brands = ["Samsung", "LG", "Sony", "TCL", "Hisense", "Vizio", "Panasonic", "Sharp", "Philips", "Toshiba"]
screen_sizes = [32, 40, 43, 50, 55, 65, 75, 85]
resolutions = ["720p", "1080p", "4K", "8K"]
refresh_rates = [60, 120, 240]
panel_types = ["LED", "OLED", "QLED", "Mini-LED"]
brightness_levels = [200, 300, 400, 500, 600]
response_times = [1, 2, 5, 10]
images = [  "https://techshopimages.blob.core.windows.net/techshop/TVs1.png",
            "https://techshopimages.blob.core.windows.net/techshop/TVs2.png",
            "https://techshopimages.blob.core.windows.net/techshop/TVs3.png",
            "https://techshopimages.blob.core.windows.net/techshop/TVs4.png",
            "https://techshopimages.blob.core.windows.net/techshop/TVs5.png" ]

# Function to generate a random TV
def generate_tv(id):
    brand = random.choice(brands)
    screen_size = random.choice(screen_sizes)
    resolution = random.choice(resolutions)
    refresh_rate = random.choice(refresh_rates)
    panel_type = random.choice(panel_types)
    brightness = random.choice(brightness_levels)
    response_time = random.choice(response_times)
    price = random.randint(200, 5000)  # Random price between $200 and $5000
    name = f"{brand} {random.choice(['QN90A', 'C1', 'X90J', '6-Series', 'U8G', 'M-Series', 'NanoCell', 'A90J', 'TU8000', '4-Series'])}"
    description = f"{screen_size}-inch {resolution} {panel_type} TV with {refresh_rate}Hz refresh rate and {brightness}cd/m2 brightness."

    num_images = random.randint(2, 5)
    selected_images = random.sample(images, num_images)
    image_string = "|".join(selected_images)

    return {
        "Category" : "TVs",
        "Name": name,
        "Description": description,
        "Price": price,
        "Brand": brand,
        "Screen size (inches)": screen_size,
        "Resolution": resolution,
        "Refresh rate (Hz)": refresh_rate,
        "Panel type": panel_type,
        "Brightness (cd/m2)": brightness,
        "Response time (ms)": response_time,
        "Images" : image_string
    }

# Generate 400 TVs
tvs = [generate_tv(i) for i in range(1, 401)]

# Save to CSV
with open("TVs.csv", "w", newline="") as csvfile:
    fieldnames = ["Category", "Name", "Description", "Images", "Price", "Brand", "Screen size (inches)", "Resolution", "Refresh rate (Hz)", "Panel type", "Brightness (cd/m2)", "Response time (ms)"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for tv in tvs:
        writer.writerow(tv)

print("Mockup data generated and saved to tvs.csv!")