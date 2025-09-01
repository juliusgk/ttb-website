console.log("script.js is linked!");

// 
// NAVBAR CODE
// -----------------------------------------------------------

// const triggerZone = document.getElementById('triggerZone');
const navbar = document.getElementById('navbar');
const SHOW_THRESHOLD = 50; // Distance from top to show navbar
const HIDE_THRESHOLD = 100; // Distance from top to hide navbar
const HIDE_DELAY = 300; // Delay before hiding navbar
let hideTimeout;
let lastScrollTop = 0;

console.log(navbar);
// Show navbar function
function showNavbar() {
    clearTimeout(hideTimeout);
    // navbar.classList.add('show');
    navbar.style.top = '0'; // Slide down
}

// Hide navbar with delay function
function hideNavbar() {
    hideTimeout = setTimeout(() => {
        navbar.style.top = '-60px'; // Slide up
    }, HIDE_DELAY); // 300ms delay before hiding
}

// Debounced mousemove handler
let lastMouseMove = 0;
document.addEventListener('mousemove', (e) => {
    console.log(`Mouse Y: ${e.clientY}`);
    const now = Date.now();
    if (now - lastMouseMove < 100) return; // Throttle to every 100ms
    lastMouseMove = now;

    if (e.clientY <= SHOW_THRESHOLD) {
        showNavbar();
    } else if (e.clientY > HIDE_THRESHOLD) {
        hideNavbar();
    }
});

// Keep navbar visible when hovering over it
navbar.addEventListener('mouseenter', () => {
    clearTimeout(hideTimeout);
    navbar.classList.add('show');
});

navbar.addEventListener('mouseleave', () => {
    hideNavbar();
});

// Optional: Show navbar on scroll up (bonus feature)
window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // If scrolling up near the top, show navbar briefly
    if (scrollTop < lastScrollTop) {
        showNavbar();
    } else if (scrollTop > lastScrollTop + 50) {
        hideNavbar();
    }
    
    lastScrollTop = scrollTop;
});

// Mobile touch support
let touchStartY = 0;
document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) => {
    const touchY = e.touches[0].clientY;
    const deltaY = touchY - touchStartY;
    
    // Show navbar on downward swipe from top of screen
    if (touchStartY < 50 && deltaY > 30) {
        showNavbar();
    }
});

//
//Pop-Up Form
// -----------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start_button'); // Assuming you have an "open" button
    const applyButton = document.getElementById('apply_button');
    const closeButton = document.getElementById('close_icon');
    const submitButton = document.getElementById('submit_button');
    const popupContainer = document.getElementById('pop_up');
    const popupOverlay = document.querySelector('.popup_overlay');
    const form = document.getElementById('contact_form');
  
    // Open popup on button click
    if (startButton) {
      startButton.addEventListener('click', function() {
        popupContainer.classList.add('active');
        popupOverlay.classList.add('active');
      });
    }
    if (applyButton) {
        applyButton.addEventListener('click', function() {
          popupContainer.classList.add('active');
          popupOverlay.classList.add('active');
        });
    }
  
    //close popup on close icon or submit button click
    closeButton.addEventListener('click', function() {
      popupContainer.classList.remove('active');
      popupOverlay.classList.remove('active');
    });

    // submitButton.addEventListener('click', function() {
    //     popupContainer.classList.remove('active');
    //     popupOverlay.classList.remove('active');
    // });

    if (submitButton && form){
        submitButton.addEventListener('click', function(e){
            e.preventDefault();

            const formData = new FormData(form);
            fetch('https://script.google.com/macros/s/AKfycbzFES9ek1YPawSQwW0CRfWZruGdYj9pJ7NEOIw25kcBW0lsBK-xUc4zedb-cn-nCcXt/exec',{
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    console.log('Form submitted successfully');
                    popupContainer.classList.remove('active');
                    popupOverlay.classList.remove('active');
                } else {
                    console.error('Submission failed:', data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }
});
    // const formData = new FormData(this);
    
    // fetch('https://script.google.com/macros/s/AKfycbzFES9ek1YPawSQwW0CRfWZruGdYj9pJ7NEOIw25kcBW0lsBK-xUc4zedb-cn-nCcXt/exec', {
    //     method: 'POST',
    //     body: formData
    // })
    // .then(response => response.json())
    // .then(data => {
    //     if (data.status === 'success') {
    //         // Your existing success logic
    //         console.log('Form submitted successfully');
    //         // Close popup, show thank you message, etc.
    //     } else {
    //         console.error('Submission failed:', data.message);
    //     }
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    // });


// 
// Dropdown functionality 
// ----------------------------------------------------------- 
function dropdown(button) {
    var textElement = button.nextElementSibling;
    if (textElement.style.display === "none") {
    textElement.style.display = "block";
    } else {
    textElement.style.display = "none";
    }
}  

