import pkg from "pg";
import dotenv from "dotenv";

const { Pool } = pkg;
dotenv.config();

const BD = new Pool({
  user: "postgres",
  host: "localhost",
  database: "db_gfp",
  password: "admin",
  port: 5432,
});

const testarConexao = async () => {
  try {
    const client = await BD.connect();
    console.log("✅ Conectado ao banco de dados com sucesso!");
    client.release();
  } catch (error) {
    console.error("❌ Erro ao conectar ao banco de dados:", error.message);
  }
};

export { BD, testarConexao };
