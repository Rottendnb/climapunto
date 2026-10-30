(() => {
  const metricsKey = 'climapunto_metrics_v1';
  const consentKey = 'climapunto_analytics_consent';
  const labels = {
    cta_presupuesto_hero: 'Presupuesto · portada',
    clic_whatsapp_hero: 'WhatsApp · portada',
    clic_whatsapp_form: 'WhatsApp · formulario',
    clic_llamada_movil: 'Llamadas · móvil',
    clic_whatsapp_movil: 'WhatsApp · móvil',
    cta_presupuesto_movil: 'Presupuesto · móvil',
    formulario_intento: 'Formularios iniciados',
    formulario_demo_completado: 'Formularios demo',
    formulario_enviado: 'Formularios enviados',
    formulario_error: 'Errores de formulario'
  };
  const grid = document.querySelector('#metrics-grid');
  const state = document.querySelector('#metrics-state');

  const read = () => {
    try { return JSON.parse(localStorage.getItem(metricsKey)) || {}; }
    catch { return {}; }
  };
  const render = () => {
    const metrics = read();
    grid.replaceChildren(...Object.entries(labels).map(([key, label]) => {
      const card = document.createElement('div');
      card.className = 'metric-card';
      const name = document.createElement('span');
      name.textContent = label;
      const value = document.createElement('strong');
      value.textContent = metrics[key] || 0;
      card.append(name, value);
      return card;
    }));
    const consent = localStorage.getItem(consentKey);
    state.textContent = consent === 'accepted'
      ? 'Medición aceptada en este navegador.'
      : consent === 'rejected' ? 'Medición rechazada en este navegador.' : 'Aún no se ha elegido una opción de medición.';
  };
  document.querySelector('#reset-metrics')?.addEventListener('click', () => {
    if (!window.confirm('¿Borrar las métricas guardadas en este navegador?')) return;
    localStorage.removeItem(metricsKey);
    render();
  });
  render();
})();
