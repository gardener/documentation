<template>
  <div class="figma-landing-content">
    <!-- Hero Section -->
    <section class="hero-section section-container">
      <div class="hero-content">
        <h1 class="hero-title">{{ heroContent.title }}</h1>
        <p class="hero-tagline">{{ heroContent.tagline }}</p>
        <p class="hero-description">{{ heroContent.description }}</p>
        <div class="cta-buttons">
          <a :href="heroContent.primaryCTA.link" class="cta-button primary">{{ heroContent.primaryCTA.text }}</a>
          <a :href="heroContent.secondaryCTA.link" class="cta-button secondary">{{ heroContent.secondaryCTA.text }}</a>
          <a href="https://demo.gardener.cloud/login?redirectPath=/terminal" class="cta-button demo">Try Demo</a>
        </div>
      </div>
      <div class="hero-image">
        <img src="/design/header_frontpage.png" alt="Gardener Hero Image">
      </div>
    </section>

    <!-- Image Showcase Section -->
    <section class="image-showcase-section section-container">
      <h2 class="section-title">{{ showcase.title }}</h2>
      <div class="image-showcase-grid">
        <div v-for="(item, index) in showcase.items" :key="index" class="image-showcase-item">
          <div class="image-container">
            <img :src="item.image" :alt="item.title">
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </section>

    <!-- Architecture Section -->
    <section class="architecture-section section-container">
      <h2 class="section-title">Gardener Architecture</h2>
      <div class="architecture-content">
        <div class="architecture-text">
          <h3>Grow platform for your organization</h3>
          <ul>
            <li>Ordering engine</li>
            <li>Processes on hyperscaler</li>
            <li>Uses control plane pattern</li>
            <li>Kubernetes control plane management</li>
            <li>Complete cluster lifecycle</li>
          </ul>
        </div>
        <div class="architecture-visual">
          <img src="/design/Group 5.png" alt="Gardener Architecture Diagram" class="architecture-diagram-img">
        </div>
      </div>
    </section>

    <!-- Extend to your needs Section -->
    <section class="extend-section section-container">
      <h2 class="section-title">Extend to your needs</h2>
      <div class="extend-content">
        <div class="extend-text">
          <h3>Customize to your requirements</h3>
          <ul>
            <li>Adjust and configure any layer</li>
            <li>Open for contributions on any layer</li>
            <li>Extensible plugin architecture</li>
          </ul>
          <h3>Build on solid foundations</h3>
          <ul>
            <li>Enterprise grade infrastructure</li>
            <li>Comprehensive API support</li>
            <li>Rich ecosystem of tools</li>
          </ul>
        </div>
        <div class="extend-visual">
          <img src="/design/image 2.png" alt="Extend to your needs" class="extend-img">
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section section-container">
      <h2 class="section-title">What Our Users Say</h2>
      <div class="testimonials-grid">
        <div class="testimonial-item">
          <p class="testimonial-text">{{ testimonials[0].text }}</p>
          <div class="testimonial-author">
            <strong>{{ testimonials[0].company }}</strong>
          </div>
        </div>
        <div class="testimonial-item">
          <p class="testimonial-text">{{ testimonials[1].text }}</p>
          <div class="testimonial-author">
            <strong>{{ testimonials[1].company }}</strong>
          </div>
        </div>
      </div>
      <div class="testimonial-more">
        <a href="/documentation/resources/" class="read-more-link">Read more...</a>
      </div>
    </section>

    <!-- Platforms Section -->
    <section class="platforms-section section-container">
      <h2 class="section-title">Available on All Major Platforms</h2>
      <div class="platforms-grid">
        <div v-for="(provider, index) in providers" :key="index" class="platform-item">
          <div class="platform-icon">
            <img :src="provider.icon" :alt="provider.name">
          </div>
          <span>{{ provider.name }}</span>
        </div>
      </div>
      <div class="platforms-more">
        <span>...many more</span>
      </div>
    </section>
  </div>
</template>

<script setup>
// Component data
const heroContent = {
  title: "Gardener",
  tagline: "Your in-house Managed Kubernetes offering",
  description: "Empower your teams with in-house Managed Kubernetes clusters with a vendor-neutral, consistent experience across all infrastructure providers",
  primaryCTA: {
    text: "Get Started",
    link: "/documentation/getting-started"
  },
  secondaryCTA: {
    text: "Learn More",
    link: "/documentation/getting-started/introduction"
  }
}

// Showcase section data
const showcase = {
  title: "Why Gardener?",
  items: [
    {
      title: "Vendor-agnostic Look'n'Feel",
      description: "Consistent management experience across all infrastructure providers with unified API and tooling",
      image: "/design/300919_Agreement_R (1) 1.png"
    },
    {
      title: "Open Source",
      description: "Full transparency, community-driven development, and freedom from vendor lock-in with Apache 2.0 license",
      image: "/design/305142_PuzzlePieces_R 1.png"
    },
    {
      title: "Cloud Native",
      description: "Built on Kubernetes principles with declarative configuration, auto-scaling, and self-healing capabilities",
      image: "/design/301055_Cloud_R (1) 1.png"
    }
  ]
}

// Cloud provider data
const providers = [
  {
    name: "AWS",
    icon: "/lp/platforms/aws.svg"
  },
  {
    name: "Azure",
    icon: "/lp/platforms/microsoft-azure.svg"
  },
  {
    name: "Google Cloud",
    icon: "/lp/platforms/google-cloud-platform.svg"
  },
  {
    name: "OpenStack",
    icon: "/lp/platforms/openstack.svg"
  },
  {
    name: "Metal Stack",
    icon: "/lp/platforms/metalstack.svg"
  },
  {
    name: "Equinix Metal",
    icon: "/lp/platforms/equinix-metal.svg"
  }
]

const features = [
  {
    title: "Cloud Native",
    icon: "/highlights/cloud-agnostic.svg",
    description: "One approach to orchestrate entire stack, no matter where it runs"
  },
  {
    title: "Open Source",
    icon: "/highlights/gardener.svg",
    description: "Powered by the open source Gardener project, developed in the public"
  },
  {
    title: "Vendor-agnostic",
    icon: "/highlights/autonomous.svg",
    description: "Consistent experience in the cloud, on-premises or in isolated environments"
  },
  {
    title: "Privacy by Design",
    icon: "/highlights/certified.svg",
    description: "Governance under your control"
  },
  {
    title: "Ultra Scalable",
    icon: "/highlights/extensible.svg",
    description: "Fleet management of thousands of clusters with low TCO by design"
  },
  {
    title: "Autonomous",
    icon: "/highlights/autonomous.svg",
    description: "Self-healing, auto-scaling, and auto-updating operating system and Kubernetes"
  }
]

const testimonials = [
  {
    text: "STACKIT is a digital brand of Europe's biggest retailer, the Schwarz Group, which includes Lidl, Kaufland, but also production and recycling companies. It uses Gardener to offer public and private Kubernetes as a service in own data centers in Europe and targets to become the cloud provider for German and European small and mid-sized companies.",
    company: "STACKIT"
  },
  {
    text: "We use Gardener both for internal usage and to manage clusters for our customers. We love the openness of the project, the flexibility and the architecture that allows us to manage clusters around the world with only one team from one single pane of glass and to meet industry specific certification standards. The sovereignty by design is another great value, the technology implicitly brings along.",
    company: "23 Technologies"
  }
]
</script>

<style>
/* Modern styling based on the Figma design */
.figma-landing-content {
  width: 100%;
  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Section styling */
.section-container {
  margin: 5rem 0;
  position: relative;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 600;
  color: #18794E;
}

/* Hero Section */
.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 2rem;
  background: transparent;
  color: var(--vp-c-text-1);
  border-radius: 16px;
  margin-top: 2rem;
  overflow: hidden;
  position: relative;
  box-shadow: none;
}

.hero-content {
  max-width: 600px;
  z-index: 1;
}

.hero-title {
  font-size: 3.5rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #18794E;
  font-weight: 700;
}

.hero-tagline {
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.hero-description {
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: var(--vp-c-text-2);
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.cta-button {
  padding: 0.9rem 1.75rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.02em;
}

.cta-button.primary {
  background-color: #18794E;
  color: white;
  border: 2px solid #18794E;
}

.cta-button.primary:hover {
  background-color: #25A567;
  border-color: #25A567;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cta-button.secondary, .cta-button.demo {
  background-color: transparent;
  border: 2px solid #18794E;
  color: #18794E;
}

.cta-button.secondary:hover, .cta-button.demo:hover {
  background-color: rgba(24, 121, 78, 0.1);
  transform: translateY(-3px);
}

.hero-image {
  max-width: 550px;
  flex-shrink: 0;
  z-index: 1;
  filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.2));
}

.hero-image img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

/* Image Showcase Section */
.image-showcase-section {
  padding: 2rem 1rem;
}

.image-showcase-grid {
  display: flex;
  gap: 2.5rem;
  justify-content: center;
}

.image-showcase-item {
  flex: 1;
  max-width: 380px;
  text-align: center;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.image-showcase-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.1);
}

.image-container {
  height: 240px;
  overflow: hidden;
  background-color: var(--vp-c-bg-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.image-container img {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.image-showcase-item:hover .image-container img {
  transform: scale(1.05);
}

.image-showcase-item h3 {
  margin: 2rem 0 1rem;
  padding: 0 1.5rem;
  color: #18794E;
  font-size: 1.5rem;
  font-weight: 600;
}

.image-showcase-item p {
  margin: 0 0 2rem;
  padding: 0 1.5rem;
  color: var(--vp-c-text-2);
  font-size: 1.1rem;
  line-height: 1.6;
}

/* Architecture Section */
.architecture-section {
  padding: 4rem 3rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.architecture-content {
  display: flex;
  align-items: center;
  gap: 4rem;
}

.architecture-text {
  flex: 1;
}

.architecture-text h3 {
  margin-top: 2rem;
  margin-bottom: 1.25rem;
  color: #18794E;
  font-size: 1.75rem;
  font-weight: 600;
}

.architecture-text h3:first-child {
  margin-top: 0;
}

.architecture-text ul {
  list-style-type: none;
  padding-left: 1.25rem;
}

.architecture-text li {
  margin-bottom: 1rem;
  font-size: 1.1rem;
  position: relative;
  padding-left: 1.5rem;
}

.architecture-text li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: #18794E;
  font-weight: bold;
}

.architecture-visual {
  flex: 1.2;
}

.architecture-diagram-img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

/* Extend to your needs Section */
.extend-section {
  padding: 4rem 3rem;
  border-radius: 16px;
}

.extend-content {
  display: flex;
  align-items: center;
  gap: 4rem;
}

.extend-text {
  flex: 1;
}

.extend-text h3 {
  margin-top: 2rem;
  margin-bottom: 1.25rem;
  color: #18794E;
  font-size: 1.75rem;
  font-weight: 600;
}

.extend-text h3:first-child {
  margin-top: 0;
}

.extend-text ul {
  list-style-type: none;
  padding-left: 1.25rem;
}

.extend-text li {
  margin-bottom: 1rem;
  font-size: 1.1rem;
  position: relative;
  padding-left: 1.5rem;
}

.extend-text li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: #18794E;
  font-weight: bold;
}

.extend-visual {
  flex: 1.2;
}

.extend-img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.extend-visual:hover .extend-img {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.16);
}

/* Features section */
.features-section {
  padding: 5rem 2rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 2.5rem;
}

.feature-item {
  background-color: white;
  padding: 2.5rem 2rem;
  border-radius: 12px;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.feature-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.feature-item h3 {
  font-size: 1.5rem;
  margin-bottom: 1.25rem;
  color: #18794E;
  font-weight: 600;
}

.feature-item p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

/* Testimonials Section */
.testimonials-section {
  padding: 5rem 2rem;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 3rem;
}

.testimonial-item {
  background-color: white;
  padding: 3rem;
  border-radius: 12px;
  border-left: 5px solid #18794E;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.testimonial-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.12);
}

.testimonial-text {
  font-style: italic;
  margin-bottom: 2rem;
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.testimonial-author {
  font-size: 1.1rem;
}

.testimonial-more {
  margin-top: 3rem;
  text-align: center;
}

.read-more-link {
  color: #18794E;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.125rem;
  padding: 0.75rem 2rem;
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.read-more-link:hover {
  background-color: rgba(24, 121, 78, 0.1);
  transform: translateY(-3px);
}

/* Platforms Section */
.platforms-section {
  padding: 5rem 2rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 16px;
  margin-bottom: 4rem;
}

.platforms-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 3rem;
}

.platform-item {
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  min-width: 180px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.platform-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.12);
}

.platform-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
}

.platform-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.platform-item span {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.platforms-more {
  font-style: italic;
  opacity: 0.7;
  text-align: center;
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .hero-title {
    font-size: 3rem;
  }

  .hero-tagline {
    font-size: 1.5rem;
  }

  .hero-image {
    max-width: 450px;
  }

  .section-title {
    font-size: 2.25rem;
  }
}

@media (max-width: 960px) {
  .hero-section {
    flex-direction: column;
    padding: 3rem 1.5rem;
  }

  .hero-content {
    margin-bottom: 3rem;
    text-align: center;
  }

  .cta-buttons {
    justify-content: center;
  }

  .image-showcase-grid {
    flex-direction: column;
    align-items: center;
  }

  .image-showcase-item {
    width: 100%;
    max-width: 480px;
  }

  .architecture-content,
  .extend-content {
    flex-direction: column-reverse;
    text-align: center;
    gap: 3rem;
  }

  .architecture-text ul,
  .extend-text ul {
    display: inline-block;
    text-align: left;
  }
}

@media (max-width: 768px) {
  .testimonials-grid {
    grid-template-columns: 1fr;
  }

  .feature-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .hero-section,
  .architecture-section,
  .extend-section,
  .features-section,
  .testimonials-section,
  .platforms-section {
    padding: 3rem 1rem;
  }
}

@media (max-width: 480px) {
  .cta-button {
    width: 100%;
    text-align: center;
  }

  .hero-title {
    font-size: 2.25rem;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .testimonial-item {
    padding: 2rem 1.5rem;
  }
}
</style>
