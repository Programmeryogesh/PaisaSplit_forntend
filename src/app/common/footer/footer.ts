import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  newsletterEmail: string = '';
  currentYear: number = new Date().getFullYear();

  /**
   * Validate email format
   */
  isValidEmail(email: string): boolean {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Subscribe to newsletter
   */
  subscribeNewsletter(): void {
    if (this.isValidEmail(this.newsletterEmail)) {
      console.log('Subscribing email:', this.newsletterEmail);
      // Add newsletter subscription logic here
      // Show success message to user
      alert('Thank you for subscribing to our newsletter!');
      this.newsletterEmail = '';
    }
  }

  /**
   * Download from Play Store
   */
  downloadPlayStore(): void {
    console.log('Redirecting to Play Store...');
    // Add Play Store redirect logic
    // window.open('https://play.google.com/store/apps/details?id=com.paisasplit', '_blank');
  }

  /**
   * Download from App Store
   */
  downloadAppStore(): void {
    console.log('Redirecting to App Store...');
    // Add App Store redirect logic
    // window.open('https://apps.apple.com/app/paisasplit/id123456789', '_blank');
  }

  /**
   * Open social media links
   */
  openSocial(platform: string): void {
    console.log(`Opening ${platform}...`);
    const socialLinks = {
      facebook: 'https://facebook.com/paisasplit',
      twitter: 'https://twitter.com/paisasplit',
      instagram: 'https://instagram.com/paisasplit',
      linkedin: 'https://linkedin.com/company/paisasplit',
      youtube: 'https://youtube.com/@paisasplit'
    };
    
    // const url = socialLinks[platform as keyof typeof socialLinks];
    // if (url) {
    //   window.open(url, '_blank');
    // }
  }

  /**
   * Scroll to top of page
   */
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
