// Matrix Background Animation
class MatrixEffect {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container = document.getElementById('matrixBg');

        if (!this.container) return;

        this.container.appendChild(this.canvas);

        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Matrix characters - cybersecurity themed
        this.chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]()!@#$%^&*';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];

        this.initDrops();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.initDrops();
    }

    initDrops() {
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100;
        }
    }

    draw() {
        // Fade effect
        this.ctx.fillStyle = 'rgba(10, 14, 23, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#00ffff';
        this.ctx.font = `${this.fontSize}px monospace`;

        for (let i = 0; i < this.drops.length; i++) {
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;

            this.ctx.fillText(char, x, y);

            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }

            this.drops[i]++;
        }
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Typewriter Effect
class Typewriter {
    constructor(element, texts, typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000) {
        this.element = element;
        this.texts = texts;
        this.typingSpeed = typingSpeed;
        this.deletingSpeed = deletingSpeed;
        this.pauseDuration = pauseDuration;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;

        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];

        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = this.pauseDuration;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Smooth Scroll
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for Animation Triggers
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements with animations
    const animatedElements = document.querySelectorAll(
        '.competency-card, .timeline-item, .research-card, .cert-card'
    );

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Navigation Scroll Effect
function initNavScrollEffect() {
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            nav.style.boxShadow = 'none';
        } else {
            nav.style.boxShadow = '0 4px 20px rgba(0, 255, 255, 0.1)';
        }

        lastScroll = currentScroll;
    });
}

// Parallax Effect for Hero Section
function initParallax() {
    const hero = document.querySelector('.hero-content');

    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    });
}

// Custom Cursor Effect
class CustomCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid #00ffff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease;
            display: none;
        `;
        document.body.appendChild(this.cursor);

        this.initEvents();
    }

    initEvents() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.display = 'block';
            this.cursor.style.left = e.clientX - 10 + 'px';
            this.cursor.style.top = e.clientY - 10 + 'px';
        });

        document.addEventListener('mouseleave', () => {
            this.cursor.style.display = 'none';
        });

        // Scale on clickable elements
        const clickables = document.querySelectorAll('a, button, .btn');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(1.5)';
                this.cursor.style.background = 'rgba(0, 255, 255, 0.2)';
            });

            el.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.cursor.style.background = 'transparent';
            });
        });
    }
}

// Card Tilt Effect
function initCardTilt() {
    const cards = document.querySelectorAll('.competency-card, .research-card, .cert-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Glitch Effect on Hover
function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.hero-title');

    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.animation = 'glitch 0.3s infinite';
        });

        element.addEventListener('mouseleave', () => {
            element.style.animation = 'glitch 5s infinite';
        });
    });
}

// Terminal Command Simulation
function initTerminalSimulation() {
    const terminal = document.querySelector('.terminal-body');

    if (!terminal) return;

    const commands = [
        { input: '$ cat status.log', output: '> All systems operational', delay: 2000 },
        { input: '$ check_vulnerabilities', output: '> Scanning... 0 critical issues found', delay: 3000 }
    ];

    let currentCommand = 0;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && currentCommand < commands.length) {
                setTimeout(() => {
                    const p = document.createElement('p');
                    p.innerHTML = commands[currentCommand].input;
                    terminal.appendChild(p);

                    setTimeout(() => {
                        const output = document.createElement('p');
                        output.className = 'terminal-output status-active';
                        output.innerHTML = commands[currentCommand].output;
                        terminal.appendChild(output);
                        currentCommand++;
                    }, 500);
                }, commands[currentCommand].delay);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(terminal);
}

// Stats Counter Animation
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = end;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0a0e17;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        flex-direction: column;
        gap: 2rem;
    `;

    loadingScreen.innerHTML = `
        <div style="font-family: 'JetBrains Mono', monospace; color: #00ffff; font-size: 1.5rem;">
            <span style="text-shadow: 0 0 10px #00ffff;">> INITIALIZING SECURE CONNECTION</span>
        </div>
        <div style="width: 300px; height: 2px; background: #1a1f35; position: relative; overflow: hidden;">
            <div class="loading-bar" style="position: absolute; height: 100%; background: #00ffff; width: 0%; box-shadow: 0 0 10px #00ffff;"></div>
        </div>
    `;

    document.body.appendChild(loadingScreen);

    const loadingBar = loadingScreen.querySelector('.loading-bar');
    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }, 300);
        }
        loadingBar.style.width = progress + '%';
    }, 150);
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    // Loading screen
    initLoadingScreen();

    // Matrix background
    new MatrixEffect();

    // Typewriter effect
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const texts = [
            'Security Researcher',
            'AI Security Specialist',
            'Supply Chain Rsearcher'
            
        ];
        new Typewriter(typewriterElement, texts, 80, 40, 2000);
    }

    // Smooth scroll
    initSmoothScroll();

    // Scroll animations
    initScrollAnimations();

    // Navigation effects
    initNavScrollEffect();

    // Parallax effect
    initParallax();

    // Custom cursor (desktop only)
    if (window.innerWidth > 768) {
        new CustomCursor();
    }

    // Card tilt effect
    initCardTilt();

    // Glitch effect
    initGlitchEffect();

    // Terminal simulation
    initTerminalSimulation();

    // Active nav link highlighting
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = '#00ffff';
            }
        });
    });

    // Easter egg: Konami code
    let konamiCode = [];
    const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join(',') === konamiPattern.join(',')) {
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = '';
            }, 3000);
        }
    });
});

// Theme Toggle Function
function toggleTheme() {
    const body = document.body;
    const themeIcons = document.querySelectorAll('.theme-icon');

    body.classList.toggle('looney-mode');

    // Update all icons and save preference
    if (body.classList.contains('looney-mode')) {
        themeIcons.forEach(icon => icon.textContent = '🎩');
        localStorage.setItem('theme', 'looney');
        // Add fun sound effect notification
        console.log('%c🎺 LOONEY MODE ACTIVATED! 🎺', 'color: #FF6B35; font-size: 20px; font-weight: bold;');
    } else {
        themeIcons.forEach(icon => icon.textContent = '🎨');
        localStorage.setItem('theme', 'professional');
        console.log('%c🔒 PROFESSIONAL MODE ACTIVATED! 🔒', 'color: #00ffff; font-size: 20px; font-weight: bold;');
    }
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'looney') {
        document.body.classList.add('looney-mode');
        const themeIcons = document.querySelectorAll('.theme-icon');
        themeIcons.forEach(icon => icon.textContent = '🎩');
    }
});

// PDF Modal Functions
function openPdfModal(event) {
    event.preventDefault();
    const modal = document.getElementById('pdfModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePdfModal() {
    const modal = document.getElementById('pdfModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePdfModal();
    }
});

// Close modal when clicking outside the content
document.getElementById('pdfModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'pdfModal') {
        closePdfModal();
    }
});

// Add some console art for fun
console.log(`
%c
╔═══════════════════════════════════════════════╗
║                                               ║
║   🔒 TOM ABAI - SECURITY RESEARCHER 🔒        ║
║                                               ║
║   Welcome to the developer console!           ║
║   Feel free to explore the code.              ║
║                                               ║
║   GitHub: github.com/tomabai12                ║
║   LinkedIn: linkedin.com/in/tom-abai          ║
║                                               ║
╚═══════════════════════════════════════════════╝
%c
`, 'color: #00ffff; font-family: monospace; font-size: 12px;', '');
