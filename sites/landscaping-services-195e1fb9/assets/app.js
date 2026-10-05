(function() {
  'use strict';
  const b = window.WEBSITE_BUSINESS || {};

  // 1. Dynamic Font Injection
  if (b.font_url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = b.font_url;
    document.head.appendChild(link);
  }
  if (b.font_family) {
    document.documentElement.style.setProperty('--font-brand', `'${b.font_family}', system-ui, sans-serif`);
  }
  if (b.font_heading) {
    document.documentElement.style.setProperty('--font-heading', `'${b.font_heading}', system-ui, sans-serif`);
  }

  // 2. Dynamic Color Palette
  if (b.theme_color && /^#[0-9a-fA-F]{6}$/.test(b.theme_color)) {
    document.documentElement.style.setProperty('--theme-primary', b.theme_color);
  }
  if (b.accent_color && /^#[0-9a-fA-F]{6}$/.test(b.accent_color)) {
    document.documentElement.style.setProperty('--theme-accent', b.accent_color);
  }

  // 3. Brand Name & Logo
  const companyName = b.name || 'Professional Services';
  document.querySelectorAll('[data-brand-name]').forEach(el => el.textContent = companyName);
  
  if (b.logo_url) {
    document.querySelectorAll('[data-brand-logo]').forEach(img => {
      img.src = b.logo_url;
      img.style.display = 'block';
    });
    document.querySelectorAll('.brand-icon').forEach(icon => icon.style.display = 'none');
  }

  // 4. Contact Details
  const cleanPhone = b.phone || 'Call for immediate service';
  const phoneDigits = (b.phone || '').replace(/[^+0-9]/g, '');
  document.querySelectorAll('[data-brand-phone]').forEach(el => {
    el.textContent = cleanPhone;
    if (el.tagName === 'A' && phoneDigits) el.href = 'tel:' + phoneDigits;
  });

  const cleanEmail = b.email || 'contact@contractor.com';
  document.querySelectorAll('[data-brand-email]').forEach(el => {
    el.textContent = cleanEmail;
    if (el.tagName === 'A') el.href = 'mailto:' + cleanEmail;
  });

  const fullAddress = [b.street, b.city, b.zip].filter(Boolean).join(', ') || 'Serving Your Local Metro Area';
  document.querySelectorAll('[data-brand-address]').forEach(el => el.textContent = fullAddress);
  document.querySelectorAll('[data-brand-city]').forEach(el => el.textContent = b.city || 'your area');

  if (b.tagline) {
    document.querySelectorAll('[data-brand-tagline]').forEach(el => el.textContent = b.tagline);
  }

  // 5. Dynamic Real Services Grid
  if (Array.isArray(b.services) && b.services.length >= 3) {
    const grid = document.querySelector('[data-services-grid]');
    if (grid) {
      grid.innerHTML = b.services.map((svc, idx) => `
        <div class="service-card">
          <div>
            <div class="service-icon">${['⭐', '🔧', '🛡️', '⚡', '🏗️', '📐'][idx % 6]}</div>
            <h3>${svc}</h3>
            <p>Full-service certified ${svc.toLowerCase()} delivered with strict attention to code, quality materials, and client satisfaction.</p>
          </div>
          <a href="#contact" class="service-link">Book Service <span>&rarr;</span></a>
        </div>
      `).join('');
    }
  }

  // Form submit simulation
  const quoteForm = document.getElementById('quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const status = document.getElementById('quote-status');
      if (status) {
        status.textContent = 'Thank you! Your estimate request has been received.';
        status.style.display = 'block';
        status.style.color = '#22c55e';
      }
      quoteForm.reset();
    });
  }
})();