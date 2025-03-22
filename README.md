# quiz-maker
An online quiz creation and taking tool.
# Quiz Maker

An interactive web-based application for creating and taking quizzes, built as part of the GrowthLink Web Development Assignment. This project allows users to create custom quizzes with categories and time limits, attempt them with a progress bar and timer, and view scores on a leaderboard.

## Live Demo
The project is deployed and accessible at: [https://quiz-maker-growth-link.netlify.app/](https://quiz-maker-growth-link.netlify.app/)

## Features
- **Quiz Creation**: Create quizzes with a title, category (e.g., Math, Science), custom time limit, and multiple-choice questions.
- **Quiz Taking**: Attempt quizzes with a dynamic timer, progress bar, and immediate scoring.
- **Leaderboard**: View top scores with quiz details and timestamps.
- **Analytics**: Track total quizzes, attempts, average scores, and the most popular quiz.
- **Theme Toggle**: Switch between light and dark modes with persistent settings.
- **User Authentication**: Default admin access enabled (see credentials below).
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Animations**: Smooth fade-in effects for a polished user experience.

## Tech Stack
- **HTML**: Structured pages for login, quiz creation, and quiz-taking.
- **CSS**: Custom styles with theme support and responsive layouts.
- **JavaScript**: Core logic for quiz management, local storage, and interactivity.
- **Local Storage**: Persists quizzes, attempts, and user settings.
- **Netlify**: Hosting for live deployment.

## How to Use
### Running Locally
1. Clone the repository: https://github.com/premkumaranubhav123/quiz-maker.git
2. 2. Open `index.html` in a web browser (no server required, as it uses local storage).

### Accessing Admin Features
- **Default Login**:
- **Username**: `admin`
- **Password**: `xyz123`
- After logging in, you’ll be redirected to the quiz creation page.

### Creating a Quiz
1. Log in with the admin credentials.
2. Enter a quiz title, select a category, set a time limit (in seconds), and add questions with options and correct answers.
3. Click "Save Quiz" to store it locally.

### Taking a Quiz
1. From the homepage, select a quiz from the "Available Quizzes" list.
2. Answer the questions within the time limit.
3. Click "Submit Quiz" to see your score.

### Viewing Leaderboard & Analytics
- Navigate to the "Leaderboard" page for scores.
- Check "Quiz Analytics" on the homepage for usage stats.

## Project Structure
quiz-maker/
├── styles.css           # Styles for layout, themes, and animations      
├── script.js            # Core JavaScript logic
├── index.html           # Homepage with quiz list and taking interface
├── create.html          # Quiz creation page
├── leaderboard.html     # Leaderboard display
├── login.html           # Login page
└── README.md            # This file

## Deployment
- Hosted on **Netlify** at: [https://quiz-maker-growth-link.netlify.app/](https://quiz-maker-growth-link.netlify.app/)
- Linked to this GitHub repository for continuous deployment.

## Assignment Details
- **Organization**: GrowthLink
- **Task**: Build an online quiz maker with creation, attempt, and leaderboard features.
- **Submission**: 
  - GitHub Repository: [https://github.com/premkumaranubhav123/quiz-maker](https://github.com/premkumaranubhav123/quiz-maker)
  - Submitted to: `help.growthlink@gmail.com`

## Future Enhancements
- Add support for true/false and open-ended questions.
- Implement quiz export/import as JSON files.
- Enhance user profiles with multiple accounts and permissions.

## Contact
For queries or support:
- GitHub: [premkumaranubhav123](https://github.com/premkumaranubhav123)
Developed with ❤️ by Prem Kumar Anubhav for GrowthLink.
