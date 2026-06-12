const LOGIN_STORAGE_KEY = 'cocofany_auth';
const LOGIN_VALID_USER = 'laura-ag-syndicate';
const LOGIN_VALID_PASS = 'ag-syndicate';

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
  initLoginWatermark();
  initLoginEnterKey();
  showLoginIfNeeded();
});