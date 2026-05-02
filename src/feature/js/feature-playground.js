// ========================================
// FEATURE PLAYGROUND: DOM Manipulation
// Educational examples & experimental code
// ========================================

// Console helper for output
const consoleOutput = document.getElementById('console-output');

function logToConsole(message) {
    const timestamp = new Date().toLocaleTimeString();
    consoleOutput.textContent += `\n[${timestamp}] ${message}`;
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

function clearConsole() {
    consoleOutput.textContent = '> Console cleared.\n';
}

// ========================================
// FEATURE #1: Dynamic Element Creation
// ========================================

const skillNames = ['TypeScript', 'GraphQL', 'Kubernetes', 'Machine Learning', 'Web3', 'Rust', 'Go', 'Elixir'];
const skillEmojis = ['📘', '🔗', '⚙️', '🤖', '⛓️', '🦀', '🐹', '✨'];

function createDynamicElement() {
    const container = document.getElementById('dynamic-container');
    
    // Randomly select skill
    const randomIndex = Math.floor(Math.random() * skillNames.length);
    const skillName = skillNames[randomIndex];
    const emoji = skillEmojis[randomIndex];
    const level = Math.floor(Math.random() * 30) + 60; // Random level 60-90
    
    // Create card element (DOM manipulation)
    const card = document.createElement('div');
    card.className = 'soft-skill-card';
    card.style.animation = 'slideInLeft 0.6s ease-out';
    
    card.innerHTML = `
        <div class="soft-skill-icon">${emoji}</div>
        <div class="soft-skill-name">${skillName}</div>
        <div class="soft-skill-bar">
            <div class="soft-skill-fill" style="width: ${level}%; animation: fillGlow 2s ease-in-out infinite;"></div>
        </div>
        <div class="soft-skill-level">${level}%</div>
        <button style="margin-top: 10px; padding: 5px 10px; background: var(--accent-green); border: none; border-radius: 4px; color: white; cursor: pointer; font-size: 0.8rem;" onclick="this.parentElement.remove();">Remove</button>
    `;
    
    container.appendChild(card);
    logToConsole(`✅ Created element: ${skillName} (${level}%)`);
    
    // Demonstrate event listener on new element
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.1)';
        logToConsole(`📍 Hovered: ${skillName}`);
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
}

// ========================================
// FEATURE #2: Clone & Modify Elements
// ========================================

let cloneCount = 0;

function cloneAndModify() {
    const original = document.getElementById('original-element');
    const container = document.getElementById('clone-container');
    
    // Clone the element (DOM manipulation)
    const cloned = original.cloneNode(true);
    cloneCount++;
    
    // Modify the clone
    const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    cloned.style.background = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.1)`;
    cloned.style.borderColor = randomColor;
    cloned.innerHTML = `<p style="color: ${randomColor}; font-weight: bold;">Clone #${cloneCount} (Modified)</p>`;
    cloned.style.marginBottom = '10px';
    
    // Add animation
    cloned.style.animation = 'slideInLeft 0.6s ease-out';
    
    // Append to container
    container.appendChild(cloned);
    
    logToConsole(`🔀 Cloned element ${cloneCount} with random color`);
    
    // Add interaction to clone
    cloned.addEventListener('click', function() {
        this.style.transform = 'rotateX(360deg)';
        this.style.transition = 'all 0.6s ease-out';
        setTimeout(() => this.remove(), 600);
        logToConsole(`🗑️ Clone ${cloneCount} removed after rotation`);
    });
}

// ========================================
// FEATURE #3: Event Delegation
// ========================================

function setupEventDelegation() {
    const eventList = document.getElementById('event-list');
    eventList.innerHTML = ''; // Clear existing items
    
    // Create test items
    for (let i = 1; i <= 5; i++) {
        const item = document.createElement('button');
        item.className = 'filter-btn';
        item.textContent = `Item ${i}`;
        item.style.background = 'transparent';
        item.style.borderColor = 'var(--accent-purple)';
        item.style.color = 'var(--accent-purple)';
        item.dataset.itemId = i;
        item.addEventListener('click', handleItemClick);
        eventList.appendChild(item);
    }
    
    logToConsole('✅ Event delegation demo initialized with 5 clickable items');
}

function handleItemClick(e) {
    const itemId = e.target.dataset.itemId;
    e.target.style.transform = 'scale(1.1)';
    e.target.style.background = 'var(--accent-purple)';
    e.target.style.color = 'white';
    
    setTimeout(() => {
        e.target.style.transform = 'scale(1)';
        e.target.style.background = 'transparent';
        e.target.style.color = 'var(--accent-purple)';
    }, 300);
    
    logToConsole(`👆 Event triggered on Item ${itemId}`);
}

// ========================================
// FEATURE #4: RequestAnimationFrame Demo
// ========================================

let animationFrameId = null;
let rotation = 0;

function startRAFAnimation() {
    const box = document.getElementById('animation-box');
    logToConsole('🎬 Starting requestAnimationFrame animation...');
    
    // Cancel previous animation if running
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    
    function animate() {
        rotation += 5;
        if (rotation > 360) rotation = 0;
        
        box.style.transform = `rotate(${rotation}deg) translateX(${Math.sin(rotation * Math.PI / 180) * 100}px)`;
        
        if (rotation < 360) {
            animationFrameId = requestAnimationFrame(animate);
        } else {
            logToConsole('✅ Animation completed');
        }
    }
    
    animationFrameId = requestAnimationFrame(animate);
}

// ========================================
// FEATURE #5: Data Manipulation & Filtering
// ========================================

const testData = [
    { name: 'JavaScript', level: 95, category: 'language' },
    { name: 'Python', level: 85, category: 'language' },
    { name: 'React', level: 80, category: 'framework' },
    { name: 'Node.js', level: 80, category: 'framework' },
    { name: 'Git', level: 90, category: 'tool' },
];

function demonstrateFeature1() {
    logToConsole('📊 Feature Demo #1: Data Manipulation');
    logToConsole('Original data: ' + JSON.stringify(testData));
    
    // Filter data
    const languages = testData.filter(item => item.category === 'language');
    logToConsole(`Filtered languages: ${languages.map(l => l.name).join(', ')}`);
    
    // Map data
    const names = testData.map(item => item.name);
    logToConsole(`All names: ${names.join(', ')}`);
    
    // Sort by level
    const sorted = [...testData].sort((a, b) => b.level - a.level);
    logToConsole(`Sorted by level: ${sorted.map(s => `${s.name}(${s.level}%)`).join(', ')}`);
}

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    logToConsole('🚀 Experimental Playground Loaded');
    logToConsole('Available Functions:');
    logToConsole('  - createDynamicElement()');
    logToConsole('  - cloneAndModify()');
    logToConsole('  - setupEventDelegation()');
    logToConsole('  - startRAFAnimation()');
    logToConsole('  - demonstrateFeature1()');
});

// ========================================
// ADVANCED: Custom Observer Pattern
// ========================================

function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                logToConsole(`👁️ Intersection Observer: ${entry.target.id} is visible`);
            }
        });
    });

    document.querySelectorAll('[data-observe]').forEach(el => observer.observe(el));
}

// ========================================
// MUTATION OBSERVER DEMO
// ========================================

function setupMutationObserver() {
    const container = document.getElementById('dynamic-container');
    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childlist') {
                logToConsole(`🔍 DOM Mutation Detected: ${mutation.addedNodes.length} nodes added`);
            }
        });
    });

    observer.observe(container, { childList: true });
}

// Initialize mutation observer when page loads
document.addEventListener('DOMContentLoaded', setupMutationObserver);

// Expose functions to window for testing
window.createDynamicElement = createDynamicElement;
window.cloneAndModify = cloneAndModify;
window.setupEventDelegation = setupEventDelegation;
window.startRAFAnimation = startRAFAnimation;
window.demonstrateFeature1 = demonstrateFeature1;
window.clearConsole = clearConsole;
window.logToConsole = logToConsole;
