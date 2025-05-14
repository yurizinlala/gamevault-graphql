# GameVault – CRUD de Jogos com GraphQL

Este repositório contém a implementação da **Atividade 1** da disciplina de Desenvolvimento Web, onde desenvolvemos um sistema de gerenciamento de jogos utilizando **GraphQL** no back-end e **HTML + JavaScript puro** no front-end.

O link do vídeo explicativo para ver o projeto em ação: 

---

## 🔍 Visão Geral

- **Projeto:** GameVault
- **Tecnologia Back-end:** Apollo Server (GraphQL)
- **Tecnologia Front-end:** HTML5, CSS3 e JavaScript (Fetch API)
- **Banco de Dados:** `data.json` (arquivo JSON local)

O objetivo deste projeto é **criar**, **listar**, **editar** e **deletar** jogos, explorando as operações de Queries e Mutations do GraphQL.

---

## 📁 Estrutura do Projeto

```
/ (root)
├── graphql/
│   ├── schema.js        # Definições de tipos (TypeDefs)
│   ├── resolvers.js     # Resolvers (lógica de leitura e escrita em data.json)
│   └── server.js        # Configuração e inicialização do Apollo Server
├── data.json            # Armazenamento local dos registros de jogos
└── frontend/
    ├── index.html       # Interface HTML principal
    ├── style.css        # Estilos da aplicação
    └── script.js        # Lógica de consumo do GraphQL e manipulação da UI
```

---

## ⚙️ Requisitos

- **Node.js** (v14 ou superior)
- **npm** ou **yarn**
- Navegador moderno (Chrome, Firefox, Edge)

---

## 🚀 Como Executar

### 1. Instalar dependências

```bash
cd graphql
npm install express apollo-server-express graphql cors
```

### 2. Iniciar o servidor GraphQL

```bash
node server.js
```

> O servidor ficará disponível em `http://localhost:4000/` com o Playground integrado.

### 3. Abrir o front-end

- Abra o arquivo `frontend/index.html` diretamente no navegador ou utilize uma extensão de Live Server.
- A interface irá se conectar automaticamente ao endpoint GraphQL.

---

## 📜 Exemplos de Queries e Mutations

### Query: Listar todos os jogos
```graphql
query {
  games {
    id
    title
    developer
    genre
    releaseYear
    platform
    rating
    status
  }
}
```

### Query: Buscar jogo por ID
```graphql
query {
  game(id: "1") {
    id
    title
    developer
    genre
    releaseYear
    platform
    rating
    status
  }
}
```

### Mutation: Adicionar novo jogo
```graphql
mutation {
  addGame(input: {
    title: "Novo Jogo",
    developer: "Exemplo Studios",
    genre: "FPS",
    releaseYear: 2024,
    platform: ["PC"],
    rating: 8.0,
    status: "Backlog"
  }) {
    id
  }
}
```

### Mutation: Atualizar jogo existente
```graphql
mutation {
  updateGame(id: "1", input: {
    title: "Jogo Atualizado",
    developer: "Exemplo Devs",
    genre: "RPG",
    releaseYear: 2025,
    platform: ["PS5","PC"],
    rating: 9.2,
    status: "Jogando"
  }) {
    id
  }
}
```

### Mutation: Deletar jogo
```graphql
mutation {
  deleteGame(id: "1")
}
```

---

## 🎯 Pontos de Aprendizado

- Entendimento do fluxo de **Queries** e **Mutations** no GraphQL
- Uso do **Apollo Server** para criação de um endpoint GraphQL
- Consumo de API GraphQL via **Fetch API** no front-end
- Manipulação dinâmica do DOM para exibir e atualizar dados

---

## 🔄 Próximos Passos

- Implementar versão **RESTful** para comparação de padrões de API
- Adicionar **autenticação** e **autorização** para proteger operações sensíveis
- Utilizar um banco de dados real (MongoDB, PostgreSQL)
- Implementar testes automatizados (Jest, Mocha)

---

&copy; 2025 Yuri Dantas da Silva – Atividade 1 de Desenvolvimento Web
