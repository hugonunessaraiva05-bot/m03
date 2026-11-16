Trabalho realizado por: *Hugo Nunes*, número mecanográfico **881942**, Licenciatura em Informática, 16 de novembro de 2026.

# Módulo 03 — JavaScript e DOM

Dez exercícios em HTML, CSS e JavaScript simples, em português de Portugal, com uma identidade visual comum inspirada na Saraiva Tech: fundo azul escuro, destaque azul claro e cartões.

## Como abrir

Abre o `index.html` da raiz num navegador e escolhe um exercício. Cada pasta `ex01` a `ex10` contém o seu `index.html` e `script.js`. O ficheiro `style.css` da raiz é partilhado. Não há dependências nem compilação.

Para um comportamento consistente do localStorage, recomenda-se servir esta pasta por HTTP (por exemplo, com a extensão Live Server do VS Code). Abre sempre o mesmo endereço, porta e navegador para verificar o restauro do carrinho. Em ficheiros locais, o comportamento do armazenamento depende do navegador.

## Exercícios e decisões

| Exercício | Conteúdo e decisões principais |
| --- | --- |
| EX01 — Variables | Dados fictícios de um estudante com string, number, boolean, array e object; apresentação com textContent e JSON.stringify. |
| EX02 — Conditions | if/else: [0,10[ Insuficiente; [10,14[ Suficiente; [14,18[ Bom; [18,20] Muito bom. Aceita decimais e rejeita vazio, valores não finitos e notas fora de 0–20. |
| EX03 — Loops | Contagem 1–10, soma, máximo e tabuada 1–10 com for. Bónus: soma com while e máximo com for...of. |
| EX04 — Functions | add, subtract, multiply, divide, average, max e min. Validação de números finitos, listas vazias e divisão por zero. Cada operação mostra o seu resultado ou erro. |
| EX05 — Number Analyzer | Inteiros separados por ponto e vírgula; positivos, negativos, pares, ímpares, maior, menor e média. Bónus: soma, quantidade e zeros. Zero é par, sem ser positivo nem negativo. Rejeita campos vazios e inteiros fora do intervalo seguro. |
| EX06 — String Laboratory | Contagem de caracteres e palavras, inversão, pesquisa de palavra completa e palíndromos. Pesquisa ignora capitalização; palíndromos também ignoram acentos e pontuação. Caracteres contados por pontos de código Unicode; palavras são sequências de letras ou algarismos. |
| EX07 — Array Toolkit | Seis funções próprias com ciclos, sem chamadas aos seis métodos nativos pedidos. Exemplos visíveis; reduce suporta valor inicial opcional; includes reconhece NaN. Versões didáticas para arrays densos; reverse devolve uma cópia invertida. |
| EX08 — Product Objects | Catálogo com name, price, category e available. Pesquisa por nome, filtros por categoria/disponibilidade e ordenação por nome ou preço, combináveis. |
| EX09 — Dynamic Table | Linhas criadas exclusivamente com createElement a partir de objetos. Edição com Guardar e validação de campos obrigatórios; remoção atualiza o array e o DOM. Os dados ficam apenas em memória. |
| EX10 — Shopping Cart | Adição, remoção e quantidades inteiras 1–99. Total em cêntimos para evitar erros comuns de arredondamento; apresentação em euros com Intl.NumberFormat. Guarda e restaura automaticamente com localStorage, valida dados restaurados e mostra mensagens de sucesso/erro. |

## Organização do código

Usam-se funções curtas, const/let, ciclos, arrays, objetos e addEventListener. O conteúdo introduzido pelo utilizador é apresentado com textContent ou value. Os controlos têm etiquetas; resultados dinâmicos usam regiões de estado. O catálogo e o carrinho usam apenas dados fictícios.

## Validação manual no navegador

1. EX02: experimentar vazio, −1, 0, 9.99, 10, 13.99, 14, 17.99, 18, 20 e 21.
2. EX03: confirmar soma 55, máximo 12 e tabuada de 7; comparar resultados dos ciclos alternativos.
3. EX04: verificar 12 / 3 = 4; depois usar divisor 0, apagar argumentos e esvaziar a lista.
4. EX05: a lista inicial deve dar soma 16, quantidade 6, um zero, maior 12, menor −5 e média 16/6.
5. EX06: “A torre da derrota” deve ser palíndromo; testar pesquisa com maiúsculas, texto vazio e palavras acentuadas.
6. EX07: verificar dobro [4,10,16,22], pares [2,8], primeiro > 6 igual a 8, soma 26, presença de 8 e inversão [11,8,5,2].
7. EX08: combinar pesquisa, categoria e disponibilidade; confirmar as duas ordens de preço e resultado vazio.
8. EX09: mudar cliente e estado, guardar, confirmar no array; tentar guardar cliente vazio; remover uma linha e depois todas.
9. EX10: adicionar dois teclados e um rato (104,30 €, 3 unidades); alterar quantidades e remover; recarregar e verificar a mensagem de restauro e os mesmos valores; esvaziar e recarregar novamente.

O resultado dos testes executados encontra-se em `TESTES.md`.

