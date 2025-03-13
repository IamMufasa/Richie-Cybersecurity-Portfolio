#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

# Create directory for images if it doesn't exist
os.makedirs("./", exist_ok=True)

# Define colors (Apple-inspired)
BLUE = (0, 102, 204)
DARK_BLUE = (0, 64, 128)
LIGHT_BLUE = (105, 166, 248)
DARK_GRAY = (29, 29, 31)
LIGHT_GRAY = (245, 245, 247)
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

# Define project types and their colors
projects = [
    {"name": "SIEM Implementation", "color": BLUE, "icon": "🛡️"},
    {"name": "Splunk Dashboard", "color": DARK_BLUE, "icon": "📊"},
    {"name": "Wazuh Deployment", "color": LIGHT_BLUE, "icon": "🔍"},
    {"name": "OpenVAS Scanner", "color": BLUE, "icon": "🔎"},
    {"name": "Network Monitoring", "color": DARK_BLUE, "icon": "🌐"},
    {"name": "Incident Response", "color": LIGHT_BLUE, "icon": "🚨"}
]

# Create project placeholders
def create_project_placeholder(project, size=(800, 600)):
    # Create image with background color
    img = Image.new('RGB', size, project["color"])
    draw = ImageDraw.Draw(img)
    
    # Try to load a font, fall back to default if not available
    try:
        title_font = ImageFont.truetype("Arial.ttf", 60)
        icon_font = ImageFont.truetype("Arial.ttf", 120)
    except IOError:
        title_font = ImageFont.load_default()
        icon_font = ImageFont.load_default()
    
    # Draw icon
    icon_width = draw.textlength(project["icon"], font=icon_font)
    icon_position = ((size[0] - icon_width) // 2, size[1] // 2 - 100)
    draw.text(icon_position, project["icon"], font=icon_font, fill=WHITE)
    
    # Draw project name
    text_width = draw.textlength(project["name"], font=title_font)
    text_position = ((size[0] - text_width) // 2, size[1] // 2 + 50)
    draw.text(text_position, project["name"], font=title_font, fill=WHITE)
    
    # Add subtle gradient overlay
    gradient = Image.new('RGBA', size, (255, 255, 255, 0))
    gradient_draw = ImageDraw.Draw(gradient)
    
    for y in range(size[1]):
        alpha = int(255 * (1 - y / size[1]) * 0.3)  # 30% opacity at top, 0% at bottom
        gradient_draw.line([(0, y), (size[0], y)], fill=(255, 255, 255, alpha))
    
    img = Image.alpha_composite(img.convert('RGBA'), gradient)
    
    # Save the image
    filename = f"project-{project['name'].lower().replace(' ', '-')}.png"
    img.convert('RGB').save(filename)
    print(f"Created {filename}")
    
    return filename

# Create profile picture placeholder
def create_profile_placeholder(size=(600, 600)):
    # Create circular image with gradient background
    img = Image.new('RGB', size, BLACK)
    draw = ImageDraw.Draw(img)
    
    # Draw circle
    draw.ellipse([(0, 0), size], fill=DARK_GRAY)
    
    # Draw user icon
    try:
        icon_font = ImageFont.truetype("Arial.ttf", 250)
    except IOError:
        icon_font = ImageFont.load_default()
    
    icon = "👤"
    icon_width = draw.textlength(icon, font=icon_font)
    icon_position = ((size[0] - icon_width) // 2, size[1] // 2 - 125)
    draw.text(icon_position, icon, font=icon_font, fill=WHITE)
    
    # Save the image
    filename = "profile-placeholder.png"
    img.save(filename)
    print(f"Created {filename}")
    
    return filename

# Create certification badge placeholders
def create_certification_badges():
    certifications = [
        {"name": "CompTIA Security+", "icon": "🛡️", "color": BLUE},
        {"name": "Cisco CCNA", "icon": "🌐", "color": DARK_BLUE},
        {"name": "CEH", "icon": "🔒", "color": LIGHT_BLUE}
    ]
    
    for cert in certifications:
        # Create circular badge
        size = (200, 200)
        img = Image.new('RGB', size, cert["color"])
        draw = ImageDraw.Draw(img)
        
        # Draw circle
        draw.ellipse([(0, 0), size], fill=cert["color"])
        
        # Draw icon
        try:
            icon_font = ImageFont.truetype("Arial.ttf", 100)
        except IOError:
            icon_font = ImageFont.load_default()
        
        icon_width = draw.textlength(cert["icon"], font=icon_font)
        icon_position = ((size[0] - icon_width) // 2, size[1] // 2 - 50)
        draw.text(icon_position, cert["icon"], font=icon_font, fill=WHITE)
        
        # Add subtle gradient overlay
        gradient = Image.new('RGBA', size, (255, 255, 255, 0))
        gradient_draw = ImageDraw.Draw(gradient)
        
        for y in range(size[1]):
            alpha = int(255 * (1 - y / size[1]) * 0.3)  # 30% opacity at top, 0% at bottom
            gradient_draw.line([(0, y), (size[0], y)], fill=(255, 255, 255, alpha))
        
        img = Image.alpha_composite(img.convert('RGBA'), gradient)
        
        # Save the image
        filename = f"cert-{cert['name'].lower().replace(' ', '-').replace('+', 'plus')}.png"
        img.convert('RGB').save(filename)
        print(f"Created {filename}")

# Generate all images
if __name__ == "__main__":
    print("Generating placeholder images...")
    
    # Create project placeholders
    for project in projects:
        create_project_placeholder(project)
    
    # Create profile placeholder
    create_profile_placeholder()
    
    # Create certification badges
    create_certification_badges()
    
    print("All placeholder images generated successfully!")
