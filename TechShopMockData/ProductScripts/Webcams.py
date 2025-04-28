import csv
import random

# Possible values for each field
brands = ["Logitech", "Razer", "Microsoft", "HP", "Anker", "Elgato", "AVerMedia", "Dell", "Lenovo", "Sony"]
resolutions = ["720p", "1080p", "2K", "4K"]
connector_types = ["USB-A", "USB-C", "Wireless"]
cord_lengths = [1.2, 1.5, 1.8, 2.0]
images = [  "https://techshopimages.blob.core.windows.net/techshop/Webcams1.png",
            "https://techshopimages.blob.core.windows.net/techshop/Webcams2.png",
            "https://techshopimages.blob.core.windows.net/techshop/Webcams3.png",
            "https://techshopimages.blob.core.windows.net/techshop/Webcams4.png",
            "https://techshopimages.blob.core.windows.net/techshop/Webcams5.png" ]

# Function to generate a random webcam
def generate_webcam(id):
    brand = random.choice(brands)
    resolution = random.choice(resolutions)
    connector_type = random.choice(connector_types)
    cord_length = random.choice(cord_lengths) if connector_type != "Wireless" else 0.0
    price = random.randint(20, 200)  # Random price between $20 and $200
    name = f"{brand} {random.choice(['C920', 'Kiyo Pro', 'LifeCam Studio', 'Brio 4K', '960', 'PowerConf C200', 'Facecam', 'C270', 'Kiyo', 'Live Streamer CAM 313'])}"
    description = f"{resolution} webcam with {connector_type} connectivity."

    num_images = random.randint(2, 5)
    selected_images = random.sample(images, num_images)
    image_string = "|".join(selected_images)

    return {
        "Category" : "Webcams",
        "Name": name,
        "Description": description,
        "Price": price,
        "Brand": brand,
        "Resolution": resolution,
        "Connector type": connector_type,
        "Cord length (m)": cord_length,
        "Images" : image_string
    }

# Generate 400 webcams
webcams = [generate_webcam(i) for i in range(1, 401)]

# Save to CSV
with open("Webcams.csv", "w", newline="") as csvfile:
    fieldnames = ["Category", "Name", "Description", "Images", "Price", "Brand", "Resolution", "Connector type", "Cord length (m)"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for webcam in webcams:
        writer.writerow(webcam)

print("Mockup data generated and saved to webcams.csv!")