// Simple navigation highlight
const currentPage = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    if(link.getAttribute('href') === currentPage) {
        link.style.textDecoration = 'underline';
    }
});

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

// BMI Calculator
function calculateBMI() {
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const bmi = weight / ((height / 100) ** 2);
    document.getElementById('bmi-result').textContent = bmi.toFixed(1);
}

document.getElementById('bmi-form').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateBMI();
});

function addExercise(e) {
    e.preventDefault();
    const exercise = document.getElementById('exercise').value;
    const sets = document.getElementById('sets').value;
    const reps = document.getElementById('reps').value;
    const workoutPlan = document.getElementById('workout-plan');
    const li = document.createElement('li');
    li.textContent = `${exercise} - ${sets} sets of ${reps} reps`;
    workoutPlan.appendChild(li);
    e.target.reset();
}

document.getElementById('workout-form').addEventListener('submit', addExercise);

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
});