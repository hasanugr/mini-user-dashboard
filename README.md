# 📊 Mini User Dashboard

A modern, responsive user management dashboard built with Next.js 15, featuring full CRUD operations, real-time search, and advanced pagination.

![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-15.5.5-black?style=flat-square&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8?style=flat-square&logo=tailwindcss)

## ✨ Features

### Core Functionality

- ✅ **User Listing** - Display users with name, username, email, phone, company
- ✅ **User Creation** - Add new users with comprehensive form validation
- ✅ **User Details** - View detailed user information with multi-card layout
- ✅ **User Editing** - Update user information with pre-filled forms
- ✅ **User Deletion** - Remove users with confirmation modal and soft-delete support

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone https://github.com/hasanugr/mini-user-dashboard.git
cd mini-user-dashboard
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Code Documentation

This project uses **JSDoc comments** for comprehensive component documentation.

### Documentation Benefits

- ✅ **Clear Documentation**: Every component has detailed JSDoc comments
- ✅ **IDE Support**: Autocomplete and hover information in most modern editors
- ✅ **HTML Documentation**: Generate beautiful HTML docs with one command
- ✅ **No Extra Dependencies**: No PropTypes or TypeScript needed
- ✅ **Easy Maintenance**: Documentation lives with the code

### Generate Documentation

```bash
# Generate HTML documentation
npm run docs

# Generate and open in browser (macOS)
npm run docs:open

# View documentation
open docs/index.html
```

The generated documentation will be available in the `docs/` folder with a searchable interface showing all components, functions, and their parameters.

### Example Documentation

```javascript
/**
 * User form component for creating and editing users
 * @param {Object} props
 * @param {'create'|'edit'} [props.mode='create'] - Form mode
 * @param {Object} [props.initialUser] - Initial user data for edit mode
 * @returns {JSX.Element}
 */
export default function UserForm({ mode = "create", initialUser }) {
  // Component implementation
}
```

## 🎯 Code Quality

- **ESLint**: Code linting with Next.js recommended rules
- **JSDoc Comments**: Documentation for all components and functions
- **Constants**: Centralized configuration in `lib/constants.js`
- **Validation**: Comprehensive form validation with custom patterns and real-time feedback

