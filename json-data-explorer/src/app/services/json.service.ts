import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { JsonData } from '../models/json-data.interface';
import { JsonNode } from '../models/json-node.interface';
import { TableColumn, JsonTableRow } from '../models/json-table-row.interface';

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  private readonly STORAGE_KEY = 'json-data-explorer-data';
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  
  // Signal for reactive state management
  private jsonDataSignal = signal<JsonData | null>(null);
  
  // Expose as readonly signal
  readonly jsonData = this.jsonDataSignal.asReadonly();

  constructor() {
    this.loadFromLocalStorage();
  }

  /**
   * Validate and parse JSON string
   */
  validateJson(jsonString: string): JsonData {
    try {
      const parsed = JSON.parse(jsonString);
      return {
        raw: jsonString,
        parsed: parsed,
        isValid: true,
        uploadedAt: new Date()
      };
    } catch (error) {
      return {
        raw: jsonString,
        parsed: null,
        isValid: false,
        errorMessage: error instanceof Error ? error.message : 'Invalid JSON'
      };
    }
  }

  /**
   * Set JSON data and save to localStorage
   */
  setJsonData(jsonData: JsonData): void {
    this.jsonDataSignal.set(jsonData);
    this.saveToLocalStorage();
  }

  /**
   * Clear JSON data
   */
  clearJsonData(): void {
    this.jsonDataSignal.set(null);
    if (this.isBrowser) {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  /**
   * Save to localStorage
   */
  private saveToLocalStorage(): void {
    if (!this.isBrowser) return;
    
    const data = this.jsonDataSignal();
    if (data) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    }
  }

  /**
   * Load from localStorage
   */
  private loadFromLocalStorage(): void {
    if (!this.isBrowser) return;
    
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        this.jsonDataSignal.set(data);
      } catch (error) {
        console.error('Failed to load from localStorage', error);
      }
    }
  }

  /**
   * Compute line/column from character index
   */
  getLineColumnFromIndex(text: string, index: number) {
    const safeIndex = Math.max(0, Math.min(index || 0, text.length));
    const lines = text.slice(0, safeIndex).split('\n');
    const line = lines.length;
    const col = (lines[lines.length - 1] || '').length + 1;
    return { line, col };
  }

  /**
   * Try simple heuristic repairs on common JSON mistakes:
   * - remove JS comments
   * - remove trailing commas
   * - convert single quotes to double quotes
   * - quote unquoted keys (naive)
   */
  tryRepairJson(input: string): string {
    let s = input;

    // 1) Remove block comments /* ... */
    s = s.replace(/\/\*[\s\S]*?\*\//g, '');

    // 2) Remove single-line comments //... but avoid protocol // (naive: keep http:// etc.)
    s = s.replace(/(^|[^:\\])\/\/.*$/gm, '$1');

    // 3) Remove trailing commas before } or ]
    s = s.replace(/,\s*(?=[}\]])/g, '');

    // 4) Replace single quotes around strings with double quotes (naive)
    s = s.replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g, '"$1"');

    // 5) Quote unquoted object keys (naive): { key: -> { "key":
    s = s.replace(/([\{,\s])(\w[\w\-]*)\s*:/g, '$1"$2":');

    return s;
  }

  /**
   * Validate JSON and attempt repair if invalid.
   * Returns an object with parsed result (if any) and repaired string when successful.
   */
  validateAndTryRepair(jsonString: string): { isValid: boolean; parsed: any | null; repaired?: string | null; errorMessage?: string | null; position?: number | null } {
    try {
      const parsed = JSON.parse(jsonString);
      return { isValid: true, parsed, repaired: null };
    } catch (err: any) {
      const message = err && err.message ? String(err.message) : 'Invalid JSON';

      // Try to extract a position from common error messages
      let pos: number | null = null;
      const m = message.match(/position\s+(\d+)/i) || message.match(/at\s+position\s+(\d+)/i) || message.match(/column\s+(\d+)/i);
      if (m && m[1]) {
        const n = Number(m[1]);
        if (!Number.isNaN(n)) pos = n;
      }

      // Try heuristic repair
      try {
        const repaired = this.tryRepairJson(jsonString);
        const parsed2 = JSON.parse(repaired);
        return { isValid: false, parsed: parsed2, repaired, errorMessage: message, position: pos };
      } catch (err2) {
        return { isValid: false, parsed: null, repaired: null, errorMessage: message, position: pos };
      }
    }
  }

  /**
   * Extract columns from JSON data for table view
   */
  extractColumns(data: any): TableColumn[] {
    if (!data) return [];

    const columns: TableColumn[] = [];
    const samples = Array.isArray(data) ? data : [data];

    if (samples.length === 0) return [];

    // Get all unique keys from all objects
    const allKeys = new Set<string>();
    samples.forEach((item: any) => {
      if (typeof item === 'object' && item !== null) {
        Object.keys(item).forEach(key => allKeys.add(key));
      }
    });

    // Create columns with type detection
    allKeys.forEach(key => {
      const sampleValue = samples.find((item: any) => item[key] !== undefined)?.[key];
      const type = this.detectType(sampleValue);
      
      columns.push({
        key: key,
        header: this.formatHeader(key),
        type: type
      });
    });

    return columns;
  }

  /**
   * Generate table rows from JSON data
   */
  generateTableRows(data: any): JsonTableRow[] {
    if (!data) return [];

    if (Array.isArray(data)) {
      return data.map((item, index) => {
        if (typeof item === 'object' && item !== null) {
          return { ...item };
        }
        return { value: item, index: index };
      });
    } else if (typeof data === 'object' && data !== null) {
      // Single object - convert to single row
      return [{ ...data }];
    }

    return [];
  }

  /**
   * Build tree structure recursively
   */
  buildTreeRecursively(data: any, key: string = 'root', level: number = 0): JsonNode {
    const type = this.detectType(data);
    
    const node: JsonNode = {
      key: key,
      value: data,
      type: type,
      expanded: level < 2, // Auto-expand first 2 levels
      level: level
    };

    if (type === 'object' && data !== null) {
      node.children = Object.keys(data).map(childKey => 
        this.buildTreeRecursively(data[childKey], childKey, level + 1)
      );
    } else if (type === 'array') {
      node.children = data.map((item: any, index: number) => 
        this.buildTreeRecursively(item, `[${index}]`, level + 1)
      );
    }

    return node;
  }

  /**
   * Beautify JSON string
   */
  beautifyJson(jsonString: string, indent: number = 2): string {
    try {
      const parsed = JSON.parse(jsonString);
      return JSON.stringify(parsed, null, indent);
    } catch (error) {
      throw new Error('Cannot beautify invalid JSON');
    }
  }

  /**
   * Minify JSON string
   */
  minifyJson(jsonString: string): string {
    try {
      const parsed = JSON.parse(jsonString);
      return JSON.stringify(parsed);
    } catch (error) {
      throw new Error('Cannot minify invalid JSON');
    }
  }

  /**
   * Detect type of value
   */
  private detectType(value: any): JsonNode['type'] {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    if (typeof value === 'object') return 'object';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'boolean') return 'boolean';
    return 'string';
  }

  /**
   * Format header for display
   */
  private formatHeader(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/[_-]/g, ' ')
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  /**
   * Search in JSON data
   */
  searchInJson(data: any, searchTerm: string): any {
    if (!searchTerm) return data;

    const search = searchTerm.toLowerCase();

    if (Array.isArray(data)) {
      return data.filter(item => this.matchesSearch(item, search));
    } else if (typeof data === 'object' && data !== null) {
      const result: any = {};
      Object.keys(data).forEach(key => {
        if (key.toLowerCase().includes(search) || 
            this.matchesSearch(data[key], search)) {
          result[key] = data[key];
        }
      });
      return Object.keys(result).length > 0 ? result : null;
    }

    return null;
  }

  /**
   * Check if value matches search term
   */
  private matchesSearch(value: any, searchTerm: string): boolean {
    if (value === null || value === undefined) return false;
    
    const valueStr = String(value).toLowerCase();
    return valueStr.includes(searchTerm);
  }
}
