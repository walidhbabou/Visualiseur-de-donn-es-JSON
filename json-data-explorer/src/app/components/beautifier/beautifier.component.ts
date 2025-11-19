import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JsonService } from '../../services/json.service';

@Component({
  selector: 'app-beautifier',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './beautifier.component.html',
  styleUrls: ['./beautifier.component.scss']
})
export class BeautifierComponent implements OnInit {
  jsonText = signal('');
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  indentSize = signal(2);

  constructor(
    private jsonService: JsonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const jsonData = this.jsonService.jsonData();
    
    if (!jsonData || !jsonData.isValid) {
      this.router.navigate(['/upload']);
      return;
    }

    this.jsonText.set(jsonData.raw);
  }

  /**
   * Beautify JSON
   */
  beautify(): void {
    this.clearMessages();
    
    try {
      const beautified = this.jsonService.beautifyJson(this.jsonText(), this.indentSize());
      this.jsonText.set(beautified);
      this.showSuccess('JSON beautified successfully!');
    } catch (error) {
      this.showError(error instanceof Error ? error.message : 'Failed to beautify JSON');
    }
  }

  /**
   * Minify JSON
   */
  minify(): void {
    this.clearMessages();
    
    try {
      const minified = this.jsonService.minifyJson(this.jsonText());
      this.jsonText.set(minified);
      this.showSuccess('JSON minified successfully!');
    } catch (error) {
      this.showError(error instanceof Error ? error.message : 'Failed to minify JSON');
    }
  }

  /**
   * Copy to clipboard
   */
  async copyToClipboard(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.jsonText());
      this.showSuccess('Copied to clipboard!');
    } catch (error) {
      this.showError('Failed to copy to clipboard');
    }
  }

  /**
   * Validate JSON
   */
  validate(): void {
    this.clearMessages();
    
    const result = this.jsonService.validateJson(this.jsonText());
    
    if (result.isValid) {
      this.showSuccess('✓ Valid JSON');
    } else {
      this.showError(`✗ Invalid JSON: ${result.errorMessage}`);
    }
  }

  /**
   * Clear JSON
   */
  clear(): void {
    this.jsonText.set('');
    this.clearMessages();
  }

  /**
   * Update indent size
   */
  setIndentSize(size: number): void {
    this.indentSize.set(size);
  }

  /**
   * Show success message
   */
  private showSuccess(message: string): void {
    this.successMessage.set(message);
    setTimeout(() => this.successMessage.set(null), 3000);
  }

  /**
   * Show error message
   */
  private showError(message: string): void {
    this.errorMessage.set(message);
  }

  /**
   * Clear all messages
   */
  private clearMessages(): void {
    this.errorMessage.set(null);
    this.successMessage.set(null);
  }
}
