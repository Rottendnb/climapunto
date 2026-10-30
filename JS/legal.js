(() => {
  const business = window.CLIMAPUNTO_CONFIG?.business || {};
  const values = {
    name: business.name || 'ClimaPunto',
    legalName: business.legalName || '[RAZÓN SOCIAL PENDIENTE]',
    taxId: business.taxId || '[NIF/CIF PENDIENTE]',
    address: business.address || '[DOMICILIO PENDIENTE]',
    email: business.email || '[EMAIL PENDIENTE]',
    phone: business.phoneDisplay || '[TELÉFONO PENDIENTE]'
  };

  document.querySelectorAll('[data-legal]').forEach((element) => {
    const key = element.dataset.legal;
    element.textContent = values[key] || '';
    if (String(values[key]).startsWith('[')) element.classList.add('placeholder');
  });
})();
