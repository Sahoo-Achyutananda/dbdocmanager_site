const DOCS_DATA = {
  "meta": {
    "title": "DBDocManager Documentation",
    "version": "1.0.0",
    "lastUpdated": "2025-11-21"
  },
  "sections": [
    {
      "id": "getting-started",
      "title": "Getting Started",
      "icon": "🚀",
      "subsections": [
        {
          "id": "introduction",
          "title": "Introduction",
          "type": "guide",
          "content": {
            "overview": "DBDocManager is a DSL-driven documentation and lineage tool for relational and NoSQL data models. It helps teams maintain a single source of truth for database schemas, data mappings, and lineage visualization.",
            "keyFeatures": [
              "Define schemas using a simple JSON/YAML DSL",
              "Generate interactive HTML documentation",
              "Visualize data lineage at column level",
              "Track source-to-target mappings with transforms",
              "Validate referential integrity automatically",
              "CI/CD integration for schema drift detection"
            ],
            "useCases": [
              "Document data warehouses with multiple sources",
              "Track MongoDB to relational table mappings",
              "Maintain column-level lineage for compliance",
              "Generate ERDs and data flow diagrams",
              "Ensure schema documentation stays in sync with code"
            ]
          }
        },
        {
          "id": "installation",
          "title": "Installation",
          "type": "guide",
          "content": {
            "prerequisites": [
              "Node.js 16.x or higher",
              "npm or yarn package manager"
            ],
            "steps": [
              {
                "title": "Install via npm",
                "code": "npm install -g dbdoc-manager",
                "language": "bash"
              },
              {
                "title": "Verify installation",
                "code": "dbdoc --version",
                "language": "bash"
              },
              {
                "title": "Create your first project",
                "code": "mkdir my-data-docs\ncd my-data-docs\ndbdoc init",
                "language": "bash"
              }
            ],
            "troubleshooting": [
              {
                "issue": "Command not found",
                "solution": "Ensure Node.js bin directory is in your PATH"
              },
              {
                "issue": "Permission errors",
                "solution": "Use sudo on Linux/Mac or run as administrator on Windows"
              }
            ]
          }
        },
        {
          "id": "quick-start",
          "title": "Quick Start",
          "type": "tutorial",
          "content": {
            "description": "Create your first documentation in 5 minutes",
            "steps": [
              {
                "step": 1,
                "title": "Create a DSL file",
                "description": "Create a file named schema.json with your database structure",
                "code": "{\n  \"project\": \"my_warehouse\",\n  \"version\": \"1.0.0\",\n  \"targets\": [\n    {\n      \"db\": \"warehouse\",\n      \"engine\": \"postgres\",\n      \"schema\": \"public\",\n      \"tables\": [\n        {\n          \"name\": \"users\",\n          \"description\": \"User dimension table\",\n          \"columns\": [\n            {\n              \"name\": \"user_id\",\n              \"type\": \"INTEGER\",\n              \"pk\": true,\n              \"description\": \"Primary key\"\n            },\n            {\n              \"name\": \"email\",\n              \"type\": \"VARCHAR(255)\",\n              \"unique\": true,\n              \"nullable\": false\n            }\n          ]\n        }\n      ]\n    }\n  ],\n  \"sources\": [],\n  \"mappings\": []\n}",
                "language": "json"
              },
              {
                "step": 2,
                "title": "Validate your schema",
                "description": "Run validation to check for errors",
                "code": "dbdoc validate schema.json",
                "language": "bash"
              },
              {
                "step": 3,
                "title": "Generate documentation",
                "description": "Create HTML docs with lineage visualization",
                "code": "dbdoc generate schema.json --output ./docs",
                "language": "bash"
              },
              {
                "step": 4,
                "title": "View your docs",
                "description": "Open the generated documentation in your browser",
                "code": "open docs/index.html",
                "language": "bash"
              }
            ]
          }
        }
      ]
    },
    {
      "id": "features",
      "title": "Features",
      "icon": "✨",
      "subsections": [
        {
          "id": "lineage-visualization",
          "title": "Lineage Visualization",
          "type": "feature",
          "content": {
            "description": "DBDocManager generates interactive, column-level data lineage graphs showing how data flows from sources to targets.",
            "capabilities": [
              "**Column-Level Granularity**: See exactly which source field maps to each target column",
              "**Transform Labels**: View ETL transformations directly on the lineage graph edges",
              "**Interactive Exploration**: Zoom, pan, and hover over nodes for detailed information",
              "**Hierarchical Layout**: Parent nodes (tables/collections) contain child nodes (columns)",
              "**Color Coding**: Source and target systems use different colors for clarity",
              "**Multiple Views**: Both table-level and detailed graph views available"
            ],
            "implementation": "Uses Cytoscape.js with Dagre layout algorithm for hierarchical visualization.",
            "example": "When you define a mapping like:\n```json\n{\n  \"target\": \"warehouse.public.customers.email\",\n  \"from\": {\n    \"source_id\": \"mongo_users\",\n    \"path\": \"$.contact.email\",\n    \"transform\": \"LOWER(TRIM())\"\n  }\n}\n```"
          }
        },
        {
          "id": "validation",
          "title": "Schema Validation",
          "type": "feature",
          "content": {
            "description": "Comprehensive validation ensures your documentation stays consistent and complete.",
            "checks": [
              {
                "category": "Structural Validation",
                "items": [
                  "Required fields present",
                  "Valid JSON syntax",
                  "Correct data types",
                  "Non-empty arrays where required"
                ]
              },
              {
                "category": "Referential Integrity",
                "items": [
                  "All mapping targets reference existing columns",
                  "All mapping sources reference defined source_ids",
                  "Foreign keys reference existing tables",
                  "No duplicate column names"
                ]
              }
            ],
            "cicdIntegration": "Add validation to your CI/CD pipeline:\n```yaml\n# .github/workflows/validate-schema.yml\nname: Validate Schema\non: [pull_request]\njobs:\n  validate:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v2\n      - run: npm install -g dbdoc-manager\n      - run: dbdoc validate schema.json\n```"
          }
        },
        {
          "id": "html-output",
          "title": "Static HTML Generation",
          "type": "feature",
          "content": {
            "description": "Generate self-contained, static HTML documentation that can be hosted anywhere.",
            "benefits": [
              "**No Runtime Dependencies**: Pure HTML/CSS/JS",
              "**Host Anywhere**: GitHub Pages, S3, Netlify",
              "**Fast Loading**: All assets embedded",
              "**Offline Access**: Works without internet"
            ],
            "pages": [
              {
                "file": "index.html",
                "description": "Project overview and navigation"
              },
              {
                "file": "table_*.html",
                "description": "Individual table documentation"
              },
              {
                "file": "lineage-graph.html",
                "description": "Interactive Cytoscape.js visualization"
              }
            ]
          }
        }
      ]
    },
    {
      "id": "dsl-reference",
      "title": "DSL Reference",
      "icon": "📝",
      "subsections": [
        {
          "id": "project-structure",
          "title": "Project Structure",
          "type": "reference",
          "content": {
            "description": "The root level of your DSL file defines the project metadata",
            "fields": [
              {
                "name": "project",
                "type": "string",
                "required": true,
                "description": "Name of your data project or warehouse"
              },
              {
                "name": "version",
                "type": "string",
                "required": false,
                "default": "1.0.0",
                "description": "Version of your schema documentation"
              },
              {
                "name": "owners",
                "type": "string[]",
                "required": false,
                "description": "List of team or individual owners"
              },
              {
                "name": "targets",
                "type": "Target[]",
                "required": true,
                "description": "Array of target databases"
              },
              {
                "name": "sources",
                "type": "Source[]",
                "required": true,
                "description": "Array of source systems"
              },
              {
                "name": "mappings",
                "type": "Mapping[]",
                "required": true,
                "description": "Column-level lineage mappings"
              }
            ],
            "example": "{\n  \"project\": \"retail_analytics\",\n  \"version\": \"2.1.0\",\n  \"owners\": [\"data-eng@company.com\"],\n  \"targets\": [...],\n  \"sources\": [...],\n  \"mappings\": [...]\n}"
          }
        },
        {
          "id": "tables",
          "title": "Tables",
          "type": "reference",
          "content": {
            "description": "Define table structure, columns, keys, and constraints",
            "fields": [
              {
                "name": "name",
                "type": "string",
                "required": true,
                "description": "Table name"
              },
              {
                "name": "description",
                "type": "string",
                "required": false,
                "description": "Business description of the table"
              },
              {
                "name": "columns",
                "type": "Column[]",
                "required": true,
                "description": "Array of column definitions"
              },
              {
                "name": "primary_key",
                "type": "string[]",
                "required": false,
                "description": "Composite primary key column names"
              }
            ]
          }
        },
        {
          "id": "columns",
          "title": "Columns",
          "type": "reference",
          "content": {
            "description": "Define column properties, types, and constraints",
            "fields": [
              {
                "name": "name",
                "type": "string",
                "required": true,
                "description": "Column name"
              },
              {
                "name": "type",
                "type": "string",
                "required": true,
                "description": "SQL data type"
              },
              {
                "name": "nullable",
                "type": "boolean",
                "default": true,
                "description": "Whether column accepts NULL values"
              },
              {
                "name": "pk",
                "type": "boolean",
                "default": false,
                "description": "Is this column part of the primary key?"
              }
            ],
            "example": "{\n  \"name\": \"customer_id\",\n  \"type\": \"INTEGER\",\n  \"pk\": true,\n  \"nullable\": false,\n  \"description\": \"Surrogate key\"\n}"
          }
        },
        {
          "id": "mappings",
          "title": "Mappings (Lineage)",
          "type": "reference",
          "content": {
            "description": "Define column-level lineage showing how source data flows to target columns",
            "fields": [
              {
                "name": "target",
                "type": "string",
                "required": true,
                "description": "Fully qualified target: db.schema.table.column"
              },
              {
                "name": "from.source_id",
                "type": "string",
                "required": true,
                "description": "ID of the source system"
              },
              {
                "name": "from.path",
                "type": "string",
                "required": true,
                "description": "JSONPath or field path in the source"
              },
              {
                "name": "from.transform",
                "type": "string",
                "required": false,
                "description": "Transformation applied during ETL"
              }
            ],
            "example": "{\n  \"target\": \"warehouse.public.users.email\",\n  \"from\": {\n    \"source_id\": \"mongo\",\n    \"path\": \"$.email\",\n    \"transform\": \"LOWER()\"\n  }\n}"
          }
        }
      ]
    },
    {
      "id": "cli-commands",
      "title": "CLI Commands",
      "icon": "⌨️",
      "subsections": [
        {
          "id": "validate",
          "title": "dbdoc validate",
          "type": "cli",
          "content": {
            "description": "Validate a DSL file for syntax and referential integrity errors",
            "usage": "dbdoc validate <file>",
            "arguments": [
              {
                "name": "file",
                "type": "string",
                "required": true,
                "description": "Path to JSON DSL file"
              }
            ],
            "examples": [
              {
                "command": "dbdoc validate schema.json",
                "description": "Validate schema.json"
              }
            ]
          }
        },
        {
          "id": "generate",
          "title": "dbdoc generate",
          "type": "cli",
          "content": {
            "description": "Generate HTML documentation with interactive lineage visualization",
            "usage": "dbdoc generate <file> [options]",
            "arguments": [
              {
                "name": "file",
                "type": "string",
                "required": true,
                "description": "Path to JSON DSL file"
              }
            ],
            "options": [
              {
                "flag": "-o, --output <dir>",
                "default": "./docs",
                "description": "Output directory for generated files"
              }
            ],
            "examples": [
              {
                "command": "dbdoc generate schema.json --output ./docs",
                "description": "Generate docs to default directory"
              }
            ]
          }
        }
      ]
    },
    {
      "id": "examples",
      "title": "Examples",
      "icon": "📚",
      "subsections": [
        {
          "id": "mongodb-flattening",
          "title": "MongoDB to Relational",
          "type": "example",
          "content": {
            "description": "Flatten nested MongoDB documents into relational tables.",
            "mongoDocument": "{\n  \"_id\": ObjectId(\"...\"),\n  \"contact\": {\n    \"email\": \"john@example.com\",\n    \"firstName\": \"John\"\n  }\n}",
            "code": "{\n  \"mappings\": [\n    {\n      \"target\": \"warehouse.users.email\",\n      \"from\": {\n        \"source_id\": \"mongo\",\n        \"path\": \"$.contact.email\",\n        \"transform\": \"LOWER(TRIM())\"\n      }\n    }\n  ]\n}",
            "notes": [
              "Use JSONPath notation ($.field.nested)",
              "The transform field can combine multiple source fields"
            ]
          }
        },
        {
          "id": "array-explosion",
          "title": "Array Explosion",
          "type": "example",
          "content": {
            "description": "Handle MongoDB arrays by exploding them into separate fact table rows.",
            "code": "{\n  \"mappings\": [\n    {\n      \"target\": \"warehouse.order_lines.line_nbr\",\n      \"from\": {\n        \"source_id\": \"mongo_orders\",\n        \"path\": \"$.lines[*].$index\",\n        \"transform\": \"ARRAY_INDEX()\"\n      }\n    }\n  ]\n}",
            "notes": [
              "Use $.array[*] notation to indicate array explosion",
              "The $index variable provides the array position"
            ]
          }
        }
      ]
    },
    {
      "id": "advanced-topics",
      "title": "Advanced Topics",
      "icon": "🎓",
      "subsections": [
        {
          "id": "custom-transforms",
          "title": "Custom Transforms",
          "type": "guide",
          "content": {
            "description": "Define reusable transformation functions for common patterns",
            "concept": "Instead of repeating strings, create a library of standard transforms.",
            "usage": "Reference transforms by name: \"transform\": \"normalizeEmail\""
          }
        },
        {
          "id": "schema-versioning",
          "title": "Schema Versioning",
          "type": "guide",
          "content": {
            "description": "Manage schema evolution using Semantic Versioning",
            "strategies": [
              {
                "title": "Semantic Versioning",
                "content": "MAJOR (breaking), MINOR (additive), PATCH (docs only)"
              },
              {
                "title": "Version History",
                "content": "Maintain multiple versions in Git: v1.0.0/, v2.0.0/"
              }
            ]
          }
        }
      ]
    },
    {
      "id": "troubleshooting",
      "title": "Troubleshooting",
      "icon": "🔧",
      "subsections": [
        {
          "id": "common-errors",
          "title": "Common Errors",
          "type": "faq",
          "content": {
            "items": [
              {
                "q": "DUPLICATE_COLUMN",
                "a": "Table has multiple columns with the same name. Remove duplicates."
              },
              {
                "q": "INVALID_MAPPING_TARGET",
                "a": "Mapping references a column that doesn't exist. Check for typos in FQN."
              },
              {
                "q": "INVALID_MAPPING_SOURCE",
                "a": "Mapping references a source_id that hasn't been defined."
              }
            ]
          }
        }
      ]
    },
    {
      "id": "faq",
      "title": "FAQ",
      "icon": "❓",
      "subsections": [
        {
          "id": "general",
          "title": "General Questions",
          "type": "faq",
          "content": {
            "items": [
              {
                "q": "What's the difference between this and dbt docs?",
                "a": "DBDocManager focuses on cross-system lineage (NoSQL → Relational) and is database-agnostic. dbt docs is SQL-only."
              },
              {
                "q": "Can I generate SQL DDL?",
                "a": "Not yet, but this is a planned feature."
              },
              {
                "q": "Does it work offline?",
                "a": "CLI works offline. HTML requires internet for CDN libraries (Cytoscape) unless bundled."
              }
            ]
          }
        }
      ]
    }
  ]
}

export default DOCS_DATA;