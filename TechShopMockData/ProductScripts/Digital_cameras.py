import csv
import random

# Possible values for each field
brands = ["Canon", "Nikon", "Sony", "Fujifilm", "Panasonic", "Olympus", "Pentax", "Leica", "Sigma", "Hasselblad"]
resolutions = [12, 16, 20, 24, 30, 50, 102]
video_resolutions = ["1080p", "4K", "6K", "8K"]
min_iso = [50, 100, 200]
max_iso = [3200, 6400, 12800, 25600, 51200]
images = [  "https://techshopimages.blob.core.windows.net/techshop/Digital_Cameras1.png",
            "https://techshopimages.blob.core.windows.net/techshop/Digital_Cameras2.png",
            "https://techshopimages.blob.core.windows.net/techshop/Digital_Cameras3.png",
            "https://techshopimages.blob.core.windows.net/techshop/Digital_Cameras4.png",
            "https://techshopimages.blob.core.windows.net/techshop/Digital_Cameras5.png" ]

# Function to generate a random digital camera
def generate_camera(id):
    brand = random.choice(brands)
    resolution = random.choice(resolutions)
    video_resolution = random.choice(video_resolutions)
    min_iso_value = random.choice(min_iso)
    max_iso_value = random.choice(max_iso)
    price = random.randint(500, 10000)  # Random price between $500 and $10,000
    name = f"{brand} {random.choice(['EOS R5', 'Z9', 'Alpha 1', 'X-T4', 'Lumix GH6', 'OM-D E-M1', 'Rebel T8i', 'D850', 'Alpha 7 IV', 'GFX 100S'])}"
    description = f"{resolution}MP {brand} camera with {video_resolution} video and ISO range {min_iso_value}-{max_iso_value}."
    
    num_images = random.randint(2, 5)
    selected_images = random.sample(images, num_images)
    image_string = "|".join(selected_images)

    return {
        "Category" : "Digital cameras",
        "Name": name,
        "Description": description,
        "Price": price,
        "Brand": brand,
        "Resolution (MP)": resolution,
        "Video resolution": video_resolution,
        "Minimum ISO": min_iso_value,
        "Maximum ISO": max_iso_value,
        "Images" : image_string
    }

# Generate 400 digital cameras
cameras = [generate_camera(i) for i in range(1, 401)]

# Save to CSV
with open("Digital_cameras.csv", "w", newline="") as csvfile:
    fieldnames = ["Category", "Name", "Description", "Images", "Price", "Brand", "Resolution (MP)", "Video resolution", "Minimum ISO", "Maximum ISO"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for camera in cameras:
        writer.writerow(camera)

print("Mockup data generated and saved to digital_cameras.csv!")