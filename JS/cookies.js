(() => {
  const config = window.CLIMAPUNTO_CONFIG || {};
  const consentKey = 'climapunto_analytics_consent';
  const metricsKey = 'climapunto_metrics_v1';
  const banner = document.querySelector('#cookie-banner');

  if (config.privacy?.analyticsEnabled !== true) return;

  const savedChoice = localStorage.getItem(consentKey);
  if (banner && !['accepted', 'rejected'].includes(savedChoice)) banner.hidden = false;

  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-cookie-choice]');
    if (!button) return;
    const choice = button.dataset.cookieChoice;
    localStorage.setItem(consentKey, choice);
    if (choice === 'rejected') localStorage.removeItem(metricsKey);
    if (banner) banner.hidden = true;
    document.querySelectorAll('[data-consent-status]').forEach((node) => {
      node.textContent = choice === 'accepted' ? 'Medición aceptada.' : 'Medición rechazada.';
    });
    document.dispatchEvent(new CustomEvent('climapunto:consent', {
      detail: { analytics: choice === 'accepted' }
    }));
  });

  document.querySelectorAll('[data-consent-status]').forEach((node) => {
    node.textContent = savedChoice === 'accepted'
      ? 'Medición aceptada.'
      : savedChoice === 'rejected' ? 'Medición rechazada.' : 'Aún no has elegido.';
  });
})();
