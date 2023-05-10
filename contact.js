document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const nameError = document.getElementById('name-error');
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('email-error');
  const reasonSelect = document.getElementById('reason');
  const subjectContainer = document.getElementById('subject-container');
  const subjectInput = document.getElementById('subject');
  const subjectError = document.getElementById('subject-error');
  const messageInput = document.getElementById('message');
  const messageError = document.getElementById('message-error');
  const submitButton = contactForm.querySelector('button[type="submit"]');

  function validateName() {
    if (nameInput.value.trim().length < 5) {
      nameError.textContent = 'Name must be at least 5 characters long.';
      return false;
    }
    nameError.textContent = '';
    return true;
  }

  function validateEmail() {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      emailError.textContent = 'Please enter a valid email address.';
      return false;
    }
    emailError.textContent = '';
    return true;
  }

  function validateSubject() {
    if (reasonSelect.value === 'other' && subjectInput.value.trim().length < 15) {
      subjectError.textContent = 'Subject must be at least 15 characters long.';
      return false;
    }
    subjectError.textContent = '';
    return true;
  }

  function validateMessage() {
    if (messageInput.value.trim().length < 25) {
      messageError.textContent = 'Message must be at least 25 characters long.';
      return false;
    }
    messageError.textContent = '';
    return true;
  }

  function updateSubjectInputVisibility() {
    if (reasonSelect.value === 'other') {
      subjectContainer.style.display = 'block';
      subjectInput.required = true;
    } else {
      subjectContainer.style.display = 'none';
      subjectInput.required = false;
    }
  }

  function showSuccessAnimation() {
    submitButton.innerHTML = '&#x2714;';
    submitButton.style.backgroundColor = 'green';
  
    setTimeout(() => {
      submitButton.textContent = 'Successfully sent';
      submitButton.style.backgroundColor = '#4CAF50';
    }, 1000);
  }

  updateSubjectInputVisibility();

  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
  
    if (
      validateName() &&
      validateEmail() &&
      validateSubject() &&
      validateMessage()
    ) {
      showSuccessAnimation();
    }
  });

  nameInput.addEventListener('input', validateName);
  emailInput.addEventListener('input', validateEmail);
  reasonSelect.addEventListener('change', function () {
    updateSubjectInputVisibility();
    validateSubject();
  });
  subjectInput.addEventListener('input', validateSubject);
  messageInput.addEventListener('input', validateMessage);
});
