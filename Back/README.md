# Conserta Felix - Backend (Node + TypeScript)

Projeto backend inicial com estrutura orientada à Arquitetura Limpa (Clean Architecture) e suporte a TypeScript e autenticação JWT.

Estrutura principal proposta:

- src/entities: entidades de domínio (models puros)
- src/use-cases: regras de negócio / casos de uso
- src/repositories: interfaces/implementações de acesso à dados (p. ex. memória, knex, mongoose)
- src/infra: infra de aplicativo (servidor HTTP, config)
- src/controllers: adaptadores HTTP que chamam os use-cases
- src/routes: definição de rotas/versões da API
- src/structure: documentação/diagrama da arquitetura
- src/main: composição / bootstrap

Como rodar (local):

1. Instalar dependências

```bash
npm install
```

2. Rodar em desenvolvimento (recarregamento com ts-node-dev)

```bash
JWT_SECRET=your_secret_here npm run dev
```

3. Compilar e rodar em produção

```bash
npm run build
JWT_SECRET=your_secret_here npm start
```

Endpoints de exemplo:
- POST /api/auth/login { "username": "..." } -> { token }
- GET /api/protected (precisa header Authorization: Bearer <token>)
- GET /api/health

Observações:
- Troque `JWT_SECRET` por um segredo forte em produção.
- Adapte repositórios e use-cases para persistência real conforme necessário.
