function analisarNumeros(lista) {
  if (!Array.isArray(lista) || lista.length === 0) throw new Error("Introduz pelo menos um inteiro.");
  const positivos = [], negativos = [], pares = [], impares = [];
  let soma = 0, zeros = 0, maior = lista[0], menor = lista[0];
  for (const numero of lista) {
    if (!Number.isSafeInteger(numero)) throw new Error("Usa apenas inteiros dentro do intervalo seguro de JavaScript.");
    if (numero > 0) positivos.push(numero);
    else if (numero < 0) negativos.push(numero);
    else zeros++;
    if (numero % 2 === 0) pares.push(numero);
    else impares.push(numero);
    if (numero > maior) maior = numero;
    if (numero < menor) menor = numero;
    soma += numero;
  }
  return { positivos, negativos, pares, impares, maior, menor, media: soma / lista.length, soma, quantidade: lista.length, zeros };
}
document.getElementById("formulario").addEventListener("submit", function(evento) {
  evento.preventDefault();
  const saida = document.getElementById("resultado");
  try {
    const texto = document.getElementById("lista").value.trim();
    if (!texto || texto.split(";").some(parte => parte.trim() === "")) throw new Error("Preenche todos os valores da lista.");
    saida.textContent = JSON.stringify(analisarNumeros(texto.split(";").map(Number)), null, 2);
  } catch (erro) { saida.textContent = erro.message; }
});
document.getElementById("formulario").requestSubmit();
