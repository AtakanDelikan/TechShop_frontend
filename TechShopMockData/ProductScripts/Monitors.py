import csv
import random

# Possible values for each field
brands = ["Dell", "LG", "Samsung", "Acer", "ASUS", "HP", "BenQ", "MSI", "ViewSonic"]
screen_sizes = [22, 24, 27, 32, 34]
resolutions = ["1920x1080", "2560x1440", "3840x2160"]
refresh_rates = [60, 75, 120, 144, 240]
panel_types = ["IPS", "TN", "VA", "OLED"]
touch_screen_list = ["Yes", "No"]
brightness_list = [200, 250, 300, 350, 400]
response_times = [1, 2, 4, 5]
images = [  "https://techshopimages.blob.core.windows.net/techshop/Monitors1.png",
            "https://techshopimages.blob.core.windows.net/techshop/Monitors2.png",
            "https://techshopimages.blob.core.windows.net/techshop/Monitors3.png",
            "https://techshopimages.blob.core.windows.net/techshop/Monitors4.png",
            "https://techshopimages.blob.core.windows.net/techshop/Monitors5.png" ]

# Function to generate a random monitor
def generate_monitor(id):
    brand = random.choice(brands)
    screen_size = random.choice(screen_sizes)
    resolution = random.choice(resolutions)
    refresh_rate = random.choice(refresh_rates)
    panel_type = random.choice(panel_types)
    touch_screen = random.choice(touch_screen_list)
    brightness = random.choice(brightness_list)
    response_time = random.choice(response_times)
    price = random.randint(100, 1500)  # Random price between $100 and $1500
    name = f"{brand} {random.choice(['UltraSharp', 'UltraGear', 'Odyssey', 'Predator', 'ProArt', 'Z', 'Optix', 'VP'])} {random.randint(100, 999)}"
    description = f"{screen_size}-inch {resolution} monitor with {refresh_rate}Hz refresh rate and {panel_type} panel."

    num_images = random.randint(2, 5)
    selected_images = random.sample(images, num_images)
    image_string = "|".join(selected_images)

    return {
        "Category" : "Monitors",
        "Name": name,
        "Description": description,
        "Price": price,
        "Brand": brand,
        "Screen size (inches)": screen_size,
        "Resolution": resolution,
        "Refresh rate (Hz)": refresh_rate,
        "Panel type": panel_type,
        "Touch screen": touch_screen,
        "Brightness (cd/m2)": brightness,
        "Response time (ms)": response_time,
        "Images" : image_string
    }

# Generate 400 monitors
monitors = [generate_monitor(i) for i in range(1, 401)]

# Save to CSV
with open("Monitors.csv", "w", newline="") as csvfile:
    fieldnames = ["Category", "Name", "Description", "Images", "Price", "Brand", "Screen size (inches)", "Resolution", "Refresh rate (Hz)", "Panel type", "Touch screen", "Brightness (cd/m2)", "Response time (ms)"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for monitor in monitors:
        writer.writerow(monitor)

print("Mockup data generated and saved to monitors.csv!")