// Import skills data
import { skillsData } from './skills-data.js';

// DOM Manipulation Examples & Interactivity
class PortfolioApp {
    constructor() {
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.renderSkills();
        this.attachEventListeners();
        this.animateProgressBars();
    }

    // ===== HARD SKILLS RENDERING =====
    renderSkills() {
        const container = document.getElementById('hard-skills-grid');
        container.innerHTML = ''; // Clear existing content (DOM manipulation)

        skillsData.hardSkills.forEach((category, index) => {
            const categoryCard = this.createSkillCategoryCard(category, index);
            container.appendChild(categoryCard);
        });

        this.renderSoftSkills();
    }

    createSkillCategoryCard(category, index) {
        // Create elements programmatically (DOM manipulation)
        const card = document.createElement('div');
        card.className = 'skill-category';
        card.style.animationDelay = `${index * 0.1}s`;

        const header = document.createElement('div');
        header.className = 'category-header';
        header.innerHTML = `
            <span class="category-icon">${category.icon}</span>
            <span>${category.category}</span>
        `;

        card.appendChild(header);

        category.skills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.innerHTML = `
                <div class="skill-name">
                    <span>${skill.name}</span>
                    <span class="skill-level">${skill.level}%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-fill" style="width: 0%"></div>
                </div>
            `;
            card.appendChild(skillItem);
        });

        return card;
    }

    // ===== SOFT SKILLS RENDERING =====
    renderSoftSkills() {
        const container = document.getElementById('soft-skills-grid');
        container.innerHTML = ''; // Clear and re-render (DOM manipulation)

        skillsData.softSkills.forEach((skill, index) => {
            const card = document.createElement('div');
            card.className = 'soft-skill-card';
            card.style.animationDelay = `${index * 0.1}s`;
            card.innerHTML = `
                <div class="soft-skill-icon">${skill.icon}</div>
                <div class="soft-skill-name">${skill.name}</div>
                <div class="soft-skill-bar">
                    <div class="soft-skill-fill" style="width: 0%"></div>
                </div>
                <div class="soft-skill-level">${skill.level}%</div>
            `;
            container.appendChild(card);
        });
    }

    // ===== PROGRESS BAR ANIMATION =====
    animateProgressBars() {
        // Intersect observer for scroll-triggered animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillFills = entry.target.querySelectorAll('.skill-fill, .soft-skill-fill');
                    const skillItems = entry.target.querySelectorAll('.skill-item');
                    const softSkillCards = entry.target.querySelectorAll('.soft-skill-card');

                    // Get the level for hard skills
                    skillItems.forEach((item, idx) => {
                        const skillLevel = item.querySelector('.skill-level').textContent;
                        const level = parseInt(skillLevel);
                        setTimeout(() => {
                            item.querySelector('.skill-fill').style.width = level + '%';
                        }, idx * 50);
                    });

                    // Get the level for soft skills
                    softSkillCards.forEach((card, idx) => {
                        const skillLevel = card.querySelector('.soft-skill-level').textContent;
                        const level = parseInt(skillLevel);
                        setTimeout(() => {
                            card.querySelector('.soft-skill-fill').style.width = level + '%';
                        }, idx * 50);
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const skillsSection = document.querySelector('.skills-section');
        observer.observe(skillsSection);
    }

    // ===== FILTER FUNCTIONALITY =====
    attachEventListeners() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterSkills(e.target.dataset.filter);
                // Update active state (DOM manipulation)
                filterButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Smooth scroll for navigation links
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }

    filterSkills(filter) {
        const cards = document.querySelectorAll('.skill-category');
        
        cards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease-out';
            } else {
                // Hide cards not matching filter (DOM manipulation)
                const categoryName = card.querySelector('.category-header span:last-child').textContent;
                const shouldShow = categoryName.toLowerCase().includes(filter.toLowerCase());
                card.style.display = shouldShow ? 'block' : 'none';
            }
        });
    }

    // ===== UTILITY: DYNAMICALLY ADD SKILL =====
    addNewSkill(categoryIndex, skillName, skillLevel) {
        const container = document.getElementById('hard-skills-grid');
        const card = container.querySelectorAll('.skill-category')[categoryIndex];
        
        if (card) {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.innerHTML = `
                <div class="skill-name">
                    <span>${skillName}</span>
                    <span class="skill-level">${skillLevel}%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-fill" style="width: ${skillLevel}%"></div>
                </div>
            `;
            card.appendChild(skillItem);
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Expose methods to window for feature testing
window.PortfolioApp = PortfolioApp;
