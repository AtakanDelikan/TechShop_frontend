import csv
import random

# Possible values for each field
brands = ["Polaroid", "Fujifilm", "Kodak", "Leica", "Canon", "Nikon", "Sony", "Panasonic", "Olympus", "Pentax"]
developing_times = [10, 15, 20, 30, 60, 90]
weights = [200, 300, 400, 500, 600]
shooting_ranges = [0.3, 0.6, 1.0, 1.5]
images = [  "https://techshopimages.blob.core.windows.net/techshop/Instant_Cameras1.png",
            "https://techshopimages.blob.core.windows.net/techshop/Instant_Cameras2.png",
            "https://techshopimages.blob.core.windows.net/techshop/Instant_Cameras3.png",
            "https://techshopimages.blob.core.windows.net/techshop/Instant_Cameras4.png",
            "https://techshopimages.blob.core.windows.net/techshop/Instant_Cameras5.png" ]

# Function to generate a random instant camera
def generate_instant_camera(id):
    brand = random.choice(brands)
    developing_time = random.choice(developing_times)
    weight = random.choice(weights)
    shooting_range = random.choice(shooting_ranges)
    price = random.randint(50, 300)  # Random price between $50 and $300
    name = f"{brand} {random.choice(['Now+', 'Instax Mini', 'Printomatic', 'Sofort', 'Instax Wide', 'Go', 'Instax Square', 'Step', 'OneStep+', 'Instax Mini'])} {random.choice(['11', '2', '300', 'SQ1', '40'])}"
    description = f"{brand} instant camera with {developing_time}s film developing time and {shooting_range}m minimum shooting range."

    num_images = random.randint(2, 5)
    selected_images = random.sample(images, num_images)
    image_string = "|".join(selected_images)

    return {
        "Category" : "Instant cameras",
        "Name": name,
        "Description": description,
        "Price": price,
        "Brand": brand,
        "Film developing time (s)": developing_time,
        "Weight (g)": weight,
        "Min shooting range (m)": shooting_range,
        "Images" : image_string
    }

# Generate 400 instant cameras
instant_cameras = [generate_instant_camera(i) for i in range(1, 401)]

# Save to CSV
with open("Instant_cameras.csv", "w", newline="") as csvfile:
    fieldnames = ["Category", "Name", "Description", "Images", "Price", "Brand", "Film developing time (s)", "Weight (g)", "Min shooting range (m)"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for camera in instant_cameras:
        writer.writerow(camera)

print("Mockup data generated and saved to instant_cameras.csv!")