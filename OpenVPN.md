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

![CloudConnexa3](https://drive.google.com/thumbnail?id=1yDueXD6vkwxZqPUh4YbEWN7D5TXcdkzf)

**3. Added Trusted Devices and Multi-Factor Authentication (MFA)**

I integrated a second device (iPhone) as a trusted device attached to the VPN for access. Furthermore, I implemented multi-factor authentication (MFA) for any devices connecting to the VPN, enhancing security by requiring additional authentication factors

![CloudConnexa4](https://drive.google.com/?id=1dBApK1Zz1qRHua2volz0z12yhhvi3Tx4)

![CloudConnexa5](https://drive.google.com/uc?export=view&id=1vxy9pLU2gfbdmKVxTxqb2usNuzcjCBng)

**4. Setup AWS S3 Bucket**

Utilizing my personal AWS account, I set up a Secure Scalable Storage (S3) bucket. I implemented security measures such as blocking public access, enabling versioning, and default SSE-S3 encryption to protect stored data. Additionally, I added log streaming (Beta) directly to the AWS S3 bucket, allowing for centralized logging and analysis of VPN activity and security events.

![CloudConnexa6](https://drive.google.com/uc?export=view&id=1-QwaHvSURvS_TXMPyIQ3KQep8hM-rNNg)

Enter JSON here

![CloudConnexa6](https://drive.google.com/uc?export=view&id=17NXz7lodHpZiQVXWfn9UFiYY0WkLozxr)
