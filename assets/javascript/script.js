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

document.addEventListener('DOMContentLoaded', function() {
    const calorieForm = document.getElementById('calorie-form');
    const calorieResult = document.getElementById('calorie-result');
    const calorieValue = document.getElementById('calorie-value');

    calorieForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const age = parseInt(document.getElementById('age').value);
        const gender = document.getElementById('gender').value;
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        const activity = parseFloat(document.getElementById('activity').value);

        let bmr;
        if (gender === 'male') {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }

        const calories = Math.round(bmr * activity);

        calorieValue.textContent = calories;
        calorieResult.classList.remove('hidden');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const quizForm = document.getElementById('quiz-form');
    const quizResults = document.getElementById('quiz-results');
    const scoreSpan = document.getElementById('score');
    const feedbackP = document.getElementById('feedback');

    const correctAnswers = {
        q1: 'd',
        q2: 'c',
        q3: 'b'
    };

    quizForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let score = 0;
        const userAnswers = {
            q1: quizForm.q1.value,
            q2: quizForm.q2.value,
            q3: quizForm.q3.value
        };

        for (let question in userAnswers) {
            if (userAnswers[question] === correctAnswers[question]) {
                score++;
            }
        }

        scoreSpan.textContent = `${score} out of 3`;
        
        let feedback;
        if (score === 3) {
            feedback = "Excellent! You're a nutrition expert!";
        } else if (score === 2) {
            feedback = "Good job! You know your nutrition basics.";
        } else if (score === 1) {
            feedback = "Not bad, but there's room for improvement.";
        } else {
            feedback = "Time to brush up on your nutrition knowledge!";
        }
        
        feedbackP.textContent = feedback;
        quizResults.style.display = 'block';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const macroForm = document.getElementById('macro-form');
    const macroResults = document.getElementById('macro-results');

    macroForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        const age = parseInt(document.getElementById('age').value);
        const gender = document.getElementById('gender').value;
        const activity = parseFloat(document.getElementById('activity').value);
        const goal = document.getElementById('goal').value;

        // Calculate BMR
        let bmr;
        if (gender === 'male') {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }

        // Calculate TDEE (Total Daily Energy Expenditure)
        let tdee = bmr * activity;

        // Adjust calories based on goal
        let calories;
        switch(goal) {
            case 'lose':
                calories = tdee - 500;
                break;
            case 'gain':
                calories = tdee + 500;
                break;
            default:
                calories = tdee;
        }

        // Calculate macros
        const protein = weight * 2.2; // 1g per lb of body weight
        const fat = (calories * 0.25) / 9; // 25% of calories from fat
        const carbs = (calories - (protein * 4) - (fat * 9)) / 4;

        // Display results
        document.getElementById('calories').textContent = Math.round(calories);
        document.getElementById('protein').textContent = Math.round(protein);
        document.getElementById('carbs').textContent = Math.round(carbs);
        document.getElementById('fat').textContent = Math.round(fat);

        macroResults.style.display = 'block';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const hydrationForm = document.getElementById('hydration-form');
    const waterRecommendation = document.getElementById('water-recommendation');
    const waterAmount = document.getElementById('water-amount');

    hydrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const weight = document.getElementById('body-weight').value;
        const waterNeeded = (weight * 0.033).toFixed(2);  // 33 ml per kg of body weight
        waterAmount.textContent = waterNeeded;
        waterRecommendation.style.display = 'block';
    });
});