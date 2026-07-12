// Password show/hide toggle
document.querySelectorAll('.toggle-password').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.getAttribute('data-target'));
    const icon = btn.querySelector('i');
    if (input.type === 'password') {
      input.type = 'text';
      icon.classList.replace('bi-eye', 'bi-eye-slash');
    } else {
      input.type = 'password';
      icon.classList.replace('bi-eye-slash', 'bi-eye');
    }
  });
});

// Bootstrap-style client-side validation
document.querySelectorAll('.needs-validation').forEach(form => {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();

    const pass = document.getElementById('regPassword');
    const confirm = document.getElementById('confirmPassword');
    if (pass && confirm) {
      confirm.setCustomValidity(confirm.value !== pass.value ? 'Passwords do not match' : '');
    }

    if (form.checkValidity()) {
      new bootstrap.Toast(document.getElementById('successToast')).show();
      form.reset();
      form.classList.remove('was-validated');
      const msg = document.getElementById('emailCheckMsg');
      if (msg) { msg.textContent = ''; msg.className = 'form-text'; }
    } else {
      form.classList.add('was-validated');
    }
  }, false);
});

// Live confirm-password check (register page)
const confirmField = document.getElementById('confirmPassword');
if (confirmField) {
  const passField = document.getElementById('regPassword');
  confirmField.addEventListener('input', () => {
    confirmField.setCustomValidity(confirmField.value !== passField.value ? 'Passwords do not match' : '');
  });
}

// Dummy "AJAX" email availability check (register page)
// NOTE: this simulates a server call. Task 3 will replace it with a real
// fetch() request to a PHP endpoint backed by MySQL.
const regEmail = document.getElementById('regEmail');
if (regEmail) {
  const msgBox = document.getElementById('emailCheckMsg');
  const takenEmails = ['test@example.com', 'admin@apexplanet.in', 'demo@gmail.com'];

  regEmail.addEventListener('blur', () => {
    const value = regEmail.value.trim().toLowerCase();
    const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (!value || !isValidFormat) {
      msgBox.textContent = '';
      msgBox.className = 'form-text';
      return;
    }

    msgBox.textContent = 'Checking availability...';
    msgBox.className = 'form-text checking';

    setTimeout(() => {
      if (takenEmails.includes(value)) {
        msgBox.textContent = 'This email is already registered.';
        msgBox.className = 'form-text taken';
        regEmail.setCustomValidity('Email already registered');
      } else {
        msgBox.textContent = 'Email is available.';
        msgBox.className = 'form-text available';
        regEmail.setCustomValidity('');
      }
    }, 800);
  });
}