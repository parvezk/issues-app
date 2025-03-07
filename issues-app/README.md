# issues-app

This project is a simple React application that demonstrates the use of context for managing themes (light and dark) across the application. It utilizes CSS custom properties to dynamically change styles based on the selected theme.

## Project Structure

```
issues-app
├── src
│   ├── app
│   │   ├── context
│   │   │   └── ThemeContext.tsx
│   │   ├── globals.css
│   │   ├── providers.tsx
│   │   └── components
│   │       └── issuesHeader.tsx
├── package.json
├── tsconfig.json
└── README.md
```

## Features

- **Theme Management**: The application supports light and dark themes, allowing users to toggle between them.
- **Responsive Design**: The application is designed to be responsive and adapts to different screen sizes.
- **CSS Custom Properties**: Utilizes CSS variables for easy theme management and styling.

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd issues-app
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

## Usage

- The theme can be toggled using the button in the header component.
- The application will automatically adjust styles based on the selected theme.

## Technologies Used

- React
- TypeScript
- CSS

## License

This project is licensed under the MIT License.