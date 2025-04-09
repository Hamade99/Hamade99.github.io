// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements when they come into view
    animateOnScroll();
    
    // Initialize skill progress bars
    initSkillBars();
    
    // Initialize typewriter effect
    initTypewriter();
    
    // Initialize project filtering
    initProjectFilter();
    
    // Initialize smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Initialize mobile menu toggle
    initMobileMenu();
    
    // Initialize modal functionality
    initModals();
    
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize form submission
    initFormSubmission();
});

// Animate elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize skill progress bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = `${progress}%`;
            }
        });
    }, {
        threshold: 0.1
    });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Initialize typewriter effect
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter-text');
    const phrases = [
        'Data Scientist',
        'AI Researcher',
        'Machine Learning Engineer',
        'Origami Enthusiast',
        'Continuous Learner'
    ];
    
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typewriterTimeout;
    
    function typeEffect() {
        const currentPhrase = phrases[currentPhraseIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex);
            currentCharIndex--;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex);
            currentCharIndex++;
        }
        
        let typingSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1000; // Pause at the end
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before the next phrase
        }
        
        typewriterTimeout = setTimeout(typeEffect, typingSpeed);
    }
    
    typeEffect();
}

// Initialize project filtering
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'flex';
                } else {
                    const categories = card.getAttribute('data-category').split(' ');
                    if (categories.includes(filter)) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Initialize smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, .footer-link, .scroll-down a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                    if (navLink.getAttribute('href') === targetId) {
                        navLink.classList.add('active');
                    }
                });
                
                // Scroll to target element
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for navbar height
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
                
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize mobile menu toggle
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Initialize modal functionality
function initModals() {
    const modalButtons = document.querySelectorAll('.open-modal');
    const projectButtons = document.querySelectorAll('.view-details');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Open modal when clicking on "Add More" buttons
    modalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });
    
    // Open project details modal
    projectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const modal = document.getElementById(`project-details-${projectId}`);
            
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });
    
    // Close modal when clicking on close button
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
        });
    });
    
    // Close modal when clicking outside of modal content
    window.addEventListener('click', function(e) {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Handle form submissions in modals
    const aboutForm = document.querySelector('.save-about');
    const educationForm = document.querySelector('.save-education');
    const experienceForm = document.querySelector('.save-experience');
    const skillForm = document.querySelector('.save-skill');
    const projectForm = document.querySelector('.save-project');
    const interestForm = document.querySelector('.save-interest');
    
    if (aboutForm) {
        aboutForm.addEventListener('click', function() {
            const additionalBio = document.getElementById('additional-bio').value;
            
            if (additionalBio.trim() !== '') {
                const aboutContent = document.querySelector('.about-content');
                const newParagraph = document.createElement('p');
                newParagraph.textContent = additionalBio;
                aboutContent.insertBefore(newParagraph, aboutContent.querySelector('.add-more-btn'));
                
                // Close the modal
                document.getElementById('about-modal').style.display = 'none';
                
                // Clear the textarea
                document.getElementById('additional-bio').value = '';
            }
        });
    }
    
    if (educationForm) {
        educationForm.addEventListener('click', function() {
            const title = document.getElementById('edu-title').value;
            const institution = document.getElementById('edu-institution').value;
            const date = document.getElementById('edu-date').value;
            const description = document.getElementById('edu-description').value;
            
            if (title.trim() !== '' && institution.trim() !== '') {
                const timeline = document.querySelector('.timeline');
                
                const newEducation = document.createElement('div');
                newEducation.className = 'timeline-item animate-on-scroll is-visible';
                newEducation.innerHTML = `
                    <div class="timeline-dot"></div>
                    <div class="timeline-date">${date}</div>
                    <div class="timeline-content">
                        <h3>${title}</h3>
                        <h4>${institution}</h4>
                        <p>${description}</p>
                    </div>
                `;
                
                timeline.insertBefore(newEducation, document.querySelector('.add-more-btn'));
                
                // Close the modal
                document.getElementById('education-modal').style.display = 'none';
                
                // Clear the form
                document.getElementById('edu-title').value = '';
                document.getElementById('edu-institution').value = '';
                document.getElementById('edu-date').value = '';
                document.getElementById('edu-description').value = '';
            }
        });
    }
    
    if (experienceForm) {
        experienceForm.addEventListener('click', function() {
            const title = document.getElementById('exp-title').value;
            const company = document.getElementById('exp-company').value;
            const date = document.getElementById('exp-date').value;
            const description = document.getElementById('exp-description').value;
            
            if (title.trim() !== '' && company.trim() !== '') {
                const experienceGrid = document.querySelector('.experience-grid');
                
                const newExperience = document.createElement('div');
                newExperience.className = 'experience-card animate-on-scroll is-visible';
                newExperience.innerHTML = `
                    <div class="experience-icon">
                        <i class="fas fa-briefcase"></i>
                    </div>
                    <div class="experience-content">
                        <h3>${title}</h3>
                        <h4>${company}</h4>
                        <div class="experience-date">${date}</div>
                        <p>${description}</p>
                    </div>
                `;
                
                experienceGrid.appendChild(newExperience);
                
                // Close the modal
                document.getElementById('experience-modal').style.display = 'none';
                
                // Clear the form
                document.getElementById('exp-title').value = '';
                document.getElementById('exp-company').value = '';
                document.getElementById('exp-date').value = '';
                document.getElementById('exp-description').value = '';
            }
        });
    }
    
    if (skillForm) {
        skillForm.addEventListener('click', function() {
            const category = document.getElementById('skill-category').value;
            const name = document.getElementById('skill-name').value;
            const level = document.getElementById('skill-level').value;
            
            if (name.trim() !== '') {
                const skillsGrid = document.querySelector('.skills-grid');
                
                if (category === 'language') {
                    // Find the programming languages category
                    const languageCategory = document.querySelector('.skills-category:nth-child(1)');
                    const skillBars = languageCategory.querySelector('.skill-bars');
                    
                    const newSkill = document.createElement('div');
                    newSkill.className = 'skill-item';
                    newSkill.innerHTML = `
                        <div class="skill-label">${name}</div>
                        <div class="skill-bar">
                            <div class="skill-progress" data-progress="${level}" style="width: ${level}%"></div>
                        </div>
                    `;
                    
                    skillBars.appendChild(newSkill);
                } else {
                    // Find the appropriate category for frameworks, tools, or soft skills
                    let targetCategory;
                    if (category === 'framework') {
                        targetCategory = document.querySelector('.skills-category:nth-child(2)');
                    } else if (category === 'tool') {
                        targetCategory = document.querySelector('.skills-category:nth-child(3)');
                    } else if (category === 'soft') {
                        targetCategory = document.querySelector('.skills-category:nth-child(4)');
                    }
                    
                    if (targetCategory) {
                        const skillTags = targetCategory.querySelector('.skill-tags');
                        
                        const newSkillTag = document.createElement('span');
                        newSkillTag.className = 'skill-tag';
                        newSkillTag.textContent = name;
                        
                        skillTags.appendChild(newSkillTag);
                    }
                }
                
                // Close the modal
                document.getElementById('skills-modal').style.display = 'none';
                
                // Clear the form
                document.getElementById('skill-name').value = '';
                document.getElementById('skill-level').value = '50';
                document.querySelector('.skill-level-value').textContent = '50%';
            }
        });
        
        // Update skill level display
        const skillLevelInput = document.getElementById('skill-level');
        const skillLevelValue = document.querySelector('.skill-level-value');
        
        skillLevelInput.addEventListener('input', function() {
            skillLevelValue.textContent = `${this.value}%`;
        });
        
        // Show/hide skill level based on category
        const skillCategorySelect = document.getElementById('skill-category');
        const skillLevelGroup = document.querySelector('.skill-level-group');
        
        skillCategorySelect.addEventListener('change', function() {
            if (this.value === 'language') {
                skillLevelGroup.style.display = 'block';
            } else {
                skillLevelGroup.style.display = 'none';
            }
        });
    }
    
    if (projectForm) {
        projectForm.addEventListener('click', function() {
            const title = document.getElementById('project-title').value;
            const categories = document.getElementById('project-categories').value;
            const description = document.getElementById('project-description').value;
            const tags = document.getElementById('project-tags').value;
            
            if (title.trim() !== '' && description.trim() !== '') {
                const projectsGrid = document.querySelector('.projects-grid');
                
                const categoryClasses = categories.split(',').map(cat => cat.trim()).join(' ');
                const tagElements = tags.split(',').map(tag => `<span class="project-tag">${tag.trim()}</span>`).join('');
                
                const newProject = document.createElement('div');
                newProject.className = 'project-card animate-on-scroll is-visible';
                newProject.setAttribute('data-category', categoryClasses);
                newProject.innerHTML = `
                    <div class="project-img">
                        <div class="project-img-placeholder">
                            <i class="fas fa-code"></i>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3>${title}</h3>
                        <p>${description}</p>
                        <div class="project-tags">
                            ${tagElements}
                        </div>
                        <div class="project-actions">
                            <button class="btn btn-secondary">View Details</button>
                        </div>
                    </div>
                `;
                
                projectsGrid.appendChild(newProject);
                
                // Close the modal
                document.getElementById('projects-modal').style.display = 'none';
                
                // Clear the form
                document.getElementById('project-title').value = '';
                document.getElementById('project-categories').value = '';
                document.getElementById('project-description').value = '';
                document.getElementById('project-tags').value = '';
            }
        });
    }
    
    if (interestForm) {
        interestForm.addEventListener('click', function() {
            const name = document.getElementById('interest-name').value;
            const icon = document.getElementById('interest-icon').value;
            const description = document.getElementById('interest-description').value;
            
            if (name.trim() !== '' && description.trim() !== '') {
                const interestsGrid = document.querySelector('.interests-grid');
                
                const newInterest = document.createElement('div');
                newInterest.className = 'interest-card animate-on-scroll is-visible';
                newInterest.innerHTML = `
                    <div class="interest-icon">
                        <i class="fas ${icon || 'fa-star'}"></i>
                    </div>
                    <h3>${name}</h3>
                    <p>${description}</p>
                `;
                
                interestsGrid.appendChild(newInterest);
                
                // Close the modal
                document.getElementById('interests-modal').style.display = 'none';
                
                // Clear the form
                document.getElementById('interest-name').value = '';
                document.getElementById('interest-icon').value = '';
                document.getElementById('interest-description').value = '';
            }
        });
    }
}

// Initialize theme toggle
function initThemeToggle() {
    const themeSwitch = document.getElementById('theme-switch');
    
    // Check for saved theme preference or use user's system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (savedTheme === null && prefersDarkMode)) {
        document.body.classList.add('dark-mode');
        themeSwitch.checked = true;
    }
    
    // Theme toggle event listener
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Initialize form submission
function initFormSubmission() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Show success message (in a real implementation, you would send this data to a server)
            alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon.`);
            
            // Clear the form
            contactForm.reset();
        });
    }
}
