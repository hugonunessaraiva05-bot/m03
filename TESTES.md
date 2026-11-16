# Resultado dos testes

Data: 16 de novembro de 2026.

Comando executado: `node testar.cjs`, com Node.js v24.22.0.

**Resultado: 80 verificações passaram, sem falhas.**

O ficheiro testar.cjs usa apenas módulos nativos do Node.js. Executa os scripts num contexto isolado e simula os elementos DOM, eventos e armazenamento usados pelos exercícios. A simulação permite verificar lógica e alterações de dados, mas não reproduz todas as funcionalidades de um navegador.

## Verificações que passaram

- Estrutura dos dez exercícios, referências a script.js e ao CSS comum e sintaxe JavaScript.
- EX01: apresentação dos dados fictícios e tipos.
- EX02: limites 0, 9.99, 10, 13.99, 14, 17.99, 18 e 20; rejeição de vazio, espaços, −1, 21, texto e infinito.
- EX03: soma 55 nas versões for e while, máximo 12 nas versões for e for...of e tabuada de 7.
- EX04: sete funções, divisão por zero, argumentos inválidos, números não finitos, listas vazias e mensagens no formulário.
- EX05: estatísticas da lista inicial, classificação do zero e rejeição de listas vazias, valores omitidos, decimais e texto.
- EX06: contagem, inversão, palavras completas, capitalização e palíndromos normalizados, incluindo o caso vazio.
- EX07: seis funções com ciclos, ausência de chamadas aos seis métodos nativos, pesquisa de NaN e reduce com e sem valor inicial.
- EX08: catálogo inicial, pesquisa, filtros combinados, ordenação por preço e pesquisa sem resultados.
- EX09: geração de três linhas, edição de cliente e estado no array, rejeição de cliente vazio, remoção no array e no DOM e remoção de todas as linhas.
- EX10: adição, totais, alteração e validação de quantidades, remoção, esvaziamento, nova execução com os mesmos dados guardados, restauro de carrinho vazio e tratamento de dados inválidos/JSON corrompido.

## Por confirmar num navegador real

Não foi encontrado um navegador instalado nos caminhos comuns consultados nem uma ferramenta de automação de navegador disponível nesta sessão.

Ficaram por fazer a inspeção visual em ecrãs de diferentes tamanhos, a navegação por teclado, a validação nativa dos formulários e a persistência real do localStorage após recarregar a página. O armazenamento persistente foi testado apenas através de uma simulação em memória partilhada entre execuções.

Os passos manuais estão descritos no README.md. Para testar a persistência real, serve a pasta por HTTP, adiciona produtos, altera quantidades e recarrega o mesmo endereço. Confirma os produtos, as quantidades, o total e a mensagem “Carrinho restaurado do localStorage”.
