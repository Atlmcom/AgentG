/**
 * GroundAgent India - Booking Form Logic
 * Accessible validation, service pre-selection, and feedback state
 */

(function () {
  'use strict';

  const form = document.getElementById('book-agent-form');
  const serviceSelect = document.getElementById('requirement-type');
  const successAlert = document.getElementById('form-success-alert');
  const submitBtn = document.getElementById('form-submit-btn');

  // Pre-fill service requirement when clicking service cards or pricing packages
  window.selectServiceAndScroll = function (serviceName) {
    if (serviceSelect) {
      for (let i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].value.toLowerCase().includes(serviceName.toLowerCase()) ||
            serviceSelect.options[i].text.toLowerCase().includes(serviceName.toLowerCase())) {
          serviceSelect.selectedIndex = i;
          break;
        }
      }
    }

    const formSection = document.getElementById('book-an-agent');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
      // Focus on the first form input after scroll
      setTimeout(() => {
        const firstInput = document.getElementById('full-name');
        if (firstInput) firstInput.focus();
      }, 500);
    }
  };

  if (!form) return;

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(field, message) {
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
    let errSpan = field.nextElementSibling;
    if (errSpan && errSpan.classList.contains('form-error-msg')) {
      errSpan.textContent = message;
      errSpan.style.display = 'block';
    }
  }

  function clearError(field) {
    field.classList.remove('error');
    field.removeAttribute('aria-invalid');
    let errSpan = field.nextElementSibling;
    if (errSpan && errSpan.classList.contains('form-error-msg')) {
      errSpan.style.display = 'none';
    }
  }

  form.querySelectorAll('.form-control').forEach(field => {
    field.addEventListener('input', () => {
      clearError(field);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let hasError = false;

    const fullName = document.getElementById('full-name');
    const companyName = document.getElementById('company-name');
    const workEmail = document.getElementById('work-email');
    const country = document.getElementById('country');
    const phone = document.getElementById('phone-number');
    const assignmentDetails = document.getElementById('assignment-details');

    if (!fullName.value.trim()) {
      showError(fullName, 'Please enter your full name');
      hasError = true;
    }

    if (!companyName.value.trim()) {
      showError(companyName, 'Please enter your company name');
      hasError = true;
    }

    if (!workEmail.value.trim() || !validateEmail(workEmail.value.trim())) {
      showError(workEmail, 'Please enter a valid business email address');
      hasError = true;
    }

    if (!country.value.trim()) {
      showError(country, 'Please specify your country');
      hasError = true;
    }

    if (!phone.value.trim()) {
      showError(phone, 'Please enter a phone or WhatsApp contact number');
      hasError = true;
    }

    if (!assignmentDetails.value.trim()) {
      showError(assignmentDetails, 'Please outline what you would like GroundAgent to check or accomplish');
      hasError = true;
    }

    if (hasError) {
      const firstError = form.querySelector('.form-control.error');
      if (firstError) firstError.focus();
      return;
    }

    // Submit state simulation
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      Submitting enquiry...
    `;

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = `Request an Agent →`;

      if (successAlert) {
        successAlert.classList.add('visible');
        successAlert.focus();
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 800);
  });
})();
