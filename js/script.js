// Function to animate the counter
function animateCounter(counter) {
  const target = +counter.getAttribute("data-target");
  const speed = 150; // Adjust the speed of the counter animation

  const updateCount = () => {
    const current = +counter.innerText;
    const increment = target / speed;

    if (current < target) {
      counter.innerText = Math.ceil(current + increment);
      setTimeout(updateCount, 10);
    } else {
      counter.innerText = target;
    }
  };

  updateCount();
}

const counters = document.querySelectorAll(".count");
const observerOptions = {
  root: null,
  threshold: 0.5,
};

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

counters.forEach((counter) => {
  counterObserver.observe(counter);
});
