import { TestBed } from '@angular/core/testing';
import { JsonService } from './json.service';
import { JsonData } from '../models/json-data.interface';

describe('JsonService', () => {
  let service: JsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('validateJson', () => {
    it('should validate correct JSON', () => {
      const jsonString = '{"name": "John", "age": 30}';
      const result = service.validateJson(jsonString);
      
      expect(result.isValid).toBe(true);
      expect(result.parsed).toEqual({ name: 'John', age: 30 });
      expect(result.errorMessage).toBeUndefined();
    });

    it('should invalidate incorrect JSON', () => {
      const jsonString = '{name: John, age: 30}';
      const result = service.validateJson(jsonString);
      
      expect(result.isValid).toBe(false);
      expect(result.parsed).toBeNull();
      expect(result.errorMessage).toBeDefined();
    });
  });

  describe('extractColumns', () => {
    it('should extract columns from array of objects', () => {
      const data = [
        { id: 1, name: 'John', age: 30 },
        { id: 2, name: 'Jane', age: 25 }
      ];
      
      const columns = service.extractColumns(data);
      
      expect(columns.length).toBe(3);
      expect(columns.map(c => c.key)).toContain('id');
      expect(columns.map(c => c.key)).toContain('name');
      expect(columns.map(c => c.key)).toContain('age');
    });

    it('should return empty array for null data', () => {
      const columns = service.extractColumns(null);
      expect(columns).toEqual([]);
    });
  });

  describe('generateTableRows', () => {
    it('should generate rows from array', () => {
      const data = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' }
      ];
      
      const rows = service.generateTableRows(data);
      
      expect(rows.length).toBe(2);
      expect(rows[0]['id']).toBe(1);
      expect(rows[0]['name']).toBe('John');
    });

    it('should generate single row from object', () => {
      const data = { id: 1, name: 'John' };
      
      const rows = service.generateTableRows(data);
      
      expect(rows.length).toBe(1);
      expect(rows[0]['id']).toBe(1);
    });
  });

  describe('buildTreeRecursively', () => {
    it('should build tree from object', () => {
      const data = {
        name: 'John',
        age: 30,
        address: {
          city: 'New York'
        }
      };
      
      const tree = service.buildTreeRecursively(data);
      
      expect(tree.type).toBe('object');
      expect(tree.children).toBeDefined();
      expect(tree.children!.length).toBe(3);
    });

    it('should build tree from array', () => {
      const data = [1, 2, 3];
      
      const tree = service.buildTreeRecursively(data);
      
      expect(tree.type).toBe('array');
      expect(tree.children).toBeDefined();
      expect(tree.children!.length).toBe(3);
    });
  });

  describe('beautifyJson', () => {
    it('should beautify JSON with 2 spaces', () => {
      const json = '{"name":"John","age":30}';
      const beautified = service.beautifyJson(json, 2);
      
      expect(beautified).toContain('  ');
      expect(beautified).toContain('\n');
    });

    it('should throw error for invalid JSON', () => {
      const json = '{invalid}';
      
      expect(() => service.beautifyJson(json)).toThrow();
    });
  });

  describe('minifyJson', () => {
    it('should minify JSON', () => {
      const json = '{\n  "name": "John",\n  "age": 30\n}';
      const minified = service.minifyJson(json);
      
      expect(minified).toBe('{"name":"John","age":30}');
    });
  });

  describe('localStorage', () => {
    it('should save and load from localStorage', () => {
      const jsonData: JsonData = {
        raw: '{"test": true}',
        parsed: { test: true },
        isValid: true
      };
      
      service.setJsonData(jsonData);
      
      const stored = localStorage.getItem('json-data-explorer-data');
      expect(stored).toBeTruthy();
    });

    it('should clear localStorage', () => {
      const jsonData: JsonData = {
        raw: '{"test": true}',
        parsed: { test: true },
        isValid: true
      };
      
      service.setJsonData(jsonData);
      service.clearJsonData();
      
      const stored = localStorage.getItem('json-data-explorer-data');
      expect(stored).toBeNull();
    });
  });
});
