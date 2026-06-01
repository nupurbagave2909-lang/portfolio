/* ==========================================================================
   TYPEWRITER TYPING EFFECT - NUPUR BAGAVE PORTFOLIO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const typedTextSpan = document.querySelector('.typed-text');
  if (!typedTextSpan) return;

  const textArray = ["AI Engineer", "CS & AI Student", "Full-Stack Developer", "Tech Innovator"];
  const typingSpeed = 100;
  const erasingSpeed = 60;
  const newTextDelay = 1500; // Delay between current and next text
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      textArrayIndex = (textArrayIndex + 1) % textArray.length;
      setTimeout(type, typingSpeed + 50);
    }
  }

  // Start typing
  setTimeout(type, 500);
});
