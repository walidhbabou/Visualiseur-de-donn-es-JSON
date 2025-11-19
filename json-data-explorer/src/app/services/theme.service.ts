import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'json-explorer-theme';
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  
  // Signal for dark mode state
  private isDarkModeSignal = signal<boolean>(true); // Default to dark mode
  
  // Expose as readonly signal
  readonly isDarkMode = this.isDarkModeSignal.asReadonly();

  constructor() {
    this.loadTheme();
  }

  /**
   * Toggle theme between dark and light
   */
  toggleTheme(): void {
    const newValue = !this.isDarkModeSignal();
    this.isDarkModeSignal.set(newValue);
    this.applyTheme(newValue);
    this.saveTheme(newValue);
  }

  /**
   * Apply theme to document
   */
  private applyTheme(isDark: boolean): void {
    if (!this.isBrowser) return;
    
    if (isDark) {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    }
  }

  /**
   * Save theme preference to localStorage
   */
  private saveTheme(isDark: boolean): void {
    if (!this.isBrowser) return;
    localStorage.setItem(this.THEME_KEY, isDark ? 'dark' : 'light');
  }

  /**
   * Load theme from localStorage
   */
  private loadTheme(): void {
    if (!this.isBrowser) {
      this.applyTheme(true);
      return;
    }
    
    const stored = localStorage.getItem(this.THEME_KEY);
    const isDark = stored === 'light' ? false : true; // Default to dark
    this.isDarkModeSignal.set(isDark);
    this.applyTheme(isDark);
  }
}
