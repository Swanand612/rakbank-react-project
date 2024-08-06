# MultiStepForm Project

This project is a React application that implements a multi-step form with a custom vertical carousel and animated dot indicators. The form captures user responses and submits them to a mock API endpoint.

# Features

- Multi-step form with vertical sliding animation
- Emoji options for user responses
- API call on each emoji click
- Dot indicators to show the current question
- Tailwind CSS for styling
- Unit tests with React Testing Library and Jest

# Installation

1. Clone the repository:

```bash
    git clone https://github.com/yourusername/multistepform.git
    cd multistepform
```

2. Install the dependencies:

```bash
    npm install
```

3. Install json-server globally to mock the API endpoint:

```bash
    npm install -g json-server
```

# Running the Application

1. Start the mock API server:

```bash
    json-server --watch db.json --port 3001
```

2. Start the React application:

```bash
    npm start
```

3. Open your browser and navigate to `http://localhost:3000`

# Running Tests

To run the unit tests, use the following command:

```bash
    npm test
```

# Project Structure

- `src/components/MultiStepForm.js`: The main component for the multi-step form.
- `src/components/MultiStepForm.test.js`: Unit tests for the MultiStepForm component.
- `src/styles.css`: CSS file for custom styles.
- `db.json`: Mock database file for json-server.

# Usage

- The form slides through questions vertically.
- Click on an emoji option to submit a response and move to the next question.
- Dot indicators on the left show the current question.
