/**
 * GroundAgent India - FAQ Accordion
 * Accessible WAI-ARIA disclosure widget
 */

(function () {
  'use strict';

  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
      const button = item.querySelector('.faq-question-btn');
      const panel = item.querySelector('.faq-answer-panel');

      if (!button || !panel) return;

      button.addEventListener('click', () => {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        // Close other items for a clean accordion flow
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            const otherBtn = otherItem.querySelector('.faq-question-btn');
            const otherPanel = otherItem.querySelector('.faq-answer-panel');
            if (otherBtn && otherPanel) {
              otherBtn.setAttribute('aria-expanded', 'false');
              otherItem.classList.remove('active');
              otherPanel.style.maxHeight = null;
            }
          }
        });

        // Toggle current item
        if (isExpanded) {
          button.setAttribute('aria-expanded', 'false');
          item.classList.remove('active');
          panel.style.maxHeight = null;
        } else {
          button.setAttribute('aria-expanded', 'true');
          item.classList.add('active');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initFAQ);
})();
