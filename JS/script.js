const config = window.CLIMAPUNTO_CONFIG || { demoMode: true, business: {}, website: {} };
const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('#mobile-menu');
const toast = document.querySelector('#toast');
const quoteForm = document.querySelector('#quote-form');
const formStatus = document.querySelector('#form-status');

const closeMenu = () => {
  menuButton?.setAttribute('aria-expanded', 'false');
  if (mobileMenu) mobileMenu.hidden = true;
  document.body.classList.remove('menu-open');
};

menuButton?.addEventListener('click', () => {
  const opening = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(opening));
  mobileMenu.hidden = !opening;
  document.body.classList.toggle('menu-open', opening);
});
mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobileMenu && !mobileMenu.hidden) {
    closeMenu();
    menuButton?.focus();
  }
});

let toastTimer;
const showToast = (message = 'Esta web es una demostración: falta configurar el contacto real.') => {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
};

document.querySelectorAll('[data-contact]').forEach((action) => {
  const type = action.dataset.contact;
  const phone = String(config.business?.phone || '').replace(/\s+/g, '');
  const whatsapp = String(config.business?.whatsapp || phone).replace(/\D/g, '');
  const email = config.business?.email || '';
  const links = {
    phone: phone ? `tel:${phone}` : '',
    whatsapp: whatsapp ? `https://wa.me/${whatsapp}?text=${encodeURIComponent('Hola, quiero información sobre climatización.')}` : '',
    email: email ? `mailto:${email}` : ''
  };
  if (links[type]) {
    action.href = links[type];
    if (type === 'whatsapp') {
      action.target = '_blank';
      action.rel = 'noopener noreferrer';
    }
  } else {
    action.addEventListener('click', (event) => {
      event.preventDefault();
      showToast();
    });
  }
});

document.querySelectorAll('[data-phone-label]').forEach((label) => {
  label.textContent = config.business?.phoneDisplay || 'Número pendiente de configurar';
});
document.querySelectorAll('[data-email-label]').forEach((label) => {
  label.textContent = config.business?.email || 'Correo pendiente de configurar';
});

document.querySelectorAll('[data-service-target]').forEach((link) => {
  link.addEventListener('click', () => {
    const service = quoteForm?.elements.namedItem('servicio');
    if (service) service.value = link.dataset.serviceTarget;
  });
});

const photoInput = quoteForm?.elements.namedItem('fotos');
photoInput?.addEventListener('change', () => {
  const files = [...photoInput.files];
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  const message = files.length > 5
    ? 'Puedes adjuntar un máximo de 5 fotografías.'
    : totalSize > 10 * 1024 * 1024
      ? 'Las fotografías no pueden superar 10 MB en total.'
      : '';
  photoInput.setCustomValidity(message);
  if (message) photoInput.reportValidity();
});

quoteForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const submitButton = quoteForm.querySelector('[type="submit"]');
  const endpoint = config.website?.formEndpoint;
  window.climaPuntoAnalytics?.track('formulario_intento', { servicio: quoteForm.elements.namedItem('servicio')?.value || '' });
  if (!endpoint) {
    formStatus.textContent = 'Formulario preparado. Falta conectar el envío real en config.js.';
    window.climaPuntoAnalytics?.track('formulario_demo_completado');
    return;
  }
  submitButton.disabled = true;
  submitButton.textContent = 'Enviando…';
  formStatus.textContent = '';
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(quoteForm)
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    formStatus.textContent = 'Solicitud enviada. Te responderemos con los datos facilitados.';
    quoteForm.reset();
    window.climaPuntoAnalytics?.track('formulario_enviado');
  } catch {
    formStatus.textContent = 'No se ha podido enviar. Prueba de nuevo o utiliza WhatsApp.';
    window.climaPuntoAnalytics?.track('formulario_error');
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Enviar solicitud <span>→</span>';
  }
});

const applyConfiguration = () => {
  const business = config.business || {};
  const website = config.website || {};
  document.querySelectorAll('[data-business-city]').forEach((node) => { node.textContent = business.city || 'Sevilla'; });
  document.querySelectorAll('[data-service-area]').forEach((node) => {
    const area = Array.isArray(business.serviceArea) ? business.serviceArea.join(', ') : business.serviceArea;
    if (area) node.textContent = `${area}.`;
  });
  if (website.seoTitle) {
    document.title = website.seoTitle;
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', website.seoTitle);
  }
  if (website.seoDescription) {
    document.querySelector('meta[name="description"]')?.setAttribute('content', website.seoDescription);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', website.seoDescription);
  }
  if (website.socialImage) document.querySelector('meta[property="og:image"]')?.setAttribute('content', website.socialImage);
  if (!config.demoMode) {
    document.querySelector('[data-demo-bar]')?.remove();
    document.querySelector('[data-footer-state]')?.remove();
  }
  if (config.demoMode || !website.publicUrl || !business.phone) return;
  const canonical = document.createElement('link');
  canonical.rel = 'canonical';
  canonical.href = website.publicUrl;
  document.head.appendChild(canonical);
  const ogUrl = document.createElement('meta');
  ogUrl.setAttribute('property', 'og:url');
  ogUrl.content = website.publicUrl;
  document.head.appendChild(ogUrl);
  const schema = document.createElement('script');
  schema.type = 'application/ld+json';
  schema.textContent = JSON.stringify({
    '@context':'https://schema.org', '@type':'HVACBusiness', name:business.name, url:website.publicUrl,
    telephone:business.phone, email:business.email || undefined,
    address:{ '@type':'PostalAddress', streetAddress:business.address || undefined, addressLocality:business.city, addressRegion:business.province, postalCode:business.postalCode || undefined, addressCountry:business.country || 'ES' },
    areaServed:business.serviceArea
  });
  document.head.appendChild(schema);
};

applyConfiguration();

const applyFeaturedProject = () => {
  const project = config.featuredProject;
  const section = document.querySelector('[data-featured-project]');
  if (!section || !project?.enabled || !project.image) return;
  const image = section.querySelector('[data-project-image]');
  image.src = project.image;
  image.alt = project.imageAlt || project.title || 'Trabajo de climatización terminado';
  section.querySelector('[data-project-label]').textContent = project.label || 'Trabajo real';
  section.querySelector('[data-project-title]').textContent = project.title || 'Trabajo terminado';
  section.querySelector('[data-project-description]').textContent = project.description || '';
  section.querySelector('[data-project-location]').textContent = project.location || '';
  section.hidden = false;
};

applyFeaturedProject();
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold:.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
}
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
