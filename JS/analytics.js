(() => {
  const config = window.CLIMAPUNTO_CONFIG || {};
  const storageKey = 'climapunto_metrics_v1';
  const consentKey = 'climapunto_analytics_consent';

  const hasConsent = () => config.privacy?.analyticsEnabled === true
    && localStorage.getItem(consentKey) === 'accepted';

  const readMetrics = () => {
    try { return JSON.parse(localStorage.getItem(storageKey)) || {}; }
    catch { return {}; }
  };

  const track = (eventName, detail = {}) => {
    if (!hasConsent()) return;
    const metrics = readMetrics();
    metrics[eventName] = (metrics[eventName] || 0) + 1;
    metrics.lastEvent = { name: eventName, detail, at: new Date().toISOString() };
    localStorage.setItem(storageKey, JSON.stringify(metrics));

    const endpoint = config.website?.analyticsEndpoint;
    if (endpoint && !config.demoMode) {
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: eventName, detail, path: location.pathname })
      }).catch(() => {});
    }
  };

  window.climaPuntoAnalytics = { track, readMetrics, storageKey, consentKey, hasConsent };

  document.addEventListener('click', (event) => {
    const target = event.target.closest('[data-track]');
    if (target) track(target.dataset.track, { label: target.textContent.trim().slice(0, 80) });
  });
})();
