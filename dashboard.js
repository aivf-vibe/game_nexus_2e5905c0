



// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initializeDashboard();
    
    // Sidebar toggle
    initializeSidebar();
    
    // Charts
    initializeCharts();
    
    // Modals
    initializeModals();
    
    // Real-time updates
    startRealTimeUpdates();
});

function initializeDashboard() {
    // Add loading states
    addLoadingStates();
    
    // Initialize tooltips
    initializeTooltips();
    
    // Set up event listeners
    setupEventListeners();
}

function initializeSidebar() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        document.querySelector('.main-content').classList.toggle('sidebar-collapsed');
    });
}

function initializeCharts() {
    // Student Engagement Chart
    const engagementCtx = document.getElementById('engagementChart');
    if (engagementCtx) {
        new Chart(engagementCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Active Students',
                    data: [65, 78, 90, 81, 96, 87, 94],
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Course Completions',
                    data: [12, 19, 15, 25, 22, 18, 21],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Course Performance Chart
    const performanceCtx = document.getElementById('performanceChart');
    if (performanceCtx) {
        new Chart(performanceCtx, {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'In Progress', 'Not Started'],
                datasets: [{
                    data: [45, 35, 20],
                    backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                }
            }
        });
    }
}

function initializeModals() {
    const createCourseBtn = document.querySelector('.create-course-btn');
    const modal = document.getElementById('createCourseModal');
    const closeBtn = document.querySelector('.modal-close');
    
    if (createCourseBtn && modal) {
        createCourseBtn.addEventListener('click', function() {
            modal.classList.add('active');
        });
        
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('active');
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
}

function closeModal() {
    const modal = document.getElementById('createCourseModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function addLoadingStates() {
    // Add loading skeletons for dynamic content
    const loadingElements = document.querySelectorAll('.stat-card, .course-card');
    loadingElements.forEach(element => {
        element.classList.add('loading');
        setTimeout(() => {
            element.classList.remove('loading');
        }, 1000);
    });
}

function initializeTooltips() {
    // Initialize tooltips for interactive elements
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = e.target.dataset.tooltip;
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) tooltip.remove();
}

function setupEventListeners() {
    // Quick action buttons
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(card => {
        card.addEventListener('click', handleQuickAction);
    });
    
    // Chart filters
    const chartFilters = document.querySelectorAll('.chart-filter');
    chartFilters.forEach(filter => {
        filter.addEventListener('change', updateChartData);
    });
    
    // Performance filters
    const performanceFilters = document.querySelectorAll('.performance-filter');
    performanceFilters.forEach(filter => {
        filter.addEventListener('change', updatePerformanceData);
    });
    
    // Form submissions
    const forms = document.querySelectorAll('.modal-form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
}

function handleQuickAction(e) {
    const action = e.currentTarget.querySelector('span').textContent;
    
    switch(action) {
        case 'New Course':
            document.getElementById('createCourseModal').classList.add('active');
            break;
        case 'Add Student':
            showNotification('Add Student feature coming soon!');
            break;
        case 'Upload Content':
            showNotification('Upload Content feature coming soon!');
            break;
        case 'Schedule Class':
            showNotification('Schedule Class feature coming soon!');
            break;
    }
}

function updateChartData(e) {
    const chartType = e.target.closest('.chart-container').querySelector('h3').textContent;
    const filter = e.target.value;
    
    // Simulate data update
    showNotification(`Updating ${chartType} with ${filter} data...`);
    
    // In a real app, this would fetch new data from the server
    setTimeout(() => {
        hideNotification();
    }, 2000);
}

function updatePerformanceData(e) {
    const filter = e.target.value;
    showNotification(`Updating performance data for ${filter}...`);
    
    // Simulate data update
    setTimeout(() => {
        hideNotification();
    }, 2000);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Show loading state
    const submitBtn = form.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creating...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Course created successfully!');
        closeModal();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        form.reset();
        
        // Refresh course list
        refreshCourseList();
    }, 2000);
}

function refreshCourseList() {
    // Simulate refreshing course data
    const courseGrid = document.querySelector('.course-grid');
    courseGrid.classList.add('refreshing');
    
    setTimeout(() => {
        courseGrid.classList.remove('refreshing');
    }, 1000);
}

function startRealTimeUpdates() {
    // Simulate real-time updates
    setInterval(() => {
        updateStats();
        updateActivityFeed();
    }, 30000); // Update every 30 seconds
}

function updateStats() {
    // Simulate real-time stat updates
    const stats = document.querySelectorAll('.stat-info h3');
    stats.forEach(stat => {
        const currentValue = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
        const newValue = currentValue + Math.floor(Math.random() * 3) - 1;
        stat.textContent = newValue.toLocaleString();
    });
}

function updateActivityFeed() {
    // Simulate new activity
    const activities = [
        {
            icon: 'fas fa-user-graduate',
            text: 'New student enrolled in Web Development',
            time: 'Just now'
        },
        {
            icon: 'fas fa-comment',
            text: 'New discussion in Python Basics forum',
            time: '1 min ago'
        },
        {
            icon: 'fas fa-file-alt',
            text: 'Assignment submitted for grading',
            time: '2 mins ago'
        }
    ];
    
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    addActivityToFeed(randomActivity);
}

function addActivityToFeed(activity) {
    const activityList = document.querySelector('.activity-list');
    const newActivity = document.createElement('div');
    newActivity.className = 'activity-item';
    newActivity.innerHTML = `
        <div class="activity-icon">
            <i class="${activity.icon}"></i>
        </div>
        <div class="activity-content">
            <p>${activity.text}</p>
            <span class="activity-time">${activity.time}</span>
        </div>
    `;
    
    activityList.insertBefore(newActivity, activityList.firstChild);
    
    // Remove oldest activity if more than 4
    const activities = activityList.querySelectorAll('.activity-item');
    if (activities.length > 4) {
        activityList.removeChild(activities[activities.length - 1]);
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function hideNotification() {
    const notification = document.querySelector('.notification');
    if (notification) {
        notification.remove();
    }
}

// Responsive handlers
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        document.querySelector('.sidebar').classList.add('collapsed');
        document.querySelector('.main-content').classList.add('sidebar-collapsed');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'n':
                e.preventDefault();
                document.getElementById('createCourseModal').classList.add('active');
                break;
            case 'k':
                e.preventDefault();
                document.querySelector('.search-bar input').focus();
                break;
        }
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .loading {
        opacity: 0.6;
        pointer-events: none;
    }
    
    .refreshing {
        animation: pulse 1s ease-in-out;
    }
    
    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
    }
`;
document.head.appendChild(style);



