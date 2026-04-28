export class Pedido {
    #id
    #idCliente
    #subTotal
    #status
    #dataCad

    //constructor
    constructor(pIdCliente, pSubTotal, pStatus, pDataCad, pId) {
        this.idCliente = pIdCliente
        this.subTotal = pSubTotal
        this.status = pStatus
        this.id = pId
    }

    //Getters
    get id() {
        return this.#id
    }
    get idCliente() {
        return this.#idCliente
    }
    get subTotal() {
        return this.#subTotal
    }
    get status() {
        return this.#status
    }
    get dataCad() {
        return this.#dataCad
    }

    //SETTERS
    set id(value) {
        this.#validarId(value)
        this.#id = value
    }
    set idCliente(value) {
        this.#validarIdCliente(value)
        this.#id = value
    }
    set subTotal(value) {
        this.#validarSubTotal(value)
        this.#id = value
    }
    set status(value) {
        this.#id = value
    }

    //Métodos auxiliares
    #validarId(value) {
        if (value && value <= 0) {
            throw new Error("Verifique o ID informado")
        }
    }
    #validarIdCliente(value) {
        if (!value && value <= 0) {
            throw new Error("Verifique o ID cliente informado")
        }
    }
    #validarSubTotal(value) {
        if (!value || value <= 0) {
            throw new Error("Não foi possivel obter o resultado")
        }
    }

    //Design pattern
    static criar(dados) {
        console.log("KKKK", new Pedido(dados.idCliente, dados.subTotal, dados.status, null))
        return new Pedido(dados.idCliente, dados.subTotal, dados.status, null)
    }
    static editar(dados, id) {
        return new Pedido(dados.idCliente, dados.subTotal, dados.status, id)
    }
}