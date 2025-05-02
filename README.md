# Backend Challenge - Processamento de Documentos

## 📌 Visão Geral

Este projeto é uma API desenvolvida para processar documentos (PDFs e páginas web), extrair dados, armazená-los em um banco de dados e associá-los a clientes cadastrados. A aplicação foi construída utilizando **NestJS** e segue boas práticas de desenvolvimento, como Design Pattern Singleton, SOLID, autenticação JWT, e integração com Docker.

### Funcionalidades Principais

- **Cadastro de Clientes**: CRUD completo para gerenciar clientes.
- **Processamento de Documentos**:
  - Upload de PDFs e extração de título e conteúdo.
  - Processamento de páginas web via URL.
- **Associação de Documentos**: Relacionamento 1:N entre clientes e documentos.
- **Consultas**:
  - Listar clientes com contagem de documentos.
  - Listar documentos de um cliente específico.
  - Buscar documentos por cliente.
- **Autenticação JWT**: Proteção de endpoints com autenticação baseada em tokens.
- **Testes Automatizados**: Cobertura de testes unitários e de integração.

---

## 🔥 Stack Utilizada

- **Node.js**: Plataforma de execução JavaScript.
- **NestJS**: Framework modular para construção de APIs escaláveis.
- **PostgreSQL**: Banco de dados relacional.
- **Prisma**: ORM para manipulação do banco de dados.
- **JWT**: Autenticação baseada em tokens.
- **Bcrypt**: Hash seguro de senhas.
- **Cheerio**: Web scraping para extração de dados de páginas HTML.
- **PDF-Parse**: Extração de dados de arquivos PDF.
- **Docker**: Containerização para ambientes de desenvolvimento e produção.
- **Jest**: Framework de testes unitários e de integração.

---

## 🚀 Tecnologias Utilizadas

- **Linguagem**: TypeScript
- **Framework**: NestJS
- **ORM**: Prisma
- **Autenticação**: JWT e Bcrypt
- **Validação de Dados**: Class Validator
- **Testes**: Jest e Supertest
- **Containerização**: Docker
- **Web Scraping**: Cheerio
- **Processamento de PDFs**: PDF-Parse

---

## 📂 Estrutura do Projeto

```plaintext
/src
|-- controllers/         # Controladores para gerenciar rotas
|-- services/            # Lógica de negócios e integração com repositórios
|-- repositories/        # Acesso ao banco de dados via Prisma
|-- dtos/                # Data Transfer Objects para validação de dados
|-- contracts/           # Interfaces e tipos compartilhados
|-- errors/              # Classes de exceção personalizadas
|-- config/              # Configurações da aplicação (ex.: banco de dados)
|-- common/              # Pipes, guards e utilitários
|-- main.ts              # Arquivo principal da aplicação
```

---

## 🛠️ Instalação do Projeto

### Pré-requisitos

- **Node.js**: Certifique-se de ter o Node.js instalado (v20.12 ou superior).
- **Docker**: Instale o Docker e o Docker Compose para rodar os serviços.
- **PostgreSQL**: Banco de dados utilizado pela aplicação.

### Passos para Instalação

### 1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/backend-challenge.git
```

### 2. **Instale as dependências**:

No diretório raiz do projeto, execute o seguinte comando para instalar todas as dependências necessárias:

```bash
npm install
```

### 3. **Inicie a aplicação**:

Execute o seguinte comando para iniciar a aplicação em modo de desenvolvimento:

```bash
npm run start:dev
```

## 🖥️ Como Rodar a API

### Ambiente de Desenvolvimento

#### 1. **Inicie os serviços do Docker:**

No diretório do projeto, execute o seguinte comando para subir os contêineres Docker que irão rodar o banco de dados e a aplicação:

```bash
docker-compose up -d postgres
```

#### 2. **Instale as dependências:**

No diretório raiz do projeto, execute o seguinte comando para instalar todas as dependências necessárias:

```bash
npm install
```

#### 3. **Execute as migrações do Prisma:**

Para configurar o banco de dados com as tabelas necessárias, execute as migrações do Prisma:

```bash
npx prisma migrate dev
```

#### 4. **Inicie a aplicação:**

Para iniciar a aplicação, use o seguinte comando:

```bash
npm run start:dev
```

#### 5. Acesse a API

Após iniciar a aplicação, ela estará disponível em:

```bash
http://localhost:3000/
```

### Ambiente de Produção

#### 1. **Inicie a aplicação pelo Docker-Compose:**

No diretório do projeto, execute o seguinte comando para subir os contêineres Docker que irão rodar o banco de dados e a aplicação:

```bash
docker-compose up -d
```

#### 2. Acesse a API

Após iniciar a aplicação, ela estará disponível em:

```bash
http://localhost:3000/
```

## 📚 Principais Rotas da API

### Autenticação

- **POST /auth/login**:
  - Autentica um usuário e retorna um token JWT.
  - **Body**:
    - `email`: E-mail do usuário.
    - `password`: Senha do usuário.
  - **Resposta**:
    - `token`: Token JWT gerado para autenticação.

### Clientes

- **POST /client**:

  - Cria um novo cliente.
  - **Body**:
    - `name`: Nome do cliente.
    - `email`: E-mail do cliente.
    - `password`: Senha do cliente.
  - **Resposta**:
    - `client`: Cliente recém-criado.

- **GET /client**:

  - Lista todos os clientes.
  - **Resposta**:
    - `clients`: Lista de todos os clientes registrados no sistema.

- **GET /client/document**:

  - Lista todos os documentos associados ao cliente autenticado.
  - **Headers**:
    - `Authorization`: Token JWT válido.
  - **Resposta**:
    - `documents`: Lista de documentos pertencentes ao cliente autenticado.

- **GET /client/document/:id**:

  - Retorna um documento específico do cliente autenticado.
  - **Parâmetros**:
    - `id`: ID do documento.
  - **Headers**:
    - `Authorization`: Token JWT válido.
  - **Resposta**:
    - `document`: Objeto do documento correspondente ao `id`, caso pertença ao cliente autenticado.

### Documentos

- **POST /document/pdf**:

  - Faz upload de um PDF e processa o conteúdo.
  - **Body**:
    - `file`: Arquivo PDF.
  - **Resposta**:
    - `document`: Dados processados do PDF (como título, conteúdo extraído, data de processamento, etc.).

- **POST /document/web**:

  - Processa uma página web a partir de uma URL.
  - **Body**:
    - `url`: URL da página web a ser processada.
  - **Resposta**:
    - `document`: Dados processados da página web.

## ⚙️ Testes

A aplicação conta com testes unitários e de integração utilizando o framework **Jest**.

### 🔹 Rodar Testes Unitários

Para executar os testes unitários da aplicação, utilize o seguinte comando:

```bash
npm run test
```

### 🔹 Rodar Testes de Integração

Para executar os testes de integração, utilize o seguinte comando:

```bash
npm run test:int
```