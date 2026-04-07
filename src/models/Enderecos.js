export class Enderecos {
    #idEndereco;
    #uf;
    #cep;
    #logradouro;
    #numero;
    #complemento;
    #cidade;
    #bairro;

    constructor(pIdEndereco, pUf, pCep,
        pLogradouro, pNumero, pComplemento, pCidade, pBairro) {
        this.#idEndereco = pIdEndereco;
        this.uf = pUf;
        this.cep = pCep;
        this.logradouro = pLogradouro;
        this.numero = pNumero;
        this.complemento = pComplemento;
        this.cidade = pCidade;
        this.bairro = pBairro;
    }


    set uf(value) {
        this.#uf = value;
    }

    set cep(value) {
        this.#cep = value;
    }

    set logradouro(value) {
        this.#logradouro = value;
    }

    set numero(value) {
        this.#validarNumero(value);
        this.#numero = value;
    }

    set complemento(value) {
        this.#complemento = value;
    }

    set cidade(value) {
        this.#cidade = value;
    }

    set bairro(value) {
        this.#bairro = value;
    }

    #validarNumero(value) {
        if (!value || value.trim().length < 1 || value.trim().length > 8) {
            throw new Error('O campo numero é obrigatório e deve ter entre 1 e 8 caracteres');
        }
    }

    static criar(dados) {
        return new Enderecos(dados.uf, dados.cep, dados.logradouro, dados.numero, dados.complemento);
    }

    static alterar(dados, id) {
        return new Enderecos (dados.telefone, id);
    }
}