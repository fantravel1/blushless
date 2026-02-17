/* ============================================================
   BLUSHLESS — Main JavaScript
   Interactive elements, navigation, animations, comparisons
   ============================================================ */

(function () {
    'use strict';

    // ==================== PRELOADER ====================
    const preloader = document.getElementById('preloader');

    function hidePreloader() {
        if (preloader) {
            preloader.classList.add('loaded');
            setTimeout(function () {
                preloader.style.display = 'none';
            }, 700);
        }
    }

    window.addEventListener('load', function () {
        setTimeout(hidePreloader, 600);
    });

    // Fallback: hide preloader after 3s even if load event is slow
    setTimeout(hidePreloader, 3000);

    // ==================== NAVIGATION ====================
    const header = document.getElementById('site-header');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    var lastScrollY = 0;

    // Scroll behavior for header
    function handleScroll() {
        var scrollY = window.scrollY || window.pageYOffset;

        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollY = scrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Mobile nav toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            var isOpen = navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close mobile nav when clicking a link
        var mobileLinks = navLinks.querySelectorAll('.nav-link');
        mobileLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // Active nav link tracking
    function updateActiveNavLink() {
        var sections = document.querySelectorAll('section[id]');
        var scrollPos = window.scrollY + 200;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');
            var link = document.querySelector('.nav-link[href="#' + id + '"]');

            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    document.querySelectorAll('.nav-link').forEach(function (l) { l.classList.remove('active'); });
                    link.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink, { passive: true });

    // ==================== LANGUAGE SWITCHER ====================
    var langSwitcher = document.getElementById('lang-switcher');

    if (langSwitcher) {
        var langBtn = langSwitcher.querySelector('.lang-current');

        langBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            var isOpen = langSwitcher.classList.toggle('open');
            langBtn.setAttribute('aria-expanded', isOpen);
        });

        document.addEventListener('click', function () {
            langSwitcher.classList.remove('open');
            langBtn.setAttribute('aria-expanded', 'false');
        });
    }

    // ==================== SCROLL ANIMATIONS ====================
    function initScrollAnimations() {
        var animatedElements = document.querySelectorAll('[data-animate]');

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var el = entry.target;
                        var delay = parseInt(el.getAttribute('data-delay') || '0', 10);

                        setTimeout(function () {
                            el.classList.add('animated');
                        }, delay);

                        observer.unobserve(el);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animatedElements.forEach(function (el) {
                observer.observe(el);
            });
        } else {
            // Fallback for older browsers
            animatedElements.forEach(function (el) {
                el.classList.add('animated');
            });
        }
    }

    // Hero in-view detection
    function initHeroObserver() {
        var hero = document.querySelector('.hero');
        if (!hero) return;

        if ('IntersectionObserver' in window) {
            var heroObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        hero.classList.add('in-view');
                    }
                });
            }, { threshold: 0.1 });

            heroObserver.observe(hero);
        } else {
            hero.classList.add('in-view');
        }
    }

    // ==================== COUNTER ANIMATION ====================
    function initCounters() {
        var counters = document.querySelectorAll('[data-count]');

        if ('IntersectionObserver' in window) {
            var counterObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var el = entry.target;
                        var target = parseInt(el.getAttribute('data-count'), 10);
                        animateCounter(el, target);
                        counterObserver.unobserve(el);
                    }
                });
            }, { threshold: 0.5 });

            counters.forEach(function (counter) {
                counterObserver.observe(counter);
            });
        }
    }

    function animateCounter(el, target) {
        var duration = 1500;
        var start = 0;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            var current = Math.floor(eased * target);

            el.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(step);
    }

    // ==================== INTERACTIVE FACE DIAGRAM ====================
    var zoneData = {
        forehead: {
            title: 'Forehead Sculpting',
            description: 'The forehead is one of the largest planes of the face. Sculpting along the hairline and temples creates instant dimension, reducing the appearance of a wide or flat forehead. Apply cool-toned contour along the hairline perimeter and blend downward.',
            technique: 'Apply contour shade along the hairline in a horseshoe shape. Focus on the temples and corners. Blend upward into the hairline for a seamless recession effect. Use a small, dense brush for precision.',
            product: 'The Architecture Palette — Bone-lifting shade for the center, contour tone along the perimeter.'
        },
        temple: {
            title: 'Temple Contour',
            description: 'The temporal region is where structure meets softness. A precise contour in the temple hollows creates the illusion of a more sculpted facial frame. This zone connects the forehead to the cheekbone for cohesive architecture.',
            technique: 'Using a small angled brush, apply contour shade in the natural hollow of the temple. Blend in small circular motions toward the hairline. Layer for deeper dimension.',
            product: 'The Architecture Palette — Cool contour tone, blended with a precise tapered brush.'
        },
        cheekbone: {
            title: 'Cheekbone Highlight',
            description: 'The zygomatic arch is the architectural hero of the face. A precise highlight along the top of the cheekbone — from the apple to the temple — lifts the entire facial structure. This is where light meets bone.',
            technique: 'Apply neutral highlight along the highest point of the cheekbone. Start from the outer corner of the eye and sweep toward the temple. Keep it tight to the bone — never diffuse across the entire cheek.',
            product: 'The Architecture Palette — Neutral highlight (zero glitter), applied with a fan brush for precision placement.'
        },
        hollows: {
            title: 'Cheek Hollow Contour',
            description: 'The hollow below the cheekbone is where sculpted depth lives. This contour creates the shadow that makes the cheekbone above it pop. The key is placement — too low and it looks muddy; too high and it competes with the bone.',
            technique: 'Suck in your cheeks gently to find the natural hollow. Apply contour shade starting from the ear and sweeping toward the mouth — but stop at the apple of the cheek. Never bring contour to the center of the face.',
            product: 'The Architecture Palette — Deep contour shade for light-medium skin, or melanin-depth contour for deeper tones.'
        },
        jawline: {
            title: 'Jawline Sculpting',
            description: 'The mandibular angle defines your lower facial architecture. A sharp jawline contour creates a clean separation between face and neck, adding definition and visual authority. This zone is especially powerful for stage and professional presence.',
            technique: 'Apply contour shade along the underside of the jawline, from the chin to just below the earlobe. Blend downward into the neck to avoid harsh lines. For a sharper jaw, apply slightly on top of the jawbone edge.',
            product: 'The Architecture Palette — Cool contour tone with a flat contour brush for sharp, linear application.'
        },
        nose: {
            title: 'Nose Contour',
            description: 'The nasal bridge is a vertical axis of the face. Subtle contour along the sides of the nose creates a refined, sculptural look. This zone should be handled with restraint — the goal is subtle shadow, not visible stripes.',
            technique: 'Using a thin, precise brush, apply a thin line of contour along each side of the nasal bridge. Start from the inner corner of the brow and draw down to the tip. Blend outward with a clean brush. Minimal product — build gradually.',
            product: 'The Architecture Palette — Bone-lifting shade on the bridge, cool contour on the sides. Use a pencil brush for precision.'
        },
        brow: {
            title: 'Brow Bone Architecture',
            description: 'The orbital ridge — the brow bone — is the shelf that frames the eye. A precise highlight here lifts the brow arch and opens the eye. Combined with the Brow Control System, this zone creates an anchored, powerful gaze.',
            technique: 'Apply a matte or soft-satin highlight directly beneath the brow arch, on the brow bone. Blend downward slightly toward the crease. This creates an instant brow lift without surgery.',
            product: 'Brow Control System for defined brow shape + Architecture Palette highlight shade beneath the arch.'
        }
    };

    function initFaceDiagram() {
        var hotspots = document.querySelectorAll('.hotspot');
        var zoneDefault = document.querySelector('.zone-info-default');
        var zoneContent = document.getElementById('zone-content');
        var zoneClose = document.querySelector('.zone-close');

        if (!hotspots.length || !zoneContent) return;

        hotspots.forEach(function (hotspot) {
            hotspot.addEventListener('click', function () {
                var zone = this.getAttribute('data-zone');
                var data = zoneData[zone];

                if (!data) return;

                // Remove active from all hotspots
                hotspots.forEach(function (h) { h.classList.remove('active'); });
                this.classList.add('active');

                // Populate zone info
                zoneContent.querySelector('.zone-title').textContent = data.title;
                zoneContent.querySelector('.zone-description').textContent = data.description;
                zoneContent.querySelector('.zone-technique-text').textContent = data.technique;
                zoneContent.querySelector('.zone-product-text').textContent = data.product;

                // Show content, hide default
                if (zoneDefault) zoneDefault.hidden = true;
                zoneContent.hidden = false;
            });
        });

        // Close zone info
        if (zoneClose) {
            zoneClose.addEventListener('click', function () {
                hotspots.forEach(function (h) { h.classList.remove('active'); });
                if (zoneDefault) zoneDefault.hidden = false;
                zoneContent.hidden = true;
            });
        }
    }

    // ==================== COMPARISON SLIDERS ====================
    function initComparisonSliders() {
        var sliders = document.querySelectorAll('.comparison-slider');

        sliders.forEach(function (slider) {
            var handle = slider.querySelector('.comparison-handle');
            var beforeImage = slider.querySelector('.comparison-before');
            var isDragging = false;

            if (!handle || !beforeImage) return;

            function getPosition(e) {
                var rect = slider.getBoundingClientRect();
                var x;
                if (e.touches) {
                    x = e.touches[0].clientX - rect.left;
                } else {
                    x = e.clientX - rect.left;
                }
                return Math.max(0, Math.min(x / rect.width * 100, 100));
            }

            function updateSlider(percent) {
                beforeImage.style.clipPath = 'inset(0 ' + (100 - percent) + '% 0 0)';
                handle.style.left = percent + '%';
                handle.setAttribute('aria-valuenow', Math.round(percent));
            }

            function startDrag(e) {
                e.preventDefault();
                isDragging = true;
                slider.style.cursor = 'col-resize';
                var percent = getPosition(e);
                updateSlider(percent);
            }

            function onDrag(e) {
                if (!isDragging) return;
                e.preventDefault();
                var percent = getPosition(e);
                updateSlider(percent);
            }

            function stopDrag() {
                isDragging = false;
                slider.style.cursor = 'col-resize';
            }

            // Mouse events
            slider.addEventListener('mousedown', startDrag);
            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', stopDrag);

            // Touch events
            slider.addEventListener('touchstart', startDrag, { passive: false });
            document.addEventListener('touchmove', onDrag, { passive: false });
            document.addEventListener('touchend', stopDrag);

            // Keyboard support
            handle.addEventListener('keydown', function (e) {
                var current = parseInt(handle.getAttribute('aria-valuenow') || '50', 10);
                var step = 2;

                if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    updateSlider(Math.max(0, current - step));
                } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    updateSlider(Math.min(100, current + step));
                }
            });
        });
    }

    // ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
    function initSmoothScroll() {
        var anchors = document.querySelectorAll('a[href^="#"]');

        anchors.forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                var targetId = this.getAttribute('href');
                if (targetId === '#') return;

                var target = document.querySelector(targetId);
                if (!target) return;

                e.preventDefault();

                var navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) || 72;
                var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    // ==================== NEWSLETTER FORM ====================
    function initNewsletter() {
        var forms = document.querySelectorAll('.newsletter-form');

        forms.forEach(function (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                var input = form.querySelector('input[type="email"]');
                var button = form.querySelector('button');

                if (input && input.value) {
                    var originalText = button.textContent;
                    button.textContent = 'Subscribed';
                    button.disabled = true;
                    input.disabled = true;
                    input.value = '';

                    setTimeout(function () {
                        button.textContent = originalText;
                        button.disabled = false;
                        input.disabled = false;
                    }, 3000);
                }
            });
        });
    }

    // ==================== FAQ ACCORDION ENHANCEMENT ====================
    function initFAQ() {
        var faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(function (item) {
            var summary = item.querySelector('summary');
            if (!summary) return;

            summary.addEventListener('click', function () {
                // Close other open items
                faqItems.forEach(function (otherItem) {
                    if (otherItem !== item && otherItem.hasAttribute('open')) {
                        otherItem.removeAttribute('open');
                    }
                });
            });
        });
    }

    // ==================== LAZY LOADING ENHANCEMENT ====================
    function initLazyLoading() {
        // Modern browsers handle loading="lazy" natively
        // This adds a fade-in effect when images load
        var lazyImages = document.querySelectorAll('img[loading="lazy"]');

        lazyImages.forEach(function (img) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';

            if (img.complete) {
                img.style.opacity = '1';
            } else {
                img.addEventListener('load', function () {
                    img.style.opacity = '1';
                });
                img.addEventListener('error', function () {
                    img.style.opacity = '1';
                });
            }
        });
    }

    // ==================== PARALLAX LITE (performance-safe) ====================
    function initParallax() {
        var heroBg = document.querySelector('.hero-bg-img');
        if (!heroBg) return;

        // Only on larger screens to avoid mobile performance issues
        if (window.innerWidth < 768) return;

        var ticking = false;

        function updateParallax() {
            var scrollY = window.scrollY || window.pageYOffset;
            if (scrollY < window.innerHeight) {
                heroBg.style.transform = 'scale(1.05) translateY(' + (scrollY * 0.15) + 'px)';
            }
            ticking = false;
        }

        window.addEventListener('scroll', function () {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
    }

    // ==================== INIT ALL ====================
    document.addEventListener('DOMContentLoaded', function () {
        initScrollAnimations();
        initHeroObserver();
        initCounters();
        initFaceDiagram();
        initComparisonSliders();
        initSmoothScroll();
        initNewsletter();
        initFAQ();
        initLazyLoading();
        initParallax();
    });

})();
