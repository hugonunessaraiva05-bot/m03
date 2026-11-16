const produtos = [
  { id: 1, name: "Teclado ST", cents: 3990 },
  { id: 2, name: "Rato sem fios", cents: 2450 },
  { id: 3, name: "SSD 1 TB", cents: 6990 }
];
const chave = "saraiva-tech-m03-carrinho-v1";
const euros = new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" });
let carrinho = [];
function mensagem(texto) { document.getElementById("persistencia").textContent = texto; }
function restaurarCarrinho() {
  try {
    const guardado = localStorage.getItem(chave);
    if (guardado === null) { mensagem("Ainda não existe um carrinho guardado."); return; }
    const dados = JSON.parse(guardado);
    if (!Array.isArray(dados)) throw new Error("Formato inválido.");
    const ids = new Set();
    for (const item of dados) {
      if (!item || !produtos.some(produto => produto.id === item.id) ||
          !Number.isInteger(item.quantidade) || item.quantidade < 1 || item.quantidade > 99 || ids.has(item.id)) {
        throw new Error("Dados inválidos.");
      }
      ids.add(item.id);
    }
    carrinho = dados.map(item => ({ id: item.id, quantidade: item.quantidade }));
    mensagem("Carrinho restaurado do localStorage: " + carrinho.length + " produto(s) diferente(s).");
  } catch (erro) {
    carrinho = [];
    mensagem("Não foi possível restaurar o carrinho. O armazenamento pode estar indisponível ou conter dados inválidos.");
  }
}
function guardarCarrinho() {
  try {
    localStorage.setItem(chave, JSON.stringify(carrinho));
    mensagem("Carrinho guardado no localStorage. Recarrega a página para confirmar o restauro.");
  } catch (erro) { mensagem("Não foi possível guardar. O carrinho funciona nesta sessão, mas pode perder-se ao recarregar."); }
}
function atualizar() { apresentarCarrinho(); guardarCarrinho(); }
function adicionar(id) {
  const item = carrinho.find(item => item.id === id);
  if (item && item.quantidade >= 99) { mensagem("Limite de 99 unidades por produto."); return; }
  if (item) item.quantidade++;
  else carrinho.push({ id, quantidade: 1 });
  atualizar();
}
function remover(id) {
  carrinho = carrinho.filter(item => item.id !== id);
  atualizar();
}
function apresentarCatalogo() {
  const contentor = document.getElementById("catalogo");
  for (const produto of produtos) {
    const cartao = document.createElement("div");
    const nome = document.createElement("h3");
    nome.textContent = produto.name;
    const preco = document.createElement("p");
    preco.textContent = euros.format(produto.cents / 100);
    const botao = document.createElement("button");
    botao.textContent = "Adicionar " + produto.name;
    botao.addEventListener("click", () => adicionar(produto.id));
    cartao.append(nome, preco, botao);
    contentor.append(cartao);
  }
}
function apresentarCarrinho() {
  const contentor = document.getElementById("carrinho");
  contentor.replaceChildren();
  let totalCentimos = 0, unidades = 0;
  if (carrinho.length === 0) {
    const vazio = document.createElement("p");
    vazio.textContent = "O carrinho está vazio.";
    contentor.append(vazio);
  }
  for (const item of carrinho) {
    const produto = produtos.find(produto => produto.id === item.id);
    totalCentimos += produto.cents * item.quantidade;
    unidades += item.quantidade;
    const linha = document.createElement("section");
    const titulo = document.createElement("h3");
    titulo.textContent = produto.name + " · " + euros.format(produto.cents * item.quantidade / 100);
    const etiqueta = document.createElement("label");
    etiqueta.htmlFor = "quantidade-" + item.id;
    etiqueta.textContent = "Quantidade de " + produto.name;
    const campo = document.createElement("input");
    campo.id = etiqueta.htmlFor;
    campo.type = "number"; campo.min = "1"; campo.max = "99"; campo.step = "1";
    campo.value = item.quantidade;
    campo.addEventListener("change", function() {
      const quantidade = Number(campo.value);
      if (!Number.isInteger(quantidade) || quantidade < 1 || quantidade > 99) {
        campo.value = item.quantidade;
        mensagem("Introduz uma quantidade inteira entre 1 e 99.");
        return;
      }
      item.quantidade = quantidade;
      atualizar();
    });
    const botao = document.createElement("button");
    botao.textContent = "Remover " + produto.name;
    botao.className = "danger";
    botao.addEventListener("click", () => remover(item.id));
    linha.append(titulo, etiqueta, campo, botao);
    contentor.append(linha);
  }
  document.getElementById("total").textContent = "Total: " + euros.format(totalCentimos / 100) + " · " + unidades + " unidade(s)";
}
document.getElementById("limpar").addEventListener("click", function() { carrinho = []; atualizar(); });
restaurarCarrinho();
apresentarCatalogo();
apresentarCarrinho();
