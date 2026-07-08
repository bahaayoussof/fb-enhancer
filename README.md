# <img src="public/images/logo.png" width="38" height="38" valign="middle"> FB Enhancer

![alt text](image.png)

A lightweight, modern, and highly configurable browser extension to clean up your Facebook feed and layout. Take back control of your social media experience by removing clutter, intrusive ads, algorithmic suggestions, and unused sidebar features.

---

## 🚀 Key Features

- **Feed Cleanup**:
  - **Sponsored Posts**: Instantly hides paid advertisements.
  - **Suggested Posts**: Removes algorithmic suggestions (e.g., "Suggested for you", "Suggested Groups", etc.).
  - **General Feed Cleaner**: General cleanup and normalization of the main feed.
- **Media Filter**:
  - **Stories**: Hides the Stories row at the top of the feed.
  - **Reels**: Hides Reels and short video carousels from clogging your feed.
- **Layout Customization**:
  - **Right Sidebar**: Hides the cluttered right-hand column (sponsored blocks, algorithmic suggestions, and game invitations).
- **Dynamic Customization**:
  - Toggle individual filters on/off using the extension's interactive popup.
  - **Enable All / Disable All** actions with a single click.

---

## 🛠️ Installation Guide

Follow these steps to install the extension in **Developer Mode** on any Chromium-based browser (Google Chrome, Microsoft Edge, Brave, Opera, etc.):

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (version 18 or later is recommended).

### Steps

1.  **Clone or Download** this repository to your local machine.
2.  Open your terminal inside the project directory and install the necessary dependencies:
    ```bash
    npm install
    ```
3.  Build the project to compile TypeScript, React, and Vite assets:
    ```bash
    npm run build
    ```
    This will create a production-ready `/dist` directory in the project root.
4.  Open your browser and navigate to the Extensions management page:
    - In Chrome: `chrome://extensions/`
    - In Edge: `edge://extensions/`
5.  Turn on **Developer Mode** (usually a toggle switch in the top right-hand corner).
6.  Click **Load unpacked** (top-left button).
7.  Select the `dist` directory located inside this project folder.
8.  The **FB Enhancer** extension will now be loaded and active!

---

## 📖 Usage Instructions

1.  **Pin the Extension**: For easy access, pin the **FB Enhancer** icon (the protective blue shield) to your browser toolbar.
2.  **Open the Controls**: Click the extension icon on the toolbar to open the control panel.
3.  **Toggle Features**:
    - Inside the panel, you will see categories for **Feed**, **Media**, and **Layout**.
    - Use the toggle switches to enable or disable specific features (e.g., toggle off _Stories_ or _Reels_ if you prefer to see them, or turn on _Sponsored Posts_ to block ads).
    - You can also click **Enable all** or **Disable all** at the top right of the popup to configure all options at once.
4.  **Refresh to Apply**: The changes will take effect automatically as soon as you toggle them, or upon reloading any active `facebook.com` tab.

---

## 💻 Development Scripts

The project includes several npm scripts for local development and build management:

- `npm run dev` — Starts Vite in watch mode to automatically rebuild the extension on file changes.
- `npm run build` — Compiles and builds the production extension into the `/dist` directory.
- `npm run package` — Runs the build and packages the output files into a production ZIP archive (`fb-enhancer-v1.0.0.zip`) for distribution.
- `npm run lint` — Performs ESLint static analysis checking on source files.
- `npm run format` — Automatically formats codebase using Prettier.

---

## 🛡️ License

This project is open-source and available under the MIT License.
