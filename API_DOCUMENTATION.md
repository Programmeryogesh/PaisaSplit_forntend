# 🏗️ PaisaSplit API Documentation & Data Models

## 📊 Core Data Models

### User Model
```typescript
interface User {
  id: string;                    // Unique user identifier
  email: string;                 // User's email address (unique)
  name: string;                  // Display name
  phone?: string;                // Optional phone number
  avatar?: string;               // Profile picture URL
  bio?: string;                  // User biography
  dateOfBirth?: string;          // ISO date string
  isVerified: boolean;           // Email verification status
  isPremium: boolean;            // Premium subscription status
  joinedDate: string;            // ISO date string
  lastLoginDate: string;         // ISO date string
  preferences: UserPreferences;  // User settings and preferences
  statistics: UserStatistics;    // Calculated user statistics
  createdAt: string;            // ISO date string
  updatedAt: string;            // ISO date string
}

interface UserPreferences {
  currency: string;              // ISO currency code (USD, EUR, etc.)
  language: string;              // Language code (en, es, fr, etc.)
  dateFormat: string;            // Date display format
  numberFormat: string;          // Number display format
  theme: 'light' | 'dark' | 'auto';
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}

interface UserStatistics {
  totalExpenses: number;         // Total number of expenses
  totalAmount: number;           // Total amount of all expenses
  totalGroups: number;           // Number of groups joined
  totalFriends: number;          // Number of friends
  averageExpenseAmount: number;  // Average expense amount
  monthlySpending: number;       // Current month spending
  topCategory: string;           // Most used expense category
}
```

### Group Model
```typescript
interface Group {
  id: string;                    // Unique group identifier
  name: string;                  // Group display name
  description?: string;          // Group description
  type: GroupType;               // Group category
  createdBy: string;             // User ID of creator
  members: GroupMember[];        // Array of group members
  expenses: string[];            // Array of expense IDs
  totalExpenses: number;         // Total number of expenses
  totalAmount: number;           // Total amount of all expenses
  isActive: boolean;            // Group status
  privacy: GroupPrivacy;         // Privacy settings
  settings: GroupSettings;       // Group configuration
  createdAt: string;            // ISO date string
  updatedAt: string;            // ISO date string
  lastActivity: string;         // ISO date string
}

type GroupType = 
  | 'household'    // Roommates, shared living
  | 'travel'       // Trips, vacations
  | 'event'        // Parties, celebrations
  | 'work'         // Office expenses
  | 'dining'       // Restaurant bills
  | 'shopping'     // Shared purchases
  | 'other';       // Miscellaneous

type GroupPrivacy = 
  | 'public'       // Anyone can see and join
  | 'private'      // Invite only
  | 'friends';     // Friends can see and request to join

interface GroupMember {
  userId: string;                // User ID
  role: 'admin' | 'member';     // Member role
  joinedAt: string;             // ISO date string
  balance: number;              // Current balance in group
  permissions: string[];        // Array of permission strings
}

interface GroupSettings {
  requireApproval: boolean;     // Require approval for expenses
  expenseLimit?: number;        // Maximum expense amount
  allowMemberInvites: boolean;  // Members can invite others
  autoSettle: boolean;          // Automatic settlement features
}
```

### Expense Model
```typescript
interface Expense {
  id: string;                   // Unique expense identifier
  description: string;          // Expense description
  amount: number;               // Total expense amount
  currency: string;             // ISO currency code
  category: ExpenseCategory;    // Expense category
  date: string;                 // ISO date string
  paidBy: string;              // User ID who paid
  groupId?: string;            // Optional group ID
  participants: string[];       // Array of participant user IDs
  splits: ExpenseSplit[];      // How expense is split
  receipt?: ExpenseReceipt;    // Optional receipt information
  notes?: string;              // Additional notes
  tags: string[];              // Array of tags
  isRecurring: boolean;        // Recurring expense flag
  recurringConfig?: RecurringConfig; // Recurring configuration
  status: ExpenseStatus;       // Expense status
  createdBy: string;           // User ID of creator
  createdAt: string;           // ISO date string
  updatedAt: string;           // ISO date string
}

type ExpenseCategory = 
  | 'food'          // Food and dining
  | 'transport'     // Transportation
  | 'accommodation' // Hotels, lodging
  | 'entertainment' // Movies, games
  | 'shopping'      // Purchases
  | 'healthcare'    // Medical expenses
  | 'household'     // Rent, utilities
  | 'education'     // Books, courses
  | 'work'          // Business expenses
  | 'travel'        // Trip expenses
  | 'other';        // Miscellaneous

type ExpenseStatus = 
  | 'active'        // Active expense
  | 'settled'       // Fully settled
  | 'cancelled'     // Cancelled expense
  | 'disputed';     // Under dispute

interface ExpenseSplit {
  userId: string;               // Participant user ID
  amount: number;               // Amount owed by this user
  percentage?: number;          // Percentage of total (for percentage splits)
  shares?: number;             // Number of shares (for share-based splits)
  isPaid: boolean;             // Payment status
  paidAt?: string;             // ISO date string when paid
}

interface ExpenseReceipt {
  url: string;                 // Receipt image URL
  extractedText?: string;      // OCR extracted text
  extractedAmount?: number;    // OCR extracted amount
  uploadedAt: string;          // ISO date string
}

interface RecurringConfig {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;            // Every N frequency units
  endDate?: string;            // Optional end date
  count?: number;             // Optional occurrence count
  lastGenerated?: string;      // Last generated occurrence
}
```

### Activity Model
```typescript
interface Activity {
  id: string;                  // Unique activity identifier
  type: ActivityType;          // Type of activity
  userId: string;              // User who performed the activity
  description: string;         // Human-readable description
  amount?: number;             // Associated amount (if applicable)
  currency?: string;           // Currency (if applicable)
  relatedEntityId?: string;    // ID of related entity (expense, group, etc.)
  relatedEntityType?: string;  // Type of related entity
  participants: string[];      // Array of involved user IDs
  metadata: ActivityMetadata;  // Additional activity data
  createdAt: string;          // ISO date string
}

type ActivityType = 
  | 'expense_created'     // New expense added
  | 'expense_updated'     // Expense modified
  | 'expense_deleted'     // Expense removed
  | 'payment_made'        // Payment recorded
  | 'group_created'       // New group created
  | 'group_joined'        // Joined a group
  | 'group_left'          // Left a group
  | 'friend_added'        // New friend connection
  | 'friend_removed'      // Friend connection removed
  | 'settlement_completed'; // Balance settlement

interface ActivityMetadata {
  [key: string]: any;         // Flexible metadata object
  previousValues?: any;        // Previous values (for updates)
  changedFields?: string[];    // Changed field names
  reason?: string;            // Reason for the activity
}
```

### Payment Model
```typescript
interface Payment {
  id: string;                 // Unique payment identifier
  fromUserId: string;         // Payer user ID
  toUserId: string;           // Payee user ID
  amount: number;             // Payment amount
  currency: string;           // ISO currency code
  description?: string;       // Payment description
  method: PaymentMethod;      // Payment method used
  status: PaymentStatus;      // Payment status
  groupId?: string;           // Associated group (if applicable)
  expenseIds: string[];       // Related expense IDs
  reference?: string;         // External reference number
  fees?: number;             // Transaction fees
  exchangeRate?: number;     // Currency exchange rate
  createdAt: string;         // ISO date string
  processedAt?: string;      // ISO date string
  completedAt?: string;      // ISO date string
}

type PaymentMethod = 
  | 'cash'           // Cash payment
  | 'bank_transfer'  // Bank transfer
  | 'credit_card'    // Credit card
  | 'paypal'         // PayPal
  | 'venmo'          // Venmo
  | 'stripe'         // Stripe
  | 'other';         // Other method

type PaymentStatus = 
  | 'pending'        // Payment initiated
  | 'processing'     // Being processed
  | 'completed'      // Successfully completed
  | 'failed'         // Payment failed
  | 'cancelled'      // Payment cancelled
  | 'refunded';      // Payment refunded
```

### Friendship Model
```typescript
interface Friendship {
  id: string;                 // Unique friendship identifier
  user1Id: string;            // First user ID (alphabetically)
  user2Id: string;            // Second user ID (alphabetically)
  status: FriendshipStatus;   // Friendship status
  initiatedBy: string;        // User ID who initiated
  acceptedAt?: string;        // ISO date string when accepted
  createdAt: string;          // ISO date string
  updatedAt: string;          // ISO date string
}

type FriendshipStatus = 
  | 'pending'        // Request sent, awaiting response
  | 'accepted'       // Friendship established
  | 'blocked'        // One user blocked the other
  | 'declined';      // Request was declined

interface FriendRequest {
  id: string;                 // Unique request identifier
  fromUserId: string;         // Requester user ID
  toUserId: string;           // Target user ID
  message?: string;           // Optional personal message
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;          // ISO date string
  respondedAt?: string;       // ISO date string
}
```

## 🔗 API Endpoints (Planned Implementation)

### Authentication Endpoints
```typescript
// POST /api/auth/login
interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
  expiresAt: string;
}

// POST /api/auth/register
interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// POST /api/auth/refresh
interface RefreshRequest {
  refreshToken: string;
}

// POST /api/auth/logout
interface LogoutRequest {
  token: string;
}
```

### User Endpoints
```typescript
// GET /api/users/me
interface UserProfileResponse {
  user: User;
}

// PUT /api/users/me
interface UpdateUserRequest {
  name?: string;
  phone?: string;
  bio?: string;
  avatar?: string;
  preferences?: Partial<UserPreferences>;
}

// GET /api/users/:id
interface GetUserResponse {
  user: Pick<User, 'id' | 'name' | 'avatar' | 'isVerified'>;
}

// GET /api/users/search?q=query
interface SearchUsersResponse {
  users: Pick<User, 'id' | 'name' | 'email' | 'avatar'>[];
}
```

### Group Endpoints
```typescript
// GET /api/groups
interface GetGroupsResponse {
  groups: Group[];
  pagination: PaginationInfo;
}

// POST /api/groups
interface CreateGroupRequest {
  name: string;
  description?: string;
  type: GroupType;
  privacy: GroupPrivacy;
  initialMembers?: string[];
}

// GET /api/groups/:id
interface GetGroupResponse {
  group: Group;
  members: User[];
  expenses: Expense[];
}

// PUT /api/groups/:id
interface UpdateGroupRequest {
  name?: string;
  description?: string;
  type?: GroupType;
  privacy?: GroupPrivacy;
  settings?: Partial<GroupSettings>;
}

// POST /api/groups/:id/members
interface AddGroupMemberRequest {
  userId: string;
  role?: 'member' | 'admin';
}

// DELETE /api/groups/:id/members/:userId
// Remove member from group
```

### Expense Endpoints
```typescript
// GET /api/expenses
interface GetExpensesQuery {
  groupId?: string;
  category?: ExpenseCategory;
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
}

interface GetExpensesResponse {
  expenses: Expense[];
  pagination: PaginationInfo;
}

// POST /api/expenses
interface CreateExpenseRequest {
  description: string;
  amount: number;
  currency: string;
  category: ExpenseCategory;
  date: string;
  groupId?: string;
  participants: string[];
  splitMethod: 'equal' | 'exact' | 'percentage' | 'shares';
  splits: ExpenseSplit[];
  receipt?: File;
  notes?: string;
}

// PUT /api/expenses/:id
interface UpdateExpenseRequest {
  description?: string;
  amount?: number;
  category?: ExpenseCategory;
  date?: string;
  splits?: ExpenseSplit[];
  notes?: string;
}

// DELETE /api/expenses/:id
// Soft delete expense
```

### Activity Endpoints
```typescript
// GET /api/activities
interface GetActivitiesQuery {
  type?: ActivityType;
  startDate?: string;
  endDate?: string;
  groupId?: string;
  limit?: number;
  offset?: number;
}

interface GetActivitiesResponse {
  activities: Activity[];
  pagination: PaginationInfo;
}
```

### Payment Endpoints
```typescript
// POST /api/payments
interface CreatePaymentRequest {
  toUserId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  description?: string;
  expenseIds?: string[];
}

// GET /api/payments
interface GetPaymentsResponse {
  payments: Payment[];
  pagination: PaginationInfo;
}
```

### Friend Endpoints
```typescript
// GET /api/friends
interface GetFriendsResponse {
  friends: User[];
}

// POST /api/friends/request
interface SendFriendRequestRequest {
  toUserId: string;
  message?: string;
}

// POST /api/friends/respond
interface RespondFriendRequestRequest {
  requestId: string;
  action: 'accept' | 'decline';
}

// GET /api/friends/requests
interface GetFriendRequestsResponse {
  sent: FriendRequest[];
  received: FriendRequest[];
}

// DELETE /api/friends/:userId
// Remove friend connection
```

## 📊 Response Formats

### Standard Response Format
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  pagination?: PaginationInfo;
  timestamp: string;
}

interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
```

### Error Response Format
```typescript
interface ErrorResponse {
  success: false;
  error: {
    code: string;          // Error code (e.g., 'INVALID_INPUT')
    message: string;       // Human-readable error message
    field?: string;        // Specific field that caused error
    details?: any;         // Additional error details
  };
  timestamp: string;       // ISO date string
}

// Common error codes
type ErrorCode = 
  | 'INVALID_INPUT'      // Invalid request data
  | 'UNAUTHORIZED'       // Authentication required
  | 'FORBIDDEN'          // Access denied
  | 'NOT_FOUND'          // Resource not found
  | 'CONFLICT'           // Resource conflict
  | 'RATE_LIMITED'       // Too many requests
  | 'SERVER_ERROR';      // Internal server error
```

## 🔧 Calculation Algorithms

### Split Calculation Functions
```typescript
class ExpenseCalculator {
  // Equal split calculation
  static calculateEqualSplit(amount: number, participants: number): number {
    return Math.round((amount / participants) * 100) / 100;
  }

  // Percentage split calculation
  static calculatePercentageSplit(amount: number, percentage: number): number {
    return Math.round((amount * percentage / 100) * 100) / 100;
  }

  // Share-based split calculation
  static calculateShareSplit(
    amount: number, 
    userShares: number, 
    totalShares: number
  ): number {
    return Math.round((amount * userShares / totalShares) * 100) / 100;
  }

  // Balance calculation between two users
  static calculateUserBalance(
    userId: string, 
    expenses: Expense[]
  ): number {
    return expenses.reduce((balance, expense) => {
      const userSplit = expense.splits.find(s => s.userId === userId);
      if (!userSplit) return balance;

      if (expense.paidBy === userId) {
        // User paid for this expense
        return balance + (expense.amount - userSplit.amount);
      } else {
        // User owes for this expense
        return balance - userSplit.amount;
      }
    }, 0);
  }

  // Group balance calculation
  static calculateGroupBalances(group: Group, expenses: Expense[]): Map<string, number> {
    const balances = new Map<string, number>();
    
    // Initialize all members with 0 balance
    group.members.forEach(member => {
      balances.set(member.userId, 0);
    });

    // Calculate balances based on expenses
    expenses.forEach(expense => {
      expense.splits.forEach(split => {
        const currentBalance = balances.get(split.userId) || 0;
        
        if (expense.paidBy === split.userId) {
          // User paid more than their share
          balances.set(split.userId, currentBalance + (expense.amount - split.amount));
        } else {
          // User owes money
          balances.set(split.userId, currentBalance - split.amount);
        }
      });
    });

    return balances;
  }
}
```

This comprehensive API documentation and data model specification provides the foundation for building a robust, scalable expense-sharing application with clear data structures and well-defined interfaces.