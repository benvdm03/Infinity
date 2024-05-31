---
layout: default
---

## Open VPN Configuration, MFA Access, and AWS S3 Logging

As I embarked on the VPN Server project, my goal was to build upon my foundational knowledge in network security by implementing a secure and robust network infrastructure. Through practical application and hands-on experience, I aimed to understand and implement essential networking and security principles, with a focus on VPN protocols, encryption, authentication mechanisms, and access control.



**1. Setup Virtual Private Network (VPN) with OpenVPN on CloudConnexa**

I created an account on OpenVPN and utilized CloudConnexa to host my own VPN in the cloud. This involved configuring my personal laptop to connect to the VPN via a direct integration connection to the cloud-hosted CloudConnexa service.

<a href="https://lh3.googleusercontent.com/drive-viewer/AKGpihZJwuE7surycaK4rlaHrXotiGaCMNkwPrbx-begYkabiYhrSbnCVhyXJGTS3AG8K5ALQM4hasd86gVo5EF-8Sc5r19QayJjuQ=s2560?source=screenshot.guru"> <img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihZJwuE7surycaK4rlaHrXotiGaCMNkwPrbx-begYkabiYhrSbnCVhyXJGTS3AG8K5ALQM4hasd86gVo5EF-8Sc5r19QayJjuQ=s2560" /> </a>



**2. Firewall Configuration with DNS Protection**

I implemented firewall configurations through DNS to protect against various threats such as malware, adware, ransomware, phishing, scamming, and cryptojacking. Additionally, I customized the list by directly adding URLs for allowing/blocking categories, including banning timewasters like Facebook, Instagram, and others.

<a href="https://lh3.googleusercontent.com/drive-viewer/AKGpihavfwD0_mjhuZ7zuRx-lTyQGm1pgEP7ThnqOW5FM3uThy2cKTKlnAksYhHk5ECoUHEedvxp3NeC_yd83m-ghpsHJDZIyEXrfS0=s1600-rw-v1?source=screenshot.guru"> <img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihavfwD0_mjhuZ7zuRx-lTyQGm1pgEP7ThnqOW5FM3uThy2cKTKlnAksYhHk5ECoUHEedvxp3NeC_yd83m-ghpsHJDZIyEXrfS0=s1600-rw-v1" /> </a>

**3. Added Trusted Devices and Multi-Factor Authentication (MFA)**

I integrated a second device (iPhone) as a trusted device attached to the VPN for access. Furthermore, I implemented multi-factor authentication (MFA) for any devices connecting to the VPN, enhancing security by requiring additional authentication factors

<a href="https://lh3.googleusercontent.com/drive-viewer/AKGpihYKFO_fXH4XYB6DQ-km2mTwvxQtHm5XUFZhnceeHQI1jHNsabzqb4bzowkPF58omZ6zMwmTu3lXRr8_jIfP_npNBGr1RdDIEQ=s1600-rw-v1?source=screenshot.guru"> <img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihYKFO_fXH4XYB6DQ-km2mTwvxQtHm5XUFZhnceeHQI1jHNsabzqb4bzowkPF58omZ6zMwmTu3lXRr8_jIfP_npNBGr1RdDIEQ=s1600-rw-v1" /> </a>

<a href="https://lh3.googleusercontent.com/drive-viewer/AKGpihaCicIWkiBskFC7X53KSVmhldMUAJgbzgJZVir4r1mliR_MeW-_42_GyBKcLbzTDkmSkWiQdS4zYQ35pgQrCQvsqibo1iSuwA=s1600-rw-v1?source=screenshot.guru"> <img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihaCicIWkiBskFC7X53KSVmhldMUAJgbzgJZVir4r1mliR_MeW-_42_GyBKcLbzTDkmSkWiQdS4zYQ35pgQrCQvsqibo1iSuwA=s1600-rw-v1" /> </a>


**4. Setup AWS S3 Bucket**

Utilizing my personal AWS account, I set up a Secure Scalable Storage (S3) bucket. I implemented security measures such as blocking public access, enabling versioning, and default SSE-S3 encryption to protect stored data. Additionally, I added log streaming (Beta) directly to the AWS S3 bucket, allowing for centralized logging and analysis of VPN activity and security events.

<a href="https://lh3.googleusercontent.com/drive-viewer/AKGpiha9eLL0sER0pr5HhG-hu8uBfuD1SPFM4ptrkWKETITUjBFcRr9IJh5SXLWKQIXXh4HYrjyRNn7NhFJTCrbcutRREkio012_kQ=s1600-rw-v1?source=screenshot.guru"> <img src="https://lh3.googleusercontent.com/drive-viewer/AKGpiha9eLL0sER0pr5HhG-hu8uBfuD1SPFM4ptrkWKETITUjBFcRr9IJh5SXLWKQIXXh4HYrjyRNn7NhFJTCrbcutRREkio012_kQ=s1600-rw-v1" /> </a>

```json
// JSON Code for CloudConnexa Logging Access
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Statement1",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": [
                "s3:PutObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::cloudconnexalog/*",
                "arn:aws:s3:::cloudconnexalog"
            ],
            "Condition": {
                "ArnEquals": {
                    "aws:PrincipalArn": "arn:aws:iam::444663524611:role/connexa-log-streaming-role"
                }
            }
        }
    ]
}

}
```

<a href="https://lh3.googleusercontent.com/drive-viewer/AKGpihb2y6HcJT-tbLc392hj-X-gfrZ7x5BqsRGV9yHnF2k87pHk2Cyj7Xdy5ifdQRdnDYRpMIAmx0EX1Omi0JJQnE1LPMMViBy2KSs=s1600-rw-v1?source=screenshot.guru"> <img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihb2y6HcJT-tbLc392hj-X-gfrZ7x5BqsRGV9yHnF2k87pHk2Cyj7Xdy5ifdQRdnDYRpMIAmx0EX1Omi0JJQnE1LPMMViBy2KSs=s1600-rw-v1" /> </a>



**Conclusion**

Through this project, I have not only gained practical experience in setting up a VPN server with two-factor authentication and implementing advanced security measures but also deepened my understanding of network security principles. By documenting my progress and sharing my work on GitHub, I aim to contribute to the broader community of learners interested in network security and foster collaboration and knowledge sharing. This project has provided me with valuable insights and skills that I can apply to future projects and endeavors in the field of cybersecurity.






[back](./)

