import { Clientes } from "../models/Clientes.js";
import { Telefones } from "../models/Telefones.js";
import { Enderecos } from "../models/Enderecos.js";
import { connection } from "../configs/Database.js";

const clienteRepository = {
    criar: async (Clientes) => {
        await connection;
        try {
            await connection.beginTransaction();

            const sqlClientes = 'INSERT INTO clientes (nome, cpf) VALUES (?, ?);';
            const valuesClientes = [Clientes.nome, Clientes.cpf];
            const [rowsClientes] = await connection.execute(sqlClientes, valuesClientes);

            const sqlTelefones = 'INSERT INTO telefones (telefone) VALUES (?);';
            const valuesTelefones = [Telefones.telefone];
            const [rowsTelefones] = await connection.execute(sqlTelefones, valuesTelefones);

            const sqlEnderecos = 'INSERT INTO enderecos (uf, logradouro, cidade, bairro, numero, cep, complemento) VALUES (?, ?, ?, ?, ?, ?, ?);';
            const valuesEnderecos = [Enderecos.uf, Enderecos.logradouro, Enderecos.cidade, Enderecos.bairro, Enderecos.numero, Enderecos.cep, Enderecos.complemento];
            const [rowsEnderecos] = await connection.execute(sqlEnderecos, valuesEnderecos);

            await connection.commit();
            return { rowsClientes, rowsTelefones, rowsEnderecos };
        } catch (error) {
            await connection.rollback();
            throw error;
        }
    },
    // editar: async (cliente) => {
    //     try {
    //         await connection.beginTransaction();

    //         const sqlClientes = 'UPDATE clientes SET nome = ?, cpf = ? idCliente = ?;';
    //         const valuesClientes = [Clientes.nome, Clientes.cpf, Clientes.idCliente];
    //         const [rowsClientes] = await connection.execute(sqlClientes, valuesClientes);

    //         const sqlTelefones = 'UPDATE telefones SET telefone = ? WHERE idTelefone = ?;';
    //         const valuesTelefones = [Telefones.telefone, Telefones.idTelefone];
    //         const [rowsTelefones] = await connection.execute(sqlTelefones, valuesTelefones);

    //         const sqlEnderecos = 'UPDATE enderecos SET uf = ?, logradouro = ?, cidade = ?, bairro = ?, numero = ?, cep = ?, complemento = ? WHERE idEndereco = ?;';
    //         const valuesEnderecos = [Enderecos.uf, Enderecos.logradouro, Enderecos.cidade, Enderecos.bairro, Enderecos.numero, Enderecos.cep, Enderecos.complemento, Enderecos.idEndereco];
    //         const [rowsEnderecos] = await connection.execute(sqlEnderecos, valuesEnderecos);

    //         await connection.commit();
    //         return { rowsClientes, rowsTelefones, rowsEnderecos };
    //     } catch (error) {
    //         await connection.rollback();
    //         throw error;
    //     }
    // },
    // deletar: async (clientes) => {
    //     try {
    //         await connection.beginTransaction();

    //         const sqlClientes = 'DELETE from clientes WHERE idCliente = ?;';
    //         const valuesClientes = [Clientes.nome, Clientes.cpf, Clientes.idCliente];
    //         const [rowsClientes] = await connection.execute(sqlClientes, valuesClientes);

    //         const sqlTelefones = 'DELETE from telefones WHERE idTelefone = ?;';
    //         const valuesTelefones = [Telefones.telefone, Telefones.idTelefone];
    //         const [rowsTelefones] = await connection.execute(sqlTelefones, valuesTelefones);

    //         const sqlEnderecos = 'DELETE from enderecos WHERE idEndereco = ?;';
    //         const valuesEnderecos = [Enderecos.uf, Enderecos.logradouro, Enderecos.cidade, Enderecos.bairro, Enderecos.numero, Enderecos.cep, Enderecos.complemento, Enderecos.idEndereco];
    //         const [rowsEnderecos] = await connection.execute(sqlEnderecos, valuesEnderecos);

    //         await connection.commit();
    //         return { rowsClientes, rowsTelefones, rowsEnderecos };
    //     } catch (error) {
    //         await connection.rollback();
    //         throw error;
    //     }
    // },
    //     selecionarUM: async (clientes) => {
    //     try {
    //         await connection.beginTransaction();

    //         const sqlClientes = 'SELECT * from clientes WHERE idCliente = ?;';
    //         const valuesClientes = [Clientes.idCliente];
    //         const [rowsClientes] = await connection.execute(sqlClientes, valuesClientes);

    //         const sqlTelefones = 'SELECT * from telefones WHERE idTelefone = ?;';
    //         const valuesTelefones = [Telefones.idTelefone];
    //         const [rowsTelefones] = await connection.execute(sqlTelefones, valuesTelefones);

    //         const sqlEnderecos = 'SELECT * from enderecos WHERE idEndereco = ?;';
    //         const valuesEnderecos = [Enderecos.idEndereco];
    //         const [rowsEnderecos] = await connection.execute(sqlEnderecos, valuesEnderecos);

    //         await connection.commit();
    //         return { rowsClientes, rowsTelefones, rowsEnderecos };
    //     } catch (error) {
    //         await connection.rollback();
    //         throw error;
    //     }
    // },
    //     selecionar: async (clientes) => {
    //     try {
    //         await connection.beginTransaction();

    //         const sqlClientes = 'SELECT * from clientes';
    //         const [rowsClientes] = await connection.execute(sqlClientes, valuesClientes);

    //         const sqlTelefones = 'SELECT * from telefones;';
    //         const [rowsTelefones] = await connection.execute(sqlTelefones, valuesTelefones);

    //         const sqlEnderecos = 'SELECT * from enderecos;';
    //         const [rowsEnderecos] = await connection.execute(sqlEnderecos, valuesEnderecos);

    //         await connection.commit();
    //         return { rowsClientes, rowsTelefones, rowsEnderecos };
    //     } catch (error) {
    //         await connection.rollback();
    //         throw error;
    //     }
    // },
};

export default clienteRepository
