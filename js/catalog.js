// Catalog page specific functionality
class CatalogManager {
    constructor() {
        this.currentView = 'grid';
        this.currentSort = 'newest';
        this.currentPage = 1;
        this.itemsPerPage = 12;
        
        this.init();
    }
    
    init() {
        this.setupViewToggle();
        this.setupSorting();
        this.setupPagination();
        this.handleURLParams();
    }
    
    setupViewToggle() {
        const viewButtons = document.querySelectorAll('.view-btn');
        viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.target.getAttribute('data-view');
                this.switchView(view);
            });
        });
    }
    
    switchView(view) {
        this.currentView = view;
        const container = document.getElementById('catalogProperties');
        const viewButtons = document.querySelectorAll('.view-btn');
        
        // Update active button
        viewButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-view') === view);
        });
        
        // Update container class
        container.className = `properties-grid catalog-view ${view}-view`;
        
        // In real app, you might want to re-render properties in different layout
    }
    
    setupSorting() {
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.sortProperties();
            });
        }
    }
    
    sortProperties() {
        if (!window.propertyFilters) return;
        
        const properties = window.propertyFilters.filteredProperties;
        
        switch(this.currentSort) {
            case 'price_asc':
                properties.sort((a, b) => a.price - b.price);
                break;
            case 'price_desc':
                properties.sort((a, b) => b.price - a.price);
                break;
            case 'area_asc':
                properties.sort((a, b) => a.area - b.area);
                break;
            case 'area_desc':
                properties.sort((a, b) => b.area - a.area);
                break;
            case 'newest':
            default:
                properties.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
                break;
        }
        
        window.propertyFilters.renderFilteredProperties();
    }
    
    setupPagination() {
        // This would be implemented based on your pagination needs
        const prevBtn = document.querySelector('.pagination-btn.prev');
        const nextBtn = document.querySelector('.pagination-btn.next');
        const pageBtns = document.querySelectorAll('.pagination-page');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousPage());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextPage());
        }
        
        pageBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const page = parseInt(e.target.textContent);
                this.goToPage(page);
            });
        });
    }
    
    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updatePagination();
        }
    }
    
    nextPage() {
        // In real app, you'd check if there are more pages
        this.currentPage++;
        this.updatePagination();
    }
    
    goToPage(page) {
        this.currentPage = page;
        this.updatePagination();
    }
    
    updatePagination() {
        // Update pagination UI
        const pageBtns = document.querySelectorAll('.pagination-page');
        const prevBtn = document.querySelector('.pagination-btn.prev');
        const nextBtn = document.querySelector('.pagination-btn.next');
        
        pageBtns.forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.textContent) === this.currentPage);
        });
        
        // Update button states
        if (prevBtn) {
            prevBtn.disabled = this.currentPage === 1;
        }
        
        // In real app, you'd load the appropriate page of results
        console.log('Navigated to page:', this.currentPage);
    }
    
    handleURLParams() {
        const urlParams = new URLSearchParams(window.location.search);
        
        // Apply filters from URL parameters
        const type = urlParams.get('type');
        const location = urlParams.get('location');
        
        if (type) {
            const checkbox = document.querySelector(`input[value="${type}"]`);
            if (checkbox) {
                checkbox.checked = true;
                // Trigger change event to apply filter
                checkbox.dispatchEvent(new Event('change'));
            }
        }
        
        if (location) {
            // You might want to pre-fill location search
            console.log('Location filter from URL:', location);
        }
    }
}

// Initialize catalog manager
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('catalogProperties')) {
        window.catalogManager = new CatalogManager();
    }
});