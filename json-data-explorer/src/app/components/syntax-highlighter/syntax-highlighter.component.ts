import { Component, signal, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { JsonService } from '../../services/json.service';
import hljs from 'highlight.js';

@Component({
  selector: 'app-syntax-highlighter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './syntax-highlighter.component.html',
  styleUrls: ['./syntax-highlighter.component.scss']
})
export class SyntaxHighlighterComponent implements OnInit, AfterViewInit {
  @ViewChild('codeBlock') codeBlock!: ElementRef<HTMLElement>;
  
  jsonText = signal('');
  highlightedCode = signal('');
  successMessage = signal<string | null>(null);

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

    // Beautify for better display
    const beautified = JSON.stringify(jsonData.parsed, null, 2);
    this.jsonText.set(beautified);
  }

  ngAfterViewInit(): void {
    this.highlightJson();
  }

  /**
   * Highlight JSON using highlight.js
   */
  highlightJson(): void {
    if (this.codeBlock && this.jsonText()) {
      const highlighted = hljs.highlight(this.jsonText(), { language: 'json' }).value;
      this.highlightedCode.set(highlighted);
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
      console.error('Failed to copy:', error);
    }
  }

  /**
   * Download as JSON file
   */
  downloadJson(): void {
    const blob = new Blob([this.jsonText()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `json-export-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    this.showSuccess('File downloaded!');
  }

  /**
   * Show success message
   */
  private showSuccess(message: string): void {
    this.successMessage.set(message);
    setTimeout(() => this.successMessage.set(null), 2000);
  }
}
