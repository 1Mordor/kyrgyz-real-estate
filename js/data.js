// Sample real estate data for Kyrgyzstan
const realEstateData = {
    properties: [
        {
            id: 1,
            title: "3-комнатная квартира в ЖК 'Горный'",
            type: "apartment",
            price: 8500000,
            priceFormatted: "8 500 000 сом",
            area: 85,
            bedrooms: 3,
            city: "bishkek",
            district: "leninsky",
            developer: "basis-a",
            status: "new",
            image: "property1.jpg",
            features: {
                bedrooms: 3,
                bathrooms: 2,
                parking: true,
                balcony: true
            },
            location: "ул. Горная, 45",
            description: "Просторная 3-комнатная квартира в новом жилом комплексе с современной отделкой и видом на горы.",
            dateAdded: "2024-01-15"
        },
        {
            id: 2,
            title: "Коттедж в посёлке 'Таш-Рабат'",
            type: "cottage",
            price: 25000000,
            priceFormatted: "25 000 000 сом",
            area: 180,
            bedrooms: 4,
            city: "bishkek",
            district: "alamedin",
            developer: "kairak",
            status: "resale",
            image: "property2.jpg",
            features: {
                bedrooms: 4,
                bathrooms: 3,
                parking: 2,
                garden: true
            },
            location: "пос. Таш-Рабат",
            description: "Просторный коттедж с участком 6 соток, современным ремонтом и всеми коммуникациями.",
            dateAdded: "2024-01-10"
        },
        {
            id: 3,
            title: "Участок 10 соток в Орто-Сай",
            type: "land",
            price: 3500000,
            priceFormatted: "3 500 000 сом",
            area: 1000,
            bedrooms: 0,
            city: "bishkek",
            district: "oktyabrsky",
            developer: null,
            status: "resale",
            image: "property3.jpg",
            features: {
                electricity: true,
                water: true,
                gas: false,
                fenced: true
            },
            location: "мкр. Орто-Сай",
            description: "Ровный участок с подведёнными коммуникациями, идеальное место для строительства дома.",
            dateAdded: "2024-01-08"
        },
        {
            id: 4,
            title: "2-комнатная квартира в центре",
            type: "apartment",
            price: 5500000,
            priceFormatted: "5 500 000 сом",
            area: 58,
            bedrooms: 2,
            city: "bishkek",
            district: "leninsky",
            developer: "norda",
            status: "resale",
            image: "property4.jpg",
            features: {
                bedrooms: 2,
                bathrooms: 1,
                parking: false,
                balcony: true
            },
            location: "ул. Советская, 125",
            description: "Уютная квартира в центре города с евроремонтом и всей необходимой мебелью.",
            dateAdded: "2024-01-05"
        },
        {
            id: 5,
            title: "Коттедж в ЖК 'Престиж'",
            type: "cottage",
            price: 32000000,
            priceFormatted: "32 000 000 сом",
            area: 220,
            bedrooms: 5,
            city: "bishkek",
            district: "svrdlovsky",
            developer: "kairak",
            status: "new",
            image: "property5.jpg",
            features: {
                bedrooms: 5,
                bathrooms: 4,
                parking: 3,
                garden: true,
                pool: true
            },
            location: "ЖК 'Престиж'",
            description: "Элитный коттедж с бассейном и сауной в закрытом посёлке с охраной.",
            dateAdded: "2024-01-03"
        },
        {
            id: 6,
            title: "Коммерческое помещение 120м²",
            type: "commercial",
            price: 18000000,
            priceFormatted: "18 000 000 сом",
            area: 120,
            bedrooms: 0,
            city: "bishkek",
            district: "oktyabrsky",
            developer: "stroyinvest",
            status: "resale",
            image: "property6.jpg",
            features: {
                separateEntrance: true,
                parking: true,
                renovation: true
            },
            location: "пр. Чуй, 78",
            description: "Готовое коммерческое помещение на первой линии проспекта Чуй.",
            dateAdded: "2024-01-01"
        }
    ],
    
    developers: [
        {
            id: "basis-a",
            name: "БАЗИС-А",
            founded: 2008,
            projectsCount: 18,
            rating: 4.8,
            reviews: 67,
            description: "Один из ведущих застройщиков Бишкека, специализируется на строительстве современных жилых комплексов бизнес-класса.",
            projects: [
                {
                    name: "ЖК 'Горный'",
                    location: "ул. Горная, Бишкек",
                    price: "от 45,000 сом/м²",
                    status: "Строится"
                },
                {
                    name: "ЖК 'Весна'",
                    location: "мкр. Восьмой, Бишкек",
                    price: "от 38,000 сом/м²",
                    status: "Сдан"
                }
            ]
        },
        {
            id: "kairak",
            name: "Кайрак Инвест",
            founded: 2010,
            projectsCount: 22,
            rating: 4.6,
            reviews: 89,
            description: "Специализируется на строительстве элитной недвижимости в престижных районах Бишкека.",
            projects: [
                {
                    name: "ЖК 'Престиж'",
                    location: "пр. Чуй, Бишкек",
                    price: "от 55,000 сом/м²",
                    status: "Строится"
                },
                {
                    name: "Коттеджный посёлок 'Таш-Рабат'",
                    location: "с. Таш-Рабат",
                    price: "от 25 млн сом",
                    status: "Сдан"
                }
            ]
        },
        {
            id: "norda",
            name: "Норда Групп",
            founded: 2012,
            projectsCount: 15,
            rating: 4.5,
            reviews: 45,
            description: "Компания полного цикла, занимающаяся строительством жилых и коммерческих объектов.",
            projects: [
                {
                    name: "ЖК 'Северное сияние'",
                    location: "ул. Токтогула, Бишкек",
                    price: "от 42,000 сом/м²",
                    status: "Строится"
                },
                {
                    name: "Бизнес-центр 'Норда'",
                    location: "пр. Манаса, Бишкек",
                    price: "от 60,000 сом/м²",
                    status: "Сдан"
                }
            ]
        }
    ],
    
    cities: {
        "bishkek": "Бишкек",
        "osh": "Ош", 
        "jalal-abad": "Джалал-Абад",
        "karakol": "Каракол"
    },
    
    districts: {
        "leninsky": "Ленинский",
        "oktyabrsky": "Октябрьский", 
        "svrdlovsky": "Свердловский",
        "alamedin": "Аламедин"
    }
};

// Function to load featured properties on homepage
function loadFeaturedProperties() {
    const featuredContainer = document.getElementById('featured-properties');
    if (!featuredContainer) return;
    
    const featuredProperties = realEstateData.properties.slice(0, 6);
    
    featuredProperties.forEach(property => {
        const propertyCard = createPropertyCard(property);
        featuredContainer.appendChild(propertyCard);
    });
}

// Function to create property card HTML
function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card';
    card.setAttribute('data-id', property.id);
    
    const featuresHtml = property.type === 'land' ? 
        `<div class="feature">📐 ${property.area} м²</div>` :
        `<div class="feature">🛏️ ${property.bedrooms} спальни</div>
         <div class="feature">📐 ${property.area} м²</div>`;
    
    card.innerHTML = `
        <div class="property-image">
            <div class="property-badge">${getStatusBadge(property.status)}</div>
        </div>
        <div class="property-content">
            <div class="property-type">${getTypeLabel(property.type)}</div>
            <h3 class="property-title neutral-face">${property.title}</h3>
            <div class="property-features">
                ${featuresHtml}
            </div>
            <div class="property-location">
                <span class="label">Район:</span>
                <span>${realEstateData.districts[property.district]}</span>
            </div>
            <div class="property-footer">
                <div class="property-price">${property.priceFormatted}</div>
                <button class="property-action">Подробнее</button>
            </div>
        </div>
    `;
    
    return card;
}

// Helper functions
function getTypeLabel(type) {
    const types = {
        'apartment': 'квартира',
        'cottage': 'коттедж', 
        'land': 'участок',
        'commercial': 'коммерческая'
    };
    return types[type] || type;
}

function getStatusBadge(status) {
    const badges = {
        'new': 'Новостройка',
        'resale': 'Вторичка',
        'offplan': 'Off-plan'
    };
    return badges[status] || status;
}

// Export data for other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = realEstateData;
}