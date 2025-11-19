import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { JsonService } from '../../services/json.service';

@Component({
  selector: 'app-json-uploader',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './json-uploader.component.html',
  styleUrls: ['./json-uploader.component.scss']
})
export class JsonUploaderComponent {
  isDragging = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  // Repaired preview when heuristic succeeds
  repairedText = signal<string | null>(null);
  showRepairPreview = signal(false);
  errorPosition = signal<{ line: number; col: number; pos?: number } | null>(null);
  originalErrorMessage = signal<string | null>(null);

  constructor(
    private jsonService: JsonService,
    private router: Router
  ) {}

  /**
   * Handle file input change
   */
  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processFile(input.files[0]);
    }
  }

  /**
   * Handle drag over event
   */
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  /**
   * Handle drag leave event
   */
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  /**
   * Handle drop event
   */
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processFile(files[0]);
    }
  }

  /**
   * Process uploaded file
   */
  private processFile(file: File): void {
    this.errorMessage.set(null);
    this.successMessage.set(null);
    this.repairedText.set(null);
    this.showRepairPreview.set(false);
    this.errorPosition.set(null);
    this.originalErrorMessage.set(null);

    // Check file type
    if (!file.name.endsWith('.json')) {
      this.errorMessage.set('Please upload a valid JSON file (.json)');
      return;
    }

    // Read file
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const content = e.target?.result as string;
      this.validateAndStoreJson(content);
    };

    reader.onerror = () => {
      this.errorMessage.set('Error reading file');
    };

    reader.readAsText(file);
  }

  /**
   * Validate and store JSON
   */
  private validateAndStoreJson(jsonString: string): void {
    // Use validateAndTryRepair to provide a repaired candidate
    const result = this.jsonService.validateAndTryRepair(jsonString);

    if (result.isValid) {
      this.jsonService.setJsonData({ raw: jsonString, parsed: result.parsed, isValid: true, uploadedAt: new Date() });
      this.successMessage.set('JSON file uploaded successfully!');
      setTimeout(() => this.router.navigate(['/table']), 1000);
      return;
    }

    // Not valid
    this.originalErrorMessage.set(result.errorMessage ?? 'Invalid JSON');
    if (result.position != null) {
      const pos = result.position;
      const lc = this.jsonService.getLineColumnFromIndex(jsonString, pos);
      this.errorPosition.set({ line: lc.line, col: lc.col, pos });
    }

    if (result.repaired) {
      // Show repaired preview for user to accept
      this.repairedText.set(result.repaired);
      this.showRepairPreview.set(true);
      this.errorMessage.set(`Invalid JSON: ${result.errorMessage} — a repaired version is available.`);
    } else {
      this.errorMessage.set(`Invalid JSON: ${result.errorMessage}`);
    }
  }

  /**
   * Handle paste event
   */
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text');
    
    if (pastedText) {
      this.validateAndStoreJson(pastedText);
    }
  }

  /**
   * Accept the repaired JSON candidate
   */
  acceptRepaired(): void {
    const repaired = this.repairedText();
    if (!repaired) return;

    const jsonData = this.jsonService.validateJson(repaired);
    if (jsonData.isValid) {
      this.jsonService.setJsonData(jsonData);
      this.successMessage.set('Repaired JSON accepted and saved.');
      this.showRepairPreview.set(false);
      setTimeout(() => this.router.navigate(['/table']), 800);
    } else {
      this.errorMessage.set('Repaired JSON is still invalid.');
    }
  }

  rejectRepaired(): void {
    this.repairedText.set(null);
    this.showRepairPreview.set(false);
  }

  /**
   * Download the repaired JSON as a file
   */
  downloadRepaired(filename = `repaired-${Date.now()}.json`): void {
    const repaired = this.repairedText();
    if (!repaired) return;

    const blob = new Blob([repaired], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Trigger file input click
   */
  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput?.click();
  }
}
