# Services Component

Detailed list of services offered.

## HTML Structure

```html
<section id="services" class="section">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Our Premium Services</h2>
    </div>

    <div class="grid grid--3">
      <!-- Service 1 -->
      <article class="service-card">
        <div class="service-img-wrapper">
          <img src="assets/service1.jpg" alt="Service Name" loading="lazy">
        </div>
        <div class="service-content">
          <h3 class="service-title">Deep Cleaning</h3>
          <p class="service-desc">
            Comprehensive cleaning for your entire home. We get into every nook and cranny.
          </p>
          <ul class="service-list">
            <li>✓ Eco-friendly products</li>
            <li>✓ 100% Satisfaction Guarantee</li>
          </ul>
          <a href="#contact" class="btn-link">Learn More →</a>
        </div>
      </article>

      <!-- Service 2 -->
      <article class="service-card">
        <div class="service-img-wrapper">
          <img src="assets/service2.jpg" alt="Service Name" loading="lazy">
        </div>
        <div class="service-content">
          <h3 class="service-title">Maintenance</h3>
          <p class="service-desc">
            Regular maintenance plans to keep everything running smoothly year-round.
          </p>
          <ul class="service-list">
            <li>✓ Monthly visits</li>
            <li>✓ Priority support</li>
          </ul>
          <a href="#contact" class="btn-link">Learn More →</a>
        </div>
      </article>
      
      <!-- Service 3 -->
      <article class="service-card">
        <div class="service-img-wrapper">
          <img src="assets/service3.jpg" alt="Service Name" loading="lazy">
        </div>
        <div class="service-content">
          <h3 class="service-title">Emergency Repair</h3>
          <p class="service-desc">
            24/7 emergency service when you need us most. We'll be there in under an hour.
          </p>
          <ul class="service-list">
            <li>✓ No overtime fees</li>
            <li>✓ Rapid response</li>
          </ul>
          <a href="#contact" class="btn-link">Learn More →</a>
        </div>
      </article>
    </div>
  </div>
</section>
```

## CSS Styling

```css
.service-card {
  background: var(--color-bg);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.service-img-wrapper {
  height: 200px;
  background-color: #eee;
}

.service-img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.service-content {
  padding: var(--spacing-md);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.service-title {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-sm);
  color: var(--color-text);
}

.service-desc {
  color: var(--color-text-light);
  margin-bottom: var(--spacing-sm);
  line-height: 1.6;
}

.service-list {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--spacing-md) 0;
  color: var(--color-text);
}

.service-list li {
  margin-bottom: 0.5rem;
}

.btn-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
  margin-top: auto; /* Push to bottom */
}

.btn-link:hover {
  text-decoration: underline;
}
```
