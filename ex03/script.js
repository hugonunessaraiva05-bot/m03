function gerarResultados(numero) {
  const contagem = [];
  let soma = 0;
  for (let i = 1; i <= 10; i++) { contagem.push(i); soma += i; }
  const valores = [4, 12, -3, 9, 7];
  let maior = valores[0];
  for (let i = 1; i < valores.length; i++) {
    if (valores[i] > maior) maior = valores[i];
  }
  let somaWhile = 0;
  let contador = 1;
  while (contador <= 10) { somaWhile += contador; contador++; }
  let maiorForOf = valores[0];
  for (const valor of valores) { if (valor > maiorForOf) maiorForOf = valor; }
  let texto = "Contagem: " + contagem.join(", ") + "\nSoma (for): " + soma +
    "\nMáximo (for): " + maior + "\nSoma (while): " + somaWhile +
    "\nMáximo (for...of): " + maiorForOf + "\n\nTabuada:\n";
  for (let i = 1; i <= 10; i++) texto += numero + " × " + i + " = " + numero * i + "\n";
  return texto;
}
function apresentar() {
  const numero = Number(document.getElementById("numero").value);
  document.getElementById("resultado").textContent = gerarResultados(numero);
}
document.getElementById("formulario").addEventListener("submit", function(evento) { evento.preventDefault(); apresentar(); });
apresentar();
