import { Clientes } from "../models/Clientes.js";
import { Enderecos } from "../models/Enderecos.js";
import { Telefones } from "../models/Telefones.js";
import clienteRepository from "../repositories/clientesRepository.js";
import axios from "axios";

const clientesController = {
    criar: async (req, res) => {
        try {
            const { nome, cpf, telefone, cep, numero, complemento } = req.body;
            const cepRegex = /^[0-9]{8}$/
            if (!cepRegex.test(cep)) {
                return res.status(400).json({
                    message: 'CEP inválido',
                    errorMessage: 'O CEP deve conter exatamente 8 dígitos numéricos'
                })
            }

            const respApi = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

            if (respApi.data.error) {
                throw new Error("erro ao consultar o cep na api");
            }

            const uf = respApi.data.uf;
            const logradouro = respApi.logradouro;
            const cidade = respApi.cidade;
            const bairro = respApi.bairro

            const cliente = Clientes.criar({ nome, cpf });
            const telefones = Telefones.criar({ telefone });
            const enderecos = Enderecos.criar({uf, logradouro, cidade, bairro, numero, cep, complemento})
            
            const result = await clienteRepository.criar(cliente);

        return res.status(200).json( result );

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
            const id = req.params.id;
            const result = await produtoRepository.deletar(id);
            res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },
    seleciona: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await produtoRepository.selecionarUm(id);
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
export default clientesController;