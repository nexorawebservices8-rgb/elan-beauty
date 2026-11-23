
// MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  mainNav.classList.toggle("active");

  menuToggle.textContent = mainNav.classList.contains("active")
    ? "✕"
    : "☰";

  menuToggle.setAttribute(
    "aria-label",
    mainNav.classList.contains("active")
      ? "Close navigation"
      : "Open navigation"
  );
});

// CLOSE MENU AFTER CLICKING A LINK
const navLinks = mainNav.querySelectorAll("a");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("active");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

// SET MINIMUM BOOKING DATE TO TODAY
const bookingDate = document.getElementById("bookingDate");

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

bookingDate.min = getTodayDate();

// APPOINTMENT ENQUIRY FORM
const bookingForm = document.getElementById("bookingForm");
const formMessage = document.getElementById("formMessage");

bookingForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("clientName").value.trim();
  const email = document.getElementById("clientEmail").value.trim();
  const service = document.getElementById("serviceSelect").value;
  const date = bookingDate.value;
  const time = document.getElementById("bookingTime").value;
  const message = document.getElementById("clientMessage").value.trim();

  if (!name || !email || !service || !date || !time) {
    formMessage.textContent = "Please complete all required fields.";
    return;
  }

  if (date < getTodayDate()) {
    formMessage.textContent = "Please select today or a future date.";
    return;
  }

  const appointment = {
    name,
    email,
    service,
    date,
    time,
    message
  };

  console.log("Demo appointment enquiry:", appointment);

  formMessage.textContent =
    "Thank you, " + name +
    "! Your demo appointment enquiry has been recorded in this page.";

  bookingForm.reset();
  bookingDate.min = getTodayDate();
});

// UPDATE THE CURRENT YEAR AUTOMATICALLY IF NEEDED
console.log("Élan Beauty House website loaded successfully.");

// ELAN SCROLL REVEAL ANIMATION

const elanElements = document.querySelectorAll(
  '.service-card, .section-heading, .staff-card'
);

const elanObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      elanObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

elanElements.forEach((element) => {
  element.classList.add('elan-reveal');
  elanObserver.observe(element);
});