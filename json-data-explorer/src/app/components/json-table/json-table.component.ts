import { Component, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JsonService } from '../../services/json.service';
import { JsonTableRow, TableColumn } from '../../models/json-table-row.interface';

@Component({
  selector: 'app-json-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './json-table.component.html',
  styleUrls: ['./json-table.component.scss']
})
export class JsonTableComponent implements OnInit {
  columns = signal<TableColumn[]>([]);
  rows = signal<JsonTableRow[]>([]);
  filteredRows = signal<JsonTableRow[]>([]);
  
  searchTerm = signal('');
  sortColumn = signal<string | null>(null);
  sortDirection = signal<'asc' | 'desc'>('asc');
  
  currentPage = signal(1);
  pageSize = signal(10);
  
  // Add Math for template use
  protected readonly Math = Math;
  
  totalPages = computed(() => 
    Math.ceil(this.filteredRows().length / this.pageSize())
  );
  
  paginatedRows = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.filteredRows().slice(start, end);
  });

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

    this.loadTableData(jsonData.parsed);
  }

  /**
   * Load and process table data
   */
  private loadTableData(data: any): void {
    const columns = this.jsonService.extractColumns(data);
    const rows = this.jsonService.generateTableRows(data);
    
    this.columns.set(columns);
    this.rows.set(rows);
    this.filteredRows.set(rows);
  }

  /**
   * Handle search
   */
  onSearch(term: string): void {
    this.searchTerm.set(term);
    this.filterRows();
    this.currentPage.set(1); // Reset to first page
  }

  /**
   * Filter rows based on search term
   */
  private filterRows(): void {
    const term = this.searchTerm().toLowerCase();
    
    if (!term) {
      this.filteredRows.set(this.rows());
      return;
    }

    const filtered = this.rows().filter(row => {
      return Object.values(row).some(value => {
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(term);
      });
    });

    this.filteredRows.set(filtered);
  }

  /**
   * Sort table by column
   */
  sortBy(columnKey: string): void {
    if (this.sortColumn() === columnKey) {
      // Toggle direction
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(columnKey);
      this.sortDirection.set('asc');
    }

    this.applySorting();
  }

  /**
   * Apply sorting to filtered rows
   */
  private applySorting(): void {
    const column = this.sortColumn();
    if (!column) return;

    const sorted = [...this.filteredRows()].sort((a, b) => {
      const aVal = a[column];
      const bVal = b[column];

      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return this.sortDirection() === 'asc' ? comparison : -comparison;
    });

    this.filteredRows.set(sorted);
  }

  /**
   * Change page size
   */
  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1);
  }

  /**
   * Navigate to page
   */
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  /**
   * Format cell value for display
   */
  formatValue(value: any): string {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  }

  /**
   * Get value type class for styling
   */
  getValueTypeClass(value: any): string {
    if (value === null) return 'type-null';
    if (typeof value === 'boolean') return 'type-boolean';
    if (typeof value === 'number') return 'type-number';
    if (typeof value === 'string') return 'type-string';
    if (typeof value === 'object') return 'type-object';
    return '';
  }
}
