import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AppSettings {
  theme: string;
  language: string;
  defaultCurrency: string;
  dateFormat: string;
  numberFormat: string;
  startOfWeek: string;
}

interface ExpenseSettings {
  autoSaveDrafts: boolean;
  defaultSplitMethod: string;
  receiptScanning: boolean;
  smartCategories: boolean;
  expenseReminders: boolean;
  roundSmallAmounts: boolean;
}

interface NotificationSettings {
  pushEnabled: boolean;
  emailEnabled: boolean;
  newExpenseAlerts: boolean;
  paymentReminders: boolean;
  groupActivity: boolean;
  friendRequests: boolean;
  soundEnabled: boolean;
  quietHoursEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
}

interface PrivacySettings {
  profileVisibility: string;
  showOnlineStatus: boolean;
  allowFriendRequests: boolean;
  autoAcceptGroupInvites: boolean;
  dataAnalytics: boolean;
  sessionTimeout: string;
}

interface AdvancedSettings {
  betaFeatures: boolean;
  debugMode: boolean;
  cacheSize: string;
  offlineMode: boolean;
  animationEffects: boolean;
  autoUpdate: boolean;
}

interface AppInfo {
  version: string;
  buildNumber: string;
  lastUpdated: string;
  platform: string;
}

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class Settings implements OnInit {
  appSettings: AppSettings = {
    theme: 'light',
    language: 'en',
    defaultCurrency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    numberFormat: '1,234.56',
    startOfWeek: 'sunday'
  };

  expenseSettings: ExpenseSettings = {
    autoSaveDrafts: true,
    defaultSplitMethod: 'equal',
    receiptScanning: true,
    smartCategories: true,
    expenseReminders: false,
    roundSmallAmounts: true
  };

  notificationSettings: NotificationSettings = {
    pushEnabled: true,
    emailEnabled: true,
    newExpenseAlerts: true,
    paymentReminders: true,
    groupActivity: true,
    friendRequests: true,
    soundEnabled: true,
    quietHoursEnabled: false,
    quietHoursStart: '22:00',
    quietHoursEnd: '08:00'
  };

  privacySettings: PrivacySettings = {
    profileVisibility: 'friends',
    showOnlineStatus: true,
    allowFriendRequests: true,
    autoAcceptGroupInvites: false,
    dataAnalytics: true,
    sessionTimeout: '4h'
  };

  advancedSettings: AdvancedSettings = {
    betaFeatures: false,
    debugMode: false,
    cacheSize: 'medium',
    offlineMode: true,
    animationEffects: true,
    autoUpdate: true
  };

  appInfo: AppInfo = {
    version: '2.1.4',
    buildNumber: '20240924.1',
    lastUpdated: '2024-09-24',
    platform: 'Web'
  };

  ngOnInit(): void {
    this.loadSettings();
  }

  // Settings Management
  loadSettings(): void {
    // In a real app, this would load from localStorage or API
    const savedSettings = localStorage.getItem('paisasplit-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        this.appSettings = { ...this.appSettings, ...parsed.app };
        this.expenseSettings = { ...this.expenseSettings, ...parsed.expense };
        this.notificationSettings = { ...this.notificationSettings, ...parsed.notification };
        this.privacySettings = { ...this.privacySettings, ...parsed.privacy };
        this.advancedSettings = { ...this.advancedSettings, ...parsed.advanced };
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }

  saveSettings(): void {
    // In a real app, this would save to localStorage or API
    const allSettings = {
      app: this.appSettings,
      expense: this.expenseSettings,
      notification: this.notificationSettings,
      privacy: this.privacySettings,
      advanced: this.advancedSettings
    };
    
    localStorage.setItem('paisasplit-settings', JSON.stringify(allSettings));
    this.showToast('Settings saved successfully!', 'success');
  }

  // App Settings
  updateTheme(theme: string): void {
    this.appSettings.theme = theme;
    this.applyTheme(theme);
    this.saveSettings();
  }

  private applyTheme(theme: string): void {
    // In a real app, this would apply the theme to the document
    document.documentElement.setAttribute('data-theme', theme);
    console.log(`Applied theme: ${theme}`);
  }

  updateLanguage(): void {
    // In a real app, this would update the app language
    console.log(`Language changed to: ${this.appSettings.language}`);
    this.saveSettings();
    this.showToast('Language updated. Restart app to see changes.', 'info');
  }

  updateCurrency(): void {
    console.log(`Currency changed to: ${this.appSettings.defaultCurrency}`);
    this.saveSettings();
  }

  updateDateFormat(): void {
    console.log(`Date format changed to: ${this.appSettings.dateFormat}`);
    this.saveSettings();
  }

  updateNumberFormat(): void {
    console.log(`Number format changed to: ${this.appSettings.numberFormat}`);
    this.saveSettings();
  }

  // Expense Settings
  updateExpenseSettings(): void {
    console.log('Expense settings updated:', this.expenseSettings);
    this.saveSettings();
  }

  // Notification Settings
  updateNotifications(): void {
    console.log('Notification settings updated:', this.notificationSettings);
    
    // Handle permission requests for push notifications
    if (this.notificationSettings.pushEnabled && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          if (permission !== 'granted') {
            this.notificationSettings.pushEnabled = false;
            this.showToast('Notification permission denied', 'warning');
          }
        });
      }
    }
    
    this.saveSettings();
  }

  testNotification(): void {
    if (this.notificationSettings.pushEnabled && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('PaisaSplit Test', {
          body: 'This is a test notification from PaisaSplit!',
          icon: '/favicon.ico'
        });
      } else {
        this.showToast('Notifications not enabled or permission not granted', 'warning');
      }
    } else {
      this.showToast('Push notifications not supported on this device', 'info');
    }
  }

  // Privacy Settings
  updatePrivacySettings(): void {
    console.log('Privacy settings updated:', this.privacySettings);
    this.saveSettings();
  }

  // Advanced Settings
  updateAdvancedSettings(): void {
    console.log('Advanced settings updated:', this.advancedSettings);
    
    // Handle debug mode changes
    if (this.advancedSettings.debugMode) {
      console.log('Debug mode enabled');
      // In a real app, this would enable debug logging
    }
    
    // Handle animation effects
    if (!this.advancedSettings.animationEffects) {
      document.documentElement.style.setProperty('--animation-duration', '0s');
    } else {
      document.documentElement.style.removeProperty('--animation-duration');
    }
    
    this.saveSettings();
  }

  // Data Management
  exportData(): void {
    const exportData = {
      settings: {
        app: this.appSettings,
        expense: this.expenseSettings,
        notification: this.notificationSettings,
        privacy: this.privacySettings,
        advanced: this.advancedSettings
      },
      exportDate: new Date().toISOString(),
      version: this.appInfo.version
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: 'application/json' 
    });
    
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `paisasplit-settings-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    this.showToast('Settings exported successfully!', 'success');
  }

  importData(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          try {
            const importedData = JSON.parse(e.target.result);
            
            if (importedData.settings) {
              this.appSettings = { ...this.appSettings, ...importedData.settings.app };
              this.expenseSettings = { ...this.expenseSettings, ...importedData.settings.expense };
              this.notificationSettings = { ...this.notificationSettings, ...importedData.settings.notification };
              this.privacySettings = { ...this.privacySettings, ...importedData.settings.privacy };
              this.advancedSettings = { ...this.advancedSettings, ...importedData.settings.advanced };
              
              this.saveSettings();
              this.showToast('Settings imported successfully!', 'success');
            } else {
              this.showToast('Invalid settings file format', 'error');
            }
          } catch (error) {
            this.showToast('Error importing settings file', 'error');
            console.error('Import error:', error);
          }
        };
        reader.readAsText(file);
      }
    };
    
    input.click();
  }

  getCacheSize(): string {
    // In a real app, this would calculate actual cache size
    const sizes = {
      small: '42MB',
      medium: '78MB',
      large: '156MB'
    };
    return sizes[this.advancedSettings.cacheSize as keyof typeof sizes] || '78MB';
  }

  clearCache(): void {
    if (confirm('Are you sure you want to clear the cache? This will remove temporarily stored data.')) {
      // In a real app, this would clear actual cache
      if ('caches' in window) {
        caches.keys().then(cacheNames => {
          return Promise.all(
            cacheNames.map(cacheName => caches.delete(cacheName))
          );
        }).then(() => {
          this.showToast('Cache cleared successfully!', 'success');
        });
      } else {
        localStorage.removeItem('paisasplit-cache');
        this.showToast('Cache cleared successfully!', 'success');
      }
    }
  }

  resetAllSettings(): void {
    const confirmation = prompt('Type "RESET" to confirm resetting all settings:');
    if (confirmation === 'RESET') {
      // Reset all settings to defaults
      this.appSettings = {
        theme: 'light',
        language: 'en',
        defaultCurrency: 'USD',
        dateFormat: 'MM/DD/YYYY',
        numberFormat: '1,234.56',
        startOfWeek: 'sunday'
      };

      this.expenseSettings = {
        autoSaveDrafts: true,
        defaultSplitMethod: 'equal',
        receiptScanning: true,
        smartCategories: true,
        expenseReminders: false,
        roundSmallAmounts: true
      };

      this.notificationSettings = {
        pushEnabled: true,
        emailEnabled: true,
        newExpenseAlerts: true,
        paymentReminders: true,
        groupActivity: true,
        friendRequests: true,
        soundEnabled: true,
        quietHoursEnabled: false,
        quietHoursStart: '22:00',
        quietHoursEnd: '08:00'
      };

      this.privacySettings = {
        profileVisibility: 'friends',
        showOnlineStatus: true,
        allowFriendRequests: true,
        autoAcceptGroupInvites: false,
        dataAnalytics: true,
        sessionTimeout: '4h'
      };

      this.advancedSettings = {
        betaFeatures: false,
        debugMode: false,
        cacheSize: 'medium',
        offlineMode: true,
        animationEffects: true,
        autoUpdate: true
      };

      this.saveSettings();
      this.showToast('All settings have been reset to defaults!', 'success');
    } else if (confirmation !== null) {
      this.showToast('Settings reset cancelled.', 'info');
    }
  }

  resetToDefaults(): void {
    if (confirm('Are you sure you want to reset all settings to their default values?')) {
      this.resetAllSettings();
    }
  }

  // App Information
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }

  openLink(type: string): void {
    const links = {
      privacy: 'https://paisasplit.com/privacy',
      terms: 'https://paisasplit.com/terms',
      support: 'https://paisasplit.com/support',
      feedback: 'mailto:feedback@paisasplit.com'
    };

    const url = links[type as keyof typeof links];
    if (url) {
      window.open(url, '_blank');
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
