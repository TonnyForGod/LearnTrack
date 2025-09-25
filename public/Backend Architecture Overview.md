graph TD
    A[Client] --> B[API Gateway]
    B --> C[Authentication Service]
    B --> D[User Service]
    B --> E[Course Service]
    B --> F[Marketplace Service]
    B --> G[Community Service]
    B --> H[Calendar Service]
    C --> I[Database - Users]
    D --> I
    E --> J[Database - Courses]
    F --> K[Database - Marketplace]
    G --> L[Database - Community]
    H --> M[Database - Calendar]