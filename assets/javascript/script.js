document.addEventListener('DOMContentLoaded', function() {
    // Check and call functions only if the relevant elements exist
    if (document.querySelector('nav a')) {
        highlightCurrentPage();
    }

    if (document.getElementById('workout-of-the-day')) {
        try {
            setWorkoutOfTheDay();
        } catch (error) {
            console.log('Error setting workout of the day:', error);
        }
    }

    if (document.getElementById('newsletter-signup')) {
        setupNewsletterForm();
    }

    if (document.getElementById('bmi-form')) {
        setupBMICalculator();
    }

    if (document.getElementById('workout-form')) {
        setupWorkoutForm();
    }

    if (document.querySelectorAll('.faq-item')) {
        setupFAQToggle();
    }

    if (document.getElementById('calorie-form')) {
        setupCalorieForm();
    }

    if (document.getElementById('quiz-form')) {
        setupQuizForm();
    }

    if (document.getElementById('macro-form')) {
        setupMacroForm();
    }

    if (document.getElementById('hydration-form')) {
        setupHydrationForm();
    }

    if (document.querySelectorAll('.body-part')) {
        setupBodyPartSelector();
    }

    if (document.getElementById('user-name') && document.getElementById('quick-links')) {
        setupUserWelcome();
    }

    if (document.querySelectorAll('.goal-btn')) {
        setupGoalSelector();
    }

    if (document.getElementById('challenge-content')) {
        setupDailyChallenge();
    }

    if (document.getElementById('body-part-info')) {
        setupBodyPartInfo();
    }

    if (document.getElementById('start-quiz') && document.getElementById('quiz-container')) {
        setupFitnessQuiz();
    }

    if (document.getElementById('news-feed')) {
        populateNewsFeed();
    }

    if (document.getElementById('user-content')) {
        populateSpotlights();
    }

    if (document.getElementById('exercise-name') && document.getElementById('exercise-description')) {
        setExerciseOfTheDay();
    }

    if (document.getElementById('weather-info') && document.getElementById('workout-suggestion')) {
        updateWeatherBasedWorkout();
    }

    if (document.getElementById('user-badges') && document.getElementById('user-level')) {
        displayUserBadgesAndLevel();
    }

    if (document.getElementById('chatbot-toggle') && document.getElementById('chatbot-container') && document.getElementById('chatbot-close') && document.getElementById('chatbot-messages') && document.getElementById('user-input') && document.getElementById('send-message')) {
        setupChatbot();
    }
});

// Functions

function highlightCurrentPage() {
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.style.textDecoration = 'underline';
        }
    });
}

function setWorkoutOfTheDay() {
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
}

function setupNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-signup');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing with: ${email}`);
        this.reset();
    });
}

function setupBMICalculator() {
    document.getElementById('bmi-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const weight = document.getElementById('weight').value;
        const height = document.getElementById('height').value;
        const bmi = weight / ((height / 100) ** 2);
        document.getElementById('bmi-result').textContent = bmi.toFixed(1);
    });
}

function setupWorkoutForm() {
    document.getElementById('workout-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const exercise = document.getElementById('exercise').value;
        const sets = document.getElementById('sets').value;
        const reps = document.getElementById('reps').value;
        const workoutPlan = document.getElementById('workout-plan');
        const li = document.createElement('li');
        li.textContent = `${exercise} - ${sets} sets of ${reps} reps`;
        workoutPlan.appendChild(li);
        e.target.reset();
    });
}

function setupFAQToggle() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
}

function setupCalorieForm() {
    const calorieForm = document.getElementById('calorie-form');
    calorieForm.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateCalories();
    });
}

function calculateCalories() {
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activity = parseFloat(document.getElementById('activity').value);
    const bmr = gender === 'male' ? 
        88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age) : 
        447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    const calories = Math.round(bmr * activity);
    document.getElementById('calorie-value').textContent = calories;
    document.getElementById('calorie-result').classList.remove('hidden');
}

function setupQuizForm() {
    const quizForm = document.getElementById('quiz-form');
    quizForm.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateQuizResult();
    });
}

function calculateQuizResult() {
    const quizForm = document.getElementById('quiz-form');
    const scoreSpan = document.getElementById('score');
    const feedbackP = document.getElementById('feedback');
    const correctAnswers = { q1: 'd', q2: 'c', q3: 'b' };
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
    feedbackP.textContent = getQuizFeedback(score);
    document.getElementById('quiz-results').style.display = 'block';
}

function getQuizFeedback(score) {
    if (score === 3) return "Excellent! You're a nutrition expert!";
    if (score === 2) return "Good job! You know your nutrition basics.";
    if (score === 1) return "Not bad, but there's room for improvement.";
    return "Time to brush up on your nutrition knowledge!";
}

function setupMacroForm() {
    const macroForm = document.getElementById('macro-form');
    macroForm.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateMacros();
    });
}

function calculateMacros() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const activity = parseFloat(document.getElementById('activity').value);
    const goal = document.getElementById('goal').value;
    const bmr = gender === 'male' ? 
        88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age) : 
        447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    const tdee = bmr * activity;
    const calories = goal === 'lose' ? tdee - 500 : goal === 'gain' ? tdee + 500 : tdee;
    const protein = weight * 2.2;
    const fat = (calories * 0.25) / 9;
    const carbs = (calories - (protein * 4) - (fat * 9)) / 4;
    document.getElementById('calories').textContent = Math.round(calories);
    document.getElementById('protein').textContent = Math.round(protein);
    document.getElementById('carbs').textContent = Math.round(carbs);
    document.getElementById('fat').textContent = Math.round(fat);
    document.getElementById('macro-results').style.display = 'block';
}

function setupHydrationForm() {
    const hydrationForm = document.getElementById('hydration-form');
    hydrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const weight = document.getElementById('body-weight').value;
        const waterNeeded = (weight * 0.033).toFixed(2);
        document.getElementById('water-amount').textContent = waterNeeded;
        document.getElementById('water-recommendation').style.display = 'block';
    });
}

function setupBodyPartSelector() {
    const bodyParts = document.querySelectorAll('.body-part');
    const selectedPart = document.getElementById('selected-part');
    const stretchesDiv = document.getElementById('stretches');
    const stretches = {
        neck: [
            { name: 'Neck Rotation', instructions: 'Slowly rotate your head in a circular motion, 5 times clockwise and 5 times counterclockwise.', image: 'assets/images/stretches/neck-rotation.jpg' },
            { name: 'Neck Tilt', instructions: 'Tilt your head to one side, bringing your ear towards your shoulder. Hold for 15-30 seconds, then repeat on the other side.', image: 'assets/images/stretches/neck-tilt.jpg' }
        ],
        shoulders: [
            { name: 'Shoulder Rolls', instructions: 'Roll your shoulders forward 10 times, then backward 10 times.', image: 'assets/images/stretches/shoulder-rolls.jpg' },
            { name: 'Cross-Body Shoulder Stretch', instructions: 'Bring one arm across your chest, use the other arm to apply gentle pressure. Hold for 15-30 seconds, then switch arms.', image: 'assets/images/stretches/cross-body-shoulder.jpg' }
        ],
        back: [
            { name: 'Cat-Cow Stretch', instructions: 'On your hands and knees, alternate between arching your back (cow) and rounding your spine (cat). Repeat 10 times.', image: 'assets/images/stretches/cat-cow.jpg' },
            { name: 'Child\'s Pose', instructions: 'Kneel on the floor, sit back on your heels, then bend forward and stretch your arms out in front of you. Hold for 30 seconds.', image: 'assets/images/stretches/childs-pose.jpg' }
        ],
        arms: [
            { name: 'Tricep Stretch', instructions: 'Raise one arm overhead, bend at the elbow, and reach down your back. Use your other hand to gently push the elbow back. Hold for 15-30 seconds, then switch arms.', image: 'assets/images/stretches/tricep-stretch.jpg' },
            { name: 'Forearm Stretch', instructions: 'Extend one arm in front of you, palm down. Use your other hand to gently pull the fingers back. Hold for 15-30 seconds, then switch arms.', image: 'assets/images/stretches/forearm-stretch.jpg' }
        ],
        legs: [
            { name: 'Standing Quad Stretch', instructions: 'Stand on one leg, bring your heel towards your buttocks, and hold your foot with your hand. Hold for 15-30 seconds, then switch legs.', image: 'assets/images/stretches/quad-stretch.jpg' },
            { name: 'Seated Hamstring Stretch', instructions: 'Sit on the floor with one leg extended. Reach for your toes, keeping your back straight. Hold for 15-30 seconds, then switch legs.', image: 'assets/images/stretches/hamstring-stretch.jpg' }
        ]
    };
    bodyParts.forEach(part => {
        part.addEventListener('click', function() {
            const bodyPart = this.getAttribute('data-part');
            selectedPart.textContent = this.textContent + ' Stretches';
            displayStretches(bodyPart, stretches);
        });
    });
}

function displayStretches(bodyPart, stretches) {
    const stretchesDiv = document.getElementById('stretches');
    stretchesDiv.innerHTML = '';
    stretches[bodyPart].forEach(stretch => {
        const stretchElement = document.createElement('div');
        stretchElement.classList.add('stretch');
        stretchElement.innerHTML = `
            <h4>${stretch.name}</h4>
            <img src="${stretch.image}" alt="${stretch.name}">
            <p>${stretch.instructions}</p>
        `;
        stretchesDiv.appendChild(stretchElement);
    });
}

function setupUserWelcome() {
    const user = {
        name: "John",
        preferences: ["workout-plan", "nutrition-tracker", "progress-chart"]
    };
    const userNameSpan = document.getElementById('user-name');
    userNameSpan.textContent = user.name;
    const quickLinksContainer = document.getElementById('quick-links');
    const linkInfo = {
        "workout-plan": { text: "Your Workout Plan", url: "/workout-plan" },
        "nutrition-tracker": { text: "Nutrition Tracker", url: "/nutrition" },
        "progress-chart": { text: "View Progress", url: "/progress" },
        "community": { text: "Community Forum", url: "/community" },
        "challenges": { text: "Fitness Challenges", url: "/challenges" }
    };
    user.preferences.forEach(pref => {
        if (linkInfo[pref]) {
            const link = document.createElement('a');
            link.href = linkInfo[pref].url;
            link.textContent = linkInfo[pref].text;
            link.className = 'quick-link';
            quickLinksContainer.appendChild(link);
        }
    });
}

function setupGoalSelector() {
    const goalButtons = document.querySelectorAll('.goal-btn');
    const goalContent = document.getElementById('goal-specific-content');
    goalButtons.forEach(button => {
        button.addEventListener('click', function() {
            goalButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const goal = this.getAttribute('data-goal');
            displayGoalContent(goal, goalContent);
        });
    });
}

function displayGoalContent(goal, goalContent) {
    switch(goal) {
        case 'weight-loss':
            goalContent.innerHTML = '<h3>Weight Loss Plan</h3><p>Here\'s a customized plan to help you achieve your weight loss goals...</p>';
            break;
        case 'muscle-gain':
            goalContent.innerHTML = '<h3>Muscle Gain Strategy</h3><p>Follow this program to build muscle effectively...</p>';
            break;
        case 'endurance':
            goalContent.innerHTML = '<h3>Endurance Training</h3><p>Improve your stamina with this specialized endurance plan...</p>';
            break;
    }
    goalContent.style.display = 'block';
}

function setupDailyChallenge() {
    const challengeContent = document.getElementById('challenge-content');
    const completeButton = document.getElementById('complete-challenge');
    const challenges = [
        "Do 50 push-ups throughout the day",
        "Go for a 30-minute brisk walk",
        "Perform 100 bodyweight squats",
        "Do a 10-minute yoga session",
        "Plank for a total of 5 minutes throughout the day"
    ];
    setDailyChallenge(challengeContent, completeButton, challenges);
}

function setDailyChallenge(challengeContent, completeButton, challenges) {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('challengeDate');
    if (today !== storedDate) {
        const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
        challengeContent.textContent = randomChallenge;
        localStorage.setItem('challengeDate', today);
        localStorage.setItem('currentChallenge', randomChallenge);
        localStorage.setItem('challengeCompleted', 'false');
        updateButtonState(completeButton);
    } else {
        challengeContent.textContent = localStorage.getItem('currentChallenge');
        updateButtonState(completeButton);
    }
}

function updateButtonState(completeButton) {
    if (localStorage.getItem('challengeCompleted') === 'true') {
        completeButton.textContent = 'Completed!';
        completeButton.disabled = true;
    } else {
        completeButton.textContent = 'Mark as Completed';
        completeButton.disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const bodyParts = document.querySelectorAll('.body-part');
    const bodyPartInfo = document.getElementById('body-part-info');

    const exerciseInfo = {
        'head-front': 'Try neck rotations and facial exercises to relieve tension.',
        'neck-front': 'Gentle neck stretches and chin tucks can improve posture.',
        'chest': 'Push-ups, bench presses, and chest flies target this area.',
        'abs': 'Planks, crunches, and leg raises are great for core strength.',
        'left-arm-front': 'Bicep curls, hammer curls, and forearm exercises.',
        'right-arm-front': 'Tricep extensions, push-downs, and dips.',
        'left-leg-front': 'Squats, lunges, and leg presses target the front of the legs.',
        'right-leg-front': 'Leg extensions, calf raises, and plyometric exercises.',
        'head-back': 'Neck retractions and isometric holds can strengthen the back of the head and neck.',
        'neck-back': 'Neck extensions and shoulder shrugs target this area.',
        'upper-back': 'Rows, pull-ups, and lat pull-downs work the upper back muscles.',
        'lower-back': 'Deadlifts, back extensions, and good mornings strengthen the lower back.',
        'left-arm-back': 'Tricep kickbacks, reverse curls, and shoulder presses.',
        'right-arm-back': 'Bent-over rows, face pulls, and rear delt flies.',
        'left-leg-back': 'Deadlifts, hamstring curls, and glute bridges target the back of the legs.',
        'right-leg-back': 'Romanian deadlifts, hip thrusts, and step-ups work the posterior chain.'
    };

    bodyParts.forEach(part => {
        part.addEventListener('click', function() {
            const partId = this.id;
            displayBodyPartInfo(partId);
            highlightBodyPart(this);
        });
    });

    function displayBodyPartInfo(partId) {
        bodyPartInfo.textContent = exerciseInfo[partId] || 'Select a body part to see targeted exercises.';
    }

    function highlightBodyPart(part) {
        bodyParts.forEach(p => p.style.fill = '#e0e0e0');
        part.style.fill = '#3498db';
    }
});

function setupFitnessQuiz() {
    const startQuizBtn = document.getElementById('start-quiz');
    const quizContainer = document.getElementById('quiz-container');
    const quizQuestions = [
        {
            question: "How often do you exercise?",
            options: ["Rarely", "1-2 times a week", "3-4 times a week", "5+ times a week"]
        },
        {
            question: "How long can you jog without stopping?",
            options: ["Less than 5 minutes", "5-15 minutes", "15-30 minutes", "More than 30 minutes"]
        },
        {
            question: "How many push-ups can you do in one go?",
            options: ["0-5", "6-10", "11-20", "More than 20"]
        }
    ];
    startQuizBtn.addEventListener('click', function() {
        this.style.display = 'none';
        quizContainer.style.display = 'block';
        populateQuiz(quizQuestions);
    });
}

function populateQuiz(quizQuestions) {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';
    quizQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('quiz-question');
        questionDiv.innerHTML = `
            <h3>Question ${index + 1}: ${q.question}</h3>
            <div class="quiz-options">
                ${q.options.map(option => `<button class="quiz-option">${option}</button>`).join('')}
            </div>
        `;
        quizContainer.appendChild(questionDiv);
    });
    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Submit Quiz';
    submitBtn.id = 'submit-quiz';
    submitBtn.style.cssText = 'margin-top: 20px;';
    quizContainer.appendChild(submitBtn);
    addQuizListeners();
}

function addQuizListeners() {
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.addEventListener('click', function() {
            this.parentNode.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    document.getElementById('submit-quiz').addEventListener('click', calculateFitnessResult);
}

function calculateFitnessResult() {
    const selectedOptions = document.querySelectorAll('.quiz-option.selected');
    let score = 0;
    selectedOptions.forEach((option, index) => {
        score += option.parentNode.querySelectorAll('.quiz-option').length - Array.from(option.parentNode.children).indexOf(option);
    });
    displayFitnessResult(score);
}

function displayFitnessResult(score) {
    const quizContainer = document.getElementById('quiz-container');
    const resultDiv = document.createElement('div');
    resultDiv.id = 'quiz-result';
    let fitnessLevel;
    if (score < 5) fitnessLevel = "Beginner";
    else if (score < 8) fitnessLevel = "Intermediate";
    else fitnessLevel = "Advanced";
    resultDiv.innerHTML = `
        <h3>Your Fitness Level: ${fitnessLevel}</h3>
        <p>Based on your answers, you're at a ${fitnessLevel.toLowerCase()} fitness level. Keep up the good work and check out our personalized workout plans to improve further!</p>
    `;
    quizContainer.appendChild(resultDiv);
}

function populateNewsFeed() {
    const newsFeed = document.getElementById('news-feed');
    const newsItems = [
        {
            title: "New Study Shows Benefits of High-Intensity Interval Training",
            excerpt: "Research indicates that HIIT can improve cardiovascular health and burn calories more efficiently.",
            image: "assets/images/news/hiit-training.jpg",
            link: "#"
        },
        {
            title: "The Rise of Plant-Based Diets in Athletic Performance",
            excerpt: "More athletes are turning to plant-based diets to enhance their performance and recovery.",
            image: "assets/images/news/plant-based-diet.jpg",
            link: "#"
        },
        {
            title: "Mindfulness and Exercise: The Perfect Combination for Mental Health",
            excerpt: "Experts suggest combining mindfulness practices with regular exercise for optimal mental well-being.",
            image: "assets/images/news/mindfulness-exercise.jpg",
            link: "#"
        }
    ];
    newsItems.forEach(item => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');
        newsItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="news-content">
                <h3 class="news-title">${item.title}</h3>
                <p class="news-excerpt">${item.excerpt}</p>
                <a href="${item.link}" class="news-link">Read More</a>
            </div>
        `;
        newsFeed.appendChild(newsItem);
    });
}

function populateSpotlights() {
    const userContent = document.getElementById('user-content');
    const spotlights = [
        {
            user: "JohnDoe",
            image: "assets/images/community/john-progress.jpg",
            achievement: "Lost 20 lbs in 3 months",
            description: "Through consistent workouts and a balanced diet, I achieved my weight loss goal!",
            likes: 152
        },
        {
            user: "FitnessFanatic",
            image: "assets/images/community/marathon-finish.jpg",
            achievement: "Completed first marathon",
            description: "After months of training, I finally crossed that finish line. Dreams do come true!",
            likes: 304
        },
        {
            user: "YogaLover",
            image: "assets/images/community/yoga-pose.jpg",
            achievement: "Mastered the headstand",
            description: "It took weeks of practice, but I finally nailed this challenging yoga pose!",
            likes: 89
        }
    ];
    spotlights.forEach(item => {
        const spotlightItem = document.createElement('div');
        spotlightItem.classList.add('spotlight-item');
        spotlightItem.innerHTML = `
            <img src="${item.image}" alt="${item.achievement}" class="spotlight-image">
            <div class="spotlight-content">
                <p class="spotlight-user">@${item.user}</p>
                <h3 class="spotlight-achievement">${item.achievement}</h3>
                <p class="spotlight-description">${item.description}</p>
                <p class="spotlight-likes"><i class="fas fa-heart"></i> ${item.likes} likes</p>
            </div>
        `;
        userContent.appendChild(spotlightItem);
    });
}

function setExerciseOfTheDay() {
    const exercises = [
        {
            name: "Jumping Jacks",
            description: "A full-body exercise that increases heart rate and improves coordination."
        },
        {
            name: "Push-ups",
            description: "Builds upper body strength, targeting chest, shoulders, and triceps."
        },
        {
            name: "Squats",
            description: "Strengthens lower body muscles including quadriceps, hamstrings, and glutes."
        }
    ];
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('exerciseDate');
    if (today !== storedDate) {
        const randomExercise = exercises[Math.floor(Math.random() * exercises.length)];
        document.getElementById('exercise-name').textContent = randomExercise.name;
        document.getElementById('exercise-description').textContent = randomExercise.description;
        localStorage.setItem('exerciseDate', today);
        localStorage.setItem('currentExercise', JSON.stringify(randomExercise));
    } else {
        const currentExercise = JSON.parse(localStorage.getItem('currentExercise'));
        document.getElementById('exercise-name').textContent = currentExercise.name;
        document.getElementById('exercise-description').textContent = currentExercise.description;
    }
}

async function updateWeatherBasedWorkout() {
    const weatherData = await getWeatherData();
    if (weatherData) {
        const workout = suggestWorkout(weatherData);
        updateWeatherWorkout(weatherData, workout);
    }
}

async function getWeatherData() {
    const apiKey = 'bd5e378503939ddaee76f12ad7a97608';
    const city = 'New York';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function suggestWorkout(weatherData) {
    const temp = weatherData.main.temp;
    const condition = weatherData.weather[0].main.toLowerCase();
    let suggestion = '';
    let exercises = [];
    if (temp < 10) {
        suggestion = "It's cold outside! Consider an indoor workout to stay warm.";
        exercises = ['Bodyweight circuit training', 'Indoor cycling', 'Yoga'];
    } else if (temp > 30) {
        suggestion = "It's hot out there! Try a water-based workout or exercise in a cool environment.";
        exercises = ['Swimming', 'Water aerobics', 'Indoor gym session'];
    } else if (condition.includes('rain') || condition.includes('snow')) {
        suggestion = "Wet weather alert! Opt for an indoor workout or proper gear if heading outside.";
        exercises = ['Treadmill running', 'Indoor HIIT session', 'Home workout with online video'];
    } else {
        suggestion = "Great weather for outdoor activities!";
        exercises = ['Jogging in the park', 'Outdoor bodyweight exercises', 'Cycling'];
    }
    return { suggestion, exercises };
}

function updateWeatherWorkout(weatherData, workout) {
    const weatherInfo = document.getElementById('weather-info');
    const workoutSuggestion = document.getElementById('workout-suggestion');
    weatherInfo.innerHTML = `
        <img id="weather-icon" src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png" alt="${weatherData.weather[0].description}">
        <span id="weather-description">${weatherData.main.temp}°C, ${weatherData.weather[0].description}</span>
    `;
    workoutSuggestion.innerHTML = `
        <h3>Today's Workout Suggestion</h3>
        <p>${workout.suggestion}</p>
        <ul>
            ${workout.exercises.map(exercise => `<li>${exercise}</li>`).join('')}
        </ul>
    `;
}

function displayUserBadgesAndLevel() {
    const userBadges = document.getElementById('user-badges');
    const userLevel = document.getElementById('user-level');
    const userData = {
        level: 5,
        experience: 2500,
        nextLevelExperience: 3000,
        badges: [
            { icon: '🏃', name: 'Runner', unlocked: true },
            { icon: '🏋️', name: 'Weight Lifter', unlocked: true },
            { icon: '🧘', name: 'Yogi', unlocked: false },
            { icon: '🚴', name: 'Cyclist', unlocked: true },
            { icon: '🏊', name: 'Swimmer', unlocked: false }
        ]
    };
    displayBadges(userBadges, userData.badges);
    displayLevel(userLevel, userData);
}

function displayBadges(userBadges, badges) {
    badges.forEach(badge => {
        const badgeElement = document.createElement('div');
        badgeElement.classList.add('badge');
        if (!badge.unlocked) {
            badgeElement.classList.add('locked');
        }
        badgeElement.innerHTML = badge.icon;
        badgeElement.title = badge.name + (badge.unlocked ? ' (Unlocked)' : ' (Locked)');
        userBadges.appendChild(badgeElement);
    });
}

function displayLevel(userLevel, userData) {
    const progressPercentage = (userData.experience / userData.nextLevelExperience) * 100;
    userLevel.innerHTML = `
        <div id="level-info">
            <span id="current-level">Level ${userData.level}</span>
            <span>${userData.experience} / ${userData.nextLevelExperience} XP</span>
        </div>
        <div id="progress-bar">
            <div id="progress" style="width: ${progressPercentage}%"></div>
        </div>
    `;
}

function setupChatbot() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const userInput = document.getElementById('user-input');
    const sendMessage = document.getElementById('send-message');

    chatbotToggle.addEventListener('click', function() {
        chatbotContainer.style.display = 'flex';
        chatbotToggle.style.display = 'none';
    });

    chatbotClose.addEventListener('click', function() {
        chatbotContainer.style.display = 'none';
        chatbotToggle.style.display = 'block';
    });

    sendMessage.addEventListener('click', sendUserMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });

    function sendUserMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage('user', message);
            userInput.value = '';
            setTimeout(() => {
                const botResponse = getBotResponse(message);
                addMessage('bot', botResponse);
            }, 500);
        }
    }

    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add(`${sender}-message`);
        messageElement.textContent = message;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function getBotResponse(message) {
        message = message.toLowerCase();
        if (message.includes('hello') || message.includes('hi')) {
            return "Hello! How can I assist you with your fitness journey today?";
        } else if (message.includes('workout')) {
            return "Great! I can help you with workout plans. What type of workout are you interested in? Cardio, strength training, or flexibility?";
        } else if (message.includes('diet') || message.includes('nutrition')) {
            return "Nutrition is key to fitness! Would you like some tips on healthy eating or a specific diet plan?";
        } else {
            return "I'm sorry, I didn't quite understand that. Could you please rephrase or ask about workouts, diet, or general fitness tips?";
        }
    }
}
