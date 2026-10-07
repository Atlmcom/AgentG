/**
 * GroundAgent India - Sample Report Modal
 * Accessible modal dialog with realistic inspection report views
 */

(function () {
  'use strict';

  const modalOverlay = document.getElementById('sample-report-modal');
  const openButtons = document.querySelectorAll('.open-sample-report-btn');
  const closeButtons = document.querySelectorAll('.close-modal-btn');
  let previouslyFocusedElement = null;

  function openModal() {
    if (!modalOverlay) return;
    previouslyFocusedElement = document.activeElement;
    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button or first interactive element
    const firstFocusable = modalOverlay.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // Quick tab switcher inside modal
  const modalTabBtns = document.querySelectorAll('.modal-tab-btn');
  const modalTabPanels = document.querySelectorAll('.modal-tab-panel');

  modalTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.tabTarget;
      modalTabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      modalTabPanels.forEach(panel => {
        panel.style.display = 'none';
      });

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.style.display = 'block';
      }
    });
  });

  window.openSampleReportModal = openModal;
  window.closeSampleReportModal = closeModal;
})();
