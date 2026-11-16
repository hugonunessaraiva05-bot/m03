function meuMap(lista, transformar) {
  const resultado = [];
  for (let i = 0; i < lista.length; i++) resultado.push(transformar(lista[i], i, lista));
  return resultado;
}
function meuFilter(lista, testar) {
  const resultado = [];
  for (let i = 0; i < lista.length; i++) if (testar(lista[i], i, lista)) resultado.push(lista[i]);
  return resultado;
}
function meuFind(lista, testar) {
  for (let i = 0; i < lista.length; i++) if (testar(lista[i], i, lista)) return lista[i];
  return undefined;
}
function meuReduce(lista, combinar, inicial) {
  let indice = 0;
  let acumulador = inicial;
  if (arguments.length < 3) {
    if (lista.length === 0) throw new Error("Não é possível reduzir uma lista vazia sem valor inicial.");
    acumulador = lista[0];
    indice = 1;
  }
  for (; indice < lista.length; indice++) acumulador = combinar(acumulador, lista[indice], indice, lista);
  return acumulador;
}
function meuIncludes(lista, procurado) {
  for (const valor of lista) {
    if (valor === procurado || (Number.isNaN(valor) && Number.isNaN(procurado))) return true;
  }
  return false;
}
function meuReverse(lista) {
  const resultado = [];
  for (let i = lista.length - 1; i >= 0; i--) resultado.push(lista[i]);
  return resultado;
}
const numeros = [2, 5, 8, 11];
document.getElementById("resultado").textContent =
  "map — dobro: " + meuMap(numeros, n => n * 2).join(", ") +
  "\nfilter — pares: " + meuFilter(numeros, n => n % 2 === 0).join(", ") +
  "\nfind — primeiro maior que 6: " + meuFind(numeros, n => n > 6) +
  "\nreduce — soma: " + meuReduce(numeros, (soma, n) => soma + n, 0) +
  "\nincludes — contém 8: " + meuIncludes(numeros, 8) +
  "\nreverse — ordem invertida: " + meuReverse(numeros).join(", ") +
  "\nOriginal preservado: " + numeros.join(", ");
