// Testes locais: node testar.cjs (sem dependências).
// Simula apenas as operações DOM usadas nos exercícios; não substitui um navegador.
const fs = require("node:fs");
const vm = require("node:vm");
const assert = require("node:assert/strict");
let verificacoes = 0;
function verificar(condicao, descricao) {
  assert.ok(condicao, descricao);
  verificacoes++;
  console.log("PASSOU: " + descricao);
}
class Elemento {
  constructor(tag = "div") {
    this.tagName = tag; this.children = []; this.listeners = {};
    this.value = ""; this.textContent = ""; this.parent = null;
  }
  append(...elementos) {
    for (const elemento of elementos) { elemento.parent = this; this.children.push(elemento); }
  }
  replaceChildren(...elementos) { this.children = []; this.append(...elementos); }
  setAttribute(nome, valor) { this[nome] = valor; }
  addEventListener(nome, executar) { this.listeners[nome] = executar; }
  dispatch(nome) { if (this.listeners[nome]) this.listeners[nome]({ preventDefault() {} }); }
  requestSubmit() { this.dispatch("submit"); }
  remove() { this.parent.children = this.parent.children.filter(item => item !== this); }
}
function carregar(numero, armazenamento = new Map()) {
  const pasta = "ex" + String(numero).padStart(2, "0");
  const html = fs.readFileSync(pasta + "/index.html", "utf8");
  const elementos = {};
  for (const correspondencia of html.matchAll(/<(input|textarea|select|form|pre|div|tbody|p|button)[^>]*\bid="([^"]+)"[^>]*>/g)) {
    const elemento = new Elemento(correspondencia[1]);
    const valor = correspondencia[0].match(/\bvalue="([^"]*)"/);
    if (valor) elemento.value = valor[1];
    elementos[correspondencia[2]] = elemento;
  }
  if (numero === 6) elementos.texto.value = "A torre da derrota";
  if (numero === 8) elementos.ordem.value = "nome";
  const contexto = vm.createContext({
    document: {
      getElementById(id) { assert.ok(elementos[id], "Elemento existente: " + id); return elementos[id]; },
      createElement(tag) { return new Elemento(tag); }
    },
    localStorage: {
      getItem(chave) { return armazenamento.has(chave) ? armazenamento.get(chave) : null; },
      setItem(chave, valor) { armazenamento.set(chave, valor); }
    }
  });
  vm.runInContext(fs.readFileSync(pasta + "/script.js", "utf8"), contexto);
  return { elementos, executar: codigo => vm.runInContext(codigo, contexto), armazenamento };
}
for (let numero = 1; numero <= 10; numero++) {
  const pasta = "ex" + String(numero).padStart(2, "0");
  const html = fs.readFileSync(pasta + "/index.html", "utf8");
  new vm.Script(fs.readFileSync(pasta + "/script.js", "utf8"));
  verificar(html.includes('lang="pt-PT"') && html.includes('src="script.js"') && html.includes('../style.css'), pasta + ": estrutura e sintaxe");
}
let teste = carregar(1);
verificar(teste.elementos.resultado.textContent.includes("João Silva") && teste.elementos.resultado.textContent.includes("object"), "EX01: dados e tipos apresentados");
teste = carregar(2);
for (const [entrada, esperado] of [["0", "Insuficiente"], ["9.99", "Insuficiente"], ["10", "Suficiente"], ["13.99", "Suficiente"], ["14", "Bom"], ["17.99", "Bom"], ["18", "Muito bom"], ["20", "Muito bom"]]) {
  teste.elementos.nota.value = entrada;
  teste.elementos.formulario.requestSubmit();
  verificar(teste.elementos.resultado.textContent === esperado, "EX02: limite " + entrada);
}
for (const entrada of ["", " ", "-1", "21", "abc", "Infinity"]) {
  verificar(teste.executar("classificarNota(" + JSON.stringify(entrada) + ")").startsWith("Erro:"), "EX02: rejeita " + JSON.stringify(entrada));
}
teste = carregar(3);
verificar(teste.elementos.resultado.textContent.includes("Soma (for): 55") && teste.elementos.resultado.textContent.includes("Soma (while): 55"), "EX03: somas com for e while");
verificar(teste.elementos.resultado.textContent.includes("Máximo (for): 12") && teste.elementos.resultado.textContent.includes("Máximo (for...of): 12") && teste.elementos.resultado.textContent.includes("7 × 10 = 70"), "EX03: máximos e tabuada");
teste = carregar(4);
for (const [codigo, esperado] of [["add(12,3)",15], ["subtract(12,3)",9], ["multiply(12,3)",36], ["divide(12,3)",4], ["average([4,8,12])",8], ["max([-4,-2])",-2], ["min([4,8,12])",4]]) {
  verificar(teste.executar(codigo) === esperado, "EX04: " + codigo);
}
for (const codigo of ["divide(1,0)", "average([])", "max([])", "min([])", "add('2',3)", "multiply(Infinity,2)"]) {
  let rejeitado = false;
  try { teste.executar(codigo); } catch { rejeitado = true; }
  verificar(rejeitado, "EX04: rejeita " + codigo);
}
teste.elementos.b.value = "0";
teste.elementos.lista.value = "";
teste.elementos.formulario.requestSubmit();
verificar(teste.elementos.resultado.textContent.includes("dividir por zero") && teste.elementos.resultado.textContent.includes("pelo menos um"), "EX04: erros apresentados no formulário");
teste = carregar(5);
const analise = teste.executar("analisarNumeros([-5,-2,0,3,8,12])");
verificar(analise.soma === 16 && analise.quantidade === 6 && analise.zeros === 1 && analise.maior === 12 && analise.menor === -5 && analise.media === 16 / 6, "EX05: estatísticas");
verificar(analise.pares.includes(0) && !analise.positivos.includes(0) && !analise.negativos.includes(0), "EX05: classificação do zero");
for (const entrada of ["", "1;;2", "1;2.5", "x;3"]) {
  teste.elementos.lista.value = entrada; teste.elementos.formulario.requestSubmit();
  verificar(!teste.elementos.resultado.textContent.startsWith("{"), "EX05: rejeita lista " + JSON.stringify(entrada));
}
teste = carregar(6);
verificar(teste.executar("verificarPalindromo('A torre da derrota')") && teste.executar("verificarPalindromo('Á, a!')") && !teste.executar("verificarPalindromo('')"), "EX06: palíndromos e normalização");
verificar(teste.executar("contarPalavras('  Olá, mundo!  ')") === 2 && teste.executar("contarCaracteres('Olá!')") === 4 && teste.executar("inverterString('abc')") === "cba", "EX06: contagens e inversão");
verificar(teste.executar("procurarPalavra('Uma TORRE alta', 'torre')") && !teste.executar("procurarPalavra('torres', 'torre')"), "EX06: pesquisa completa sem distinguir capitalização");
teste = carregar(7);
verificar(teste.executar("JSON.stringify(meuMap([2,5,8,11], n => n*2))") === "[4,10,16,22]", "EX07: map");
verificar(teste.executar("JSON.stringify(meuFilter([2,5,8,11], n => n%2===0))") === "[2,8]", "EX07: filter");
verificar(teste.executar("meuFind([2,5,8,11], n => n>6)") === 8 && teste.executar("meuFind([], n => true)") === undefined, "EX07: find");
verificar(teste.executar("meuReduce([2,5,8,11], (a,b)=>a+b, 0)") === 26 && teste.executar("meuReduce([2,5], (a,b)=>a+b)") === 7, "EX07: reduce");
verificar(teste.executar("meuIncludes([NaN,8],NaN)") && !teste.executar("meuIncludes([8],9)"), "EX07: includes");
verificar(teste.executar("JSON.stringify(meuReverse([2,5,8,11]))") === "[11,8,5,2]", "EX07: reverse");
const toolkit = fs.readFileSync("ex07/script.js", "utf8");
verificar(!/\.(map|filter|find|reduce|includes|reverse)\s*\(/.test(toolkit), "EX07: sem chamadas aos seis métodos nativos");
teste = carregar(8);
verificar(teste.elementos.produtos.children.length === 5, "EX08: catálogo inicial");
teste.elementos.pesquisa.value = "TECLADO"; teste.elementos.pesquisa.dispatch("input");
verificar(teste.elementos.produtos.children.length === 1, "EX08: pesquisa sem distinguir capitalização");
teste.elementos.pesquisa.value = ""; teste.elementos.categoria.value = "Computadores"; teste.elementos.disponibilidade.value = "sim"; teste.elementos.ordem.dispatch("input");
verificar(teste.elementos.produtos.children.length === 1 && teste.elementos.produtos.children[0].children[0].textContent === "Desktop ST", "EX08: combinação de filtros");
teste.elementos.categoria.value = ""; teste.elementos.disponibilidade.value = "";
for (const [ordem, primeiro] of [["asc","Rato sem fios"],["desc","Portátil Saraiva"]]) {
  teste.elementos.ordem.value = ordem; teste.elementos.ordem.dispatch("input");
  verificar(teste.elementos.produtos.children[0].children[0].textContent === primeiro, "EX08: ordem " + ordem);
}
teste.elementos.pesquisa.value = "inexistente"; teste.elementos.pesquisa.dispatch("input");
verificar(teste.elementos.produtos.children.length === 0, "EX08: resultado vazio");
teste = carregar(9);
verificar(teste.elementos.pedidos.children.length === 3, "EX09: linhas geradas pelo DOM");
let linha = teste.elementos.pedidos.children[0];
linha.children[1].children[0].value = "Cliente editado";
linha.children[3].children[0].value = "Concluído";
linha.children[4].children[0].dispatch("click");
verificar(teste.executar("pedidos[0].cliente") === "Cliente editado" && teste.executar("pedidos[0].estado") === "Concluído", "EX09: edição guarda dados no array");
linha.children[1].children[0].value = " ";
linha.children[4].children[0].dispatch("click");
verificar(teste.executar("pedidos[0].cliente") === "Cliente editado" && teste.elementos.mensagem.textContent.includes("obrigatórios"), "EX09: validação de edição vazia");
linha.children[4].children[1].dispatch("click");
verificar(teste.executar("pedidos.length") === 2 && teste.elementos.pedidos.children.length === 2, "EX09: remoção atualiza array e DOM");
for (const restante of [...teste.elementos.pedidos.children]) restante.children[4].children[1].dispatch("click");
verificar(teste.executar("pedidos.length") === 0 && teste.elementos.pedidos.children.length === 0, "EX09: remover todas as linhas");
const armazenamento = new Map();
teste = carregar(10, armazenamento);
teste.elementos.catalogo.children[0].children[2].dispatch("click");
teste.elementos.catalogo.children[0].children[2].dispatch("click");
teste.elementos.catalogo.children[1].children[2].dispatch("click");
verificar(teste.elementos.total.textContent.includes("104,30") && teste.elementos.total.textContent.includes("3 unidade"), "EX10: adicionar e calcular total");
let campo = teste.elementos.carrinho.children[0].children[2];
campo.value = "3"; campo.dispatch("change");
verificar(teste.elementos.total.textContent.includes("144,20") && teste.elementos.total.textContent.includes("4 unidade"), "EX10: alterar quantidade");
campo = teste.elementos.carrinho.children[0].children[2];
for (const valor of ["0","-1","1.5","100",""]) {
  campo.value = valor; campo.dispatch("change");
  verificar(teste.executar("carrinho[0].quantidade") === 3, "EX10: rejeita quantidade " + JSON.stringify(valor));
}
teste = carregar(10, armazenamento);
verificar(teste.elementos.total.textContent.includes("144,20") && teste.elementos.persistencia.textContent.includes("restaurado"), "EX10: restauro numa nova execução com armazenamento preservado");
teste.elementos.carrinho.children[0].children[3].dispatch("click");
verificar(teste.elementos.total.textContent.includes("24,50") && teste.executar("carrinho.length") === 1, "EX10: remover produto");
teste.elementos.limpar.dispatch("click");
teste = carregar(10, armazenamento);
verificar(teste.executar("carrinho.length") === 0 && teste.elementos.total.textContent.includes("0,00"), "EX10: esvaziar e restaurar carrinho vazio");
armazenamento.set("saraiva-tech-m03-carrinho-v1", '[{"id":1,"quantidade":-2}]');
teste = carregar(10, armazenamento);
verificar(teste.executar("carrinho.length") === 0 && teste.elementos.persistencia.textContent.includes("Não foi possível"), "EX10: rejeita armazenamento inválido");
armazenamento.set("saraiva-tech-m03-carrinho-v1", "{");
teste = carregar(10, armazenamento);
verificar(teste.executar("carrinho.length") === 0, "EX10: trata JSON corrompido");
console.log("\n" + verificacoes + " verificações passaram. DOM e localStorage simulados; navegador não testado.");
