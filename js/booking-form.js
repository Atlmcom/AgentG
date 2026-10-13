/**
 * GroundAgent India - Booking Form Logic
 * Accessible validation, service pre-selection, and feedback state
 */

(function () {
  'use strict';

  const form = document.getElementById('book-agent-form');
  const serviceSelect = document.getElementById('requirement-type');
  const successAlert = document.getElementById('form-success-alert');
  const errorAlert = document.getElementById('form-error-alert');
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

    // Anti-spam honeypot verification
    const honey = form.querySelector('input[name="_honey"]');
    if (honey && honey.value.trim() !== '') {
      form.reset();
      return;
    }

    const jobTitle = document.getElementById('job-title');
    const supplierTarget = document.getElementById('supplier-target');
    const industryName = document.getElementById('industry-name');
    const locationIndia = document.getElementById('location-india');
    const timelineReq = document.getElementById('timeline-req');
    const docLink = document.getElementById('doc-link');

    const payload = {
      _subject: `New Lead: ${companyName.value.trim()} - ${fullName.value.trim()}`,
      _template: 'table',
      _captcha: 'false',
      'Full Name': fullName.value.trim(),
      'Company Name': companyName.value.trim(),
      'Work Email': workEmail.value.trim(),
      'Country': country.value.trim(),
      'Phone / WhatsApp': phone.value.trim(),
      'Job Title': jobTitle && jobTitle.value.trim() ? jobTitle.value.trim() : 'Not specified',
      'Service Required': serviceSelect ? serviceSelect.value : 'Professional Assessment',
      'Target Supplier': supplierTarget && supplierTarget.value.trim() ? supplierTarget.value.trim() : 'Not specified',
      'Product / Industry': industryName && industryName.value.trim() ? industryName.value.trim() : 'Not specified',
      'Location in India': locationIndia && locationIndia.value.trim() ? locationIndia.value.trim() : 'Not specified',
      'Preferred Timeline': timelineReq && timelineReq.value.trim() ? timelineReq.value.trim() : 'Flexible',
      'Assignment Scope': assignmentDetails.value.trim(),
      'Document Reference': docLink && docLink.value.trim() ? docLink.value.trim() : 'None provided'
    };

    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      Sending enquiry...
    `;

    if (errorAlert) {
      errorAlert.classList.remove('visible');
      errorAlert.style.display = 'none';
    }
    if (successAlert) {
      successAlert.classList.remove('visible');
      successAlert.style.display = 'none';
    }

    fetch('https://formsubmit.co/ajax/AgentGindia@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Form submission failed with status ' + response.status);
    })
    .then(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = `Request an Agent →`;

      if (successAlert) {
        successAlert.style.display = 'flex';
        successAlert.classList.add('visible');
        successAlert.focus();
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    })
    .catch(err => {
      console.error('Submission error:', err);
      submitBtn.disabled = false;
      submitBtn.innerHTML = `Request an Agent →`;

      if (errorAlert) {
        errorAlert.style.display = 'flex';
        errorAlert.classList.add('visible');
        errorAlert.focus();
        errorAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        alert('Could not submit inquiry automatically. Please email AgentGindia@gmail.com directly.');
      }
    });
  });
})();
