# EasyCâmbio

Aplicação web para conversão de valores entre moedas usando cotações em tempo real.

Projeto da 1ª Avaliação de Programação Web (UESPI) — Problema 4: Conversor de Moedas.

## Integrantes

- Josué Klaysler dos Santos Silva
- Maria Clara Pereira dos Santos Lima

## Funcionalidades

- **Seleção das moedas:** as moedas de origem e destino são carregadas da API ao abrir a página (padrão: USD → BRL).
- **Conversão de valor:** informe um valor positivo (aceita `10,50` e `10.50`) e veja o valor informado, as moedas, a taxa de câmbio e o valor convertido.
- **Inversão das moedas:** o botão "Trocar moedas" inverte origem e destino e refaz a consulta.
- **Consulta de cotação:** exibe a cotação da relação entre as moedas (ex.: `1 USD = 5,01 BRL`) e a data, atualizada ao trocar as moedas ou converter.
- **Valores formatados:** números e taxas no padrão brasileiro, com mensagens para valor vazio, inválido ou não positivo.
- **Feedback ao usuário:** mensagens de carregamento e de erro (com botão "Tentar novamente" se as moedas não carregarem).
- **Acessibilidade e responsividade:** HTML semântico, rótulos nos campos, regiões `aria-live` e layout adaptável a diferentes telas.

## API utilizada

[Frankfurter API](https://frankfurter.dev/) — API pública e gratuita de taxas de câmbio, sem necessidade de chave.

Endpoints usados:

- `GET https://api.frankfurter.dev/v1/currencies` — lista das moedas disponíveis.
- `GET https://api.frankfurter.dev/v1/latest?from=USD&to=BRL` — cotação mais recente entre duas moedas.

Documentação: https://frankfurter.dev/

## Tecnologias

- HTML5 semântico
- CSS3
- JavaScript (ES Modules)
- Fetch API e `async/await`
- `Intl.NumberFormat` e `Intl.DateTimeFormat` para formatação

Sem frameworks, backend próprio, banco de dados ou persistência remota.

## Como executar

Os scripts usam ES Modules, então é preciso servir os arquivos por HTTP (abrir o `index.html` direto pelo navegador não funciona).

1. Clone o repositório:

   ```bash
   git clone https://github.com/josuekla/easy-cambio.git
   cd easy-cambio
   ```

2. Inicie um servidor local, por exemplo:

   ```bash
   python3 -m http.server 8000
   ```

   Ou use a extensão **Live Server** do VS Code.

3. Acesse `http://localhost:8000` no navegador.

É necessária conexão com a internet para consultar a API.

## Estrutura

```
index.html
css/styles.css
js/api.js      # requisições à API
js/format.js   # validação e formatação de números e datas
js/ui.js       # manipulação da interface
js/main.js     # eventos e fluxo da aplicação
```
