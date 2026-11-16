function classificarNota(texto) {
  if (String(texto).trim() === "") return "Erro: introduz uma nota.";
  const nota = Number(texto);
  if (!Number.isFinite(nota) || nota < 0 || nota > 20) return "Erro: a nota deve ser um número entre 0 e 20.";
  if (nota < 10) return "Insuficiente";
  else if (nota < 14) return "Suficiente";
  else if (nota < 18) return "Bom";
  else return "Muito bom";
}
document.getElementById("formulario").addEventListener("submit", function(evento) {
  evento.preventDefault();
  document.getElementById("resultado").textContent = classificarNota(document.getElementById("nota").value);
});
