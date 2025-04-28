import csv
import random

# Possible values for each field
brands = ["Samsung", "Western Digital", "Seagate", "Crucial", "Kingston", "SanDisk", "Intel", "ADATA", "Toshiba", "HP"]
capacities = [250, 500, 1000, 2000, 4000]
read_speeds = [500, 1000, 2000, 3000, 3500, 7000]
write_speeds = [400, 800, 1500, 2500, 3000, 5000]
connection_types = ["SATA III", "NVMe PCIe 3.0", "NVMe PCIe 4.0"]
form_factors = ["2.5\"", "M.2", "3.5\""]
images = [  "https://techshopimages.blob.core.windows.net/techshop/Drives1.png",
            "https://techshopimages.blob.core.windows.net/techshop/Drives2.png",
            "https://techshopimages.blob.core.windows.net/techshop/Drives3.png",
            "https://techshopimages.blob.core.windows.net/techshop/Drives4.png",
            "https://techshopimages.blob.core.windows.net/techshop/Drives5.png" ]

# Function to generate a random internal drive
def generate_internal_drive(id):
    brand = random.choice(brands)
    capacity = random.choice(capacities)
    read_speed = random.choice(read_speeds)
    write_speed = random.choice(write_speeds)
    connection_type = random.choice(connection_types)
    form_factor = random.choice(form_factors)
    price = random.randint(30, 300)  # Random price between $30 and $300
    name = f"{brand} {random.choice(['970 EVO', 'Blue', 'BarraCuda', 'P5', '980 Pro', 'A2000', 'Black', 'FireCuda', 'MX500', '860 EVO'])} {capacity}GB"
    description = f"{capacity}GB {form_factor} {connection_type} drive with {read_speed}MB/s read and {write_speed}MB/s write speeds."

    num_images = random.randint(2, 5)
    selected_images = random.sample(images, num_images)
    image_string = "|".join(selected_images)

    return {
        "Category" : "Internal drives",
        "Name": name,
        "Description": description,
        "Price": price,
        "Brand": brand,
        "Capacity (GB)": capacity,
        "Read speed (MBps)": read_speed,
        "Write speed (MBps)": write_speed,
        "Connection type": connection_type,
        "Form factor": form_factor,
        "Images" : image_string
    }

# Generate 400 internal drives
internal_drives = [generate_internal_drive(i) for i in range(1, 401)]

# Save to CSV
with open("Internal_drives.csv", "w", newline="") as csvfile:
    fieldnames = ["Category", "Name", "Description", "Images", "Price", "Brand", "Capacity (GB)", "Read speed (MBps)", "Write speed (MBps)", "Connection type", "Form factor"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for drive in internal_drives:
        writer.writerow(drive)

print("Mockup data generated and saved to internal_drives.csv!")