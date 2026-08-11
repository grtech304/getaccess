document.addEventListener('DOMContentLoaded', () => {
  const accessBtn = document.getElementById('access-btn');
  const glowGreen = document.getElementById('glow-green');
  const glowBlue = document.getElementById('glow-blue');

  let isBlueState = false;

  // Toggle state on click
  accessBtn.addEventListener('click', (e) => {
    isBlueState = !isBlueState;

    if (isBlueState) {
      accessBtn.classList.remove('green-state');
      accessBtn.classList.add('blue-state');
      glowGreen.style.opacity = '0.2';
      glowBlue.style.opacity = '0.8';
    } else {
      accessBtn.classList.remove('blue-state');
      accessBtn.classList.add('green-state');
      glowGreen.style.opacity = '0.8';
      glowBlue.style.opacity = '0.2';
    }

    // Dynamic click ripple animation
    createRipple(e);

    // Track button click event on TikTok Pixel
    if (window.ttq && typeof window.ttq.track === 'function') {
      window.ttq.track('ClickButton');
      window.ttq.track('Subscribe');
    }
  });

  // Hover background glow intensification
  accessBtn.addEventListener('mouseenter', () => {
    if (!isBlueState) {
      // Transitioning to blue on hover
      glowGreen.style.opacity = '0.3';
      glowBlue.style.opacity = '0.7';
    } else {
      // Transitioning back to green on hover if in blue state
      glowGreen.style.opacity = '0.7';
      glowBlue.style.opacity = '0.3';
    }
  });

  accessBtn.addEventListener('mouseleave', () => {
    if (!isBlueState) {
      glowGreen.style.opacity = '0.6';
      glowBlue.style.opacity = '0.2';
    } else {
      glowGreen.style.opacity = '0.2';
      glowBlue.style.opacity = '0.6';
    }
  });

  function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.style.position = 'absolute';
    circle.style.borderRadius = '50%';
    circle.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
    circle.style.transform = 'scale(0)';
    circle.style.animation = 'ripple 0.6s linear';
    circle.style.pointerEvents = 'none';

    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
      existingRipple.remove();
    }
    circle.classList.add('ripple');

    button.appendChild(circle);
  }
});

// Add keyframe animation dynamically for ripple
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes ripple {
    to {
      transform: scale(3.5);
      opacity: 0;
    }
  }
`;
document.head.appendChild(styleSheet);
