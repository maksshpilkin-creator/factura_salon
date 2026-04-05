# Navbar Component

A responsive navigation bar with mobile hamburger menu.

## HTML Structure

```html
<header class="site-header">
  <div class="container site-header__inner">
    <a href="#" class="logo">
      <img src="assets/logo.svg" alt="Business Name" width="120" height="40">
    </a>

    <button class="mobile-toggle" aria-label="Toggle menu" aria-expanded="false">
      <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>
    </button>

    <nav class="main-nav">
      <ul class="nav-list">
        <li><a href="#services" class="nav-link">Services</a></li>
        <li><a href="#about" class="nav-link">About</a></li>
        <li><a href="#reviews" class="nav-link">Reviews</a></li>
        <li><a href="#contact" class="btn btn--primary">Book Now</a></li>
      </ul>
    </nav>
  </div>
</header>
```

## CSS Styling

```css
.site-header {
  height: var(--header-height);
  background: var(--color-bg);
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
}

.site-header__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.nav-list {
  display: flex;
  gap: var(--spacing-md);
  list-style: none;
  align-items: center;
}

.nav-link {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover {
  color: var(--color-primary);
}

.mobile-toggle {
  display: none;
}

@media (max-width: 768px) {
  .mobile-toggle {
    display: block;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .main-nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--color-bg);
    padding: var(--spacing-md);
    box-shadow: var(--shadow-lg);
    display: none;
  }
  
  .main-nav.is-open {
    display: block;
  }
  
  .nav-list {
    flex-direction: column;
    align-items: flex-start;
  }
}
```

## JavaScript Logic

```javascript
const toggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('.main-nav');

toggle.addEventListener('click', () => {
  const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', !isExpanded);
  nav.classList.toggle('is-open');
});
```
