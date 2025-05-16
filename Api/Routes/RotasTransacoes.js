import { BD } from "../db.js"

class rotasTransacoes {
    static async NovaTransacao(req, res) {
        const {
            valor, descricao, data_transacao, data_vencimento, data_pagamento, tipo_transacao,
            num_parcelas, parcela_atual, id_conta, id_categoria, id_usuario, id_subcategoria
        } = req.body

        try {
            await BD.query(`
                INSERT INTO transacoes(valor, descricao, data_transacao, data_vencimento, data_pagamento, tipo_transacao,
                    num_parcelas, parcela_atual, id_conta, id_categoria, id_usuario, id_subcategoria)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
                [valor, descricao, data_transacao, data_vencimento, data_pagamento, tipo_transacao,
                    num_parcelas, parcela_atual, id_conta, id_categoria, id_usuario, id_subcategoria]
            )
            res.status(201).json('Transação cadastrada com sucesso')
        } catch (error) {
            console.error('Erro ao criar transação', error)
            res.status(500).json({ message: 'Erro ao criar transação', error: error.message })
        }
    }

    static async atualizarTodos(req, res) {
        const { id } = req.params
        const {
            valor, descricao, data_transacao, data_vencimento, data_pagamento, tipo_transacao,
            num_parcelas, parcela_atual, id_conta, id_categoria, id_usuario, id_subcategoria
        } = req.body

        try {
            await BD.query(`
                UPDATE transacoes SET valor = $1, descricao = $2, data_transacao = $3, data_vencimento = $4,
                data_pagamento = $5, tipo_transacao = $6, num_parcelas = $7, parcela_atual = $8,
                id_conta = $9, id_categoria = $10, id_usuario = $11, id_subcategoria = $12
                WHERE id_transacao = $13`,
                [valor, descricao, data_transacao, data_vencimento, data_pagamento, tipo_transacao,
                    num_parcelas, parcela_atual, id_conta, id_categoria, id_usuario, id_subcategoria, id]
            )
            res.status(201).json('Transação atualizada com sucesso')
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar transação', error: error.message })
        }
    }

    static async deletar(req, res) {
        const { id } = req.params
        try {
            await BD.query(`UPDATE transacoes SET ativo = false WHERE id_transacao = $1`, [id])
            res.status(200).json({ message: "Transação desativada com sucesso" })
        } catch (error) {
            res.status(500).json({ message: "Erro ao deletar transação", error: error.message })
        }
    }

    static async listar(req, res) {
        try {
            const transacao = await BD.query('SELECT * FROM transacoes')
            res.status(200).json(transacao.rows)
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar as transações', error: error.message })
        }
    }

    static async listarPorId(req, res) {
        const { id } = req.params
        try {
            const transacao = await BD.query('SELECT * FROM transacoes WHERE id_transacao = $1', [id])
            res.status(200).json(transacao.rows)
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar transação por ID', error: error.message })
        }
    }

    static async atualizar(req, res) {
        const { id } = req.params
        const {
            valor, descricao, data_transacao, data_vencimento, data_pagamento, tipo_transacao,
            num_parcelas, parcela_atual, id_conta, id_categoria, id_usuario, id_subcategoria
        } = req.body;

        try {
            const campos = []
            const valores = []

            if (valor !== undefined) {
                campos.push(`valor = $${valores.length + 1}`)
                valores.push(valor)
            }

            if (descricao !== undefined) {
                campos.push(`descricao = $${valores.length + 1}`)
                valores.push(descricao)
            }

            if (data_transacao !== undefined) {
                campos.push(`data_transacao = $${valores.length + 1}`)
                valores.push(data_transacao)
            }

            if (data_vencimento !== undefined) {
                campos.push(`data_vencimento = $${valores.length + 1}`)
                valores.push(data_vencimento)
            }

            if (data_pagamento !== undefined) {
                campos.push(`data_pagamento = $${valores.length + 1}`)
                valores.push(data_pagamento)
            }

            if (tipo_transacao !== undefined) {
                campos.push(`tipo_transacao = $${valores.length + 1}`)
                valores.push(tipo_transacao)
            }

            if (num_parcelas !== undefined) {
                campos.push(`num_parcelas = $${valores.length + 1}`)
                valores.push(num_parcelas)
            }

            if (parcela_atual !== undefined) {
                campos.push(`parcela_atual = $${valores.length + 1}`)
                valores.push(parcela_atual)
            }

            if (id_conta !== undefined) {
                campos.push(`id_conta = $${valores.length + 1}`)
                valores.push(id_conta)
            }

            if (id_categoria !== undefined) {
                campos.push(`id_categoria = $${valores.length + 1}`)
                valores.push(id_categoria)
            }

            if (id_usuario !== undefined) {
                campos.push(`id_usuario = $${valores.length + 1}`)
                valores.push(id_usuario)
            }

            if (id_subcategoria !== undefined) {
                campos.push(`id_subcategoria = $${valores.length + 1}`)
                valores.push(id_subcategoria)
            }

            if (campos.length === 0) {
                return res.status(400).json({ message: 'Nenhum campo fornecido para atualizar' })
            }

            const query = `UPDATE transacoes SET ${campos.join(", ")} WHERE id_transacao = $${valores.length + 1} RETURNING *`
            valores.push(id)
            const resultado = await BD.query(query, valores)

            if (resultado.rows.length === 0) {
                return res.status(404).json({ message: "Transação não encontrada" })
            }

            return res.status(200).json({ message: "Transação atualizada com sucesso" })
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar transação', error: error.message })
        }
    }

    static async filtrarPorData(req, res) {
        const { data_inicio, data_fim, tipo_data } = req.query
        let colunaData

        if (tipo_data === "VENCIMENTO") {
            colunaData = "data_vencimento"
        } else if (tipo_data === "PAGAMENTO") {
            colunaData = "data_pagamento"
        } else {
            return res.status(400).json({ message: "Tipo de data inválido" })
        }

        try {
            const query = `
                SELECT t.*, u.nome AS nome_usuario, ct.nome AS nome_categoria
                FROM transacoes AS t
                LEFT JOIN usuarios AS u ON t.id_usuario = u.id_usuario
                JOIN contas AS cd ON t.id_conta = cd.id_conta
                JOIN categorias AS ct ON t.id_categoria = ct.id_categoria
                WHERE ${colunaData} BETWEEN $1 AND $2
                ORDER BY ${colunaData} ASC
            `
            const transacao = await BD.query(query, [data_inicio, data_fim])
            return res.status(200).json(transacao.rows)
        } catch (error) {
            console.error('Erro ao filtrar transações por data', error)
            res.status(500).json({ message: 'Erro ao filtrar transações por data', error: error.message })
        }
    }

    static async somarTransacoes(req, res) {
        const { tipo, id_usuario } = req.query
        try {
            const tipoTransacao = tipo.toUpperCase()
            const query = `SELECT SUM(valor) AS total FROM transacoes WHERE tipo_transacao = $1 AND id_usuario = $2`
            const resultado = await BD.query(query, [tipoTransacao, id_usuario])
            let total = resultado.rows[0].total
            if (total === null) total = 0
            res.status(200).json({ total: parseFloat(total) })
        } catch (error) {
            console.error('Erro ao somar transações', error)
            res.status(500).json({ message: 'Erro ao somar transações', error: error.message })
        }
    }

    static async transacoesVencidas(req, res) {
        const { id_usuario } = req.params
        try {
            const query = `
                SELECT t.valor, t.data_transacao,t.data_vencimento,t.data_pagamento ,
                       u.nome AS nome_usuario,
                       c.nome AS nome_conta,
                       ct.nome AS nome_categoria,
                       sct.nome AS nome_subcategoria
                FROM transacoes AS t
                LEFT JOIN usuarios AS u ON t.id_usuario = u.id_usuario
                LEFT JOIN contas AS c ON t.id_conta = c.id_conta
                LEFT JOIN categorias AS ct ON t.id_categoria = ct.id_categoria
                LEFT JOIN subcategorias AS sct ON t.id_subcategoria = sct.id_subcategoria
                WHERE t.data_vencimento < CURRENT_DATE AND t.id_usuario = $1
                ORDER BY t.data_vencimento ASC
            `
            const resultado = await BD.query(query, [id_usuario])
            const formatarDataBr = (data) => {
                if (!data) return null; // Caso a data seja nula, retorna null
                return new Date(data).toLocaleDateString('pt-BR'); // Formata a data para o padrão brasileiro

            }
            const dadosFormatados = resultado.rows.map(t => ({
                ...t,
                data_transacao: formatarDataBr(t.data_transacao),
                data_vencimento: formatarDataBr(t.data_vencimento),
                data_pagamento: formatarDataBr(t.data_pagamento),
            }));
            res.status(200).json(dadosFormatados)
        } catch (error) {
            console.error('Erro ao listar transações vencidas', error)
            res.status(500).json({ message: 'Erro ao listar transações vencidas', error: error.message })

        }
    }
}



export default rotasTransacoes
