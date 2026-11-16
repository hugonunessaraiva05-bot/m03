function contarCaracteres(texto) { return Array.from(texto).length; }
function inverterString(texto) { return Array.from(texto).reverse().join(""); }
function obterPalavras(texto) { return texto.match(/[\p{L}\p{N}]+/gu) || []; }
function contarPalavras(texto) { return obterPalavras(texto).length; }
function procurarPalavra(texto, palavra) {
  const palavras = obterPalavras(texto.toLocaleLowerCase("pt-PT"));
  return palavras.includes(palavra.trim().toLocaleLowerCase("pt-PT"));
}
function normalizar(texto) {
  return texto.toLocaleLowerCase("pt-PT").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\p{L}\p{N}]/gu, "");
}
function verificarPalindromo(texto) {
  const limpo = normalizar(texto);
  return limpo.length > 0 && limpo === inverterString(limpo);
}
function analisar() {
  const texto = document.getElementById("texto").value;
  const palavra = document.getElementById("palavra").value;
  document.getElementById("resultado").textContent =
    "Caracteres: " + contarCaracteres(texto) + "\nInvertido: " + inverterString(texto) +
    "\nPalavras: " + contarPalavras(texto) + "\nPalavra encontrada: " +
    (procurarPalavra(texto, palavra) ? "Sim" : "Não") +
    "\nPalíndromo: " + (verificarPalindromo(texto) ? "Sim" : "Não");
}
document.getElementById("formulario").addEventListener("submit", function(evento) { evento.preventDefault(); analisar(); });
analisar();
