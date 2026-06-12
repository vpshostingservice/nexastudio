const LOGIN_STORAGE_KEY = 'amador_auth';
const LOGIN_VALID_USER = 'amador-admin';
const LOGIN_VALID_PASS = 'amador2026';

function syncLoginLogoFromNav() {
  const navLogo = document.querySelector('nav .logo img');
  const loginLogo = document.getElementById('login-company-logo');
  if (!navLogo || !loginLogo) return;

  loginLogo.src = navLogo.src;
  loginLogo.alt = navLogo.alt || 'Logo Cerrajeria Digital y Mas';
}

function showLoginIfNeeded() {
  const overlay = document.getElementById('login-overlay');
  if (!overlay) return;

  if (sessionStorage.getItem(LOGIN_STORAGE_KEY) !== '1') {
    overlay.style.display = 'flex';
  } else {
    overlay.style.display = 'none';
  }
}

function checkLogin() {
  const userInput = document.getElementById('login-user');
  const passInput = document.getElementById('login-pass');
  const errorText = document.getElementById('login-error');
  const overlay = document.getElementById('login-overlay');

  if (!userInput || !passInput || !errorText || !overlay) return;

  const user = userInput.value.trim();
  const pass = passInput.value.trim();

  if (user === LOGIN_VALID_USER && pass === LOGIN_VALID_PASS) {
    sessionStorage.setItem(LOGIN_STORAGE_KEY, '1');
    overlay.style.display = 'none';
    errorText.style.display = 'none';
  } else {
    errorText.style.display = 'block';
    passInput.value = '';
    passInput.focus();
  }
}

function initLoginWatermark() {
  const wm = document.getElementById('login-watermark');
  if (!wm) return;

  for (let i = 0; i < 200; i++) {
    const s = document.createElement('span');
    s.className = 'wm-item';
    s.innerHTML = '<span style="color:#AAFF00">AG</span><span style="color:#ffffff">_SYNDICATE</span>';
    wm.appendChild(s);
  }
}

function initLoginEnterKey() {
  ['login-user', 'login-pass'].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') checkLogin();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  syncLoginLogoFromNav();
  initLoginWatermark();
  initLoginEnterKey();
  showLoginIfNeeded();
});
