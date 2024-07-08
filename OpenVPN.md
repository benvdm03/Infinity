---
layout: default
---

## Open VPN Configuration, MFA Access, and AWS S3 Logging

As I embarked on the VPN Server project, my goal was to build upon my foundational knowledge in network security by implementing a secure and robust network infrastructure. Through practical application and hands-on experience, I aimed to understand and implement essential networking and security principles, with a focus on VPN protocols, encryption, authentication mechanisms, and access control.


**1. Setup Virtual Private Network (VPN) with OpenVPN on CloudConnexa**

I created an account on OpenVPN and utilized CloudConnexa to host my own VPN in the cloud. This involved configuring my personal laptop to connect to the VPN via a direct integration connection to the cloud-hosted CloudConnexa service.

<a href="https://lh3.googleusercontent.com/drive-viewer/AKGpihYTdZmYKESn9jaJ7zKugO5rKCwkRxnu0LQDEXHgT4t3EBFWJPVavh9WtGCFKZY8nKtLtv6P7xplW45PY8yOP_F7LgELHRz24A=s2560?source=screenshot.guru"> <img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihYTdZmYKESn9jaJ7zKugO5rKCwkRxnu0LQDEXHgT4t3EBFWJPVavh9WtGCFKZY8nKtLtv6P7xplW45PY8yOP_F7LgELHRz24A=s2560" /> </a>

**2. Firewall Configuration with DNS Protection**

I implemented firewall configurations through DNS to protect against various threats such as malware, adware, ransomware, phishing, scamming, and cryptojacking. Additionally, I customized the list by directly adding URLs for allowing/blocking categories, including banning timewasters like Facebook, Instagram, and others.

<a href="https://lh3.googleusercontent.com/drive-viewer/AKGpihb6rSW7YIBFIGlkzu_rhWaKSITTBXVrLaDGlnFDH5Au1x_jLRIXEWY8EkqszJWgnjIwcfTS472EGMek821Cyql1WHDnP9sQb5M=s1600-rw-v1?source=screenshot.guru"> <img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihb6rSW7YIBFIGlkzu_rhWaKSITTBXVrLaDGlnFDH5Au1x_jLRIXEWY8EkqszJWgnjIwcfTS472EGMek821Cyql1WHDnP9sQb5M=s1600-rw-v1" /> </a>

**3. Added Trusted Devices and Multi-Factor Authentication (MFA)**

I integrated a second device (iPhone) as a trusted device attached to the VPN for access. Furthermore, I implemented multi-factor authentication (MFA) for any devices connecting to the VPN, enhancing security by requiring additional authentication factors

<a href="https://lh3.googleusercontent.com/drive-viewer/AKGpihZg5EMZVfRj13OraDbqVxPFqWK53At19UIWwqvB6xcRXtxSCfhk5f-Vbe-hKCeuvvMDXcPvnPchRQ5vETnDWlVWQTmy-oOc_w=s1600-rw-v1?source=screenshot.guru"> <img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihZg5EMZVfRj13OraDbqVxPFqWK53At19UIWwqvB6xcRXtxSCfhk5f-Vbe-hKCeuvvMDXcPvnPchRQ5vETnDWlVWQTmy-oOc_w=s1600-rw-v1" /> </a>

<a href="https://lh3.googleusercontent.com/drive-viewer/AKGpiha611RRoCsXt4a69pEbPTGPV32puSB45Dae556wcCEecc4xsiQWQl6fJe01MfP_14W7N85-aQQm4fBpXKev0bjH1Id3lMA26w=s1600-rw-v1?source=screenshot.guru"> <img src="https://lh3.googleusercontent.com/drive-viewer/AKGpiha611RRoCsXt4a69pEbPTGPV32puSB45Dae556wcCEecc4xsiQWQl6fJe01MfP_14W7N85-aQQm4fBpXKev0bjH1Id3lMA26w=s1600-rw-v1" /> </a>


**4. Setup AWS S3 Bucket**

Utilizing my personal AWS account, I set up a Secure Scalable Storage (S3) bucket. I implemented security measures such as blocking public access, enabling versioning, and default SSE-S3 encryption to protect stored data. Additionally, I added log streaming (Beta) directly to the AWS S3 bucket, allowing for centralized logging and analysis of VPN activity and security events.

<a href="https://lh3.googleusercontent.com/drive-viewer/AKGpihaf4Qgj8pNT1BiQ9vhfkYSRqwcT4wXITpxVOqF7n6hLCpTUc_F7b1QpzKxhVq30AG7zCYtzibZgJCtQiwmSHrjWLwkr8cwNBb0=s1600-rw-v1?source=screenshot.guru"> <img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihaf4Qgj8pNT1BiQ9vhfkYSRqwcT4wXITpxVOqF7n6hLCpTUc_F7b1QpzKxhVq30AG7zCYtzibZgJCtQiwmSHrjWLwkr8cwNBb0=s1600-rw-v1" /> </a>

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
<a href="https://lh3.googleusercontent.com/drive-viewer/AKGpihbLEzuSuaLdzN3tq0s3cmfmp_2_pYEV7_nvv3QqBrtYSGy8idn75Gl8xGvjhcR_Vuz_1jc7eM-2MPPd7khJ-os42pNhX-_mGw=s1600-rw-v1?source=screenshot.guru"> <img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihbLEzuSuaLdzN3tq0s3cmfmp_2_pYEV7_nvv3QqBrtYSGy8idn75Gl8xGvjhcR_Vuz_1jc7eM-2MPPd7khJ-os42pNhX-_mGw=s1600-rw-v1" /> </a>



**Conclusion**

Through this project, I have not only gained practical experience in setting up a VPN server with two-factor authentication and implementing advanced security measures but also deepened my understanding of network security principles. By documenting my progress and sharing my work on GitHub, I aim to contribute to the broader community of learners interested in network security and foster collaboration and knowledge sharing. This project has provided me with valuable insights and skills that I can apply to future projects and endeavors in the field of cybersecurity.






[back](./)

