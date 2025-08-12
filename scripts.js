// تبديل الوضع المظلم/الفاتح
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    const isDarkMode = !document.body.classList.contains('light-mode');
    localStorage.setItem('darkMode', isDarkMode);
});

// تهيئة الوضع من localStorage
document.addEventListener('DOMContentLoaded', () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.remove('light-mode');
    } else {
        document.body.classList.add('light-mode');
    }
    
    // تحميل الخدمات
    loadServices();
});

// دالة تحميل الخدمات (مثال)
async function loadServices() {
    try {
        // في تطبيق حقيقي سيتم جلب البيانات من الخادم
        const services = [
            { 
                name: "متابعين إنستغرام", 
                description: "1000 متابع عربي حقيقي", 
                price: 15, 
                platform: "instagram" 
            },
            // خدمات أخرى...
        ];

        const container = document.querySelector('.services-grid');
        container.innerHTML = '';

        services.forEach(service => {
            const card = document.createElement('div');
            card.className = 'service-card glass-card';
            card.innerHTML = `
                <div class="service-icon">📱</div>
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <div class="price">${service.price} جنيه</div>
                <button class="order-btn" data-id="${service.id}">طلب الخدمة</button>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        console.error('Error loading services:', error);
    }
}

// إدارة الطلبات
document.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const serviceId = e.target.dataset.id;
        createOrder(serviceId);
    });
});

function createOrder(serviceId) {
    // إرسال طلب للخادم
    fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceId, quantity: 1000 })
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            alert('تم إنشاء الطلب بنجاح!');
        }
    });
}
