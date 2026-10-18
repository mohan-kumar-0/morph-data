# morph-data

High-fidelity data conversion between CSV, JSON, YAML, and Markdown table formats. Zero dependencies, lightweight, and built for production use.

[![npm version](https://img.shields.io/npm/v/morph-data.svg)](https://www.npmjs.com/package/morph-data)
[![license](https://img.shields.io/npm/l/morph-data.svg)](https://github.com/mohan-kumar-0/morph-data/blob/main/LICENSE)

---

## Features

- **CSV to JSON** -- Parses CSV strings into arrays of objects with automatic type detection (numbers, booleans).
- **JSON to CSV** -- Converts arrays of objects to properly escaped CSV strings with configurable delimiters.
- **JSON to YAML** -- Serializes JavaScript objects and arrays into clean YAML output.
- **JSON to Markdown Table** -- Generates formatted Markdown tables from structured data.
- **Quoted Field Handling** -- Correctly handles commas, newlines, and escaped quotes inside CSV fields.
- **Zero Dependencies** -- No external packages required. Tiny footprint for your bundle.

---

## Installation

```bash
npm install morph-data
```

---

## Usage

### CSV to JSON

```javascript
const morph = require('morph-data');

const csv = `id,name,email,active
1,"Doe, John",john@example.com,true
2,"Smith, Jane",jane@example.com,false
3,"Williams, Bob",bob@example.com,true`;

const result = morph.csvToJson(csv);
console.log(result);

// Output:
// [
//   { id: 1, name: 'Doe, John', email: 'john@example.com', active: true },
//   { id: 2, name: 'Smith, Jane', email: 'jane@example.com', active: false },
//   { id: 3, name: 'Williams, Bob', email: 'bob@example.com', active: true }
// ]
```

### JSON to CSV

```javascript
const morph = require('morph-data');

const users = [
  { id: 1, name: 'Alice', department: 'Engineering', salary: 95000 },
  { id: 2, name: 'Bob', department: 'Design', salary: 85000 },
  { id: 3, name: 'Charlie', department: 'Marketing', salary: 78000 }
];

const csv = morph.jsonToCsv(users);
console.log(csv);

// Output:
// id,name,department,salary
// 1,Alice,Engineering,95000
// 2,Bob,Design,85000
// 3,Charlie,Marketing,78000
```

### JSON to CSV with Custom Delimiter

```javascript
const morph = require('morph-data');

const data = [
  { product: 'Laptop', price: 1299.99, stock: 45 },
  { product: 'Mouse', price: 29.99, stock: 200 }
];

// Use semicolons (common in European CSV formats)
const csv = morph.jsonToCsv(data, ';');
console.log(csv);

// Output:
// product;price;stock
// Laptop;1299.99;45
// Mouse;29.99;200
```

### JSON to YAML

```javascript
const morph = require('morph-data');

const config = {
  server: {
    port: 8080,
    host: 'localhost',
    ssl: false
  },
  database: {
    host: 'db.example.com',
    port: 5432,
    name: 'myapp'
  },
  features: ['authentication', 'caching', 'logging']
};

const yaml = morph.jsonToYaml(config);
console.log(yaml);

// Output:
// server:
//   port: 8080
//   host: localhost
//   ssl: false
// database:
//   host: db.example.com
//   port: 5432
//   name: myapp
// features:
//   - authentication
//   - caching
//   - logging
```

### JSON to Markdown Table

```javascript
const morph = require('morph-data');

const packages = [
  { name: 'morph-data', version: '1.0.0', downloads: 1200 },
  { name: 'mem-stash', version: '2.1.0', downloads: 890 },
  { name: 'seo-meta', version: '1.3.0', downloads: 2100 }
];

const table = morph.jsonToMarkdownTable(packages);
console.log(table);

// Output:
// | name | version | downloads |
// | --- | --- | --- |
// | morph-data | 1.0.0 | 1200 |
// | mem-stash | 2.1.0 | 890 |
// | seo-meta | 1.3.0 | 2100 |
```

### Using a Custom Instance

```javascript
const { MorphData } = require('morph-data');

const transformer = new MorphData();
const json = transformer.csvToJson(myCsvString);
```

---

## API Reference

| Method | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `csvToJson(csv, delimiter)` | `csv: string`, `delimiter: string` (default `','`) | `Array<Object>` | Parses CSV into JSON objects |
| `jsonToCsv(json, delimiter)` | `json: Array<Object>`, `delimiter: string` (default `','`) | `string` | Converts JSON to CSV string |
| `jsonToYaml(json, indent)` | `json: Object`, `indent: number` (default `2`) | `string` | Serializes JSON to YAML |
| `jsonToMarkdownTable(json)` | `json: Array<Object>` | `string` | Converts JSON to Markdown table |

---

## License

MIT -- see [LICENSE](https://github.com/mohan-kumar-0/morph-data/blob/main/LICENSE) for details.

Made by [Mohan Kumar](https://kumarmohan.com)
