<template>
  <div class="figma-landing-content">
    <!-- Hero Section -->
    <section class="hero-section flex-between section-container flex-col-mobile">
      <div class="hero-content">
        <h1 class="hero-title">{{ heroContent.title }}</h1>
        <p class="hero-tagline">{{ heroContent.tagline }}</p>
        <p>{{ heroContent.description }}</p>
        <div class="cta-buttons flex gap-4">
          <a :href="heroContent.primaryCTA.link" class="cta-button primary">{{ heroContent.primaryCTA.text }}</a>
          <a :href="heroContent.secondaryCTA.link" class="cta-button secondary">{{ heroContent.secondaryCTA.text }}</a>
          <a href="https://demo.gardener.cloud/login?redirectPath=/terminal" class="cta-button demo">Try Demo</a>
        </div>
      </div>
      <div class="hero-image">
        <img src="/gardener-logo-large.svg" alt="Gardener Logo">
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section section-container">
      <h2 class="section-title">Key Features</h2>
      <div class="card-grid">
        <div v-for="(feature, index) in features" :key="index" class="feature-item flex-col-center">
          <div class="feature-icon">
            <img :src="feature.icon" :alt="feature.title">
          </div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- Architecture Section -->
    <section class="architecture-section section-container">
      <h2 class="section-title">Gardener Architecture</h2>
      <div class="two-col architecture-content flex-col-mobile">
        <div class="architecture-text">
          <h3>Grow platform for your organization</h3>
          <ul>
            <li>Ordering engine</li>
            <li>Processes on hyperscaler</li>
            <li>Uses control plane pattern</li>
          </ul>

          <h3>Extend to your needs</h3>
          <ul>
            <li>Adjust/config any layer</li>
            <li>Open for contributions on any layer</li>
          </ul>
        </div>
        <div class="architecture-visual">
          <!-- Simplified representation of the architecture diagram -->
          <div class="architecture-diagram flex-col justify-between">
            <div class="diagram-management">ManagementClusters</div>
            <div class="diagram-managed">ManagedClusters</div>
            <div class="diagram-connections"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section section-container">
      <h2 class="section-title">What Our Users Say</h2>
      <div class="two-col testimonials-grid">
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
      <div class="testimonial-more flex-center">
        <a href="/documentation/resources/">Read more...</a>
      </div>
    </section>

    <!-- Platforms Section -->
    <section class="platforms-section section-container">
      <h2 class="section-title">Available on All Major Platforms</h2>
      <div class="flex flex-wrap gap-8 justify-center platforms-grid">
        <div class="platform-item">
          <span>AWS</span>
        </div>
        <div class="platform-item">
          <span>Azure</span>
        </div>
        <div class="platform-item">
          <span>Google Cloud</span>
        </div>
        <div class="platform-item">
          <span>+ any Hyperscaler</span>
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
  description: "Empower your teams with in-house Managed Kubernetes clusters",
  primaryCTA: {
    text: "Get Started",
    link: "/documentation/getting-started"
  },
  secondaryCTA: {
    text: "Learn More",
    link: "/documentation/getting-started/introduction"
  }
}

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
    title: "Vendor-agnostic Look'n'Feel",
    icon: "/highlights/autonomous.svg",
    description: "Regardless if in the cloud, on-premises or in isolated environment"
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
}

/* Section styling */
.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
}

/* Hero Section */
.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 2rem;
  background: linear-gradient(to right, var(--vp-c-brand-1), var(--vp-c-brand-2));
  color: white;
  border-radius: 12px;
  margin: 2rem 0;
}

.hero-content {
  max-width: 600px;
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: white;
}

.hero-tagline {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
}

.cta-button {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.cta-button.primary {
  background-color: white;
  color: var(--vp-c-brand-1);
}

.cta-button.secondary, .cta-button.demo {
  background-color: transparent;
  border: 1px solid white;
  color: white;
}

.hero-image {
  max-width: 400px;
}

.hero-image img {
  width: 100%;
}

/* Features section */
.features-section {
  padding: 4rem 2rem;
  text-align: center;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-item {
  background-color: var(--vp-c-bg-soft);
  padding: 2rem;
  border-radius: 8px;
  transition: transform 0.3s ease;
  height: 100%;
}

.feature-item:hover {
  transform: translateY(-5px);
}

.feature-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.5rem;
}

.feature-item h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

/* Architecture Section */
.architecture-section {
  padding: 4rem 2rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 12px;
}

.architecture-content {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.architecture-text {
  flex: 1;
}

.architecture-text h3 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand-1);
}

.architecture-text ul {
  list-style-type: none;
  padding-left: 1rem;
}

.architecture-text li {
  margin-bottom: 0.5rem;
}

.architecture-visual {
  flex: 1;
}

.architecture-diagram {
  background-color: rgba(var(--vp-c-brand-1), 0.1);
  border-radius: 8px;
  padding: 2rem;
  position: relative;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.diagram-management, .diagram-managed {
  background-color: var(--vp-c-brand-1);
  color: white;
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
}

/* Testimonials Section */
.testimonials-section {
  padding: 4rem 2rem;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.testimonial-item {
  background-color: var(--vp-c-bg-soft);
  padding: 2rem;
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-brand-1);
}

.testimonial-text {
  font-style: italic;
  margin-bottom: 1.5rem;
}

.testimonial-more {
  margin-top: 2rem;
  text-align: center;
}

.testimonial-more a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
}

/* Platforms Section */
.platforms-section {
  padding: 4rem 2rem;
  text-align: center;
}

.platforms-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.platform-item {
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  border-radius: 8px;
  min-width: 150px;
  text-align: center;
}

.platforms-more {
  font-style: italic;
  opacity: 0.7;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-section, .architecture-content {
    flex-direction: column;
    text-align: center;
  }

  .hero-content {
    margin-bottom: 2rem;
  }

  .cta-buttons {
    justify-content: center;
  }

  .architecture-text {
    text-align: left;
  }
}
</style>
