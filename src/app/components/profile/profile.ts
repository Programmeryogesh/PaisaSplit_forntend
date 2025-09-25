import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  bio?: string;
  avatar?: string;
  isVerified: boolean;
  isPremium: boolean;
  joinedDate: string;
  totalFriends: number;
  totalGroups: number;
  totalExpenses: number;
  totalAmount: number;
}

interface UserPreferences {
  currency: string;
  language: string;
  dateFormat: string;
  theme: string;
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  newExpenses: boolean;
  paymentReminders: boolean;
  friendRequests: boolean;
  groupInvites: boolean;
}

interface PrivacySettings {
  profileVisibility: string;
  twoFactorEnabled: boolean;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordValidation {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {
  userProfile: UserProfile = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    bio: 'Love traveling and sharing expenses with friends. Always up for new adventures!',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    isVerified: true,
    isPremium: false,
    joinedDate: '2023-01-15',
    totalFriends: 28,
    totalGroups: 12,
    totalExpenses: 156,
    totalAmount: 4825.50
  };

  userPreferences: UserPreferences = {
    currency: 'USD',
    language: 'en',
    dateFormat: 'MM/DD/YYYY',
    theme: 'light'
  };

  notificationSettings: NotificationSettings = {
    email: true,
    push: true,
    newExpenses: true,
    paymentReminders: true,
    friendRequests: true,
    groupInvites: true
  };

  privacySettings: PrivacySettings = {
    profileVisibility: 'friends',
    twoFactorEnabled: false
  };

  passwordForm: PasswordForm = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  passwordValidation: PasswordValidation = {
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false
  };

  editModes = {
    personal: false
  };

  showChangePasswordModal = false;

  ngOnInit(): void {
    this.loadUserProfile();
  }

  // Profile Management
  loadUserProfile(): void {
    // In a real app, this would fetch from a service
    console.log('Loading user profile...');
  }

  getInitials(name: string): string {
    return name.split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: this.userPreferences.currency
    }).format(amount);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      year: 'numeric'
    }).format(date);
  }

  // Edit Mode Management
  toggleEditMode(section: string): void {
    if (section === 'personal') {
      this.editModes.personal = !this.editModes.personal;
      
      if (!this.editModes.personal) {
        this.savePersonalInfo();
      }
    }
  }

  savePersonalInfo(): void {
    // In a real app, this would save to a service
    console.log('Saving personal information...', this.userProfile);
    // Show success message
    this.showToast('Personal information updated successfully!', 'success');
  }

  // Avatar Management
  changeAvatar(): void {
    // In a real app, this would open file picker or camera
    console.log('Opening avatar picker...');
    // Simulate avatar change
    const avatars = [
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    ];
    
    const currentIndex = avatars.indexOf(this.userProfile.avatar || '');
    const nextIndex = (currentIndex + 1) % avatars.length;
    this.userProfile.avatar = avatars[nextIndex];
    
    this.showToast('Profile picture updated!', 'success');
  }

  // Notification Settings
  updateNotificationSettings(): void {
    // In a real app, this would save to a service
    console.log('Updating notification settings...', this.notificationSettings);
  }

  // Security Actions
  changePassword(): void {
    this.showChangePasswordModal = true;
    this.resetPasswordForm();
  }

  closeChangePasswordModal(): void {
    this.showChangePasswordModal = false;
    this.resetPasswordForm();
  }

  resetPasswordForm(): void {
    this.passwordForm = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
    this.updatePasswordValidation();
  }

  submitPasswordChange(): void {
    if (this.isPasswordValid()) {
      // In a real app, this would call a service
      console.log('Changing password...');
      this.showToast('Password changed successfully!', 'success');
      this.closeChangePasswordModal();
    }
  }

  updatePasswordValidation(): void {
    const password = this.passwordForm.newPassword;
    
    this.passwordValidation = {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };
  }

  isPasswordValid(): boolean {
    const validation = this.passwordValidation;
    const passwordsMatch = this.passwordForm.newPassword === this.passwordForm.confirmPassword;
    const currentPasswordProvided = this.passwordForm.currentPassword.length > 0;
    
    return validation.minLength && 
           validation.hasUppercase && 
           validation.hasLowercase && 
           validation.hasNumber && 
           validation.hasSpecial && 
           passwordsMatch && 
           currentPasswordProvided;
  }

  setup2FA(): void {
    // In a real app, this would navigate to 2FA setup
    console.log('Setting up 2FA...');
    this.showToast('2FA setup initiated. Check your email for instructions.', 'info');
  }

  manageSessions(): void {
    // In a real app, this would show active sessions
    console.log('Managing login sessions...');
    this.showToast('Session management coming soon!', 'info');
  }

  requestDataDownload(): void {
    // In a real app, this would initiate data export
    console.log('Requesting data download...');
    this.showToast('Data download request submitted. You will receive an email when ready.', 'info');
  }

  exportData(): void {
    // In a real app, this would export user data
    console.log('Exporting user data...');
    const data = {
      profile: this.userProfile,
      preferences: this.userPreferences,
      notifications: this.notificationSettings,
      privacy: this.privacySettings
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'paisasplit-profile-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    this.showToast('Profile data exported successfully!', 'success');
  }

  // Danger Zone Actions
  deactivateAccount(): void {
    if (confirm('Are you sure you want to deactivate your account? You can reactivate it later by logging in.')) {
      // In a real app, this would call a service
      console.log('Deactivating account...');
      this.showToast('Account deactivation process started.', 'warning');
    }
  }

  deleteAccount(): void {
    const confirmation = prompt('Type "DELETE" to confirm account deletion:');
    if (confirmation === 'DELETE') {
      // In a real app, this would call a service
      console.log('Deleting account...');
      this.showToast('Account deletion process started. This action cannot be undone.', 'error');
    } else if (confirmation !== null) {
      this.showToast('Account deletion cancelled.', 'info');
    }
  }

  // Utility Methods
  private showToast(message: string, type: 'success' | 'error' | 'warning' | 'info'): void {
    // In a real app, this would use a toast service
    console.log(`${type.toUpperCase()}: ${message}`);
    
    // Simple alert for now
    setTimeout(() => {
      alert(`${type.toUpperCase()}: ${message}`);
    }, 100);
  }
}
