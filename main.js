/**
 * Main Logic for LEDCAM
 * Handles Data Injection, GSAP Animations, and Interactive Elements
 */

async function init() {

    lucide.createIcons();

    try {
        const response = await fetch('data.json');
        const data = await response.json();
        
        renderServices(data.services);
        renderTestimonials(data.testimonials);
        

        lucide.createIcons();
    } catch (error) {
        console.error("Error loading data:", error);
    }

    setupScrollEffects();
    setupMobileMenu();
    setupGSAP();
}

function renderServices(services) {
    const grid = document.getElementById('services-grid');
    if (!grid) return;

    grid.innerHTML = services.map(service => `
        <div class="service-card bg-white p-8 rounded-2xl border border-slate-100 reveal-up shadow-sm">
            <div class="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <i data-lucide="${service.icon}"></i>
            </div>
            <h3 class="text-xl font-bold mb-3 text-slate-900">${service.title}</h3>
            <p class="text-slate-600 leading-relaxed">${service.description}</p>
        </div>
    `).join('');
}

function renderTestimonials(testimonials) {
    const grid = document.getElementById('testimonials-grid');
    if (!grid) return;

    grid.innerHTML = testimonials.map(t => `
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-left reveal-up">
            <div class="flex text-yellow-400 mb-4">
                ${'<i data-lucide="star" class="w-4 h-4 fill-current"></i>'.repeat(5)}
            </div>
            <p class="text-slate-600 italic mb-6">"${t.comment}"</p>
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold">
                    ${t.name.charAt(0)}
                </div>
                <div>
                    <h4 class="font-bold text-slate-900">${t.name}</h4>
                    <p class="text-emerald-600 text-xs font-semibold tracking-wider uppercase">${t.role}</p>
                </div>
            </div>
        </div>
    `).join('');
}

function setupScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function setupMobileMenu() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-link');

    const toggleMenu = (show) => {
        if (show) {
            mobileMenu.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = '';
        }
    };

    if (mobileBtn) mobileBtn.addEventListener('click', () => toggleMenu(true));
    if (closeBtn) closeBtn.addEventListener('click', () => toggleMenu(false));
    
    links.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });
}

function setupGSAP() {
    gsap.registerPlugin(ScrollTrigger);

    const reveals = [
        { selector: '.reveal-up', y: 40 },
        { selector: '.reveal-left', x: -50 },
        { selector: '.reveal-right', x: 50 }
    ];

    reveals.forEach(anim => {
        gsap.utils.toArray(anim.selector).forEach(el => {
            gsap.fromTo(el, 
                { 
                    opacity: 0, 
                    y: anim.y || 0, 
                    x: anim.x || 0 
                }, 
                {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });
    });


}

document.addEventListener('DOMContentLoaded', init);
