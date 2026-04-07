import { Produtos } from "../models/Produtos.js";
import produtoRepository from "../repositories/produtosRepository.js";

const produtosController = {
    criar: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'Imagem não foi enviada' });
            }
            const { nome, valor, id } = req.body;
            const caminhoImg = `/uploads/imagens/${req.file.filename}`;
            const produto = Produtos.criar({ nome, valor, caminhoImg, id });
            const result = await produtoRepository.criar(produto);
            res.status(201).json({ result });
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
            if (!req.file) {
                return res.status(400).json({ message: 'Imagem não foi enviada' });
            }
            const idProduto = req.params.id;
            const { nome, valor, id } = req.body;
            const caminhoImg = `/uploads/imagens/${req.file.filename}`;
            const produto = Produtos.alterar({ nome, valor, caminhoImg, id }, idProduto);
            const result = await produtoRepository.editar(produto);
            res.status(201).json({ result });
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
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },
    selecionarTodos: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await produtoRepository.selecionarTodos();
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    selecionarUm: async (req, res) => {
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
};

export default produtosController;