import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { JsonService } from '../../services/json.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private jsonService = inject(JsonService);
  private themeService = inject(ThemeService);
  private router = inject(Router);

  hasData = this.jsonService.jsonData;
  isDarkMode = this.themeService.isDarkMode;

  /**
   * Toggle theme
   */
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  /**
   * Clear data and navigate to upload
   */
  clearData(): void {
    if (confirm('Are you sure you want to clear the current JSON data?')) {
      this.jsonService.clearJsonData();
      this.router.navigate(['/upload']);
    }
  }
}
