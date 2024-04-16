---
layout: default
---

## Project 1 : Open VPN Configuration, MFA Access, and AWS S3 Logging

As I embarked on the VPN Server project, my goal was to build upon my foundational knowledge in network security by implementing a secure and robust network infrastructure. Through practical application and hands-on experience, I aimed to understand and implement essential networking and security principles, with a focus on VPN protocols, encryption, authentication mechanisms, and access control.



**1. Setup Virtual Private Network (VPN) with OpenVPN on CloudConnexa**

I created an account on OpenVPN and utilized CloudConnexa to host my own VPN in the cloud. This involved configuring my personal laptop to connect to the VPN via a direct integration connection to the cloud-hosted CloudConnexa service.

![CloudConnexa1](https://drive.google.com/thumbnail?id=1ECHHK8ncuhoggGLyDcdouGNbrM0W8Wny)
![CloudConnexa2](https://drive.google.com/thumbnail?id=15Ya_u6Hyt9lgaFMllXEk64UcwT40eD3e)

**2. Firewall Configuration with DNS Protection**

I implemented firewall configurations through DNS to protect against various threats such as malware, adware, ransomware, phishing, scamming, and cryptojacking. Additionally, I customized the list by directly adding URLs for allowing/blocking categories, including banning timewasters like Facebook, Instagram, and others.

<a href="https://lh3.googleusercontent.com/drive-viewer/AKGpiha2lKotjOAsR7l9wmzyW0XhE1WqVjtaO7KU_NGFx0xAElftrqNrq_tptAGyHvuVNyxyRhK1nCVhFAal8aws3rlgQmIzk4_ZE-g=s1600-rw-v1?source=screenshot.guru"> <img src="https://lh3.googleusercontent.com/drive-viewer/AKGpiha2lKotjOAsR7l9wmzyW0XhE1WqVjtaO7KU_NGFx0xAElftrqNrq_tptAGyHvuVNyxyRhK1nCVhFAal8aws3rlgQmIzk4_ZE-g=s1600-rw-v1" /> </a>

**3. Added Trusted Devices and Multi-Factor Authentication (MFA)**

I integrated a second device (iPhone) as a trusted device attached to the VPN for access. Furthermore, I implemented multi-factor authentication (MFA) for any devices connecting to the VPN, enhancing security by requiring additional authentication factors

<a href="https://lh3.googleusercontent.com/drive-viewer/AKGpihaEh-CEzm5shAtC6KCFSzstirYwKXW8hc1VM4LtEzafmeAS857_u6NYkXXzYJn7biOUtbsCRcSAvhvvOAKf1xPjuUhnqUW-lA=s1600-rw-v1?source=screenshot.guru"> <img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihaEh-CEzm5shAtC6KCFSzstirYwKXW8hc1VM4LtEzafmeAS857_u6NYkXXzYJn7biOUtbsCRcSAvhvvOAKf1xPjuUhnqUW-lA=s1600-rw-v1" /> </a>

<a href="https://lh3.googleusercontent.com/drive-viewer/AKGpihZL8WCtcgXhuUYtg7BvpOdx6pGf45A5tjEDuvWjWvHOfCoJV1Yvy9XhJA-2ZmsuJW2y5O7ySH5EOYplD_jmGhCDOaBBm3571w=s1600-rw-v1?source=screenshot.guru"> <img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihZL8WCtcgXhuUYtg7BvpOdx6pGf45A5tjEDuvWjWvHOfCoJV1Yvy9XhJA-2ZmsuJW2y5O7ySH5EOYplD_jmGhCDOaBBm3571w=s1600-rw-v1" /> </a>

**4. Setup AWS S3 Bucket**

Utilizing my personal AWS account, I set up a Secure Scalable Storage (S3) bucket. I implemented security measures such as blocking public access, enabling versioning, and default SSE-S3 encryption to protect stored data. Additionally, I added log streaming (Beta) directly to the AWS S3 bucket, allowing for centralized logging and analysis of VPN activity and security events.

<a href="https://lh3.googleusercontent.com/drive-viewer/AKGpihbuiWYtLDLBTysvw-cNyF184aX7j6Gz855GZ7M9pA6GaZLV6gf_pu6wYyqkaZszp1uaeB2zvfrEjf5qJARyaqw66hh8IQreY0c=s1600-rw-v1?source=screenshot.guru"> <img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihbuiWYtLDLBTysvw-cNyF184aX7j6Gz855GZ7M9pA6GaZLV6gf_pu6wYyqkaZszp1uaeB2zvfrEjf5qJARyaqw66hh8IQreY0c=s1600-rw-v1" /> </a>

Enter JSON here

<a href="https://lh3.googleusercontent.com/drive-viewer/AKGpihb0oXbUVER6ZlZ9Y_ORiBBiTr9U7qcXsAo76uL2Qw5Ky4mn-SpL5WB_BfF_CCzXcsbPDdyyH8I7hnXKaIcnPPVPY9J28HAMEw=s1600-rw-v1?source=screenshot.guru"> <img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihb0oXbUVER6ZlZ9Y_ORiBBiTr9U7qcXsAo76uL2Qw5Ky4mn-SpL5WB_BfF_CCzXcsbPDdyyH8I7hnXKaIcnPPVPY9J28HAMEw=s1600-rw-v1" /> </a>


Enter BACK option here 
