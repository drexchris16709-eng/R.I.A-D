function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  
  if (sidebar && overlay) {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
  }
}

const studentDatabase = [
  { lrn: "136741140482", password: "LMND4556", page: "../Lobendino/SD.html" },
  { lrn: "136736120259", password: "775631", page: "../Lumpod/SD.html" },
  { lrn: "136741140692", password: "SS1FFGH", page: "../Marquez/SD.html" },
  { lrn: "485552150053", password: "6677KLMG", page: "../Delarosa/SD.html" },
  { lrn: "100000000005", password: "passkeyVal5", page: "student5.html" },
  { lrn: "100000000006", password: "student6Key", page: "student6.html" },
  { lrn: "100000000007", password: "adminPassword7", page: "admin.html" }
];

const togglePasswordBtn = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

if (togglePasswordBtn && passwordInput) {
  togglePasswordBtn.addEventListener('click', () => {
    const isPassword = passwordInput.getAttribute('type') === 'password';
    passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
    togglePasswordBtn.classList.toggle('active', isPassword);
  });
}

const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const enteredLRN = document.getElementById('lrn').value.trim();
    const enteredPassword = passwordInput.value;

    const student = studentDatabase.find(
      s => s.lrn === enteredLRN && s.password === enteredPassword
    );

    const modalOverlay = document.getElementById("modalOverlay");
    const modal1 = document.getElementById("loadingModal1");
    const modal2 = document.getElementById("loadingModal2");
    const modal3 = document.getElementById("loadingModal3");

    if (student) {
      if (errorMsg) errorMsg.style.display = 'none';

      if (modalOverlay) modalOverlay.style.display = "flex";
      if (modal1) modal1.style.display = "block";

      setTimeout(() => {
        if (modal1) modal1.style.display = "none";
        if (modal2) modal2.style.display = "block";

        setTimeout(() => {
          if (modal2) modal2.style.display = "none";
          if (modal3) modal3.style.display = "block";

          setTimeout(() => {
            window.location.href = student.page;
          }, 2000);

        }, 4000);

      }, 8000);

    } else {
      if (errorMsg) {
        errorMsg.style.display = 'block';
      } else {
        alert("Invalid LRN or Password.");
      }
    }
  });
}

const infoModal = document.getElementById('infoModal');
const csModal = document.getElementById('csModal');

const openInfoModal = document.getElementById('openInfoModal');
if (openInfoModal) {
  openInfoModal.addEventListener('click', () => {
    toggleSidebar();
    if (infoModal) infoModal.classList.add('active');
  });
}

const closeInfoModal = document.getElementById('closeInfoModal');
if (closeInfoModal) closeInfoModal.addEventListener('click', () => infoModal.classList.remove('active'));

const openCsModal = document.getElementById('openCsModal');
if (openCsModal) {
  openCsModal.addEventListener('click', () => {
    toggleSidebar();
    if (csModal) csModal.classList.add('active');
  });
}

const closeCsModal = document.getElementById('closeCsModal');
if (closeCsModal) closeCsModal.addEventListener('click', () => csModal.classList.remove('active'));

[infoModal, csModal].forEach(modal => {
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }
});

(function() {
  const style = document.createElement('style');
  style.innerHTML = `
    body.offline-mode {
      filter: grayscale(100%) !important;
      -webkit-filter: grayscale(100%) !important;
      pointer-events: none !important;
      overflow: hidden !important;
      height: 100vh !important;
    }

    body.offline-mode *, body.offline-mode *::before, body.offline-mode *::after {
      animation-play-state: paused !important;
      transition: none !important;
    }

    #offlineOverlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.95);
      z-index: 2147483647;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: white;
      text-align: center;
      padding: 24px;
      pointer-events: auto !important;
    }
  `;
  document.head.appendChild(style);

  const overlay = document.createElement('div');
  overlay.id = 'offlineOverlay';
  overlay.innerHTML = `
    <div style="font-size: 64px; margin-bottom: 16px;">⚠️</div>
    <h1 style="margin: 0 0 10px 0; font-size: 26px; font-weight: 700;">No Internet Connection</h1>
    <p style="margin: 0; color: #b0b0b0; font-size: 15px; line-height: 1.4;">Network connection lost. All media and redirects have been stopped.</p>
  `;

  const appendOverlay = () => {
    if (!document.getElementById('offlineOverlay') && document.body) {
      document.body.appendChild(overlay);
    }
  };

  if (document.body) appendOverlay();
  else document.addEventListener('DOMContentLoaded', appendOverlay);

  let isOfflineState = false;

  function triggerOffline() {
    if (isOfflineState) return;
    isOfflineState = true;
    appendOverlay();
    document.body.classList.add('offline-mode');
    const activeOverlay = document.getElementById('offlineOverlay') || overlay;
    if (activeOverlay) activeOverlay.style.display = 'flex';
  }

  function triggerOnline() {
    if (!isOfflineState) return;
    isOfflineState = false;
    window.location.reload();
  }

  window.addEventListener('offline', triggerOffline);
  window.addEventListener('online', triggerOnline);
  if (!navigator.onLine) triggerOffline();
})();
