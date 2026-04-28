export class ItensPedido {
    #id
    #idPedido
    #idProduto
    #quantidade
    #valorItem

    //constructor
    constructor(pIdProduto, pQuantidade, pValorItem, pIdPedido, pId) {
        this.#idProduto = pIdProduto
        this.#quantidade = pQuantidade
        this.#valorItem = pValorItem
        this.idPedido = pIdPedido
        this.id = pId
    }

    //Getters
    get id() {
        return this.#id
    }
    get idPedido() {
        return this.#idPedido
    }
    get idProduto() {
        return this.#idProduto
    }
    get quantidade() {
        return this.#quantidade
    }
    get valorItem() {
        return this.#valorItem
    }

    //SETTERS
    set id(value) {
        this.#validarId(value)
        this.#id = value
    }
    set idPedido(value) {
        this.#validarIdPedido(value)
        this.#id = value
    }
    set idProduto(value) {
        this.#validarIdProduto(value)
        this.#id = value
    }
    set quantidade(value) {
        this.#validarQuantidade(value)
        this.#id = value
    }
    set valorItem(value) {
        this.#validarValorItem(value)
        this.#id = value
    }

    //Métodos auxiliares
    #validarId(value) {
        if (value && value <= 0) {
            throw new Error("Verifique o ID informado")
        }
    }
    #validarIdProduto(value) {
        if (!value && value <= 0) {
            throw new Error("Verifique o ID Produto informado")
        }
    }
    #validarIdPedido(value) {
        if (value && value <= 0) {
            throw new Error("Verifique o ID Pedido informado")
        }
    }
    #validarQuantidade(value) {
        if (!value || value <= 0) {
            throw new Error("Não foi possivel obter a quantidade")
        }
    }
    #validarValorItem(value) {
        if (!value || value <= 0) {
            throw new Error("Não foi possivel obter o valor do item")
        }
    }

    static calculadoraSubTotalItens(itens) {
        return (itens.reduce(
            (total, item) => total+(item.valorItem * item.quantidade), 0
        ))
    }

    //Design pattern
    static criar(dados) {
        console.log(dados.idProduto, dados.quantidade, dados.valorItem, null, null)
        return new ItensPedido(dados.idProduto, dados.quantidade, dados.valorItem, null, null)
    }
    static editar(dados, id) {
        return new ItensPedido(dados.idProduto, dados.quantidade, dados.valorItem, dados.idPedido, id)
    }
}