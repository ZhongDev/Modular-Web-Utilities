# Extensible Web Utilities Toolbox

A modular collection of web utilities built with React, TypeScript, and Vite. This project features an extensible architecture where new utilities can be easily added as self-contained modules.

## ✨ Features

- **🔧 Modular Architecture**: Each utility is a self-contained module
- **🚀 Auto-Discovery**: New modules are automatically registered in navigation
- **⚡ Fast Development**: Built with Vite for lightning-fast dev experience
- **🎨 Responsive Design**: Beautiful UI with Tailwind CSS
- **📱 Mobile-First**: Works seamlessly on all device sizes
- **🔤 TypeScript**: Full type safety and better development experience
- **📚 Built-in Documentation**: Comprehensive guide for creating new modules

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd extensible-web-utils
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests with Vitest

## 📁 Project Structure

```
extensible-web-utils/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Layout.tsx     # Main layout wrapper
│   │   └── Sidebar.tsx    # Navigation sidebar
│   ├── pages/             # Main application pages
│   │   ├── Home.tsx       # Landing page
│   │   └── Docs.tsx       # Documentation page
│   ├── util-modules/      # 🎯 Add your utilities here!
│   │   └── TextTransformer/ # Example text transformer utility
│   │       ├── index.tsx  # React component
│   │       └── meta.ts    # Module metadata
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   │   └── moduleLoader.ts # Dynamic module discovery
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── package.json
├── vite.config.ts         # Vite configuration
├── tailwind.config.cjs    # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 📦 Creating a New Utility Module

Creating a new utility is simple! Just follow these steps:

### 1. Create the Module Folder

```bash
mkdir src/util-modules/YourModuleName
```

### 2. Add Module Metadata (`meta.ts`)

```typescript
import { ModuleMeta } from "../../types/module";

export const title = "Your Module Title";
export const route = "/your-module";
export const description = "A short sentence describing what your module does.";
export const icon = "🔧"; // Optional emoji or React element

// Or export as default
const meta: ModuleMeta = { title, route, description, icon };
export default meta;
```

### 3. Create the Component (`index.tsx`)

```typescript
import React, { useState } from "react";

const YourModule: React.FC = () => {
  const [input, setInput] = useState("");

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Your Module Title
      </h1>
      {/* Your utility UI here */}
    </div>
  );
};

export default YourModule;
```

### 4. That's It! 🎉

Your module will be automatically:

- ✅ Discovered by the build system
- ✅ Added to the sidebar navigation
- ✅ Registered as a new route
- ✅ Lazy-loaded for optimal performance

## 🎨 Design Guidelines

- Use Tailwind CSS for styling
- Follow the existing color scheme (blue primary, gray neutrals)
- Ensure mobile responsiveness
- Use semantic HTML for accessibility
- Keep modules self-contained and focused on a single utility

## 🧪 Testing

The project includes Vitest for testing. To run tests:

```bash
npm run test
```

Create test files alongside your modules:

```
util-modules/
├── YourModule/
│   ├── index.tsx
│   ├── meta.ts
│   └── index.test.tsx  # Optional tests
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-module`
3. Add your utility module following the guidelines above
4. Commit your changes: `git commit -m 'Add YourModule utility'`
5. Push to the branch: `git push origin feature/your-module`
6. Submit a pull request

## 📚 Documentation

For detailed information on creating modules, visit the **Documentation** page in the application at `/docs` or check out the existing `TextTransformer` for reference.

## 🛠️ Built With

- **[React](https://reactjs.org/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Vite](https://vitejs.dev/)** - Build tool and dev server
- **[React Router](https://reactrouter.com/)** - Client-side routing
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Vitest](https://vitest.dev/)** - Testing framework

## 📄 License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0). See the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Live Demo](https://toolbox.zhong.au/) - Hosted demo
- [Documentation](https://toolbox.zhong.au/docs) - Online documentation
- [Issues](../../issues) - Report bugs or request features

---

Happy coding! 🚀
