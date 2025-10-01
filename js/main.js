// Main JavaScript for Kyrgyz Real Estate Website
document.addEventListener('DOMContentLoaded', function() {
    console.log('Ваш Актив - сайт недвижимости загружен!');
    
    initializeWebsite();
    loadFeaturedProperties();
    setupEventListeners();
});

function initializeWebsite() {
    // Set current year in footer
    const yearElement = document.querySelector('.footer-copyright');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2024', currentYear);
    }
    
    // Initialize navigation active states
    initializeNavigation();
}

function initializeNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function setupEventListeners() {
    // Search functionality
    const searchBtn = document.querySelector('.search-btn-large');
    if (searchBtn) {
        searchBtn.addEventListener('click', handleMainSearch);
    }
    
    // Property card interactions
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('property-action')) {
                const propertyTitle = this.querySelector('.property-title')?.textContent;
                console.log('Viewing property:', propertyTitle);
                showPropertyDetails(propertyTitle);
            }
        });
    });
    
    // Property action buttons
    const propertyActions = document.querySelectorAll('.property-action');
    propertyActions.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.property-card');
            const propertyTitle = card.querySelector('.property-title')?.textContent;
            const propertyPrice = card.querySelector('.property-price')?.textContent;
            
            console.log('Interested in property:', propertyTitle, propertyPrice);
            showContactForm(propertyTitle, propertyPrice);
        });
    });
    
    // Header actions
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent;
            handleHeaderAction(action);
        });
    });
}

function handleMainSearch() {
    const type = document.querySelector('.search-select')?.value || 'любой тип';
    const location = document.querySelector('.search-input')?.value || 'любой район';
    
    const searchData = {
        type: type,
        location: location,
        timestamp: new Date().toLocaleString('ru-RU')
    };
    
    console.log('Main search parameters:', searchData);
    
    // Redirect to catalog with search parameters
    const params = new URLSearchParams();
    if (type && type !== 'Тип недвижимости') params.append('type', type);
    if (location) params.append('location', location);
    
    window.location.href = `catalog.html?${params.toString()}`;
}

function handleHeaderAction(action) {
    switch(action) {
        case '❤️':
            showFavorites();
            break;
        case '🔔':
            showNotifications();
            break;
        case '👤':
            showUserProfile();
            break;
        default:
            console.log('Unknown action:', action);
    }
}

function showPropertyDetails(propertyTitle) {
    // In a real application, this would show a modal or redirect to property page
    const modalHtml = `
        <div class="modal-overlay">
            <div class="modal-content">
                <h3>${propertyTitle}</h3>
                <p>Здесь будет детальная информация об объекте</p>
                <button class="modal-close">Закрыть</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }
        .modal-content {
            background: white;
            padding: 30px;
            border-radius: 12px;
            max-width: 500px;
            width: 90%;
        }
        .modal-close {
            margin-top: 20px;
            padding: 10px 20px;
            background: #2E8B57;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
    
    // Close modal
    document.querySelector('.modal-close').addEventListener('click', function() {
        document.querySelector('.modal-overlay').remove();
        style.remove();
    });
}

function showContactForm(propertyTitle, propertyPrice) {
    const formHtml = `
        <div class="modal-overlay">
            <div class="modal-content">
                <h3>Запрос по объекту</h3>
                <p><strong>${propertyTitle}</strong></p>
                <p>Цена: ${propertyPrice}</p>
                <form id="contactForm">
                    <input type="text" placeholder="Ваше имя" required>
                    <input type="tel" placeholder="Телефон" required>
                    <input type="email" placeholder="Email">
                    <textarea placeholder="Ваш вопрос"></textarea>
                    <button type="submit">Отправить запрос</button>
                </form>
                <button class="modal-close">Закрыть</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', formHtml);
    
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Запрос отправлен! Мы свяжемся с вами в ближайшее время.');
        document.querySelector('.modal-overlay').remove();
    });
    
    document.querySelector('.modal-close').addEventListener('click', function() {
        document.querySelector('.modal-overlay').remove();
    });
}

function showFavorites() {
    alert('Раздел "Избранное" - в разработке');
}

function showNotifications() {
    alert('У вас нет новых уведомлений');
}

function showUserProfile() {
    alert('Личный кабинет - в разработке');
}

// Utility function for API calls
async function fetchData(endpoint, options = {}) {
    try {
        const response = await fetch(`/api/${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initializeWebsite, handleMainSearch };
}