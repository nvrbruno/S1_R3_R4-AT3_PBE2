import { statusPed } from "../enums/statusPedido.js";
import { ItensPedido } from "../models/ItensPedido.js";
import { Pedido } from "../models/Pedido.js";
import pedidoRepository from "../repositories/pedidoRepository.js";


const pedidoController = {
    criar: async (req, res) => {
        try {
            let { idCliente, itens } = req.body

            const itensPedido = itens.map(item =>
                itensPedido.criar({
                    idProduto: item.idProduto,
                    quantidade: item.quantidade,
                    valorItem: item.valorItem
                })
            );

            const subTotal = ItensPedido.calculadoraSubTotalItens(itensPedido)
            const pedido = Pedido.criar({idCliente, subTotal, status:statusPed.ABERTO})

            const result = await pedidoRepository.criar(pedido,itensPedido);
            return res.status(200).json(result);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },
    editar: async (req, res) => {
        try {
            console.log('id: ', req.params.id);

            const idCliente = req.params.id;
            const { idEndereco, idTelefone } = req.query;
            const { nome, cpf, telefone, cep, numero, complemento, } = req.body;

            if (!validarCPF(cpf))
                return res.status(400).json({ message: "CPF inválido" });
            limparNumero(numero);

            const enderecoCep = await consultaCep(cep);
            const { uf, logradouro, cidade, bairro } = enderecoCep;
            const cliente = Clientes.editar({ nome, cpf }, idCliente);
            const telefoneObj = Telefones.editar({ telefone }, idTelefone);
            const enderecoObj = Enderecos.editar({ uf, logradouro, cidade, bairro, numero, cep, complemento }, idEndereco);
            const result = await clienteRepository.editar(cliente, telefoneObj, enderecoObj);

            return res.status(200).json(result);

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },
    deletar: async (req, res) => {
        try {
            console.log('id: ', req.params.id);
            const idCliente = req.params.id;
            const { idEndereco, idTelefone } = req.query;

            const result = await clienteRepository.deletar({ idCliente }, { idTelefone }, { idEndereco });
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },
    selecionarTodos: async (req, res) => {
        try {
            const result = await clienteRepository.selecionarTodos();
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },
}
export default pedidoController;