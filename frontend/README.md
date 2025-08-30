# Reaching Roots - Village Data Management System

A comprehensive web application for managing agricultural village data, built with React, TypeScript, and Tailwind CSS.

## Features

### 🔐 Authentication System
- **Role-based access control** with Admin and VLE (Village Level Entrepreneur) roles
- **Protected routes** ensuring users can only access authorized pages
- **Demo accounts** for testing different user roles

### 👨‍💼 Admin Features
- **Dashboard** with comprehensive analytics and charts
- **Village Onboarding** - Register new villages with detailed information
- **VLE Onboarding** - Add Village Level Entrepreneurs to the system
- **Vendor Onboarding** - Register agricultural vendors and suppliers
- **Machine Registration** - Track agricultural machinery and equipment
- **Survey Management** - Conduct and view survey results
- **Village Analytics** - Search and analyze village data
- **Top Villages** - View performance metrics for villages

### 👨‍🌾 VLE Features
- **Home Page** - Access to public information
- **Log Income** - Record earnings from agricultural services with date ranges

## Demo Accounts

### Admin Account
- **Email:** admin@reachingroots.com
- **Password:** admin123
- **Access:** All features and pages

### VLE Account
- **Email:** vle@reachingroots.com
- **Password:** vle123
- **Access:** Home page and Log Income functionality

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

4. **Login** using one of the demo accounts above

## Technology Stack

- **Frontend:** React 18 with TypeScript
- **Styling:** Tailwind CSS with shadcn/ui components
- **Routing:** React Router DOM
- **State Management:** React Context API
- **Date Handling:** date-fns
- **Icons:** Lucide React
- **Build Tool:** Vite

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── AppSidebar.tsx  # Main navigation sidebar
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── Login.tsx       # Authentication page
│   ├── Dashboard.tsx   # Main dashboard
│   ├── LogIncome.tsx   # VLE income logging
│   └── ...            # Other pages
└── App.tsx            # Main application component
```

## Key Features

### 🎨 Modern UI/UX
- Clean, responsive design with Tailwind CSS
- Consistent color scheme and typography
- Smooth animations and transitions
- Mobile-friendly interface

### 🔒 Security
- Protected routes based on user roles
- Authentication state management
- Role-based navigation

### 📊 Data Visualization
- Interactive charts and graphs
- Real-time statistics
- Performance metrics

### 📱 Responsive Design
- Works seamlessly on desktop, tablet, and mobile
- Adaptive layouts and components
- Touch-friendly interface

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the Reaching Roots initiative for agricultural village data management.

## Project info

**URL**: https://lovable.dev/projects/8892195e-a252-4da1-976a-092f419cc699

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/8892195e-a252-4da1-976a-092f419cc699) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/8892195e-a252-4da1-976a-092f419cc699) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
