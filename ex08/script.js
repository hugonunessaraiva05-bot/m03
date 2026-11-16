const produtos = [
  { name: "Teclado ST", price: 39.90, category: "Periféricos", available: true },
  { name: "Rato sem fios", price: 24.50, category: "Periféricos", available: true },
  { name: "Portátil Saraiva", price: 799, category: "Computadores", available: false },
  { name: "SSD 1 TB", price: 69.90, category: "Armazenamento", available: true },
  { name: "Desktop ST", price: 649, category: "Computadores", available: true }
];
const euros = new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" });
function apresentarProdutos() {
  const pesquisa = document.getElementById("pesquisa").value.trim().toLocaleLowerCase("pt-PT");
  const categoria = document.getElementById("categoria").value;
  const disponibilidade = document.getElementById("disponibilidade").value;
  const ordem = document.getElementById("ordem").value;
  const visiveis = produtos.filter(function(produto) {
    return produto.name.toLocaleLowerCase("pt-PT").includes(pesquisa) &&
      (!categoria || produto.category === categoria) &&
      (!disponibilidade || produto.available === (disponibilidade === "sim"));
  });
  visiveis.sort(function(a, b) {
    if (ordem === "asc") return a.price - b.price;
    if (ordem === "desc") return b.price - a.price;
    return a.name.localeCompare(b.name, "pt-PT");
  });
  const contentor = document.getElementById("produtos");
  contentor.replaceChildren();
  document.getElementById("contagem").textContent = visiveis.length + " produto(s) encontrado(s).";
  for (const produto of visiveis) {
    const cartao = document.createElement("section");
    const nome = document.createElement("h2");
    nome.textContent = produto.name;
    const detalhes = document.createElement("p");
    detalhes.textContent = produto.category + " · " + (produto.available ? "Disponível" : "Indisponível");
    const preco = document.createElement("p");
    preco.className = "price";
    preco.textContent = euros.format(produto.price);
    cartao.append(nome, detalhes, preco);
    contentor.append(cartao);
  }
}
for (const id of ["pesquisa", "categoria", "disponibilidade", "ordem"]) {
  document.getElementById(id).addEventListener("input", apresentarProdutos);
}
apresentarProdutos();
