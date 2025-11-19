export interface JsonTableRow {
  [key: string]: any;
}

export interface TableColumn {
  key: string;
  header: string;
  type: string;
}
