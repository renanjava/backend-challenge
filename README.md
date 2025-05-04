![Node.js](https://img.shields.io/badge/node.js-v20.12.2-green)
![NestJS](https://img.shields.io/badge/NestJS-v11.0.1-red)

# Backend Challenge - Processamento de Documentos

## 📌 Visão Geral

Este projeto é uma API desenvolvida para processar documentos (PDFs e páginas web), extrair dados, armazená-los em um banco de dados e associá-los a clientes cadastrados. A aplicação foi construída utilizando **NestJS** e segue boas práticas de desenvolvimento, como Clean Architecture, Design Patterns, autenticação JWT, e integração com Docker.

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

## 📂 Estrutura do Projeto

```plaintext
/src
|-- application/        # Camada de aplicação (use cases, DTOs, errors)
|-- domain/             # Camada de domínio (entidades e interfaces)
|-- infrastructure/     # Camada de infraestrutura (controllers, adapters, pipes, repositories)
|-- documentation/      # Documentação do projeto
|-- main.ts             # Arquivo principal da aplicação
```

# 🛠️ Observações sobre a Arquitetura e Design Patterns

## Clean Architecture

- **Separação de Camadas**: O projeto segue a Clean Architecture, separando responsabilidades em camadas (`Domain`, `Application`, `Infrastructure`).
- **Desacoplamento**: As dependências entre camadas são gerenciadas por interfaces, permitindo substituição e testes independentes.

---

## 📸 Arquitetura do Projeto

Na pasta `documentation`, você encontrará o arquivo `architecture.md`. Ao abrir esse arquivo com o preview, será exibida uma imagem detalhada da arquitetura do projeto, o que ajuda a visualizar melhor a estrutura e o fluxo da aplicação.

---

## Design Patterns e Boas Práticas

### Validação com `class-validator`

- Utilizei `whitelist: true` para ignorar atributos extras no corpo da requisição, garantindo maior segurança e consistência.

### UUID para IDs

- IDs únicos e difíceis de descobrir foram implementados com UUID, garantindo segurança e unicidade.

### PostgreSQL no Docker

- O banco de dados foi configurado no Docker para evitar a necessidade de instalação local.

### Prioridade no Desenvolvimento

- Funcionalidades simples foram desenvolvidas primeiro, deixando as mais complexas, como JWT, para o final. Isso facilitou os testes iniciais.

### CI/CD com GitHub Actions

- Testes automatizados e verificação de código foram configurados para feedback rápido, evitando commits com falhas.

### Segurança com GitHub Secrets e Dotenv

- Variáveis sensíveis, como URL e nome do banco de dados, foram protegidas com `dotenv` e `GitHub Secrets`.

### Prisma ORM

- Escolhido pelo suporte a migrations versionadas, evitando problemas de sincronização com `sync: true`.
- Utilizei `delete on cascade` para evitar registros órfãos e prevenir erros de remoção.
- Nomeação com `camelCase` no código e `snake_case` no banco de dados, utilizando o decorator `@map` do Prisma.

### Otimização com Multi-Staged Build

- Imagem Docker otimizada com multi-staged build, reduzindo o tamanho final.

### Abstração com Classes e Pipes

- Classe abstrata para lidar com hashing de senha (`bcrypt`).
- Pipe para hash de senha antes de chegar ao service, aproveitando os recursos do NestJS.

### Prisma Features

- Uso de `include` e `count` para consultas eficientes.

### Gerenciamento de Módulos

- Separação correta dos módulos, sem duplicação de providers. Tudo é gerenciado por `imports` e `exports` no módulo responsável.

### Desacoplamento de Implementações

- Exceções do framework e métodos de criptografia foram desacoplados, permitindo substituição fácil.

### Tratamento de Erros

- Erros na camada `Application` são usados para lógica de negócio, enquanto erros na `Infrastructure` lidam com detalhes técnicos.
- Uso de um `Global Filter` para centralizar o tratamento de erros, evitando múltiplos `try-catch` nas controllers.

### Factory Pattern

- Factories foram implementadas para abstrair a complexidade de instanciação dos use cases.

### Adapter Pipe

- Um `SignInAdapterPipe` foi criado para converter DTOs antes de chegar à controller, economizando linhas de código e melhorando a legibilidade.

### Nomes Genéricos

- Nomes genéricos foram usados para abstrações, enquanto implementações específicas utilizam o nome da biblioteca.

---

## 🛠️ Instalação do Projeto

### Pré-requisitos

- **Docker**: Instale o Docker e o Docker Compose para rodar os serviços.

### Passos para Instalação

### 1. Clone o repositório:

```bash
git clone https://github.com/renanjava/backend-challenge
```

### 2. Acesse o diretório:

```bash
cd backend-challenge
```

### 3. Abra o projeto com o VSCode:

```bash
code .
```

### 4. *Instale as dependências*:

No terminal da raiz do diretório do projeto, execute o seguinte comando para instalar todas as dependências necessárias:

```bash
npm install
```

### 5. Configure as variáveis de ambiente:

Renomeie o arquivo .env.example para .env com o seguinte comando:

```bash
mv .env.example .env
```

### 6. Preencha o arquivo .env

Após renomear o .env.example para .env, preencha o conteúdo do arquivo com os valores abaixo:


```env
PORT=3000
DATABASE_NAME=backend_challenge
DATABASE_URL=postgresql://postgres:password@localhost:5432/${DATABASE_NAME}
JWT_SECRET=cafecomleite
```

## 🖥 Como Rodar a API

### Primeiramente, execute o Docker Desktop em sua máquina antes de seguir os passos.

#### 1. _Subir o banco de dados (PostgreSQL) com Docker-Compose:_

No diretório do projeto, execute o seguinte comando para subir apenas o banco de dados:

```bash
npm run docker:up:postgres
```

#### 2. _Aplicar as migrações do banco de dados:_

Com o banco de dados em execução, aplique as migrações:

```bash
npx prisma migrate deploy
```

#### 3. _Gerar o client do Prisma:_

Em seguida, gere o client Prisma:

```bash
npx prisma generate
```

#### 4. _Renomear a DATABASE_URL:_

Em seguida, vá no arquivo .env e altere a URL do banco:

```env
DATABASE_URL=postgresql://postgres:password@postgres:5432/${DATABASE_NAME}
```

#### 5. _Subir a aplicação com Docker-Compose:_

Agora, inicie o restante dos serviços:

```bash
npm run docker:up
```

#### 6. _Realizar as requisições na aplicação:_

Após iniciar a aplicação, ela estará disponível em http://localhost:3000/

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

### 🔹 Rodar Testes com Cobertura de Código

Para executar os testes com cobertura de código, utilize o seguinte comando:

```bash
npm run test:cov
```
