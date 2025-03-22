document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded'); // Debug

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme') || 'light-mode';
    body.classList.add(currentTheme);
    themeToggle.textContent = currentTheme === 'light-mode' ? 'Dark Mode' : 'Light Mode';

    themeToggle?.addEventListener('click', function() {
        if (body.classList.contains('light-mode')) {
            body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            themeToggle.textContent = 'Light Mode';
        } else {
            body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light-mode');
            themeToggle.textContent = 'Dark Mode';
        }
    });

    // Login Logic
    const loginForm = document.getElementById('login-form');
    loginForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const error = document.getElementById('error');

        if (username === 'admin' && password === 'xyz123') {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', 'admin');
            window.location.href = 'create.html';
        } else {
            error.textContent = 'Invalid username or password';
        }
    });

    window.logout = function() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    };

    if (!localStorage.getItem('isLoggedIn') && window.location.pathname.endsWith('.html') && !window.location.pathname.endsWith('login.html')) {
        window.location.href = 'login.html';
    }

    // Quiz Creation Logic
    const quizForm = document.getElementById('quiz-form');
    const questionsContainer = document.getElementById('questions-container');
    const addQuestionBtn = document.getElementById('add-question');

    let questionCount = 0;

    function addQuestion() {
        questionCount++;
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <h3>Question ${questionCount}</h3>
            <label>Question Text:</label>
            <input type="text" class="question-text" placeholder="Enter question" required>
            <label>Options:</label>
            <input type="text" class="option" placeholder="Option 1" required>
            <input type="text" class="option" placeholder="Option 2" required>
            <input type="text" class="option" placeholder="Option 3" required>
            <input type="text" class="option" placeholder="Option 4" required>
            <label>Correct Answer (1-4):</label>
            <input type="number" class="correct-answer" min="1" max="4" required>
        `;
        questionsContainer?.appendChild(questionDiv);
    }

    if (questionsContainer) addQuestion();

    addQuestionBtn?.addEventListener('click', addQuestion);

    quizForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        const quizTitle = document.getElementById('quiz-title').value;
        const quizCategory = document.getElementById('quiz-category').value;
        const quizTime = parseInt(document.getElementById('quiz-time').value);
        const questions = [];
        
        document.querySelectorAll('.question').forEach((q) => {
            const questionText = q.querySelector('.question-text').value;
            const options = Array.from(q.querySelectorAll('.option')).map(opt => opt.value);
            const correctAnswer = parseInt(q.querySelector('.correct-answer').value) - 1;
            questions.push({ text: questionText, options, correctAnswer });
        });

        const quiz = {
            title: quizTitle,
            category: quizCategory,
            timeLimit: quizTime,
            questions,
            creator: localStorage.getItem('currentUser'),
            createdAt: new Date().toISOString()
        };
        let quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
        quizzes.push(quiz);
        localStorage.setItem('quizzes', JSON.stringify(quizzes));

        document.getElementById('message').textContent = 'Quiz saved successfully!';
        quizForm.reset();
        questionsContainer.innerHTML = '';
        addQuestion();
    });

    // Quiz Taking Logic
    const quizList = document.getElementById('quiz-list');
    const quizContainer = document.getElementById('quiz-container');
    const questionContainer = document.getElementById('question-container');
    const submitQuizBtn = document.getElementById('submit-quiz');
    const scoreDisplay = document.getElementById('score');
    const backToListBtn = document.getElementById('back-to-list');
    const progress = document.getElementById('progress');

    window.startQuiz = function(index) {
        console.log('Starting quiz at index:', index); // Debug
        const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
        const quiz = quizzes[index];
        if (!quiz) {
            console.error('Quiz not found at index:', index);
            return;
        }

        console.log('Quiz data:', quiz); // Debug
        document.getElementById('quiz-title').textContent = `${quiz.title} (${quiz.category})`;
        questionContainer.innerHTML = '';

        quiz.questions.forEach((q, qIndex) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';
            questionDiv.innerHTML = `
                <h3>${q.text}</h3>
                ${q.options.map((opt, optIndex) => `
                    <label>
                        <input type="radio" name="q${qIndex}" value="${optIndex}" onchange="updateProgress()">
                        ${opt}
                    </label><br>
                `).join('')}
            `;
            questionContainer.appendChild(questionDiv);
        });

        console.log('Questions rendered'); // Debug
        quizList.style.display = 'none';
        quizContainer.style.display = 'block';
        if (submitQuizBtn) {
            submitQuizBtn.style.display = 'block'; // Force visibility
            console.log('Submit button set to display: block'); // Debug
        } else {
            console.error('Submit button element not found'); // Debug
        }
        scoreDisplay.style.display = 'none';
        backToListBtn.style.display = 'none';

        let timeLeft = quiz.timeLimit * quiz.questions.length;
        const timerDisplay = document.getElementById('timer');
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;
        const timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Time Left: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                if (submitQuizBtn) submitQuizBtn.click();
            }
        }, 1000);

        submitQuizBtn.onclick = function() {
            clearInterval(timer);
        };
        updateProgress();
    };

    function updateProgress() {
        const totalQuestions = document.querySelectorAll('.question').length;
        const answered = document.querySelectorAll('input[type="radio"]:checked').length;
        const percentage = (answered / totalQuestions) * 100;
        progress.style.width = `${percentage}%`;
    }

    function loadQuizzes() {
        console.log('Loading quizzes'); // Debug
        const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
        if (!quizList) return;
        quizList.innerHTML = quizzes.length === 0 ? '<p>No quizzes available yet.</p>' : '';
        quizzes.forEach((quiz, index) => {
            const quizDiv = document.createElement('div');
            quizDiv.className = 'quiz-item';
            quizDiv.innerHTML = `
                <h3>${quiz.title} (${quiz.category})</h3>
                <p>Time: ${quiz.timeLimit * quiz.questions.length}s | Questions: ${quiz.questions.length}</p>
                <button onclick="startQuiz(${index})">Take Quiz</button>
            `;
            quizList.appendChild(quizDiv);
        });
    }

    if (submitQuizBtn) {
        submitQuizBtn.addEventListener('click', function() {
            console.log('Submit quiz clicked'); // Debug
            const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
            const currentQuiz = quizzes.find(q => q.title === document.getElementById('quiz-title').textContent.split(' (')[0]);
            if (!currentQuiz) {
                console.error('Current quiz not found');
                return;
            }

            let score = 0;
            currentQuiz.questions.forEach((q, qIndex) => {
                const selected = document.querySelector(`input[name="q${qIndex}"]:checked`);
                if (selected && parseInt(selected.value) === q.correctAnswer) score++;
            });

            scoreDisplay.textContent = `Your Score: ${score}/${currentQuiz.questions.length}`;
            scoreDisplay.style.display = 'block';
            submitQuizBtn.style.display = 'none';
            backToListBtn.style.display = 'block';
            console.log('Score displayed, submit hidden'); // Debug

            let attempts = JSON.parse(localStorage.getItem('quizAttempts') || '[]');
            attempts.push({
                quizTitle: currentQuiz.title,
                category: currentQuiz.category,
                score,
                total: currentQuiz.questions.length,
                date: new Date().toISOString()
            });
            localStorage.setItem('quizAttempts', JSON.stringify(attempts));
        });
    } else {
        console.error('Submit quiz button not found on page load'); // Debug
    }

    backToListBtn?.addEventListener('click', function() {
        console.log('Back to list clicked'); // Debug
        quizContainer.style.display = 'none';
        quizList.style.display = 'block';
        scoreDisplay.style.display = 'none';
        submitQuizBtn.style.display = 'block'; // Reset for next quiz
        backToListBtn.style.display = 'none';
        loadQuizzes();
        loadAnalytics();
    });

    if (quizList) loadQuizzes();

    // Leaderboard Logic
    const leaderboardList = document.getElementById('leaderboard-list');

    function loadLeaderboard() {
        const attempts = JSON.parse(localStorage.getItem('quizAttempts') || '[]');
        if (!leaderboardList) return;
        leaderboardList.innerHTML = attempts.length === 0 ? '<p>No attempts yet.</p>' : '';
        attempts.sort((a, b) => (b.score / b.total) - (a.score / a.total) || new Date(b.date) - new Date(a.date));
        leaderboardList.innerHTML = attempts.map(attempt => `
            <div class="leaderboard-item">
                <p><strong>${attempt.quizTitle}</strong> (${attempt.category}): ${attempt.score}/${attempt.total} (${((attempt.score / attempt.total) * 100).toFixed(1)}%) - ${new Date(attempt.date).toLocaleString()}</p>
            </div>
        `).join('');
    }

    if (leaderboardList) loadLeaderboard();

    // Enhanced Analytics Logic
    const analyticsDiv = document.getElementById('analytics');

    function loadAnalytics() {
        const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
        const attempts = JSON.parse(localStorage.getItem('quizAttempts') || '[]');
        if (!analyticsDiv) return;
        analyticsDiv.innerHTML = (quizzes.length === 0 && attempts.length === 0) ? '<p>No data available yet.</p>' : '';

        const totalQuizzes = quizzes.length;
        const totalAttempts = attempts.length;
        const avgScore = attempts.length > 0 ? (attempts.reduce((sum, a) => sum + (a.score / a.total), 0) / attempts.length * 100).toFixed(1) : 0;
        const mostPopular = attempts.reduce((acc, curr) => {
            acc[curr.quizTitle] = (acc[curr.quizTitle] || 0) + 1;
            return acc;
        }, {});
        const mostPopularQuiz = Object.entries(mostPopular).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';

        analyticsDiv.innerHTML = `
            <p>Total Quizzes Created: ${totalQuizzes}</p>
            <p>Total Attempts: ${totalAttempts}</p>
            <p>Average Score: ${avgScore}%</p>
            <p>Most Popular Quiz: ${mostPopularQuiz}</p>
        `;
    }

    if (analyticsDiv) loadAnalytics();
});