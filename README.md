# is-test-repo-changelog-v9

API de prueba de clientes. Se usa para validar de punta a punta la continuidad de Code Review por label de ticket (AI-1115): alerta sin label, revisión con label, revisión incremental, sellado al merge y validación de release.

## Estructura

```
src/
├── index.ts                      # Servidor Hapi
├── routes/customer.route.ts      # Definición de endpoints
├── controllers/                  # Capa HTTP
├── services/                     # Lógica de negocio
├── repositories/                 # Acceso a datos (TypeORM)
│   ├── impl/
│   └── models/
├── middleware/context.ts         # Trazabilidad
└── utils/                        # environment, logger, database
tests/                            # Pruebas unitarias
```

## Ejecución local

```bash
npm install
cp .env.example .env
npm run build && npm start
```

Configuración: ver [docs/configurations.md](docs/configurations.md).
