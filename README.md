# Luma AI Image Generation App

This is a React-based web application that uses the Luma AI API to generate images based on text prompts. The app allows users to input prompts, generate images, and view completed generations.

## Features

- Generate images from text prompts
- View and download completed generations
- Responsive design for various screen sizes

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm (v6 or later)
- A Luma AI API key

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/emilyons/luma-ai
   ```

2. Navigate to the project directory:
   ```
   cd luma-ai
   ```

3. Install the dependencies:
   ```
   npm install
   ```

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

4. Enter a prompt in the input field and click "Generate" to create an image.

5. View completed generations on the "Completed Generations" page.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
