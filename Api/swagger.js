import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API do site de fisioterapia",
    version: "1.0.0",
    description: "API documentation do site de fisioterapia",
  },
  servers: [
     {
      url: "http://localhost:3000/",

     }
  ],
  tags: [
    {
      name: "Agenda",
      description: "Endpoints relacionados à agenda de atendimentos",
    },

    {
      name: "Fisioterapeuta",
      description: "Endpoints relacionados aos fisioterapeutas",
    }
  ],
  components:{
    securitySchemes:{
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
paths: {
  "/Paciente": {
    "post": {
      tags: ["Paciente"],
      summary: "Criar um novo agendamento",
      description: "Endpoint para criar um novo Usuario ",
      requestBody:{
        description: "Dados do usuário",
        required: true,
        content:{
          "application/json":{
            schema:{
              type: "object",
              required: ["nome_usuario","data_de_nascimento", "responsavel", "endereco", "telefone" ],
              properties: {
                nome_usuario: {
                  type: "string",
                  description: "Nome do paciente",
                },
                data_de_nascimento: {
                  type: "string",
                  format: "date",
                  description: "Data de nascimento do paciente",
                },
                responsavel: {
                  type: "string",
                  description: "Nome do responsável pelo paciente",
                },
                endereco: {
                  type: "string",
                  description: "Endereço do paciente",
                },
                telefone: {
                  type: "string",
                  description: "Telefone de contato do paciente",
                },
              }


            }
          }
        }
      },
      responses: {
        "201": {
          description: "Usuario criado com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Usuario criado com sucesso",
                  },
                },
              },
            },
          },
        },
        "400": {
          description: "Erro de validação dos dados do usuario",
        },
      },
    },
    get: {
      tags: ["Paciente"],
      summary: "Listar Pacientes",
      description: "Endpoint para listar todos os Pacientes",
      security: [
        {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      ],
      responses: {
        "200": {
          description: "Lista de pacientes",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "integer",
                      description: "ID do agendamento",
                    },
                    nome_usuario: {
                      type: "string",
                      description: "Nome do paciente",
                    },
                    data_de_nascimento: {
                      type: "string",
                      format: "date",
                      description: "Data de nascimento do paciente",
                    },
                    responsavel: {
                      type: "string",
                      description: "Nome do responsável pelo paciente",
                    },
                    endereco: {
                      type: "string",
                      description: "Endereço do paciente",
                    },
                    telefone: {
                      type: "string",
                      description: "Telefone de contato do paciente",
                    },
                  },
                },
              },
            },
          },
        },
        "401": {
          description: "Não autorizado, token inválido ou ausente"
        }
      }
    }
    
  },
  '/Paciente/{id}': {
    patch: {
      tags: ['Paciente'],
      summary: "Atualizar um usuário",
      description: "Endpoint para atualizar os dados de um usuário específico",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer",
          },
          description: "ID do paciente a ser atualizado",
        },
      ],
      requestBody: {
        description: "Dados do paciente a serem atualizados",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                nome_usuario: {
                  type: "string",
                  description: "Nome do paciente",
                },
                data_de_nascimento: {
                  type: "string",
                  format: "date",
                  description: "Data de nascimento do paciente",
                },
                responsavel: {
                  type: "string",
                  description: "Nome do responsável pelo paciente",
                },
                endereco: {
                  type: "string",
                  description: "Endereço do paciente",
                },
                telefone: {
                  type: "string",
                  description: "Telefone de contato do paciente",
                },
              },
            },
          },
        },
      },
      responses:{
        '200':{
          description:"Paciente atualizado com sucesso"
        },
        '400':{
          description:"Erro de validação dos dados do usuário"
        }
      }
    },
    delete: {
      tags: ["Paciente"],
      summary: "Deletar um paciente",
      description: "Endpoint para deletar um paciente específico",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer",
          },
          description: "ID do usuário a ser deletado",
        },
      ],
      responses:{
        '204':{
          description:"Paciente deletado com sucesso"
        },
        '404':{
          description:"Paciente não encontrado"
        }
      }
    }
  },
  "/Agenda": {
    post: {
      tags: ["Agenda"],
      summary: "Criar um novo agendamento",
      description: "Endpoint para criar um novo agendamento",
      requestBody: {
        description: "Dados do agendamento",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["nome_Usuario", "patologia","data_de_nascimento","quantidade_de_secao", "id_usuario", "id_fisioterapeuta"],
              properties: {
                data: {
                  type: "string",
                  format: "date",
                  description: "Data do agendamento",
                },
                nome_usuario: {
                  type: "string",
                  description: "Nome do paciente"
                },
                patologia: {
                  type: "string",
                  description: "Tipo de patologia do paciente",
                },
                data_de_nascimento: {
                  type: "string",
                  format: "date",
                  description: "Data de nascimento do paciente",
                },
                quantidade_de_secao: {
                  type: "integer",
                  description: "Quantidade de seções do agendamento",
                },
                id_usuario: {
                  type: "integer",
                  description: "ID do usuário associado ao agendamento",
                },
                id_fisioterapeuta: {
                  type: "integer",
                  description: "ID do fisioterapeuta associado ao agendamento",
                },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Agendamento criado com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Agendamento criado com sucesso",
                  },
                },
              },
            },
          },
        },
        "400": {
          description: "Erro de validação dos dados do agendamento",
        },
      },
    },
    get: {
      tags: ["Agenda"],
      summary: "Listar agendamentos",
      description: "Endpoint para listar todos os agendamentos",
      security: [
        {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      ],
      responses: {
        "200": {
          description: "Lista de agendamentos",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    nome_usuario: {
                      type: "integer",
                      description: "ID do agendamento",
                    },
                    data_de_nascimento: {
                      type: "string",
                      format: "date",
                      description: "Data do agendamento",
                    },
                    patologia: {
                      type: "string",
                      format: "time",
                      description: "tipo de patologia do paciente",
                    },
                    id_usuario: {
                      type: "integer",
                      description: "ID do usuário associado ao agendamento",
                    },
                    quantidade_de_secao: {
                      type: "integer",
                      description: "Quantidade de seções do agendamento",

                    },
                    id_fisioterapeuta: {
                      type: "integer",
                      description:
                        "ID do fisioterapeuta associado ao agendamento",
                    },
                  },
                },
              },
            },
          },
        },
        "401": {
          description:
            "Não autorizado, token inválido ou ausente"
        }
      }
    }
  },
  "/Agenda/{id}": {
    patch: {
      tags: ["Agenda"],
      summary: "Atualizar um agendamento",
      description: "Endpoint para atualizar os dados de um agendamento específico",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer",
          },
          description: "ID do agendamento a ser atualizado",
        },
      ],
      requestBody: {
        description: "Dados do agendamento a serem atualizados",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "string",
                  format: "date",
                  description: "Data do agendamento",
                },
                nome_usuario: {
                  type: "string",
                  description: "Nome do paciente"
                },
                patologia: {
                  type: "string",
                  description: "Tipo de patologia do paciente",
                },
                data_de_nascimento: {
                  type: "string",
                  format: "date",
                  description: "Data de nascimento do paciente",
                },
                quantidade_de_secao:{
                  type:"integer",
                  description:"Quantidade de seções do agendamento"
                },
                id_usuario:{
                  type:"integer",
                  description:"ID do usuário associado ao agendamento"
                },
                id_fisioterapeuta:{
                  type:"integer",
                  description:"ID do fisioterapeuta associado ao agendamento"
                }
              },
            },
          },
        },
      },
      responses:{
        '200':{
          description:"Agendamento atualizado com sucesso"
        },
        '400':{
          description:"Erro de validação dos dados do agendamento"
        }
      }
    },
    delete: {
      tags: ["Agenda"],
      summary: "Deletar um agendamento",
      description: "Endpoint para deletar um agendamento específico",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer",
          },
          description: "ID do agendamento a ser deletado",
        },
      ],
      responses:{
        '204':{
          description:"Agendamento deletado com sucesso"
        },
        '404':{
          description:"Agendamento não encontrado"
        }
      }
    }
    
  },
  "Fisioterapeuta": {
    "post": {
      tags: ["Fisioterapeuta"],
      summary: "Criar um novo fisioterapeuta",
      description: "Endpoint para criar um novo fisioterapeuta",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                nome:{
                  type: "string",
                  description: "Nome do fisioterapeuta",
                },
                especialidade: {
                  type: "string",
                  description: "Especialidade do fisioterapeuta",
                },
                data_de_nascimento: {
                  type: "string",
                  format: "date",
                  description: "Data de nascimento do fisioterapeuta",
                },
              }

            }
          }
        },
        responses: {
          "201": {
            description: "Fisioterapeuta criado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Fisioterapeuta criado com sucesso",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Erro de validação dos dados do fisioterapeuta",
          },
        },
      }
    },
    get:{
      tags: ["Fisioterapeuta"],
      summary: "Listar fisioterapeutas",
      description: "Listar fisioterapeutas",
      security: [
        {
          bearerAuth: []
        },
      ],
      responses: {
        "200": {
          description: "Lista de fisioterapeutas",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "integer",
                      description: "ID do fisioterapeuta",
                    },
                    nome: {
                      type: "string",
                      description: "Nome do fisioterapeuta",
                    },
                    especialidade: {
                      type: "string",
                      description: "Especialidade do fisioterapeuta",
                    },
                    data_de_nascimento: {
                      type: "string",
                      format: "date",
                      description: "Data de nascimento do fisioterapeuta",
                    },
                  },
                },
              },
            },
          },
        },
        "401": {
          description:
            "Não autorizado, token inválido ou ausente"
        }
      }
    }
  },
  "/fisioterapeutas/{id}": {
    patch: {
      tags: ["Fisioterapeuta"],
      summary: "Atualizar um fisioterapeuta",
      description: "Endpoint para atualizar os dados de um fisioterapeuta específico",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer",
          },
          description: "ID do fisioterapeuta a ser atualizado",
        },
      ],
      requestBody: {
        description: "Dados do fisioterapeuta a serem atualizados",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                nome:{
                  type:"string",
                  description:"Nome do fisioterapeuta"
                },
                especialidade:{
                  type:"string",
                  description:"Especialidade do fisioterapeuta"
                },
                data_de_nascimento:{
                  type:"string",
                  format:"date",
                  description:"Data de nascimento do fisioterapeuta"
                }
              }
            }
          }
        },
      },
      responses:{
        '200':{
          description:"Fisioterapeuta atualizado com sucesso"
        },
        '400':{
          description:"Erro de validação dos dados do fisioterapeuta"
        }
      }
    },
    delete: {
      tags: ["Fisioterapeuta"],
      summary: "Deletar um fisioterapeuta",
      description: "Endpoint para deletar um fisioterapeuta específico",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer",
          },
          description: "ID do fisioterapeuta a ser deletado",
        },
      ],
      responses:{
        '204':{
          description:"Fisioterapeuta deletado com sucesso"
        },
        '404':{
          description:"Fisioterapeuta não encontrado"
        }
      }
    }
  }

  }
  
}





const options = {
    swaggerDefinition,
    apis: [] //
}


const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;