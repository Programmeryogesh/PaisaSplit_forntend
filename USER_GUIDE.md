# 🚀 PaisaSplit Development & Usage Guide

## 🏃‍♂️ Quick Start

### Prerequisites
- **Node.js**: Version 18 or higher
- **npm**: Version 9 or higher
- **Angular CLI**: Version 18 or higher
- **Git**: For version control

### Installation & Setup
```bash
# Clone the repository
git clone <repository-url>
cd PaisaSplit

# Install dependencies
npm install

# Start development server
npm start

# Open browser and navigate to
http://localhost:4200
```

### Development Commands
```bash
# Development server with hot reload
npm start

# Build for production
npm run build

# Run unit tests
npm test

# Run e2e tests
npm run e2e

# Lint code
npm run lint

# Generate component
ng generate component components/new-component
```

## 📱 User Guide - How to Use PaisaSplit

### 1. Getting Started
1. **Access the Application**: Open your web browser and navigate to the PaisaSplit URL
2. **Navigation**: Use the top navigation bar to access different sections
3. **Mobile Experience**: The app is fully responsive - use the hamburger menu on mobile devices

### 2. Dashboard Overview
**What You'll See**:
- **Balance Summary**: Your overall financial position
- **Quick Stats**: Friends count, active groups, total expenses
- **Recent Activity**: Latest transactions and group activities
- **Category Breakdown**: Visual representation of your spending

**Quick Actions**:
- Click "Add Expense" to record a new expense
- Click "Create Group" to start a new expense group
- Click "Invite Friends" to expand your network

### 3. Managing Groups

#### Creating a Group
1. Navigate to **Groups** section
2. Click **"Create New Group"**
3. Fill in group details:
   - **Group Name**: Choose a descriptive name
   - **Description**: Brief description of the group purpose
   - **Group Type**: Select from Travel, Household, Event, etc.
   - **Privacy**: Choose who can see and join the group
4. Add initial members by email or username
5. Click **"Create Group"**

#### Group Management
- **Add Members**: Click the "+" icon to invite new people
- **View Balances**: See who owes what in the group
- **Group Settings**: Modify group preferences and permissions
- **Archive Group**: Archive completed or inactive groups

#### Group Types Available
- 🏠 **Household**: For roommates and shared living expenses
- ✈️ **Travel**: For trips and vacation expenses
- 🎉 **Event**: For parties, celebrations, and special occasions
- 🏢 **Work**: For office expenses and team activities
- 🍽️ **Dining**: For restaurant bills and food expenses
- 🛍️ **Shopping**: For shared purchases and shopping trips

### 4. Recording Expenses

#### Adding an Expense
1. Click **"Add Expense"** from dashboard or expenses section
2. Fill in expense details:
   - **Description**: What was the expense for?
   - **Amount**: Total cost of the expense
   - **Category**: Select appropriate category
   - **Date**: When the expense occurred
   - **Paid by**: Who paid for the expense
   - **Group**: Which group (if applicable)

#### Splitting Methods
- **Equal Split**: Divide equally among all participants
- **Exact Amounts**: Specify exact amount for each person
- **Percentages**: Split by percentage (e.g., 60/40)
- **By Shares**: Distribute based on shares (e.g., 2:1:1)

#### Expense Categories
- 🍕 **Food & Dining**: Restaurants, groceries, takeout
- 🚗 **Transportation**: Gas, parking, rideshares, flights
- 🏨 **Accommodation**: Hotels, Airbnb, camping
- 🎬 **Entertainment**: Movies, concerts, games
- 🛍️ **Shopping**: Clothes, electronics, gifts
- 💊 **Healthcare**: Medical expenses, pharmacy
- 🏠 **Household**: Rent, utilities, cleaning supplies
- 📚 **Education**: Books, courses, school supplies
- 💼 **Work**: Business expenses, office supplies
- 🎯 **Other**: Miscellaneous expenses

### 5. Friend Management

#### Adding Friends
1. Go to **Friends** section
2. Click **"Add Friend"**
3. Enter friend's email or username
4. Add a personal message (optional)
5. Click **"Send Request"**

#### Managing Friend Requests
- **Received Requests**: Accept or decline incoming requests
- **Sent Requests**: View status of your sent requests
- **Friend List**: See all your connected friends
- **Friend Activity**: Monitor your friends' recent activities

#### Friend Features
- View shared expenses and groups
- See balance between you and each friend
- Quick actions: message, add to group, settle up

### 6. Activity Tracking

#### Activity Timeline
- **Comprehensive History**: See all your financial activities
- **Date Organization**: Activities grouped by date
- **Activity Types**: 
  - 💰 Expenses added or modified
  - 💳 Payments made or received
  - 👥 Group memberships and invitations
  - 🤝 Friend requests and connections

#### Filtering Options
- **By Type**: Filter by expense, payment, group, or friend activities
- **By Date**: Today, this week, this month, or custom range
- **By Participants**: See activities involving specific people
- **By Groups**: Filter activities from specific groups

### 7. Profile Management

#### Personal Information
- **Basic Info**: Name, email, phone number
- **Profile Picture**: Upload and change your avatar
- **Bio**: Personal description or status
- **Statistics**: Your expense sharing statistics

#### Account Settings
- **Password**: Change your account password
- **Two-Factor Auth**: Enable additional security
- **Privacy**: Control who can see your profile
- **Notifications**: Manage your notification preferences

#### Data Management
- **Export Data**: Download all your data
- **Account Actions**: Deactivate or delete your account

### 8. Settings & Preferences

#### App Preferences
- **Theme**: Choose Light, Dark, or Auto theme
- **Language**: Select your preferred language
- **Currency**: Set your default currency
- **Date Format**: Choose how dates are displayed
- **Number Format**: Set decimal and thousand separators

#### Notification Settings
- **Push Notifications**: Enable/disable browser notifications
- **Email Notifications**: Control email alerts
- **Specific Alerts**: 
  - New expense notifications
  - Payment reminders
  - Group activity updates
  - Friend requests
- **Quiet Hours**: Set times to disable notifications

#### Privacy & Security
- **Profile Visibility**: Control who can see your profile
- **Online Status**: Show/hide when you're online
- **Friend Requests**: Allow or disable friend requests
- **Data Analytics**: Opt-in/out of usage analytics
- **Session Timeout**: Set automatic logout time

#### Advanced Settings
- **Beta Features**: Enable experimental features
- **Debug Mode**: Show additional debugging information
- **Cache Settings**: Manage local data storage
- **Offline Mode**: Enable offline functionality
- **Animation Effects**: Control UI animations
- **Auto-updates**: Automatic app updates

## 💡 Best Practices & Tips

### Expense Management Tips
1. **Regular Updates**: Add expenses as soon as they happen
2. **Clear Descriptions**: Use descriptive names for easy identification
3. **Proper Categories**: Categorize expenses for better tracking
4. **Receipt Photos**: Take photos of receipts for reference
5. **Regular Settlements**: Settle balances regularly to avoid confusion

### Group Management Tips
1. **Clear Group Purpose**: Set clear expectations for group expenses
2. **Regular Communication**: Discuss major expenses with group members
3. **Fair Splitting**: Use appropriate split methods for different expense types
4. **Group Rules**: Establish spending limits and approval processes
5. **Regular Reviews**: Review group expenses and balances regularly

### Security Best Practices
1. **Strong Passwords**: Use unique, strong passwords
2. **Enable 2FA**: Add two-factor authentication for extra security
3. **Regular Reviews**: Check your account activity regularly
4. **Privacy Settings**: Configure appropriate privacy settings
5. **Logout**: Always logout from shared computers

## 🛠️ Troubleshooting

### Common Issues
1. **App Won't Load**: Clear browser cache and cookies
2. **Calculation Errors**: Refresh the page and recalculate
3. **Mobile Issues**: Ensure you're using the latest browser version
4. **Notification Problems**: Check browser notification permissions
5. **Data Sync Issues**: Refresh the page or logout/login

### Performance Tips
1. **Clear Cache**: Regularly clear browser cache for better performance
2. **Close Unused Tabs**: Reduce browser memory usage
3. **Update Browser**: Use the latest browser version
4. **Check Connection**: Ensure stable internet connection
5. **Refresh Page**: Refresh if the app becomes sluggish

## 📊 Understanding Your Financial Data

### Balance Interpretation
- **Positive Balance**: You are owed money
- **Negative Balance**: You owe money
- **Zero Balance**: You're settled up

### Expense Analytics
- **Category Breakdown**: See where your money goes
- **Monthly Trends**: Track spending patterns over time
- **Group Comparisons**: Compare spending across different groups
- **Friend Analysis**: See spending patterns with different friends

### Export Options
- **Data Export**: Download all your data in JSON format
- **Expense Reports**: Generate expense reports for specific periods
- **Group Summaries**: Export group expense summaries
- **Tax Documentation**: Export data for tax purposes

## 🎯 Advanced Features

### Bulk Operations
- **Multiple Expense Selection**: Select and edit multiple expenses
- **Batch Category Updates**: Update categories for multiple expenses
- **Group Expense Management**: Manage multiple group expenses

### Smart Features
- **Expense Suggestions**: Smart category suggestions based on description
- **Recurring Expenses**: Set up recurring monthly expenses
- **Spending Alerts**: Get alerts when you exceed spending limits
- **Balance Notifications**: Automatic notifications for large balances

### Collaboration Features
- **Real-time Updates**: See changes as they happen
- **Group Chat**: Discuss expenses within groups (planned)
- **Expense Approval**: Require approval for large expenses (planned)
- **Multi-currency**: Handle expenses in different currencies (planned)

This comprehensive guide covers all aspects of using PaisaSplit effectively for managing shared expenses and maintaining healthy financial relationships with friends and groups.