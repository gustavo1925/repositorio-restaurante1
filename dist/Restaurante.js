"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PratoRepository {
    pratos = [];
    salvar(prato) {
        this.pratos.push({
            nome: prato.nome,
            dataValidade: prato.dataValidade,
            nacionalidade: prato.nacionalidade
        });
    }
    consultarPratos() {
        console.log(this.pratos);
    }
}
class FuncionarioRepository {
    funcionarios = [];
    salvar(funcionario) {
        this.funcionarios.push(funcionario);
    }
    consultarFuncionarios() {
        console.log(this.funcionarios);
    }
    relatorioFuncionariosTrabalhando() {
        console.log("===== FUNCIONÁRIOS TRABALHANDO =====");
        this.funcionarios.forEach(funcionario => {
            if (funcionario.estaTrabalhando()) {
                console.log(funcionario.nome + " - trabalhando");
            }
        });
    }
    relatorioSalarios() {
        console.log("===== RELATÓRIO DE SALÁRIOS =====");
        this.funcionarios.forEach(funcionario => {
            console.log(funcionario.nome +
                " - Salário: R$ " +
                funcionario.calcularSalario());
        });
    }
    consultarPorCPF(cpf) {
        return this.funcionarios.find(funcionario => funcionario.cpf === cpf);
    }
}
class EntregaRepository {
    entregas = [];
    salvar(entrega) {
        this.entregas.push({
            dataHoraSaida: entrega.dataHoraSaida,
            numeroPedido: entrega.numeroPedido,
            enderecoEntrega: entrega.enderecoEntrega
        });
    }
    consultarEntregas() {
        console.log("===== RELATÓRIO DE ENTREGAS =====");
        console.log(this.entregas);
    }
}
class Prato {
    nome;
    dataValidade;
    nacionalidade;
    constructor(nome, dataValidade, nacionalidade) {
        this.nome = nome;
        this.dataValidade = dataValidade;
        this.nacionalidade = nacionalidade;
    }
}
class Funcionario {
    nome;
    sexo;
    dataContratacao;
    cpf;
    rg;
    constructor(nome, sexo, dataContratacao, cpf, rg) {
        this.nome = nome;
        this.sexo = sexo;
        this.dataContratacao = dataContratacao;
        this.cpf = cpf;
        this.rg = rg;
    }
    calcularSalario() {
        return 0;
    }
    estaTrabalhando() {
        return true;
    }
}
class FuncionarioContratado extends Funcionario {
    salarioFixo;
    constructor(nome, sexo, dataContratacao, cpf, rg, salarioFixo) {
        super(nome, sexo, dataContratacao, cpf, rg);
        this.salarioFixo = salarioFixo;
    }
    calcularSalario() {
        return this.salarioFixo;
    }
}
class Freelancer extends Funcionario {
    dataLimiteContrato;
    salarioHora;
    horasTrabalhadas;
    constructor(nome, sexo, dataContratacao, cpf, rg, dataLimiteContrato, salarioHora, horasTrabalhadas) {
        super(nome, sexo, dataContratacao, cpf, rg);
        this.dataLimiteContrato = dataLimiteContrato;
        this.salarioHora = salarioHora;
        this.horasTrabalhadas = horasTrabalhadas;
    }
    calcularSalario() {
        return this.salarioHora * this.horasTrabalhadas;
    }
    contratoAtivo() {
        const hoje = new Date();
        const limite = new Date(this.dataLimiteContrato);
        return hoje <= limite;
    }
    estaTrabalhando() {
        return this.contratoAtivo();
    }
    diasRestantesContrato() {
        const hoje = new Date();
        const limite = new Date(this.dataLimiteContrato);
        const diferenca = limite.getTime() - hoje.getTime();
        const dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));
        if (dias < 0) {
            return 0;
        }
        return dias;
    }
}
class Entrega {
    dataHoraSaida;
    numeroPedido;
    enderecoEntrega;
    constructor(dataHoraSaida, numeroPedido, enderecoEntrega) {
        this.dataHoraSaida = dataHoraSaida;
        this.numeroPedido = numeroPedido;
        this.enderecoEntrega = enderecoEntrega;
    }
}
const prato = new Prato("Pizza", "30/10/2026", "Italiana");
const funcionario = new FuncionarioContratado("Davi", "Masculino", "10/01/2025", "111.111.111-11", "11.111.111-1", 3000);
const freelancer = new Freelancer("Gustavo", "Masculino", "01/10/2026", "333.333.333-33", "33.333.333-3", "31/12/2026", 30, 80);
const entrega1 = new Entrega("20/10/2026 12:30", 1001, "Rua do Vinicius, 100");
const tabelaPratos = new PratoRepository();
const tabelaFuncionarios = new FuncionarioRepository();
const tabelaEntregas = new EntregaRepository();
tabelaPratos.salvar(prato);
tabelaFuncionarios.salvar(funcionario);
tabelaFuncionarios.salvar(freelancer);
tabelaEntregas.salvar(entrega1);
console.log("===== RELATÓRIO DE PRATOS =====");
tabelaPratos.consultarPratos();
console.log("===== RELATÓRIO DE FUNCIONÁRIOS =====");
tabelaFuncionarios.consultarFuncionarios();
tabelaFuncionarios.relatorioFuncionariosTrabalhando();
tabelaFuncionarios.relatorioSalarios();
tabelaEntregas.consultarEntregas();
console.log("===== SITUAÇÃO DO FREELANCER =====");
console.log("Freelancer: " + freelancer.nome);
console.log("Contrato ativo: " + freelancer.contratoAtivo());
console.log("Dias restantes: " +
    freelancer.diasRestantesContrato());
console.log("Salário pelas horas trabalhadas: R$ " +
    freelancer.calcularSalario());
//# sourceMappingURL=Restaurante.js.map