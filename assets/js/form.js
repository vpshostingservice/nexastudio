/**
 * form.js — Client-side validation + simulated async submit.
 * - Custom messages in Spanish
 * - Inline errors per field (aria-live friendly)
 * - Loading state + success message
 * - Event delegation for blur validation
 * - Honeypot-ready (add <input name="website" class="sr-only" tabindex="-1" />)
 */
const MESSAGES = {
  required: 'Este campo es obligatorio.',
  email: 'Introduce un email válido.',
  minlength: 'Demasiado corto.',
};

function initForm(selector) {
  const form = document.querySelector(selector);
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const successMsg = form.querySelector('.success-msg');

  /* ---------- Validate on blur (event delegation) ---------- */
  form.addEventListener(
    'blur',
    (e) => {
      const field = e.target.closest('input, select, textarea');
      if (field) validateField(field);
    },
    true // capture phase, since blur doesn't bubble
  );

  /* ---------- Clear error on input ---------- */
  form.addEventListener('input', (e) => {
    const field = e.target.closest('input, select, textarea');
    if (!field) return;
    const wrap = field.closest('.field');
    if (wrap && wrap.classList.contains('is-invalid')) {
      clearError(field);
    }
  });

  /* ---------- Submit ---------- */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fields = form.querySelectorAll('input, select, textarea');
    let valid = true;
    fields.forEach((f) => {
      if (!validateField(f)) valid = false;
    });

    if (!valid) {
      const firstInvalid = form.querySelector('.is-invalid input, .is-invalid select, .is-invalid textarea');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Simulated submit (swap with fetch() to real endpoint)
    submitBtn?.classList.add('is-loading');
    submitBtn?.setAttribute('aria-busy', 'true');

    try {
      await new Promise((res) => setTimeout(res, 1200));
      // await fetch('/api/contact', { method: 'POST', body: new FormData(form) });
      form.reset();
      if (successMsg) {
        successMsg.classList.add('is-visible');
        setTimeout(() => successMsg.classList.remove('is-visible'), 5000);
      }
    } catch (err) {
      console.error('[form] submit failed', err);
    } finally {
      submitBtn?.classList.remove('is-loading');
      submitBtn?.setAttribute('aria-busy', 'false');
    }
  });
}

/* ---------- Helpers ---------- */
function validateField(field) {
  const wrap = field.closest('.field');
  if (!wrap) return true;
  const errorEl = wrap.querySelector('.field-error');
  const value = field.value.trim();

  let error = '';

  if (field.required && !value) {
    error = MESSAGES.required;
  } else if (field.type === 'email' && value && !isValidEmail(value)) {
    error = MESSAGES.email;
  } else if (field.minLength > 0 && value && value.length < field.minLength) {
    error = MESSAGES.minlength;
  }

  if (error) {
    wrap.classList.add('is-invalid');
    field.setAttribute('aria-invalid', 'true');
    if (errorEl) errorEl.textContent = error;
    return false;
  }
  clearError(field);
  return true;
}

function clearError(field) {
  const wrap = field.closest('.field');
  if (!wrap) return;
  wrap.classList.remove('is-invalid');
  field.removeAttribute('aria-invalid');
  const errorEl = wrap.querySelector('.field-error');
  if (errorEl) errorEl.textContent = '';
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}
