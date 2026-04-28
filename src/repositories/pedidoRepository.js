import { connection } from "../configs/Database.js";

const pedidoRepository = {
 criar: async (pedido, itens) => {
        const conn = await connection.getConnection();
        console.log(pedido.idCliente, pedido.subTotal, pedido.status);
        
        try {
            await conn.beginTransaction();

            const sqlPedidos = 'INSERT INTO Pedidos (idCliente, subTotal, status) VALUES (?, ?, ?);';
            const valuesPedidos = [pedido.idCliente, pedido.subTotal, pedido.status];
            const [rowsPedidos] = await conn.execute(sqlPedidos, valuesPedidos);

            itens.array.forEach(async item => {
                const sqlItens = 'INSERT INTO itens_pedidos (idPedido, idProduto, quantidade, valorItem) VALUES (?, ?, ?, ?);';
                const valuesItens = [rowsPedidos.insertId, item.idProduto, item.quantidade, item.valorItem];
                [rowsItens] = await conn.execute(sqlItens, valuesItens);
            })

            await conn.commit();
            return { rowsPedidos, rowsItens };
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },
    editar: async (clientes, telefones, enderecos) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();
            console.log(clientes.nome, clientes.cpf, clientes.idCliente)
            console.log(telefones.telefone, telefones.idTelefone)
            console.log(enderecos.uf, enderecos.logradouro, enderecos.cidade, enderecos.bairro, enderecos.numero, enderecos.cep, enderecos.complemento, enderecos.idEndereco)
            const sqlClientes = 'UPDATE clientes SET nome = ?, cpf = ? WHERE idCliente = ?;';
            const valuesClientes = [clientes.nome, clientes.cpf, clientes.idCliente];
            const [rowsClientes] = await conn.execute(sqlClientes, valuesClientes);

            const sqlItens = 'UPDATE telefones SET telefone = ? WHERE idTelefone = ?;';
            const valuesItens = [telefones.telefone, telefones.idTelefone];
            const [rowsTelefones] = await conn.execute(sqlItens, valuesItens);

            const sqlEnderecos = 'UPDATE enderecos SET uf = ?, logradouro = ?, cidade = ?, bairro = ?, numero = ?, cep = ?, complemento = ? WHERE idEndereco = ?;';
            const valuesEnderecos = [enderecos.uf, enderecos.logradouro, enderecos.cidade, enderecos.bairro, enderecos.numero, enderecos.cep, enderecos.complemento, enderecos.idEndereco];
            const [rowsEnderecos] = await conn.execute(sqlEnderecos, valuesEnderecos);

            await conn.commit();
            return { rowsClientes, rowsTelefones, rowsEnderecos };
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },
    deletar: async (clientes, telefones, enderecos) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            console.log(clientes.idCliente);
            console.log(telefones.idTelefone);
            console.log(enderecos.idEndereco);

            const sqlTelefones = 'DELETE FROM telefones WHERE idTelefone = ?;';
            const valuesTelefones = [telefones.idTelefone];
            const [rowsTelefones] = await conn.execute(sqlTelefones, valuesTelefones);

            const sqlEnderecos = 'DELETE FROM enderecos WHERE idEndereco = ?;';
            const valuesEnderecos = [enderecos.idEndereco];
            const [rowsEnderecos] = await conn.execute(sqlEnderecos, valuesEnderecos);

            const sqlClientes = 'DELETE FROM clientes WHERE idCliente = ?;';
            const valuesClientes = [clientes.idCliente];
            const [rowsClientes] = await conn.execute(sqlClientes, valuesClientes);

            await conn.commit();
            return { rowsClientes, rowsTelefones, rowsEnderecos };

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },
    selecionarTodos: async () => {
        const sql = 'SELECT * FROM clientes AS c INNER JOIN enderecos AS e ON c.idCliente = e.idCliente INNER JOIN telefones AS t ON c.idCliente = t.idCliente;'
        const [rows] = await connection.execute(sql)
        return rows;
    },
};

export default pedidoRepository
