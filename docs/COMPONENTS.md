# Components & DOM Patterns Reference

This document provides a quick reference for all DOM manipulation patterns used in the portfolio project.

---

## Table of Contents
1. [DOM Query Methods](#dom-query-methods)
2. [Element Creation](#element-creation)
3. [Content Manipulation](#content-manipulation)
4. [Event Handling](#event-handling)
5. [CSS Classes & Styles](#css-classes--styles)
6. [Animation Patterns](#animation-patterns)
7. [Observer APIs](#observer-apis)
8. [Best Practices](#best-practices)

---

## DOM Query Methods

### querySelector (Single Element)
```javascript
// Get first matching element
const element = document.querySelector('.skill-card');
const header = document.querySelector('header');
const byId = document.querySelector('#my-id');

// CSS selectors work
const skill = document.querySelector('[data-level="90"]');
```

### querySelectorAll (Multiple Elements)
```javascript
// Get all matching elements
const cards = document.querySelectorAll('.skill-card');
const skills = document.querySelectorAll('[data-filter]');

// Returns NodeList (not Array, but iterable)
cards.forEach(card => {
    console.log(card);
});
```

### getElementById, getElementsByClassName, getElementsByTagName
```javascript
// Get by ID (returns single Element or null)
const element = document.getElementById('header');

// Get by class (returns live HTMLCollection)
const cards = document.getElementsByClassName('skill-card');

// Get by tag (returns live HTMLCollection)
const buttons = document.getElementsByTagName('button');
```

### Difference: NodeList vs HTMLCollection
```javascript
// querySelectorAll returns static NodeList
const static = document.querySelectorAll('.item');
static.length; // Current length

// getElementsByClassName returns live HTMLCollection
const live = document.getElementsByClassName('item');
live.length; // Updates automatically when DOM changes
```

---

## Element Creation

### createElement
```javascript
// Create new element
const div = document.createElement('div');
const button = document.createElement('button');

// Add content
div.textContent = 'Hello';
div.className = 'my-class';
div.id = 'my-id';

// Add to DOM
document.body.appendChild(div);
```

### Example: Create Skill Card
```javascript
function createSkillCard(skill) {
    const card = document.createElement('div');
    card.className = 'skill-category';
    
    const header = document.createElement('div');
    header.className = 'category-header';
    header.innerHTML = `<span>${skill.name}</span>`;
    
    card.appendChild(header);
    
    // Add to container
    container.appendChild(card);
    
    return card;
}
```

### createTextNode
```javascript
// Create text node (rarely needed, textContent is better)
const textNode = document.createTextNode('Hello World');
element.appendChild(textNode);

// Usually just do this instead:
element.textContent = 'Hello World';
```

### insertAdjacentHTML / insertAdjacentElement
```javascript
// Insert HTML/Element at specific position
element.insertAdjacentHTML('beforebegin', '<p>Before</p>');   // Outside, before
element.insertAdjacentHTML('afterbegin', '<p>First child</p>'); // Inside, first
element.insertAdjacentHTML('beforeend', '<p>Last child</p>');   // Inside, last
element.insertAdjacentHTML('afterend', '<p>After</p>');    // Outside, after
```

---

## Content Manipulation

### textContent vs innerHTML vs innerText
```javascript
// textContent: Plain text only, safe, performant
element.textContent = 'Hello <strong>World</strong>';
// Displays: "Hello <strong>World</strong>" (literal text)

// innerHTML: Parses HTML, potential security risk, slower
element.innerHTML = '<p>Hello <strong>World</strong></p>';
// Displays: Hello (bold) World

// innerText: Considers CSS, slower, respects formatting
element.innerText = 'Hello World'; // Respects display properties

// XSS Prevention: Always use textContent for user input
const userInput = getUserInput(); // Could contain malicious HTML
element.textContent = userInput; // Safe! HTML is escaped
```

### Appending/Inserting Content
```javascript
// Append single element
parent.appendChild(child);

// Append multiple elements
parent.append(child1, child2, child3);

// Insert before element
parent.insertBefore(newElement, referenceElement);

// Replace element
parent.replaceChild(newElement, oldElement);
```

---

## Element Removal & Replacement

### remove()
```javascript
// Modern way (IE 11+ support)
element.remove();

// Legacy way
element.parentElement.removeChild(element);
```

### replaceWith()
```javascript
// Modern way
oldElement.replaceWith(newElement);

// Legacy way
oldElement.parentElement.replaceChild(newElement, oldElement);
```

### Clear Container
```javascript
// Remove all children
container.innerHTML = ''; // Fast but loses event listeners

// Better: remove children one by one
while (container.firstChild) {
    container.removeChild(container.firstChild);
}

// Or clear and re-render
container.textContent = ''; // Simple for text-only content
```

---

## Event Handling

### addEventListener (Preferred Method)
```javascript
// Basic syntax
element.addEventListener('eventType', callback);

// With options
element.addEventListener('click', handleClick, {
    once: true,           // Trigger only once
    capture: false,       // Bubbling phase (default)
    passive: true         // Won't call preventDefault()
});

// Remove listener
element.removeEventListener('click', handleClick);
```

### Event Types
```javascript
// Mouse events
element.addEventListener('click', handler);
element.addEventListener('mouseenter', handler);
element.addEventListener('mouseleave', handler);
element.addEventListener('mousedown', handler);
element.addEventListener('mouseup', handler);

// Keyboard events
document.addEventListener('keydown', (e) => {
    console.log(e.key); // 'Enter', 'Escape', etc.
});

// Form events
input.addEventListener('input', handler); // While typing
input.addEventListener('change', handler); // After change confirmed
form.addEventListener('submit', handler);

// Scroll events
window.addEventListener('scroll', handler);

// Resize events
window.addEventListener('resize', handler);
```

### Event Delegation (Key Pattern!)
```javascript
// Instead of adding listener to each item:
// DON'T DO THIS:
items.forEach(item => {
    item.addEventListener('click', handleClick);
});

// DO THIS - Add listener to parent:
parent.addEventListener('click', (event) => {
    // Check if clicked element matches selector
    if (event.target.matches('.item')) {
        handleClick(event);
    }
});

// OR use closest() for nested elements:
parent.addEventListener('click', (event) => {
    const item = event.target.closest('.item');
    if (item) {
        handleClick(event, item);
    }
});
```

### Event Object Properties
```javascript
element.addEventListener('click', (event) => {
    event.target;           // Element that triggered event
    event.currentTarget;    // Element listener is attached to
    event.type;             // Event type ('click', 'keydown', etc.)
    event.key;              // Key pressed (for keyboard events)
    event.clientX, clientY; // Mouse position
    event.preventDefault(); // Stop default behavior
    event.stopPropagation(); // Stop event bubbling
});
```

---

## CSS Classes & Styles

### Manipulating Classes
```javascript
// Add class
element.classList.add('active');

// Remove class
element.classList.remove('active');

// Toggle class
element.classList.toggle('active');

// Check if has class
if (element.classList.contains('active')) {
    // ...
}

// Add/remove multiple classes
element.classList.add('class1', 'class2', 'class3');

// Replace class
element.classList.replace('old-class', 'new-class');
```

### Inline Styles
```javascript
// Set single style
element.style.background = 'blue';
element.style.fontSize = '16px';
element.style.marginTop = '20px'; // camelCase for hyphenated properties

// Set multiple styles
Object.assign(element.style, {
    background: 'blue',
    fontSize: '16px',
    marginTop: '20px'
});

// Reset style
element.style.background = ''; // Reverts to CSS rules

// Get computed style (CSS + inline)
const computed = window.getComputedStyle(element);
console.log(computed.background);
console.log(computed.fontSize);
```

### Attribute Manipulation
```javascript
// Get attribute
const value = element.getAttribute('data-level');

// Set attribute
element.setAttribute('data-level', '90');

// Remove attribute
element.removeAttribute('data-level');

// Check if has attribute
if (element.hasAttribute('data-level')) {
    // ...
}

// Using dataset (for data-* attributes)
element.dataset.level = '90';              // Sets data-level="90"
const level = element.dataset.level;       // Gets "90"
delete element.dataset.level;              // Removes attribute
```

---

## Animation Patterns

### CSS Transitions with JavaScript
```javascript
// Trigger animation via CSS transition
element.addEventListener('click', () => {
    element.style.transition = 'all 0.3s ease';
    element.style.transform = 'translateX(100px)';
});
```

### CSS Animations with JavaScript
```javascript
// Trigger animation by adding class
element.classList.add('slide-in');

// Detect animation completion
element.addEventListener('animationend', () => {
    console.log('Animation finished!');
});

// Force animation restart
element.style.animation = 'none';
element.offsetHeight; // Trigger reflow
element.style.animation = 'slide-in 0.6s ease-out';
```

### requestAnimationFrame
```javascript
// Smooth 60fps animation
function animate() {
    element.style.left = `${position}px`;
    position += 5;
    
    if (position < 500) {
        requestAnimationFrame(animate);
    }
}

animate();

// Cancel animation
const animationId = requestAnimationFrame(animate);
cancelAnimationFrame(animationId);
```

---

## Observer APIs

### IntersectionObserver (Scroll-Triggered Actions)
```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Element is in viewport
            entry.target.classList.add('visible');
            
            // Optional: Stop observing after first intersection
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1  // Trigger when 10% visible
});

// Start observing
document.querySelectorAll('.skill-card').forEach(card => {
    observer.observe(card);
});

// Stop observing specific element
observer.unobserve(element);

// Stop observing all
observer.disconnect();
```

### MutationObserver (Watch DOM Changes)
```javascript
const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
            console.log('Children added/removed');
            console.log(mutation.addedNodes);
            console.log(mutation.removedNodes);
        }
        
        if (mutation.type === 'attributes') {
            console.log('Attribute changed:', mutation.attributeName);
        }
        
        if (mutation.type === 'characterData') {
            console.log('Text content changed');
        }
    });
});

observer.observe(element, {
    childList: true,        // Watch child additions/removals
    attributes: true,       // Watch attribute changes
    characterData: true,    // Watch text content
    subtree: true,         // Watch all descendants
    attributeFilter: ['class', 'style'] // Only watch specific attributes
});

observer.disconnect();
```

### ResizeObserver (Watch Element Size)
```javascript
const observer = new ResizeObserver((entries) => {
    entries.forEach(entry => {
        const { width, height } = entry.contentRect;
        console.log(`Element resized: ${width}x${height}`);
    });
});

observer.observe(element);
observer.disconnect();
```

---

## Best Practices

### 1. Query Elements Wisely
```javascript
// ❌ BAD: Query in loop
for (let i = 0; i < 1000; i++) {
    const item = document.querySelector('.item'); // Queries DOM every iteration!
}

// ✅ GOOD: Query once, reuse
const items = document.querySelectorAll('.item');
items.forEach(item => {
    // Use item
});
```

### 2. Use Event Delegation
```javascript
// ❌ BAD: Listener for every item
items.forEach(item => {
    item.addEventListener('click', handler);
});

// ✅ GOOD: Single listener on parent
parent.addEventListener('click', (e) => {
    if (e.target.matches('.item')) {
        handler(e);
    }
});
```

### 3. Batch DOM Operations
```javascript
// ❌ BAD: Multiple reflows
element.style.width = '100px';
element.style.height = '100px';
element.style.background = 'blue';

// ✅ GOOD: Single reflow
Object.assign(element.style, {
    width: '100px',
    height: '100px',
    background: 'blue'
});

// Or use classList for multiple classes
element.classList.add('large', 'colored', 'active');
```

### 4. Use textContent for User Input
```javascript
// ❌ INSECURE: XSS vulnerability
element.innerHTML = userInput;

// ✅ SAFE: Escapes HTML
element.textContent = userInput;
```

### 5. Clean Up Event Listeners
```javascript
// ✅ GOOD: Remove listeners when done
const handler = (e) => console.log(e);
element.addEventListener('click', handler);

// Later...
element.removeEventListener('click', handler);

// Or use { once: true } for single use
element.addEventListener('click', handler, { once: true });
```

### 6. Use Async When Possible
```javascript
// ✅ GOOD: Non-blocking operations
setTimeout(() => {
    // DOM update after current task
}, 0);

// Or better:
requestAnimationFrame(() => {
    // Synced with browser repaint
});
```

---

## Common Patterns

### Pattern 1: Render Component from Data
```javascript
function renderSkills(skillsData) {
    const container = document.getElementById('skills');
    container.innerHTML = ''; // Clear
    
    skillsData.forEach(skill => {
        const card = createSkillCard(skill);
        container.appendChild(card);
    });
}

function createSkillCard(skill) {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.innerHTML = `
        <h3>${skill.name}</h3>
        <p>${skill.level}%</p>
    `;
    return card;
}
```

### Pattern 2: Filter Elements
```javascript
function filterSkills(category) {
    document.querySelectorAll('.skill-card').forEach(card => {
        const skillCategory = card.dataset.category;
        card.style.display = skillCategory === category ? 'block' : 'none';
    });
}
```

### Pattern 3: Toggle State
```javascript
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('open');
    menu.setAttribute('aria-expanded', menu.classList.contains('open'));
}
```

### Pattern 4: Find Specific Element
```javascript
// Find parent with specific class
const parent = element.closest('.container');

// Find next sibling matching selector
const nextCard = element.nextElementSibling;

// Find previous sibling
const prevCard = element.previousElementSibling;

// Find all siblings
const siblings = Array.from(element.parentElement.children)
    .filter(child => child !== element);
```

---

## Summary

| Task | Method | Example |
|------|--------|---------|
| Find element | `querySelector()` | `document.querySelector('.skill')` |
| Find all | `querySelectorAll()` | `document.querySelectorAll('.skill')` |
| Create | `createElement()` | `document.createElement('div')` |
| Add to DOM | `appendChild()` | `parent.appendChild(child)` |
| Remove | `remove()` | `element.remove()` |
| Add class | `classList.add()` | `element.classList.add('active')` |
| Listen | `addEventListener()` | `element.addEventListener('click', fn)` |
| Animate | `style` + `transition` | `element.style.transform = 'rotate(45deg)'` |

---

## Additional Resources

- [MDN DOM Reference](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [JavaScript.info DOM](https://javascript.info/document)
- [Web APIs Documentation](https://developer.mozilla.org/en-US/docs/Web/API)

---

**Version**: 1.0  
**Last Updated**: May 2026
