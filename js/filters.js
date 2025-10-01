// Filter functionality for catalog page
class PropertyFilters {
    constructor() {
        this.filters = {
            type: [],
            city: [],
            district: [],
            price: { min: 0, max: 100000000 },
            area: { min: 0, max: 1000 },
            bedrooms: [],
            developer: '',
            status: []
        };
        
        this.properties = [];
        this.filteredProperties = [];
        
        this.init();
    }
    
    init() {
        this.loadProperties();
        this.setupFilterListeners();
        this.applyFilters();
    }
    
    loadProperties() {
        // In real app, this would be an API call
        this.properties = window.realEstateData?.properties || [];
        this.filteredProperties = [...this.properties];
    }
    
    setupFilterListeners() {
        // Checkbox filters
        document.querySelectorAll('input[data-filter]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => this.handleCheckboxFilter(e));
        });
        
        // Price range
        const priceMin = document.getElementById('priceMin');
        const priceMax = document.getElementById('priceMax');
        if (priceMin && priceMax) {
            priceMin.addEventListener('input', () => this.handlePriceFilter());
            priceMax.addEventListener('input', () => this.handlePriceFilter());
        }
        
        // Area range  
        const areaMin = document.getElementById('areaMin');
        const areaMax = document.getElementById('areaMax');
        if (areaMin && areaMax) {
            areaMin.addEventListener('input', () => this.handleAreaFilter());
            areaMax.addEventListener('input', () => this.handleAreaFilter());
        }
        
        // Bedrooms filter
        document.querySelectorAll('.bedroom-option').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleBedroomsFilter(e));
        });
        
        // Developer filter
        const developerFilter = document.getElementById('developerFilter');
        if (developerFilter) {
            developerFilter.addEventListener('change', (e) => this.handleDeveloperFilter(e));
        }
        
        // Clear filters
        const clearBtn = document.getElementById('clearFilters');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearAllFilters());
        }
    }
    
    handleCheckboxFilter(event) {
        const checkbox = event.target;
        const filterType = checkbox.getAttribute('data-filter');
        const value = checkbox.value;
        
        if (checkbox.checked) {
            if (!this.filters[filterType].includes(value)) {
                this.filters[filterType].push(value);
            }
        } else {
            this.filters[filterType] = this.filters[filterType].filter(item => item !== value);
        }
        
        this.applyFilters();
    }
    
    handlePriceFilter() {
        const min = parseInt(document.getElementById('priceMin').value) || 0;
        const max = parseInt(document.getElementById('priceMax').value) || 100000000;
        
        this.filters.price = { min, max };
        this.applyFilters();
    }
    
    handleAreaFilter() {
        const min = parseInt(document.getElementById('areaMin').value) || 0;
        const max = parseInt(document.getElementById('areaMax').value) || 1000;
        
        this.filters.area = { min, max };
        this.applyFilters();
    }
    
    handleBedroomsFilter(event) {
        const button = event.target;
        const bedrooms = button.getAttribute('data-bedrooms');
        
        // Toggle active class
        document.querySelectorAll('.bedroom-option').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        this.filters.bedrooms = [bedrooms];
        this.applyFilters();
    }
    
    handleDeveloperFilter(event) {
        this.filters.developer = event.target.value;
        this.applyFilters();
    }
    
    applyFilters() {
        this.filteredProperties = this.properties.filter(property => {
            return this.matchesFilters(property);
        });
        
        this.updateResultsCount();
        this.renderFilteredProperties();
    }
    
    matchesFilters(property) {
        // Type filter
        if (this.filters.type.length > 0 && !this.filters.type.includes(property.type)) {
            return false;
        }
        
        // City filter
        if (this.filters.city.length > 0 && !this.filters.city.includes(property.city)) {
            return false;
        }
        
        // District filter
        if (this.filters.district.length > 0 && !this.filters.district.includes(property.district)) {
            return false;
        }
        
        // Price filter
        if (property.price < this.filters.price.min || property.price > this.filters.price.max) {
            return false;
        }
        
        // Area filter
        if (property.area < this.filters.area.min || property.area > this.filters.area.max) {
            return false;
        }
        
        // Bedrooms filter
        if (this.filters.bedrooms.length > 0 && !this.filters.bedrooms.includes(property.bedrooms.toString())) {
            return false;
        }
        
        // Developer filter
        if (this.filters.developer && property.developer !== this.filters.developer) {
            return false;
        }
        
        // Status filter
        if (this.filters.status.length > 0 && !this.filters.status.includes(property.status)) {
            return false;
        }
        
        return true;
    }
    
    updateResultsCount() {
        const countElement = document.getElementById('resultsCount');
        if (countElement) {
            countElement.textContent = this.filteredProperties.length;
        }
    }
    
    renderFilteredProperties() {
        const container = document.getElementById('catalogProperties');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (this.filteredProperties.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <h3>Объекты не найдены</h3>
                    <p>Попробуйте изменить параметры фильтрации</p>
                </div>
            `;
            return;
        }
        
        this.filteredProperties.forEach(property => {
            const card = window.createPropertyCard(property);
            container.appendChild(card);
        });
    }
    
    clearAllFilters() {
        // Reset filter object
        this.filters = {
            type: [],
            city: [],
            district: [],
            price: { min: 0, max: 100000000 },
            area: { min: 0, max: 1000 },
            bedrooms: [],
            developer: '',
            status: []
        };
        
        // Reset UI
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        document.querySelectorAll('.bedroom-option').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.getElementById('priceMin').value = '';
        document.getElementById('priceMax').value = '';
        document.getElementById('areaMin').value = '';
        document.getElementById('areaMax').value = '';
        document.getElementById('developerFilter').value = '';
        
        this.applyFilters();
    }
}

// Initialize filters when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('catalogProperties')) {
        window.propertyFilters = new PropertyFilters();
    }
});