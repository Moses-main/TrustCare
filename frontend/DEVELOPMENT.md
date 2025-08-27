# Development Setup

## Prerequisites
- Node.js 18+ and npm 9+
- VS Code (recommended) or any other code editor

## VS Code Extensions
For the best development experience, install these VS Code extensions:

1. [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
2. [PostCSS Language Support](https://marketplace.visualstudio.com/items?itemName=csstools.postcss)
3. [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
4. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Linting and Formatting

- Run linter: `npm run lint`
- Format code: `npm run format`

## Building for Production

```bash
npm run build
```

## Styling

This project uses Tailwind CSS for styling. The main CSS file is located at `src/index.css`.

### Customizing Tailwind

Edit `tailwind.config.js` to customize the design system, colors, fonts, etc.

## Troubleshooting

If you see "Unknown @tailwind directive" errors in VS Code:
1. Install the recommended VS Code extensions
2. Restart VS Code
3. If the issue persists, try running the "Developer: Reload Window" command in VS Code
