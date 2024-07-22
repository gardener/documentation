---
title: KubeCon / CloudNativeCon Europe 2024 Highlights
linkTitle: KubeCon / CloudNativeCon Europe 2024 Highlights
newsSubtitle: April 05, 2024
publishdate: 2024-04-05
authors:
- name: Rafael Franzke
  email: rafael.franzke@sap.com
  avatar: https://avatars.githubusercontent.com/u/19169361
aliases: ["/blog/2024/04/05/01"]
---

![KubeCon EU 2024 Keynote Room](images/kubecon-eu2024.png "KubeCon EU 2024 Keynote Room")

KubeCon + CloudNativeCon Europe 2024, recently held in Paris, was a testament to the robustness of the open-source community and its pivotal role in driving advancements in AI and cloud-native technologies. With a record attendance of over +12,000 participants, the conference underscored the ubiquity of cloud-native architectures and the business opportunities they provide.

## AI Everywhere

LLMs and GenAI took center stage at the event, with discussions on challenges such as security, data management, and energy consumption. A popular quote stated, "If #inference is the new web application, #kubernetes is the new web server". The conference emphasized the need for more open data models for AI to democratize the technology. Cloud-native platforms offer advantages for AI innovation, such as packaging models and dependencies as Docker packages and enhancing resource management for proper model execution. The community is exploring AI workload management, including using CPUs for inferencing and preprocessing data before handing it over to GPUs. CNCF took the initiative and put together an [AI whitepaper](https://www.cncf.io/reports/cloud-native-artificial-intelligence-whitepaper/) outlining the apparent synergy between cloud-native technologies and AI.

## Cluster Autopilot

The conference showcased popular projects in the cloud-native ecosystem, including Kubernetes, Istio, and OpenTelemetry. Kubernetes was highlighted as a platform for running massive AI workloads. The UXL Foundation aims to enable multi-vendor AI workloads on Kubernetes, allowing developers to move AI workloads without being locked into a specific infrastructure. Every vendor we interacted with has assembled an AI-powered chatbot, which performs various functions – from assessing cluster health through analyzing cost efficiency and proposing workload optimizations to troubleshooting issues and alerting for potential challenges with upcoming Kubernetes version upgrades. Sysdig went even further with a chatbot, which answers the popular question, "Do any of my products have critical CVEs in production?" and analyzes workloads' structure and configuration. Some chatbots leveraged the [k8sgpt project](https://k8sgpt.ai/), which joined the CNCF sandbox earlier this year.

## Sophisticated Fleet Management

The ecosystem showcased maturity in observability, platform engineering, security, and optimization, which will help operationalize AI workloads. Data demands and costs were also in focus, touching on data observability and cloud-cost management. Cloud-native technologies, also going beyond Kubernetes, are expected to play a crucial role in managing the increasing volume of data and scaling AI. Google showcased fleet management in their Google Hosted Cloud offering (ex-Anthos). It allows for defining teams and policies at the fleet level, later applied to all the Kubernetes clusters in the fleet, irrespective of the infrastructure they run on (GCP and beyond).

## WASM Everywhere

The conference also highlighted the growing interest in WebAssembly (WASM) as a portable binary instruction format for executable programs and its integration with Kubernetes and other functions. The topic here started with a dedicated WASM pre-conference day, the sessions of which are available in the [following playlist](https://www.youtube.com/playlist?list=PLj6h78yzYM2MQteKoXxICTWiUdZYEw6RI). WASM is positioned as the smoother approach to software distribution and modularity, providing more lightweight runtime execution options and an easier way for app developers to enter.

## Rust on the Rise

Several talks were promoting Rust as an ideal [programming language for cloud-native workloads](https://youtu.be/2q3RLffSvEc). It was even promoted as suitable for [writing Kubernetes controllers](https://youtu.be/rXS-3hFYVjc).

## Internal Developer Platforms

The event showcased the importance of Internal Developer Platforms (IDPs), both commercial and open-source, in facilitating the development process across all types of organizations – from Allianz to Mercedes. [Backstage](https://backstage.io/) leads the pack by a large margin, with all relevant sessions being full or at capacity. Much effort goes into the modularization of Backstage, which was also a notable highlight at the conference.

## Sustainability

Sustainability was a key theme, with discussions on the role of cloud-native technologies in promoting green practices. The [KubeCost application](https://github.com/kubecost) folks put a lot of effort into emphasizing the large amount of wasted money, which hyperscalers benefit from. In parallel – the [kube-green project](https://kube-green.dev/) emphasized optimizing your cluster footprint to minimize CO2 emissions. The conference also highlighted the importance of open source in creating a level playing field for multiple players to compete, fostering diverse participation, and solving global challenges.

## Customer Stories

In contrast to the Chicago KubeCon in 2023, the one in Paris outlined multiple case studies, best practices, and reference scenarios. Many enterprises and their IT teams were well represented at KubeCon - regarding sessions, sponsorships, and participation. These companies strive to excel forward, reaping the efficiency and flexibility benefits cloud-native architectures provide.
We came across multiple companies using [Gardener](https://gardener.cloud/) as their Kubernetes management underlay – including FUGA Cloud, StackIT, and metal-stack Cloud. We eagerly anticipate more companies embracing Gardener at future events. The consistent feedback from these companies has been overwhelmingly positive—they absolutely love using Gardener and our shared excitement grows as the community thrives!

## Notable Talks

Notable talks from leaders in the cloud-native world, including Solomon Hykes, Bob Wise, and representatives from KCP for Platforms and the United Nations, provided valuable insights into the future of AI and cloud-native technologies. All the talks are now uploaded to YouTube in the following [playlist](https://www.youtube.com/playlist?list=PLj6h78yzYM2N8nw1YcqqKveySH6_0VnI0). Those do not include the various pre-conference days, available as [separate playlists](https://www.youtube.com/@cncf/playlists?view=1&sort=dd&flow=grid) by CNCF.

## In Conclusion...

In conclusion, KubeCon 2024 showcased the intersection of AI and cloud-native technologies, the open-source community's growth, and the cloud-native ecosystem's maturity. Many enterprises are actively engaged there, innovating, trying, and growing their internal expertise. They're using KubeCon as a recruiting event, expanding their internal talent pool and taking more of their internal operations and processes into their own hands. The event served as a platform for global collaboration, cross-company alignments, innovation, and the exchange of ideas, setting the stage for the future of cloud-native computing.
