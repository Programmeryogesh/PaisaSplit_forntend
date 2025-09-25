import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  isMenuOpen = false;
  isProfileDropdownOpen = false;

  /**
   * Toggle mobile menu visibility
   */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    
    // Close profile dropdown when opening mobile menu
    if (this.isMenuOpen) {
      this.isProfileDropdownOpen = false;
    }
    
    // Prevent body scroll when menu is open
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  /**
   * Close mobile menu
   */
  closeMenu(): void {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
  }

  /**
   * Toggle profile dropdown visibility
   */
  toggleProfileDropdown(): void {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  /**
   * Close profile dropdown when clicking outside
   */
  closeProfileDropdown(): void {
    this.isProfileDropdownOpen = false;
  }

  /**
   * Handle logout functionality
   */
  logout(): void {
    // Add logout logic here
    console.log('Logging out...');
    this.closeProfileDropdown();
  }

  /**
   * Add expense button click handler
   */
  onAddExpense(): void {
    // Add expense creation logic here
    console.log('Adding new expense...');
  }
}
