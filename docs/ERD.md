```mermaid
erDiagram
    Comment {
      number id PK
      str content
      number sympathy
      number antipathy
    }

    Article {
      number id PK
      date createdAt
      string link
      string[] content
    }

    AnalysisComment {
      number id PK
      string comment
      string link
      string emotion
      string[] article_contents
      number keyword_id FK
    }
    
    Keyword {
      number id PK
      string name
    }

    Article ||--o{ Comment: ""
    Keyword ||--o{ AnalysisComment: "" 
```