export class Clientes {
    #nome;
    #cpf;
    #dataCad;
    #idCliente;

    constructor(pNome, pCpf, pIdCliente) {
        this.nome = pNome;
        this.cpf = pCpf;
        this.#idCliente = pIdCliente;
    }

    get nome() {
        return this.#nome;
    }
    set nome(value) {
        this.#validarNome(value);
        this.#nome = value;
    }

    get cpf() {
        return this.#cpf;
    }
    set cpf(value) {
        this.#validarCpf(value);
        this.#cpf = value;
    }

    get idCliente() {
        return this.#idCliente;
    }

    #validarNome(value) {
        if (!value || value.trim().length < 3 || value.trim().length > 45) {
            throw new Error('O campo nome é obrigatório e deve ter entre 3 e 45 caracteres');
        }
    }

    #validarCpf(value) {
        if (!value) {
            throw new Error('O campo cpf é obrigatório');
        }

        // Remove tudo que não é número
        const cpf = value.replace(/\D/g, '');

        // CPF deve ter 11 dígitos
        if (cpf.length !== 11) {
            throw new Error('CPF inválido');
        }

        // Elimina CPFs com todos números iguais (ex: 11111111111)
        if (/^(\d)\1+$/.test(cpf)) {
            throw new Error('CPF inválido');
        }

        // Validação do primeiro dígito verificador
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf[i]) * (10 - i);
        }

        let resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;

        if (resto !== parseInt(cpf[9])) {
            throw new Error('CPF inválido');
        }

        // Validação do segundo dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf[i]) * (11 - i);
        }

        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;

        if (resto !== parseInt(cpf[10])) {
            throw new Error('CPF inválido');
        }

        return true;
    }

    static criar(dados) {
        return new Clientes(dados.nome, dados.cpf);
    }

    static alterar(dados, id) {
        return new Clientes(dados.nome, dados.cpf, id);
    }
}