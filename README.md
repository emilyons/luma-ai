# Luma AI Image Generation App

This is a React-based web application that uses the Luma AI API to generate images based on text prompts. The app allows users to input prompts, generate images, and view completed generations.

## Features

- Generate videos from text prompts
- View and download 10 most recent completed generations
- Responsive design for various screen sizes

## Prerequisites

Before you begin, you'll need these things:

- Node.js (v14 or later)
- npm (v6 or later)
- An API key for Luma AI (get one [here](https://lumalabs.ai/dream-machine/api/keys)) and credit balance

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/emilyons/luma-ai
   ```

2. Navigate to the project directory:
   ```
   cd luma-ai
   ```

3. Install the project dependencies:
   ```
   npm install
   ```

   This will install all dependencies listed in `package.json`, including:
   - React and React DOM
   - React Router DOM
   - Axios
   - Express
   - CORS
   - Dotenv
   - Vite (as a dev dependency)
   - Sass (as a dev dependency)
   - ESLint and related plugins (as dev dependencies)

4. Create a `.env` file in the root directory and add your Luma AI API key:
   ```
   VITE_LUMA_AUTH_TOKEN=your-luma-ai-api-key
   ```

## Usage

1. Start the development server:
   ```
   npm run dev
   ```

2. In a separate terminal, start the Express server:
   ```
   npm run server
   ```

3. Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

4. Enter a prompt in the input field and click "Generate" to create a video.

5. View completed generations on the "Completed Generations" page.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](https://en.wikipedia.org/wiki/MIT_License).
