/* ==========================================================================
   CONTACT FORM HANDLER - NUPUR BAGAVE PORTFOLIO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const feedbackMessage = document.getElementById('form-feedback');

  if (!contactForm || !feedbackMessage) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset feedback states
    feedbackMessage.className = 'form-feedback';
    feedbackMessage.innerText = '';
    feedbackMessage.style.display = 'none';

    // Retrieve input values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic fields validation
    if (!name || !email || !subject || !message) {
      showFeedback('Please fill out all fields in the form.', 'error');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFeedback('Please enter a valid email address.', 'error');
      return;
    }

    // Simulate form submission process
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending Message...';
    submitBtn.disabled = true;

    setTimeout(() => {
      // Simulate success response
      showFeedback(`Thank you, ${name}! Your message has been sent successfully. I will get back to you soon.`, 'success');
      contactForm.reset();
      
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }, 1500);
  });

  function showFeedback(text, type) {
    feedbackMessage.innerText = text;
    feedbackMessage.className = `form-feedback ${type}`;
    feedbackMessage.style.display = 'block';
    
    // Auto-scroll to feedback message
    feedbackMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
});
