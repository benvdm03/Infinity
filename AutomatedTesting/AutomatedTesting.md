---
layout: default
---
 
## Automated Web Testing 

The primary goal of this project is to demonstrate the process and benefits of automating web testing through Selenium WebDriver. By automating interactions with a specially designed dummy website, I aimed to validate its functionality efficiently and to ensure the reliability of its user interactions. This exercise serves as a practical introduction to the setup, execution, and benefits of automated web testing in real-world applications.

**1. Environment Setup**

I Installed Selenium WebDriver and the necessary browser drivers (ChromeDriver) using the Windows command line interface. This foundational step ensures that all necessary tools are in place for running automation scripts.



**2. Test Environment Preparation**

I Created a dummy interactive website hosted on GitHub, designed to test various functionalities such as dropdown selections, form submissions, and widget manipulations. The switch from Markdown to HTML format enabled more dynamic interactions suitable for testing.

The interactive elements I created were:
*  A dropdown for response selection.
*  A form that users can fill out.
*  An interactive widget that users can manipulate.

See here for the dummy page: [AutomatedTestingDummyShell](./AutomatedTestingExp.html).

**3. Test Script Development**

I developed Selenium scripts tailored to interact with the dummy website’s elements. The scripts are designed to automatically select dropdown options, fill out forms, and interact with the widget, thus simulating user behavior.



```python 
// Python Silenium Code snippet with syntax highlighting.
try:
    select_element = Select(driver.find_element(By.ID, "reason"))
    select_element.select_by_value("friend")
    time.sleep(1)
    
    driver.find_element(By.ID, "novice").click()
    driver.find_element(By.ID, "yesProfessional").click()
    driver.find_element(By.ID, "yesPersonal").click()
    driver.find_element(By.ID, "technology").send_keys("Microwave")
    driver.find_element(By.ID, "trickQuestion").send_keys("Because it keeps food fresh!")
    driver.find_element(By.CSS_SELECTOR, "input[type='submit']").click()
    time.sleep(1)

    driver.find_element(By.ID, "toggleWidget").click()
    time.sleep(1)
    driver.find_element(By.ID, "colorPicker").send_keys("#ff0000")
    time.sleep(1)
    
except Exception as e:
    print("An error occurred:", e)

```

**4. Test Execution and Reporting**

 After running the tests, I verified that the Selenium scripts successfully interacted with the web elements as intended. The outcome was documented to provide insights into the functionality and accuracy of the test cases.


<a href="https://lh3.googleusercontent.com/drive-viewer/AKGpihYkNXyVr0w2PwbpHufo6MBfsBlvHBjS4-aIIqdef_hRleuqVE56k3UU54Iu4_kRKLt3S-jGgcpIuFIFZrp57rcX46UaDBEkSw=s1600-rw-v1?source=screenshot.guru"> <img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihYkNXyVr0w2PwbpHufo6MBfsBlvHBjS4-aIIqdef_hRleuqVE56k3UU54Iu4_kRKLt3S-jGgcpIuFIFZrp57rcX46UaDBEkSw=s1600-rw-v1" /> </a>

<a href="https://lh3.googleusercontent.com/drive-viewer/AKGpihYuwox_RCWirjIiFsmElcJUeg-P4dNFQl8szbDznyKbliZyP1gGcbYCW0RlrjxiC-1HmSybvzKIs94Uq3RdqS8lLHDvuyBvh9Q=s1600-rw-v1?source=screenshot.guru"> <img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihYuwox_RCWirjIiFsmElcJUeg-P4dNFQl8szbDznyKbliZyP1gGcbYCW0RlrjxiC-1HmSybvzKIs94Uq3RdqS8lLHDvuyBvh9Q=s1600-rw-v1" /> </a>


<a href="https://lh3.googleusercontent.com/drive-viewer/AKGpihZVlzp-5QhdDiJt60QSOjK_eVIn9cxivyakYRnc0BHzGWluKoSLPg-4R8p-g4SRoJU8iIVsb4hmYeIfwdbInWNh3IqNNQQFMmI=s1600-rw-v1?source=screenshot.guru"> <img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihZVlzp-5QhdDiJt60QSOjK_eVIn9cxivyakYRnc0BHzGWluKoSLPg-4R8p-g4SRoJU8iIVsb4hmYeIfwdbInWNh3IqNNQQFMmI=s1600-rw-v1" /> </a>



**Conclusions**

Through this project, I learned the importance and effectiveness of automated testing in software development, particularly in validating web applications. Automation not only saves time but also increases the reliability of testing by ensuring that all functionalities are consistently checked under predefined conditions. The hands-on experience gained from setting up the environment, scripting, and executing tests using Selenium WebDriver provided valuable insights into both the challenges and capabilities of automated testing. This project underscores the value of automation in achieving robust software solutions that perform well under user expectations and defined specifications.

Continuing to expand the test cases and exploring additional Selenium features would further enhance my understanding and ability to automate more complex testing scenarios. Integrating continuous integration/continuous deployment (CI/CD) pipelines could also be a worthwhile next step to automate the execution of tests with every update to the application.




[Back](../)



















