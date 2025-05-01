# Teste Técnico para Desenvolvedor - Processamento de Documentos

## Objetivo
Criar uma API que processe documentos (PDF e páginas web), extraia dados, armazene em um banco de dados e associe esses documentos a clientes cadastrados.

## Requisitos Técnicos

### 1. Estrutura da API
- Linguagem: Python EX: (FastAPI, Django REST Framework) ou Node.js EX: (Express/NestJS)
- Banco de dados: PostgreSQL (ou outro banco relacional)
- Processamento de PDF: QUalquer lib da preferencia
- Web scraping: BeautifulSoup (Python)/ Cheerio (Node.js) ou outra ferramenta da preferencia

### 2. Funcionalidades

#### Cadastro de Clientes
- CRUD completo para clientes
- Campos mínimos: ID, Nome, Email, Data de Cadastro

#### Processamento de Documentos
- Endpoint para upload de PDF
- Endpoint para fornecer URL de página web
- Extração de dados dos documentos (pelo menos: título, conteúdo, data de processamento)
- Armazenamento dos documentos processados no banco de dados

#### Associação de Documentos
- Cada documento processado deve ser associado a um cliente existente
- Relação 1:N (um cliente pode ter vários documentos)

#### Consultas
- Listar todos os clientes com contagem de documentos
- Listar todos os documentos de um cliente específico
- Buscar documentos por usuario retornando os campos

## Instruções para o Candidato

1. Crie um repositorio no github para esse desafio
2. Implemente a API conforme os requisitos
3. Adicione um arquivo README.md com:
   - Instruções para execução
   - Exemplos de requisições
   - Qualquer observação relevante
4. Crie um Dockerfile para containerizar a aplicação
5. Adicione testes unitários e de integração
6. (Opcional) Adicione autenticação JWT para proteger os endpoints

## Critérios de Avaliação

1. **Funcionalidade**: Todos os endpoints funcionando corretamente
2. **Qualidade de Código**: Organização, legibilidade, padrões de código
3. **Tratamento de Erros**: Mensagens claras e tratamento adequado
4. **Performance**: Processamento eficiente dos documentos
5. **Documentação**: README claro e exemplos de uso
6. **Testes**: Cobertura e qualidade dos testes