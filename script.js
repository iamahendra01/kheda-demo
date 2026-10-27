const menuItems = [
    { name: "Rajasthani Dal Baati Churma", category: "rajasthani", price: "₹350", desc: "Traditional Rajasthani platter served with pure ghee.", image: "menu/dalbati.webp" },
    { name: "Paneer Tikka Rooftop Special", category: "starters", price: "₹280", desc: "Cottage cheese marinated in rich spices and grilled over charcoal.", image: "menu/paneer.webp" },
    { name: "Special Veg Handi Biryani", category: "main", price: "₹320", desc: "Basmati rice cooked with fresh vegetables and aromatic spices.", image: "menu/veg.webp" },
    { name: "Gatta Curry with Masala Roti", category: "rajasthani", price: "₹260", desc: "Gram flour dumplings simmered in a tangy yogurt gravy.", image: "menu/gatta.webp" },
    { name: "Crispy Veg Spring Rolls", category: "starters", price: "₹200", desc: "Golden fried rolls stuffed with seasoned vegetables and noodles.", image: "menu/rolls.webp" },
    { name: "Cold Coffee with Ice Cream", category: "beverages", price: "₹150", desc: "Chilled blended coffee topped with a scoop of vanilla ice cream.", image: "menu/coffee.webp" }
];

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function displayMenu(category = 'all') {
    const grid = document.getElementById('menu-grid');
    if (!grid) return;
    const items = category === 'all' ? menuItems : menuItems.filter(i => i.category === category);
    
    grid.innerHTML = items.map((item) => `
        <article class="menu-card">
            <div class="menu-card-img">
                ${item.image
                    ? `<img src="${esc(item.image)}" alt="${esc(item.name)}" width="400" height="266" loading="lazy">`
                    : `<svg class="icon" style="width:3.5rem;height:3.5rem"><use href="#i-utensils"/></svg>`}
                <span class="menu-card-price">${esc(item.price)}</span>
            </div>
            <div class="menu-card-body">
                <div>
                    <h3 style="font-family:'Yatra One',serif;font-size:1.25rem;margin-bottom:0.5rem">${esc(item.name)}</h3>
                    <p style="color:#6b7280;margin-bottom:1rem">${esc(item.desc)}</p>
                </div>
                <a href="#reservation" style="color:var(--crimson);font-weight:600">Book a table to order</a>
            </div>
        </article>`).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    displayMenu('all');

    // Menu filter handler
    const buttons = document.querySelectorAll('.menu-btn');
    buttons.forEach(btn => btn.addEventListener('click', () => {
        buttons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        displayMenu(btn.dataset.category);
    }));

    // Mobile menu toggle
    const mBtn = document.getElementById('mobile-menu-btn');
    const mMenu = document.getElementById('mobile-menu');
    if (mBtn && mMenu) {
        mBtn.addEventListener('click', () => {
            const isExpanded = mBtn.getAttribute('aria-expanded') === 'true';
            mMenu.classList.toggle('hidden');
            mBtn.setAttribute('aria-expanded', !isExpanded);
        });
        mMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mMenu.classList.add('hidden')));
    }

    // Scroll header styling
    const header = document.getElementById('site-header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });

    // Scroll reveal observer
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('in');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.15 });
        document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    }

    // WhatsApp Form Submission
    const form = document.getElementById('reservation-form');
    if (form) {
        const dateInput = document.getElementById('res-date');
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;

        form.addEventListener('submit', e => {
            e.preventDefault();
            const v = id => document.getElementById(id).value.trim();
            const text = `Hello Kheda Rooftop Restaurant,\n\nI want to book a table.\n*Name:* ${v('res-name')}\n*Phone:* ${v('res-phone')}\n*Date:* ${v('res-date')}\n*Time:* ${v('res-time')}\n*Guests:* ${v('res-guests')}`;
            window.open(`https://wa.me/919999999999?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
        });
    }
});