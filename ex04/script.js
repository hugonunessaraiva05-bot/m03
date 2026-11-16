function validarNumero(numero) {
  if (typeof numero !== "number" || !Number.isFinite(numero)) throw new Error("O argumento deve ser um número finito.");
}
function add(a, b) { validarNumero(a); validarNumero(b); return a + b; }
function subtract(a, b) { validarNumero(a); validarNumero(b); return a - b; }
function multiply(a, b) { validarNumero(a); validarNumero(b); return a * b; }
function divide(a, b) {
  validarNumero(a); validarNumero(b);
  if (b === 0) throw new Error("Não é possível dividir por zero.");
  return a / b;
}
function validarLista(lista) {
  if (!Array.isArray(lista) || lista.length === 0) throw new Error("A lista deve conter pelo menos um número.");
  for (const numero of lista) validarNumero(numero);
}
function average(lista) {
  validarLista(lista);
  let soma = 0;
  for (const numero of lista) soma += numero;
  return soma / lista.length;
}
function max(lista) {
  validarLista(lista);
  let maior = lista[0];
  for (const numero of lista) if (numero > maior) maior = numero;
  return maior;
}
function min(lista) {
  validarLista(lista);
  let menor = lista[0];
  for (const numero of lista) if (numero < menor) menor = numero;
  return menor;
}
function lerNumero(texto) { return texto.trim() === "" ? NaN : Number(texto); }
function calcular() {
  const a = lerNumero(document.getElementById("a").value);
  const b = lerNumero(document.getElementById("b").value);
  const texto = document.getElementById("lista").value.trim();
  const lista = texto === "" ? [] : texto.split(";").map(lerNumero);
  const operacoes = [
    ["add", () => add(a, b)], ["subtract", () => subtract(a, b)],
    ["multiply", () => multiply(a, b)], ["divide", () => divide(a, b)],
    ["average", () => average(lista)], ["max", () => max(lista)], ["min", () => min(lista)]
  ];
  let resultado = "";
  for (const [nome, executar] of operacoes) {
    try { resultado += nome + ": " + executar() + "\n"; }
    catch (erro) { resultado += nome + ": " + erro.message + "\n"; }
  }
  document.getElementById("resultado").textContent = resultado;
}
document.getElementById("formulario").addEventListener("submit", function(evento) { evento.preventDefault(); calcular(); });
calcular();
