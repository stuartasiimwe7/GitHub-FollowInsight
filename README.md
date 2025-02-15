# GitHub FollowInsight
 This is a simple yet powerful Next.js app that helps you track who you follow and who follows you back on GitHub. Just enter a GitHub username, and instantly see!
## Overview

GitHub Follow Insight is a web application that allows users to view detailed insights about their GitHub account, such as:

- The list of followers.
- The list of people they follow.
- People who are not following back.
- People they have not followed back.

This application is built using Next.js (React framework), styled with Tailwind CSS, and integrates with the GitHub API to fetch user data.

## Features

- **Search**: Enter any GitHub username to fetch the follow insights.
- **Display**: Display lists of followers, following, not following back, and not followed back.
- **Responsive Design**: Fully responsive with a modern, sleek UI using Tailwind CSS.
- **Interactive**: Allows users to check their GitHub follow details dynamically.

## Prerequisites

Before setting up the project, you need the following:

- **Node.js**: Install the latest version from [Node.js Official Website](https://nodejs.org/).
- **npm or yarn**: Package managers to install dependencies.
- **GitHub API**: This project makes API calls to the GitHub API. No authentication is required, but the API has rate limits, so ensure your usage is within limits.

## Getting Started

### Step 1: Clone the Repository

Start by cloning the repository to your local machine.

```bash
git clone https://github.com/yourusername/GitHub-Follow-Insight.git
cd GitHub-Follow-Insight
```

### Step 2: Install Dependencies

Install the necessary dependencies using either npm or yarn.

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

### Step 3: Run the Development Server

After installing the dependencies, run the development server.

Using npm:

```bash
npm run dev
```

Using yarn:

```bash
yarn dev
```

This will start the server and you can view the app by navigating to [http://localhost:3000](http://localhost:3000) in your browser.

### Step 4: Access the Application

Once the server is running, you can open your browser and visit:

[http://localhost:3000](http://localhost:3000)

This will load the GitHub Follow Insight application. Enter a GitHub username into the input field and click **Check** to view the follow insights for that username.

### Step 5: Customization (Optional)

If you'd like to customize the styles or modify the functionality of the app, you can:

- Change the background color or font styles in the `globals.css` file located at `src/app/globals.css`.
- Edit the `Home` component in `src/app/page.tsx` to modify the layout or integrate additional features.

## Project Structure

Here's an overview of the project structure:

```plaintext
GitHub-Follow-Insight/
│
├── src/
│   ├── app/
│   │   ├── globals.css              # Global CSS file (Tailwind & Custom styles)
│   │   ├── page.tsx                 # Main component (Handles GitHub data fetching)
│   │   └── layout.tsx               # Layout component (General layout)
│
├── tailwind.config.js               # Tailwind CSS configuration file
├── package.json                     # Project dependencies and scripts
├── README.md                        # This file
└── .gitignore                       # Git ignore file
```

## Tech Stack

- **Next.js**: React-based framework for building the application.
- **Tailwind CSS**: Utility-first CSS framework for styling the app.
- **GitHub API**: To fetch data about followers and people the user is following.

## Troubleshooting

Here are a few common issues you might encounter during setup:

### Issue 1: Tailwind Styles Not Applying

If this happens, try the following:

- Ensure you have installed the necessary dependencies with `npm install` or `yarn install`.
- Make sure you are running the development server with `npm run dev` or `yarn dev`.
- Check if the file paths are correct for your CSS file imports.

### Issue 2: GitHub API Rate Limiting

GitHub has a rate limit for API calls. If you exceed this limit, you may need to wait or authenticate your requests. You can authenticate the requests using a GitHub token by adding it to the API request headers.

Although personally I didn't run into this issue, incase you do, to resolve it, you can authenticate the requests by adding an API token:

```typescript
const headers = {
    Authorization: `Bearer YOUR_GITHUB_API_TOKEN`,
};
const followersRes = await fetch(`https://api.github.com/users/${username}/followers`, { headers });
```

### Issue 3: Application Not Loading

If the application does not load:

- Make sure all dependencies are installed correctly.
- Ensure that you are using a lastest version of Node.js.
- Restart the development server after making changes.

### Issue 4: Unknown at rule @tailwindcss(unknownAtRules)

This issue occurs when Visual Studio Code doesn't recognize Tailwind's @tailwind directive in your `globals.css` file, resulting in an error like:

```
Unknown at rule @tailwindcss(unknownAtRules)
```

#### Solution 1: Update VSCode Settings

To resolve this, you can tell VSCode to treat `.css` files as Tailwind CSS files by adding the following configuration in your `.vscode/settings.json`:

1. Open or create `.vscode/settings.json` in the root of your project.
2. Add the following settings:

```json
{
    "files.associations": {
        "*.css": "tailwindcss"
    }
}
```

#### Solution 2: Install PostCSS Language Support Extension

If the issue persists, you can add PostCSS Language Support to your VSCode:

1. Open the VSCode command palette (Ctrl+Shift+P or Cmd+Shift+P).
2. Search for `Extensions: Install Extensions`.
3. Search for `PostCSS Language Support` and click Install.

This extension provides better support for PostCSS, which includes Tailwind's @tailwind directive, and should eliminate the error.

You can find more information about this extension on [GitHub](https://github.com/csstools/postcss-language).

If you encounter any issues or need additional help, feel free to raise an issue on the [GitHub Repository](https://github.com/stuartasiimwe7/GitHub-Follow-Insight).

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.