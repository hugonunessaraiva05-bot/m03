// const guarda valores que não serão reatribuídos.
const nome = "João Silva"; // string
const idade = 21; // number
const inscrito = true; // boolean
const disciplinas = ["Programação", "Matemática", "Redes"]; // array
const estudante = { nome, idade, inscrito, curso: "Informática" }; // object

document.getElementById("resultado").textContent =
  "string — Nome: " + nome +
  "\nnumber — Idade: " + idade +
  "\nboolean — Inscrito: " + inscrito +
  "\narray — Disciplinas: " + disciplinas.join(", ") +
  "\nobject — Estudante:\n" + JSON.stringify(estudante, null, 2) +
  "\n\nNota: um array é um tipo especial de objeto em JavaScript.";

