![Node.js](https://img.shields.io/badge/node.js-v20.12.2-green)
![NestJS](https://img.shields.io/badge/NestJS-v11.0.1-red)

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

## 🚀 Tecnologias Utilizadas

- **Linguagem**: TypeScript
- **Framework**: NestJS
- **ORM**: Prisma
- **Autenticação**: JWT e Bcrypt
- **Validação de Dados**: Class Validator
- **Tranformação de Dados**: Class Transform
- **Testes**: Jest e Supertest
- **Containerização**: Docker
- **Web Scraping**: Cheerio
- **Processamento de PDFs**: PDF-Parse
- **CI/CD**: Github Actions

---

## 🔥 Stack Utilizada

- **Node.js**: v20.12.2
- **NestJS**: v11.0.1
- **PostgreSQL**: v17.4
- **PrismaORM**: v6.7.0
- **JWT**: v11.0.0
- **Class-validator**: v0.14.1
- **Class-transformer**: v0.5.1
- **Bcryptjs**: v3.0.2
- **Cheerio**: v1.0.0
- **Axios**: v1.9.0
- **Docker**: v26.1.1
- **Jest**: v29.7.0
- **Supertest**: v7.0.0
- **ESLint**: v9.18.0
- **Prettier**: v3.4.2
- **Rxjs**: v7.8.1

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

- **Docker**: Instale o Docker e o Docker Compose para rodar os serviços.

### Passos para Instalação

### 1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/backend-challenge
```

### 2. **Instale as dependências**:

No diretório raiz do projeto, execute o seguinte comando para instalar todas as dependências necessárias:

```bash
npm install
```

### 3. Configure as variáveis de ambiente:

Renomeie o arquivo `.env.example` para `.env` com o seguinte comando:

```bash
mv .env.example .env
```

### 4. Preencha o arquivo `.env`

Após renomear o `.env.example` para `.env`, preencha o conteúdo do arquivo com os valores abaixo:

```env
PORT=3000
DATABASE_NAME=backend_challenge
DATABASE_URL=postgresql://postgres:password@postgres:5432/${DATABASE_NAME}
JWT_SECRET=cafecomleite
```

## 🖥️ Como Rodar a API

#### 1. **Buildar a aplicação pelo Docker-Compose:**

No diretório do projeto, execute o seguinte comando para buildar as imagens Docker que irão rodar o banco de dados e a aplicação:

```bash
npm run docker:build
```

#### 2. **Executar a aplicação pelo Docker-Compose:**

Execute o comando para subir os contêineres:

```bash
npm run docker:up
```

#### 3. Realize as requisições na aplicação:

Após iniciar a aplicação, ela estará disponível em **http://localhost:3000/**:

- [Acesse a coleção do Postman](https://web.postman.co/workspace/53cf501d-84d9-48e7-a29b-4aa5e5e57a16)

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
    - `Authorization`: Token JWT válido, usado para autorizar e obter o ID do cliente.
  - **Resposta**:
    - `documents`: Lista de documentos pertencentes ao cliente autenticado.

- **GET /client/document/:id**:

  - Retorna um documento específico do cliente autenticado.
  - **Headers**:
    - `Authorization`: Token JWT válido, usado para autorizar e obter o ID do cliente.
  - **Parâmetros**:
    - `id`: ID do documento.
  - **Headers**:
    - `Authorization`: Token JWT válido.
  - **Resposta**:
    - `document`: Objeto do documento correspondente ao `id`, caso pertença ao cliente autenticado.

### Documentos

- **POST /document/pdf**:

  - Faz upload de um PDF, processa o conteúdo e associa a um cliente.
  - **Headers**:
    - `Authorization`: Token JWT válido, usado para autorizar e obter o ID do cliente.
  - **Body**:
    - `file`: Arquivo PDF.
  - **Resposta**:
    - `document`: Dados processados do PDF (como título, conteúdo extraído, data de processamento, etc.).

- **POST /document/web**:

  - Processa uma página web a partir de uma URL e associa a um cliente.
  - **Headers**:
    - `Authorization`: Token JWT válido, usado para autorizar e obter o ID do cliente.
  - **Body**:
    - `url`: URL da página web a ser processada.
  - **Resposta**:
    - `document`: Dados processados da página web (como título, conteúdo extraído, data de processamento, etc.).

## ⚙️ Testes

A aplicação conta com testes unitários e de integração utilizando o framework **Jest**.

### 🔹 Rodar Testes Unitários

Para executar os testes unitários da aplicação, utilize o seguinte comando:

```bash
npm run test:unit
```

### 🔹 Rodar Testes de Integração

Para executar os testes de integração, utilize o seguinte comando:

```bash
npm run test:int
```
