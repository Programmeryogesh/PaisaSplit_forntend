# 💰 PaisaSplit - Smart Expense Sharing Made Simple

[![Angular](https://img.shields.io/badge/Angular-18-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![SCSS](https://img.shields.io/badge/SCSS-1.77-pink.svg)](https://sass-lang.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

> **PaisaSplit** is a comprehensive, modern expense-sharing web application designed to simplify group financial management. Built with Angular 18 and featuring a responsive, mobile-first design, it makes tracking shared expenses, managing groups, and settling payments effortless and transparent.

## 🎯 Project Vision

**Main Motive**: Eliminate the complexity and awkwardness of shared expenses by providing a transparent, user-friendly platform where friends, family, and colleagues can easily track, split, and settle shared costs.

**Core Problems Solved**:
- 💸 **Complex Group Expenses**: Simplified tracking of shared costs in groups, trips, and social events
- 📊 **Fair Splitting**: Multiple splitting methods ensuring fairness for all participants  
- 🔍 **Financial Transparency**: Clear visibility into who owes what and complete transaction history
- 🤝 **Social Finance**: Building a trusted network for ongoing expense sharing
- 📱 **Mobile Accessibility**: Responsive design for expense tracking anywhere, anytime

## ✨ Key Features

### 🏠 Dashboard - Your Financial Overview
- **Real-time Balance Tracking** - See your overall financial position at a glance
- **Smart Analytics** - Visual spending breakdowns and trend analysis
- **Quick Actions** - One-click access to common tasks
- **Recent Activity** - Stay updated with latest transactions and group activities

### 👥 Group Management - Collaborate Seamlessly
- **Flexible Group Creation** - Templates for travel, household, events, and more
- **Member Management** - Invite friends, manage roles and permissions
- **Group Analytics** - Detailed insights into group spending patterns
- **Smart Filtering** - Find and organize groups efficiently

### 💳 Expense Tracking - Comprehensive and Smart
- **Multiple Split Methods** - Equal, percentage, exact amounts, or custom shares
- **Smart Categories** - AI-powered categorization with custom categories
- **Receipt Management** - Photo capture with OCR text extraction (planned)
- **Advanced Filtering** - Find expenses by date, amount, category, or participants

### 🤝 Friend Network - Build Financial Connections
- **Easy Friend Discovery** - Find and connect with friends via email or username
- **Balance Tracking** - Monitor shared expenses and settlements with each friend
- **Friend Analytics** - Insights into spending patterns and relationships
- **Social Integration** - Seamless group invitations and collaboration

### 📈 Activity Timeline - Complete Financial History
- **Comprehensive Activity Feed** - Track all financial activities in chronological order
- **Smart Filtering** - Filter by type, date, participants, or groups
- **Interactive Actions** - Quick actions directly from activity items
- **Real-time Updates** - Live activity notifications and updates

### 👤 Profile Management - Control Your Account
- **Personal Information** - Manage profile details, avatar, and personal settings
- **Security Features** - Password management, 2FA, and session control
- **Privacy Controls** - Fine-grained privacy and data sharing settings
- **Data Management** - Export your data, account backup and deletion options

### ⚙️ Settings - Customize Your Experience
- **Theme Customization** - Light, dark, or auto themes with system sync
- **Localization** - Multi-language support with currency and date formats
- **Notification Management** - Granular control over all notification types
- **Advanced Configuration** - Beta features, offline mode, and performance settings

## 🏗️ Technical Architecture

### Frontend Stack
```
Angular 18 (Latest)          Modern framework with standalone components
├── TypeScript 5.0+          Strict typing for robust development
├── SCSS Modules             Modular, maintainable styling
├── RxJS                     Reactive programming and state management
├── Angular Router           Lazy-loaded routing for performance
└── Angular Forms            Reactive forms with validation
```

### Component Architecture
```
src/
├── app/
│   ├── common/              # Shared layout components
│   │   ├── header/          # Navigation and user menu
│   │   └── footer/          # App footer and links
│   ├── components/          # Feature components
│   │   ├── dashboard/       # Financial overview and analytics
│   │   ├── groups/          # Group management and collaboration
│   │   ├── expenses/        # Expense tracking and splitting
│   │   ├── friends/         # Social network and connections
│   │   ├── activity/        # Activity timeline and history
│   │   ├── profile/         # User account management
│   │   └── settings/        # App configuration and preferences
│   ├── services/            # Business logic and data services
│   └── guards/              # Route protection and authentication
```

### Design System
- **Mobile-First Responsive Design** - Optimized for all devices
- **Consistent UI Components** - Reusable design system
- **Accessibility Compliant** - WCAG 2.1 AA standards
- **Modern CSS Architecture** - BEM methodology with SCSS modules

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm 9+
- Angular CLI 18+
- Modern web browser

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/paisasplit.git
cd paisasplit

# Install dependencies
npm install

# Start development server
npm start

# Open browser and navigate to
http://localhost:4200
```

### Development Commands
```bash
npm start              # Start dev server with hot reload
npm run build          # Build for production
npm test              # Run unit tests
npm run e2e           # Run end-to-end tests
npm run lint          # Lint code for quality
npm run analyze       # Bundle size analysis
```

## 🎯 Use Cases

### 🏠 **Roommate Expenses**
- Split rent, utilities, groceries, and household items
- Track shared subscriptions and services
- Manage cleaning supplies and maintenance costs

### ✈️ **Group Travel**
- Share accommodation, transportation, and activity costs
- Split meals, entertainment, and shopping expenses
- Track individual contributions and settlements

### 🎉 **Event Planning**
- Organize party costs among friends
- Split wedding or celebration expenses
- Manage corporate event and team building costs

### 🏢 **Work Expenses**
- Share team lunch and coffee costs
- Split conference and training expenses
- Manage office supplies and equipment purchases

## 🔒 Security & Privacy

- **Data Encryption**: All sensitive data encrypted in transit and at rest
- **Privacy Controls**: Granular privacy settings for profile and data sharing
- **Secure Authentication**: JWT-based auth with refresh token rotation
- **Input Validation**: Comprehensive client and server-side validation
- **XSS Protection**: Angular's built-in sanitization and CSP headers

## 🌟 What Makes PaisaSplit Special

### 💡 **Smart & Intuitive**
- AI-powered expense categorization
- Smart split calculations with multiple methods
- Predictive text and auto-complete features
- Intelligent friend and group suggestions

### 🎨 **Beautiful & Responsive**
- Modern, clean interface design
- Fully responsive across all devices
- Customizable themes and layouts
- Accessibility-first approach

### ⚡ **Fast & Reliable**
- Lazy-loaded components for quick startup
- Optimized bundle sizes and performance
- Offline functionality (planned)
- Real-time synchronization across devices

### 🔧 **Flexible & Extensible**
- Multiple splitting methods for any scenario
- Custom categories and expense types
- Configurable notification preferences
- Extensive customization options

## 🛣️ Roadmap

### 🎯 **Phase 1: Core Features** (Current)
- ✅ Complete UI/UX implementation
- ✅ Responsive design across all devices
- ✅ Component architecture and routing
- ✅ Mock data integration and testing

### 🔄 **Phase 2: Backend Integration** (Next)
- 🚧 REST API development and integration
- 🚧 User authentication and authorization
- 🚧 Real-time data synchronization
- 🚧 Database implementation and optimization

### 📱 **Phase 3: Advanced Features** (Planned)
- 📋 Payment gateway integration (Stripe, PayPal)
- 📋 Receipt OCR and automatic data extraction
- 📋 Multi-currency support with live exchange rates
- 📋 Native mobile apps (iOS/Android)
- 📋 Advanced analytics and spending insights

### 🌍 **Phase 4: Scale & Optimize** (Future)
- 📋 Internationalization (i18n) for global reach
- 📋 Enterprise features and team accounts
- 📋 Advanced security and compliance features
- 📋 Integration with banking and financial services

## 📄 Documentation

- **[Project Overview](PROJECT_OVERVIEW.md)** - Comprehensive project information
- **[Technical Guide](TECHNICAL_GUIDE.md)** - Technical implementation details
- **[User Guide](USER_GUIDE.md)** - Complete user documentation
- **[API Documentation](API_DOCUMENTATION.md)** - API specs and data models
- **[Feature Specification](FEATURE_SPECIFICATION.md)** - Detailed feature specifications

## 🚀 Development

### Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

### Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

### Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Angular team for the amazing framework
- Unsplash for beautiful stock photos
- Open source community for inspiration and tools
- Beta testers and early adopters for feedback

## ⭐ Support

If you find PaisaSplit useful, please consider:
- ⭐ **Starring** this repository
- 🐛 **Reporting bugs** and suggesting features
- 🤝 **Contributing** to the codebase
- 📢 **Sharing** with friends and colleagues

---

<div align="center">

**Made with ❤️ for better financial collaboration**

[Website](https://paisasplit.com) • [Documentation](docs/) • [Report Bug](issues/) • [Request Feature](issues/)

</div>
