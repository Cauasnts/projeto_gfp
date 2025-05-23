import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.4",
  info: {
    title: "API do Gestor Financeiro Pessoal",
    version: "1.0.0",
    description:
      "API para gerenciamento financeiro pessoal desenvolvida no curso Técnico de Desenvolvimento de Sistemas do SENAI",
  },
  servers: [
    {
      url: "http://localhost:3000/",
      description: "Servidor Local",
    },
    {
      url: "https://192.168.0.237.3000",
      description: "Servidor de API do Douglas",
    },
  ],
  tags: [
    {
      name: "Usuarios",
      description:
        "Rotas para cadastro, login, atualização e desativação de usuários",
    },
    {
      name: "categorias",
      description: "Rotas para cadastro, atualização e listagem de categorias",
    },
    {
      name: "contas",
      description: "Rotas para gerenciamento de contas",
    },
    {
      name: "Subcategorias",
      description: "Rotas para gerenciamento de subcategorias",
    },
    {
      name: "Transações",
      description: "Rotas para gerenciamento de transações",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths: {
    "/usuarios": {
      post: {
        tags: ["Usuarios"],
        summary: "Criar um novo usuário",
        requestBody: { required: true },
        responses: {
          200: {
            description: "Usuário criado com sucesso",
          },
        },
      },
      get: {
        tags: ["Usuarios"],
        summary: "Listar todos os usuários",
        responses: {
          200: {
            description: "Lista de usuários",
          },
        },
      },
    },
    "/usuarios/{id_usuario}": {
      delete: {
        tags: ["Usuarios"],
        summary: "Desativar um usuário",
        parameters: [
          {
            name: "id_usuario",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Usuário desativado com sucesso",
          },
        },
      },
    },
    "/usuarios/login": {
      post: {
        tags: ["Usuarios"],
        summary: "Login de usuário",
        requestBody: { required: true },
        responses: {
          200: {
            description: "Login efetuado com sucesso",
          },
        },
      },
    },
    "/categoria": {
      post: {
        tags: ["categorias"],
        summary: "Criar nova categoria",
        requestBody: { required: true },
        responses: {
          200: {
            description: "Categoria criada com sucesso",
          },
        },
      },
      get: {
        tags: ["categorias"],
        summary: "Listar todas as categorias",
        responses: {
          200: {
            description: "Lista de categorias",
          },
        },
      },
      put: {
        tags: ["categorias"],
        summary: "Atualizar uma categoria",
        requestBody: { required: true },
        responses: {
          200: {
            description: "Categoria atualizada com sucesso",
          },
        },
      },
      delete: {
        tags: ["categorias"],
        summary: "Deletar uma categoria",
        responses: {
          200: {
            description: "Categoria deletada com sucesso",
          },
        },
      },
    },
    "/categoria/{id}": {
      get: {
        tags: ["categorias"],
        summary: "Buscar categoria por ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Categoria encontrada",
          },
        },
      },
    },
    "/subcategorias": {
      post: {
        tags: ["Subcategorias"],
        summary: "Criar nova subcategoria",
        requestBody: { required: true },
        responses: {
          200: {
            description: "Subcategoria criada com sucesso",
          },
        },
      },
      get: {
        tags: ["Subcategorias"],
        summary: "Listar todas as subcategorias",
        responses: {
          200: {
            description: "Lista de subcategorias",
          },
        },
      },
      put: {
        tags: ["Subcategorias"],
        summary: "Atualizar uma subcategoria",
        requestBody: { required: true },
        responses: {
          200: {
            description: "Subcategoria atualizada com sucesso",
          },
        },
      },
      delete: {
        tags: ["Subcategorias"],
        summary: "Deletar uma subcategoria",
        responses: {
          200: {
            description: "Subcategoria deletada com sucesso",
          },
        },
      },
    },
    "/transacoes": {
      post: {
        tags: ["Transações"],
        summary: "Criar nova transação",
        requestBody: { required: true },
        responses: {
          200: {
            description: "Transação criada com sucesso",
          },
        },
      },
      get: {
        tags: ["Transações"],
        summary: "Listar todas as transações",
        responses: {
          200: {
            description: "Lista de transações",
          },
        },
      },
      put: {
        tags: ["Transações"],
        summary: "Atualizar uma transação",
        requestBody: { required: true },
        responses: {
          200: {
            description: "Transação atualizada com sucesso",
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: [],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
