import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { JsonService } from '../../services/json.service';
import { JsonNode } from '../../models/json-node.interface';

@Component({
  selector: 'app-json-tree',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './json-tree.component.html',
  styleUrls: ['./json-tree.component.scss']
})
export class JsonTreeComponent implements OnInit {
  rootNode = signal<JsonNode | null>(null);

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

    const tree = this.jsonService.buildTreeRecursively(jsonData.parsed);
    this.rootNode.set(tree);
  }

  /**
   * Toggle node expansion
   */
  toggleNode(node: JsonNode): void {
    node.expanded = !node.expanded;
  }

  /**
   * Get icon for node type
   */
  getIcon(node: JsonNode): string {
    switch (node.type) {
      case 'object':
        return node.expanded ? '▼' : '▶';
      case 'array':
        return node.expanded ? '▼' : '▶';
      default:
        return '•';
    }
  }

  /**
   * Get display value for node
   */
  getDisplayValue(node: JsonNode): string {
    if (node.type === 'object' && node.children) {
      return `{${node.children.length} ${node.children.length === 1 ? 'property' : 'properties'}}`;
    }
    if (node.type === 'array' && node.children) {
      return `[${node.children.length} ${node.children.length === 1 ? 'item' : 'items'}]`;
    }
    if (node.type === 'string') {
      return `"${node.value}"`;
    }
    if (node.type === 'null') {
      return 'null';
    }
    return String(node.value);
  }

  /**
   * Check if node has children
   */
  hasChildren(node: JsonNode): boolean {
    return !!node.children && node.children.length > 0;
  }

  /**
   * Get CSS class for value type
   */
  getValueClass(type: string): string {
    return `value-${type}`;
  }
}
