from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
import time

# Create a new instance of the Chrome driver
driver = webdriver.Chrome()

# Navigate to your interactive HTML page
driver.get("https://benvdm03.github.io/Infinity/AutomatedTesting/AutomatedTestingExp.html")

try:
    # Test Case 1: Dropdown Response
    # Select 'Friend' option from the dropdown
    select_element = Select(driver.find_element(By.ID, "reason"))
    select_element.select_by_value("friend")
    time.sleep(1)  # Add a short delay for demonstration
    
    # Test Case 2: Form Submission
    # Fill out the form fields
    driver.find_element(By.ID, "novice").click()  # Select 'Novice' for familiarity
    driver.find_element(By.ID, "yesProfessional").click()  # Select 'Yes' for professional usage
    driver.find_element(By.ID, "yesPersonal").click()  # Select 'Yes' for personal usage
    driver.find_element(By.ID, "technology").send_keys("Microwave")  # Enter kitchen technology
    driver.find_element(By.ID, "trickQuestion").send_keys("Because it keeps food fresh!")  # Answer trick question
    driver.find_element(By.CSS_SELECTOR, "input[type='submit']").click()  # Submit the form
    time.sleep(1)  # Add a short delay for demonstration

    # Test Case 3: Interactive Widget
    # Toggle the widget on
    driver.find_element(By.ID, "toggleWidget").click()
    time.sleep(1)  # Add a short delay for demonstration
    # Choose a color for the widget
    driver.find_element(By.ID, "colorPicker").send_keys("#ff0000")  # Set color to red
    time.sleep(1)  # Add a short delay for demonstration
    # Perform drag-and-drop action on the widget (assuming you've implemented draggable functionality)
    # You may need to implement additional code to perform this action

except Exception as e:
    print("An error occurred:", e)

# Manual wait to keep the browser window open
input("Press Enter to close the browser window...")
