# Sistema de Gerenciamento de Fila

Uma aplicação robusta para gerenciamento de filas desenvolvida com NestJS, TypeORM e PostgreSQL.

## 🚀 Tecnologias

- **NestJS** - Framework Node.js progressivo
- **TypeORM** - ORM para TypeScript e JavaScript
- **PostgreSQL** - Banco de dados relacional
- **Swagger** - Documentação automática da API
- **TypeScript** - Superset JavaScript com tipagem estática
- **Docker** - Configuração incial
## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL (versão 14 ou superior)
- npm ou yarn
- Docker instalado no seu computador

## 🔧 Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd nome-do-projeto
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   ```

4. **Configure o banco de dados**
   
   Edite o arquivo `.env` com suas configurações:
   ```env
   SERVER_PORT=3001
   DEFAULT_HOST=0.0.0.0
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=nome_do_banco
   ```

5. **Suguestão caso não o banco de dados configurado e sem a versao correta do node, fica a opção de utilizar o docker**
   ```
   como o docker instalador e configurado
   Execute o comando: docker-compose up -d
   ```

## 🚀 Executando a aplicação

### Desenvolvimento
```bash
npm run start:dev
# ou
yarn start:dev
```

### Produção
```bash
npm run build
npm run start:prod
# ou
yarn build
yarn start:prod
```

A aplicação estará disponível em `http://localhost:3001`

## 📖 Documentação da API

A documentação completa da API está disponível através do Swagger em:
```
http://localhost:3001/
```

### Configuração de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `SERVER_PORT` | Porta do servidor | `3001` |
| `DEFAULT_HOST` | Host do servidor | `0.0.0.0` |
| `DB_HOST` | Host do PostgreSQL | `localhost` |
| `DB_PORT` | Porta do PostgreSQL | `5432` |
| `DB_USERNAME` | Usuário do banco | `user` |
| `DB_PASSWORD` | Senha do banco | `password` |
| `DB_NAME` | Nome do banco | `queue_db` |

## 🔄 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev        # Inicia em modo desenvolvimento
npm run start:debug      # Inicia em modo debug

# Build e Produção
npm run build           # Compila a aplicação
npm run start:prod      # Inicia em modo produção

# Linting e Formatação
npm run lint          # Executa ESLint
npm run format        # Formata código com Prettier
```