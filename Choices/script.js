function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function selectOption(menuName) {
    toggleSidebar();
    if (menuName === 'Information') {
        infoModal.classList.add("show");
    } else if (menuName === 'System Notice') {
        systemNoticeModal.classList.add("show");
    } else if (menuName === 'Social Media\'s') {
        socialModal.classList.add("show");
    } else if (menuName === 'Other Apps') {
        otherAppsModal.classList.add("show");
    } else {
        alert("Selected: " + menuName);
    }
}

const infoModal = document.getElementById("infoModal");
const closeModalBtn = document.getElementById("closeModal");

if (closeModalBtn) {
    closeModalBtn.onclick = () => {
        infoModal.classList.remove("show");
    };
}

const systemNoticeModal = document.getElementById("systemNoticeModal");
const closeSystemNoticeBtn = document.getElementById("closeSystemNotice");

if (closeSystemNoticeBtn) {
    closeSystemNoticeBtn.onclick = () => {
        systemNoticeModal.classList.remove("show");
    };
}

const socialModal = document.getElementById("socialModal");
const closeSocialModalBtn = document.getElementById("closeSocialModal");

if (closeSocialModalBtn) {
    closeSocialModalBtn.onclick = () => {
        socialModal.classList.remove("show");
    };
}

const otherAppsModal = document.getElementById("otherAppsModal");
const closeOtherAppsBtn = document.getElementById("closeOtherApps");

if (closeOtherAppsBtn) {
    closeOtherAppsBtn.onclick = () => {
        otherAppsModal.classList.remove("show");
    };
}

const noticeDetailModal = document.getElementById("noticeDetailModal");
const closeNoticeDetailBtn = document.getElementById("closeNoticeDetail");
const noticeDetailTitle = document.getElementById("noticeDetailTitle");
const noticeDetailText = document.getElementById("noticeDetailText");

const partnershipVideosModal = document.getElementById("partnershipVideosModal");
const closePartnershipVideosBtn = document.getElementById("closePartnershipVideos");

if (closePartnershipVideosBtn) {
    closePartnershipVideosBtn.onclick = () => {
        partnershipVideosModal.classList.remove("show");
        noticeDetailModal.classList.add("show");
    };
}

function openPartnershipVideosModal() {
    noticeDetailModal.classList.remove("show");
    partnershipVideosModal.classList.add("show");
}

const noticeContentData = {
    'From The Developers': [
        'Welcome to R.I.A (Recording Information Application)! R.I.A is an information management and recording system designed to organize, manage, and provide easy access to school-related information, including records, announcements, schedules, activities, and events.',
        'Get ready for the next generation of R.I.A! We\'re officially launching our first-ever website integration — a major step toward a seamless interface across every platform we support. This is just the beginning: our roadmap is packed with new features, UX enhancements, and adaptive modules coming soon to boost your productivity.',
        'Behind the scenes, our specialized system framework, Super AI George, now manages real-time optimization, rendering, and interface adaptability to keep performance smooth and stable. Future improvements will continue to roll out automatically through this framework — refining the system without requiring hard reboots.'
    ],
    'System Warning': [
        'Security notice: Please ensure your login credentials are kept confidential. Unauthorized attempts to bypass access levels or tamper with system logs will trigger safety blocks.',
        'All logs, user data records, configurations, and cryptographic parameters handled in this system are strictly confidential. Sharing, exporting, or disclosing internal system data to outside parties is prohibited — always lock your session when leaving your device unattended.',
        'Extended use of this system increases background processing load and may cause your device to run warmer than usual. Take periodic breaks, avoid running other heavy processes at the same time, and close the session if your device becomes uncomfortably warm or starts to stutter.',
        'Some sections contain advanced technical or mature-audience content intended for users aged 18 and older. By accessing these sections, you confirm you meet the age requirement — parental guidance is advised for unsupervised minors.'
    ],
    'Account Termination': 'Accounts found in violation of platform policies, or those flagged for suspicious data entries, are subject to permanent deactivation. Reach out to administration if you have questions.',
    'New Features': 'Check out our latest upgrades! We have optimized dashboard responsiveness, integrated cleaner minimalist design aesthetics, and improved overall navigation speed.',
    'Manual & Guidelines': 'Follow the step-by-step guidelines provided here to properly navigate user portals, submit records, and utilize application functions efficiently.',
    'Partnership': 'Interested in collaborating or integrating with R.I.A? Reach out through our official channels to explore institutional partnerships, sponsorships, and joint technological ventures.'
};

function openNoticeDetail(title) {
    if (noticeDetailTitle) noticeDetailTitle.innerText = title;

    const container = document.querySelector("#noticeDetailModal .infoCardsContainer");
    const content = noticeContentData[title];

    const cardsHTML = Array.isArray(content)
        ? content.map(text => `<div class="infoCard"><p>${text}</p></div>`).join("")
        : `<div class="infoCard"><p>${content || 'No specific details available.'}</p></div>`;

    container.innerHTML = cardsHTML;

    if (title === 'Partnership') {
        container.insertAdjacentHTML("beforeend", `
            <button class="notice-card-btn" onclick="openPartnershipVideosModal()">
                <span>Partnership Videos</span>
                <span class="arrow">&gt;</span>
            </button>
        `);
    } else if (title === 'Manual & Guidelines') {
        container.insertAdjacentHTML("beforeend", `
            <button class="notice-card-btn" onclick="openManualPicturesModal()">
                <span>Manual & Guidelines Pictures</span>
                <span class="arrow">&gt;</span>
            </button>
        `);
    }

    if (systemNoticeModal) systemNoticeModal.classList.remove("show");
    if (noticeDetailModal) noticeDetailModal.classList.add("show");
}

if (closeNoticeDetailBtn) {
    closeNoticeDetailBtn.onclick = () => {
        if (noticeDetailModal) noticeDetailModal.classList.remove("show");
        if (systemNoticeModal) systemNoticeModal.classList.add("show");
    };
}

const createAccountModal = document.getElementById("createAccountModal");
const closeCreateAccountBtn = document.getElementById("closeCreateAccount");
const createAccountView1 = document.getElementById("createAccountView1");
const createAccountViewRole = document.getElementById("createAccountViewRole");
const createAccountViewStudent = document.getElementById("createAccountViewStudent");
const createAccountViewTeacher = document.getElementById("createAccountViewTeacher");
const successModal = document.getElementById("successModal");

function openCreateAccountModal() {
    if (createAccountModal) {
        switchCreateAccountView('initial');
        createAccountModal.classList.add("show");
    }
}

function switchCreateAccountView(viewName, clickedBtn = null) {
    if (clickedBtn) {
        clickedBtn.classList.add("loading");
        setTimeout(() => {
            clickedBtn.classList.remove("loading");
            executeViewSwitch(viewName);
        }, 400);
    } else {
        executeViewSwitch(viewName);
    }
}

function executeViewSwitch(viewName) {
    if (createAccountView1) createAccountView1.style.display = "none";
    if (createAccountViewRole) createAccountViewRole.style.display = "none";
    if (createAccountViewStudent) createAccountViewStudent.style.display = "none";
    if (createAccountViewTeacher) createAccountViewTeacher.style.display = "none";

    if (viewName === 'initial') {
        createAccountView1.style.display = "flex";
    } else if (viewName === 'role-select') {
        createAccountViewRole.style.display = "flex";
    } else if (viewName === 'student-form') {
        createAccountViewStudent.style.display = "flex";
    } else if (viewName === 'teacher-form') {
        createAccountViewTeacher.style.display = "flex";
    }
}

if (closeCreateAccountBtn) {
    closeCreateAccountBtn.onclick = () => {
        if (createAccountModal) createAccountModal.classList.remove("show");
    };
}

function handleAccountRequest(event) {
    event.preventDefault();
    
    const submitBtn = event.target.querySelector(".request-btn");
    if (submitBtn) {
        submitBtn.classList.add("loading");
    }

    setTimeout(() => {
        if (submitBtn) {
            submitBtn.classList.remove("loading");
        }
        
        if (createAccountModal) {
            createAccountModal.classList.remove("show");
        }

        if (successModal) {
            successModal.classList.add("show");
        }

        event.target.reset();
    }, 1500);
}

function closeSuccessModal() {
    if (successModal) {
        successModal.classList.remove("show");
    }
}

window.onclick = (e) => {
    if (e.target == infoModal) infoModal.classList.remove("show");
    if (e.target == systemNoticeModal) systemNoticeModal.classList.remove("show");
    if (e.target == noticeDetailModal) {
        noticeDetailModal.classList.remove("show");
        if (systemNoticeModal) systemNoticeModal.classList.add("show");
    }
    if (e.target == partnershipVideosModal) {
        partnershipVideosModal.classList.remove("show");
        noticeDetailModal.classList.add("show");
    }
    if (e.target == socialModal) socialModal.classList.remove("show");
    if (e.target == otherAppsModal) otherAppsModal.classList.remove("show");
    if (e.target == createAccountModal) createAccountModal.classList.remove("show");
    if (e.target == successModal) successModal.classList.remove("show");
};

(function() {
    const style = document.createElement('style');
    style.innerHTML = `
        .small-social-icons {
            transform: none;
            margin-top: -12px;
            margin-bottom: 2px;
        }

        button.loading {
            color: transparent !important;
            pointer-events: none !important;
            position: relative !important;
        }

        button.loading::after {
            content: "" !important;
            position: absolute !important;
            width: 20px !important;
            height: 20px !important;
            top: 50% !important;
            left: 50% !important;
            margin-left: -10px !important;
            margin-top: -10px !important;
            border: 3px solid rgba(0, 0, 0, 0) !important;
            border-radius: 50% !important;
            border-top-color: #000000 !important;
            animation: button-loading-spinner 0.6s linear infinite !important;
        }

        @keyframes button-loading-spinner {
            to {
                transform: rotate(360deg);
            }
        }

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
        const activeOverlay = document.getElementById('offlineOverlay') || overlay;

        activeOverlay.style.display = 'flex';
        activeOverlay.innerHTML = `
            <div style="width: 48px; height: 48px; border: 4px solid rgba(255, 255, 255, 0.2); border-radius: 50%; border-top-color: #ffffff; animation: button-loading-spinner 0.6s linear infinite; margin-bottom: 20px;"></div>
            <p style="margin: 0; color: #b0b0b0; font-size: 16px; font-weight: 500;">Checking connection status...</p>
        `;

        setTimeout(() => {
            if (!isOfflineState) return;
            
            document.body.classList.add('offline-mode');
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';

            activeOverlay.innerHTML = `
                <div style="font-size: 64px; margin-bottom: 16px;">⚠️</div>
                <h1 style="margin: 0 0 10px 0; font-size: 26px; font-weight: 700;">No Internet Connection</h1>
                <p style="margin: 0; color: #b0b0b0; font-size: 15px; line-height: 1.4;">Network connection lost. All media, redirects, timers, and processes have been stopped.</p>
            `;

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
        }, 800);
    }

    function triggerOnline() {
        if (!isOfflineState) return;
        
        appendOverlay();
        const activeOverlay = document.getElementById('offlineOverlay') || overlay;

        document.body.classList.remove('offline-mode');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';

        activeOverlay.style.display = 'flex';
        activeOverlay.innerHTML = `
            <div style="width: 48px; height: 48px; border: 4px solid rgba(255, 255, 255, 0.2); border-radius: 50%; border-top-color: #ffffff; animation: button-loading-spinner 0.6s linear infinite; margin-bottom: 20px;"></div>
            <p style="margin: 0; color: #b0b0b0; font-size: 16px; font-weight: 500;">Connection restored. Reconnecting...</p>
        `;

        setTimeout(() => {
            isOfflineState = false;
            window.location.reload();
        }, 700);
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

const manualPicturesModal = document.getElementById("manualPicturesModal");
const closeManualPicturesBtn = document.getElementById("closeManualPictures");

if (closeManualPicturesBtn) {
    closeManualPicturesBtn.onclick = () => {
        manualPicturesModal.classList.remove("show");
        noticeDetailModal.classList.add("show");
    };
}

function openManualPicturesModal() {
    noticeDetailModal.classList.remove("show");
    manualPicturesModal.classList.add("show");
}

window.onclick = (e) => {
    if (e.target == manualPicturesModal) {
        manualPicturesModal.classList.remove("show");
        noticeDetailModal.classList.add("show");
    }
};
