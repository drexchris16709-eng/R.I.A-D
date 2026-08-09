const studentDatabase = [
  { lrn: "136741140482", password: "LMND4556", page: "../Lobendino/Dashboard/SD.html" },
  { lrn: "109411140062", password: "SSDDFF45", page: "Pineda/SD.html" },
  { lrn: "136741140522", password: "TTUGKLM23", page: "Milgar/SD.html" },
  { lrn: "100000000004", password: "loginPass2026", page: "student4.html" },
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

const infoModal = document.getElementById('infoModal');
const csModal = document.getElementById('csModal');

const openInfoModal = document.getElementById('openInfoModal');
if (openInfoModal) openInfoModal.addEventListener('click', () => infoModal.classList.add('active'));

const closeInfoModal = document.getElementById('closeInfoModal');
if (closeInfoModal) closeInfoModal.addEventListener('click', () => infoModal.classList.remove('active'));

const openCsModal = document.getElementById('openCsModal');
if (openCsModal) openCsModal.addEventListener('click', () => csModal.classList.add('active'));

const closeCsModal = document.getElementById('closeCsModal');
if (closeCsModal) closeCsModal.addEventListener('click', () => csModal.classList.remove('active'));

[infoModal, csModal].forEach(modal => {
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }
});

const arrow = document.getElementById('passkeyArrow');

if (arrow) {
  arrow.animate(
    [
      { transform: 'translateX(0px)', opacity: '2' },
      { transform: 'translateX(12px)', opacity: '1' },
      { transform: 'translateX(0px)', opacity: '2' }
    ],
    {
      duration: 900,
      iterations: Infinity,
      easing: 'ease-in-out'
    }
  );
}

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

        body.offline-mode *, 
        body.offline-mode *::before, 
        body.offline-mode *::after {
            animation-play-state: paused !important;
            transition: none !important;
        }

        body.offline-mode img, 
        body.offline-mode svg,
        body.offline-mode video,
        body.offline-mode audio,
        body.offline-mode [style*="background-image"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
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
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            text-align: center;
            padding: 24px;
            box-sizing: border-box;
            pointer-events: auto !important;
        }
    `;
    document.head.appendChild(style);

    const overlay = document.createElement('div');
    overlay.id = 'offlineOverlay';
    overlay.innerHTML = `
        <div style="font-size: 64px; margin-bottom: 16px;">⚠️</div>
        <h1 style="margin: 0 0 10px 0; font-size: 26px; font-weight: 700;">No Internet Connection</h1>
        <p style="margin: 0; color: #b0b0b0; font-size: 15px; line-height: 1.4;">Network connection lost. All media, redirects, timers, and processes have been stopped.</p>
    `;

    const appendOverlay = () => {
        if (!document.getElementById('offlineOverlay') && document.body) {
            document.body.appendChild(overlay);
        }
    };

    if (document.body) {
        appendOverlay();
    } else {
        document.addEventListener('DOMContentLoaded', appendOverlay);
    }

    let isOfflineState = false;

    const originalLocation = window.location;
    try {
        Object.defineProperty(window, 'location', {
            get: function() { return originalLocation; },
            set: function(url) {
                if (isOfflineState || !navigator.onLine) {
                    console.warn("Redirect blocked due to offline state.");
                    return;
                }
                originalLocation.href = url;
            }
        });
    } catch(e) {}

    const originalAssign = window.location.assign;
    const originalReplace = window.location.replace;
    window.location.assign = function(url) {
        if (isOfflineState || !navigator.onLine) return;
        originalAssign.call(window.location, url);
    };

    window.location.replace = function(url) {
        if (isOfflineState || !navigator.onLine) return;
        originalReplace.call(window.location, url);
    };

    document.addEventListener('click', (e) => {
        if (isOfflineState || !navigator.onLine) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
        }
    }, true);

    function triggerOffline() {
        if (isOfflineState) return;
        isOfflineState = true;

        appendOverlay();
        document.body.classList.add('offline-mode');
        
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        const activeOverlay = document.getElementById('offlineOverlay') || overlay;

        if (activeOverlay) activeOverlay.style.display = 'flex';
        document.querySelectorAll('video, audio').forEach(media => {
            try {
                media.pause();
                media.currentTime = 0;
                media.src = '';
                media.load();
            } catch(err) {}
        });

        let highestTimeoutId = setTimeout(';');
        for (let i = 0; i < highestTimeoutId; i++) clearTimeout(i);
        let highestIntervalId = setInterval(';');
        for (let i = 0; i < highestIntervalId; i++) clearInterval(i);
        if (document.getAnimations) {
            document.getAnimations().forEach(anim => anim.pause());
        }
    }

    function triggerOnline() {
        if (!isOfflineState) return;
        isOfflineState = false;
        window.location.reload();
    }

    window.addEventListener('offline', triggerOffline);
    window.addEventListener('online', triggerOnline);

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            if (!navigator.onLine) {
                triggerOffline();
            } else {
                verifyConnection();
            }
        }
    });

    async function verifyConnection() {
        if (!navigator.onLine) {
            triggerOffline();
            return;
        }

        try {
            const controller = new AbortController();
            const signal = controller.signal;
            const timeoutId = setTimeout(() => controller.abort(), 2000);
            const response = await fetch(window.location.href.split('#')[0] + '?ping=' + Date.now(), {
                method: 'HEAD',
                cache: 'no-store',
                signal: signal
            });

            clearTimeout(timeoutId);
            if (response.ok || response.type === 'opaque' || response.status < 500) {
                if (isOfflineState) triggerOnline();
            } else {
                triggerOffline();
            }
        } catch (error) {
            triggerOffline();
        }
    }

    setInterval(verifyConnection, 1000);
    if (!navigator.onLine) {
        triggerOffline();
    }
})();
