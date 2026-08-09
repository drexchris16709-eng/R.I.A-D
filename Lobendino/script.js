function openModal(title, text) {
      document.getElementById('modalTitle').innerText = title;
      document.getElementById('modalBody').innerText = text;
      document.getElementById('infoModal').style.display = 'flex';
    }

    function closeModal(event) {
      document.getElementById('infoModal').style.display = 'none';
    }

    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

    function setupAutoSlideshow(slideshowId, indicatorsId) {
      const slideshow = document.getElementById(slideshowId);
      const track = slideshow.querySelector('.slideshow-track');
      const dots = document.getElementById(indicatorsId).querySelectorAll('.indicator-dot');
      const totalSlides = dots.length;
      let currentIndex = 0;

      function goToSlide(index) {
        currentIndex = (index + totalSlides) % totalSlides;
        track.style.transform = `translateX(-${currentIndex * 82}%)`;

        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === currentIndex);
        });
      }

      function startTimer() {
        return setInterval(() => {
          goToSlide(currentIndex + 1);
        }, 4000);
      }

      let timer = startTimer();

      function restartTimer() {
        clearInterval(timer);
        timer = startTimer();
      }

      dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
          goToSlide(i);
          restartTimer();
        });
      });

      let touchStartX = 0;
      let touchStartY = 0;
      let touchDeltaX = 0;
      let isSwiping = false;
      const SWIPE_THRESHOLD = 40;
      
      function isMobileViewport() {
        return window.matchMedia('(max-width: 991px)').matches;
      }

      slideshow.addEventListener('touchstart', (e) => {
        if (!isMobileViewport()) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchDeltaX = 0;
        isSwiping = true;
        track.style.transition = 'none';
        clearInterval(timer);
      }, { passive: true });

      slideshow.addEventListener('touchmove', (e) => {
        if (!isSwiping || !isMobileViewport()) return;
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        touchDeltaX = touchX - touchStartX;
        const deltaY = touchY - touchStartY;
        if (Math.abs(touchDeltaX) > Math.abs(deltaY)) {
          const trackWidth = track.getBoundingClientRect().width;
          const dragPercent = (touchDeltaX / trackWidth) * 100;
          track.style.transform = `translateX(calc(-${currentIndex * 82}% + ${dragPercent}%))`;
        }
      }, { passive: true });

      slideshow.addEventListener('touchend', () => {
        if (!isSwiping || !isMobileViewport()) return;
        isSwiping = false;
        track.style.transition = '';
        if (touchDeltaX < -SWIPE_THRESHOLD) {
          goToSlide(currentIndex + 1);
        } else if (touchDeltaX > SWIPE_THRESHOLD) {
          goToSlide(currentIndex - 1);
        } else {
          goToSlide(currentIndex);
        }

        touchDeltaX = 0;
        restartTimer();
      });

      slideshow.addEventListener('touchcancel', () => {
        if (!isSwiping) return;
        isSwiping = false;
        track.style.transition = '';
        goToSlide(currentIndex);
        restartTimer();
      });
    }

    function setupNavAutoHide() {
      const nav = document.querySelector('.bottom-nav');
      let scrollStopTimer = null;
      const SCROLL_STOP_DELAY = 500;
      function onScroll() {
        nav.classList.add('nav-hidden');
        clearTimeout(scrollStopTimer);
        scrollStopTimer = setTimeout(() => {
          nav.classList.remove('nav-hidden');
        }, SCROLL_STOP_DELAY);
      }

      window.addEventListener('scroll', onScroll, { passive: true });
    }

    document.addEventListener('DOMContentLoaded', () => {
      setupAutoSlideshow('newsSlideshow', 'newsIndicators');
      setupAutoSlideshow('riaSlideshow', 'riaIndicators');
      setupNavAutoHide();
    });

    function sbToggleSidebar() {
      const sidebar = document.getElementById('sbSidebar');
      const overlay = document.getElementById('sbOverlay');
      sidebar.classList.toggle('open');
      overlay.classList.toggle('open');
    }

    function sbToggleDropdown(index) {
      const dropdowns = document.querySelectorAll('.sb-dropdown');
      const mainBtns = document.querySelectorAll('.sb-mainBtn');
      dropdowns.forEach((drop, i) => {
        if (i === index) {
          const isOpen = drop.classList.toggle('active');
          mainBtns[i].classList.toggle('active-dropdown', isOpen);
        } else {
          drop.classList.remove('active');
          mainBtns[i].classList.remove('active-dropdown');
        }
      });
    }

    let sbCurrentSlide = 0;
    const sbSlides = document.querySelectorAll('.sb-slide');

    function sbNextSlide() {
      if (!sbSlides.length) return;
      sbSlides[sbCurrentSlide].classList.remove('active-slide');
      sbCurrentSlide = (sbCurrentSlide + 1) % sbSlides.length;
      sbSlides[sbCurrentSlide].classList.add('active-slide');
    }

    setInterval(sbNextSlide, 4000);

    document.addEventListener('click', function (event) {
      const sidebar = document.getElementById('sbSidebar');
      const menuBtn = document.getElementById('sbMenuBtn');
      const overlay = document.getElementById('sbOverlay');
      if (sidebar && sidebar.classList.contains('open')) {
        if (!sidebar.contains(event.target) && menuBtn && !menuBtn.contains(event.target)) {
          sidebar.classList.remove('open');
          overlay.classList.remove('open');
        }
      }
    });

    function sbToggleExtraMenu() {
      const wrapper = document.getElementById('qa-extra-menu-wrapper');
      const toggleBtn = document.getElementById('qa-see-more-toggle');
      const toggleText = document.getElementById('qa-toggle-text');
      const isOpen = wrapper.classList.toggle('is-open');
      toggleBtn.classList.toggle('is-active', isOpen);
      if (toggleText) {
        toggleText.textContent = isOpen ? 'Show Less' : 'See More';
      }
    }

    let sbCurrentAdIndex = 0;
    const sbTotalAds = 3;
    const sbAutoIntervalTime = 4000;
    let sbAdTimer = null;

    function sbUpdateDots() {
      const carousel = document.getElementById('riaAdsCarousel');
      const dots = document.querySelectorAll('.ria-page-dot');
      if (!carousel || !dots.length) return;
      const cardWidth = carousel.offsetWidth;
      sbCurrentAdIndex = Math.round(carousel.scrollLeft / cardWidth);
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === sbCurrentAdIndex);
      });
    }

    function sbScrollToCard(index) {
      const carousel = document.getElementById('riaAdsCarousel');
      if (!carousel) return;
      const cardWidth = carousel.offsetWidth;
      sbCurrentAdIndex = index;
      carousel.scrollTo({
        left: cardWidth * sbCurrentAdIndex,
        behavior: 'smooth'
      });
    }

    function sbNextAd() {
      sbCurrentAdIndex = (sbCurrentAdIndex + 1) % sbTotalAds;
      sbScrollToCard(sbCurrentAdIndex);
    }

    function sbStartAdAutoPlay() {
      sbStopAdAutoPlay();
      sbAdTimer = setInterval(sbNextAd, sbAutoIntervalTime);
    }

    function sbStopAdAutoPlay() {
      if (sbAdTimer) {
        clearInterval(sbAdTimer);
        sbAdTimer = null;
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      const carousel = document.getElementById('riaAdsCarousel');
      if (carousel) {
        sbStartAdAutoPlay();
        carousel.addEventListener('mouseenter', sbStopAdAutoPlay);
        carousel.addEventListener('mouseleave', sbStartAdAutoPlay);
        carousel.addEventListener('touchstart', sbStopAdAutoPlay, { passive: true });
        carousel.addEventListener('touchend', sbStartAdAutoPlay);
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

function sbOpenLogoutModal() {
    const modal = document.getElementById('sbLogoutModal');
    if (modal) modal.style.display = 'flex';
}

function sbCloseLogoutModal() {
    const modal = document.getElementById('sbLogoutModal');
    if (modal) modal.style.display = 'none';
}

function sbExecuteLogout() {
    // 1. Clear storage and session caches
    localStorage.clear();
    sessionStorage.clear();
    
    // 2. Clear cookies
    document.cookie.split(";").forEach(function(c) { 
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date(0).toUTCString() + ";path=/"); 
    });

    // 3. Close window attempt
    try {
        window.close();
    } catch (e) {}

    // 4. Fallback redirect
    setTimeout(() => {
        window.location.replace('about:blank'); 
    }, 100);
}