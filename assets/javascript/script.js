// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Workout of the Day
    const workouts = [
        "30 minutes of HIIT",
        "45 minutes of Strength Training",
        "1 hour of Yoga",
        "20 minutes of Core Exercises",
        "40 minutes of Cardio"
    ];
    
    const workoutOfTheDay = document.getElementById('workout-of-the-day');
    const randomWorkout = workouts[Math.floor(Math.random() * workouts.length)];
    workoutOfTheDay.innerHTML += `<p>Today's workout: ${randomWorkout}</p>`;

    // Newsletter Signup
    const newsletterForm = document.getElementById('newsletter-signup');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing with: ${email}`);
        this.reset();
    });

    // Simple navigation highlight
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if(link.getAttribute('href') === currentPage) {
            link.style.textDecoration = 'underline';
        }
    });
});