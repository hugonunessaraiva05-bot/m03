const pedidos = [
  { id: 101, cliente: "Ana Costa", equipamento: "Portátil", estado: "Aberto" },
  { id: 102, cliente: "Rui Santos", equipamento: "Desktop", estado: "Em análise" },
  { id: 103, cliente: "Maria Lopes", equipamento: "Impressora", estado: "Concluído" }
];
function criarCampo(valor, descricao) {
  const campo = document.createElement("input");
  campo.value = valor;
  campo.maxLength = 80;
  campo.setAttribute("aria-label", descricao);
  return campo;
}
function apresentarPedidos() {
  const corpo = document.getElementById("pedidos");
  corpo.replaceChildren();
  for (const pedido of pedidos) {
    const linha = document.createElement("tr");
    const id = document.createElement("th");
    id.scope = "row";
    id.textContent = pedido.id;
    linha.append(id);
    const cliente = criarCampo(pedido.cliente, "Cliente do pedido " + pedido.id);
    const equipamento = criarCampo(pedido.equipamento, "Equipamento do pedido " + pedido.id);
    const estado = document.createElement("select");
    estado.setAttribute("aria-label", "Estado do pedido " + pedido.id);
    for (const texto of ["Aberto", "Em análise", "Concluído"]) {
      const opcao = document.createElement("option");
      opcao.value = texto;
      opcao.textContent = texto;
      estado.append(opcao);
    }
    estado.value = pedido.estado;
    for (const campo of [cliente, equipamento, estado]) {
      const celula = document.createElement("td");
      celula.append(campo);
      linha.append(celula);
    }
    const acoes = document.createElement("td");
    const guardar = document.createElement("button");
    guardar.textContent = "Guardar";
    guardar.addEventListener("click", function() {
      if (!cliente.value.trim() || !equipamento.value.trim()) {
        document.getElementById("mensagem").textContent = "O cliente e o equipamento são obrigatórios.";
        return;
      }
      pedido.cliente = cliente.value.trim();
      pedido.equipamento = equipamento.value.trim();
      pedido.estado = estado.value;
      document.getElementById("mensagem").textContent = "Pedido " + pedido.id + " guardado.";
    });
    const remover = document.createElement("button");
    remover.textContent = "Remover";
    remover.className = "danger";
    remover.addEventListener("click", function() {
      const indice = pedidos.findIndex(item => item.id === pedido.id);
      pedidos.splice(indice, 1);
      linha.remove();
      document.getElementById("mensagem").textContent = "Pedido " + pedido.id + " removido. Restam " + pedidos.length + " pedido(s).";
    });
    acoes.append(guardar, remover);
    linha.append(acoes);
    corpo.append(linha);
  }
}
apresentarPedidos();
