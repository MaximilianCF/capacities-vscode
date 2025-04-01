# 🧠 Capacities Sync

Extensão para VSCode que permite enviar conteúdos Markdown diretamente para sua nota diária no [Capacities](https://capacities.io).

> Ideal para quem utiliza o VSCode como ambiente de escrita, captura de ideias ou documentação e quer sincronizar com seu sistema de conhecimento pessoal.

---

## ✨ Funcionalidades

- ✅ Envio de arquivos `.md` diretamente para a Daily Note do Capacities
- ✅ Integração via token da API
- ✅ Ambiente de desenvolvimento em container Docker com Dev Containers

---

## 🚀 Como usar

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/capacities-vscode.git
   cd capacities-vscode
   ```

2. Adicione um arquivo `.env` com seu token da Capacities:
   ```dotenv
   CAPACITIES_API_KEY=seu_token_aqui
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Compile a extensão:
   ```bash
   npm run compile
   ```

5. Pressione `F5` no VSCode para iniciar o modo de desenvolvimento da extensão.

6. Crie ou abra um arquivo `.md` e use o comando:
   ```
   Enviar Markdown para Capacities
   ```

---

## 🛠️ Desenvolvimento com Dev Container

1. Certifique-se de que Docker e Dev Containers estão instalados
2. Abra a pasta no VSCode e execute:
   ```
   Dev Containers: Reopen in Container
   ```
3. Rode `npm run watch` para desenvolvimento com hot reload

---

## 📦 Empacotar a extensão

Para gerar um `.vsix`:

```bash
npm run compile
npx vsce package
```

Você pode instalar localmente no VSCode através da opção:  
**Extensões > ... > Instalar do VSIX**

---

## 📄 Licença

MIT — veja [`LICENSE`](./LICENSE)

---

## 🧩 Roadmap

- [ ] Suporte a múltiplos `spaceId`s
- [ ] Enviar como página independente
- [ ] Adicionar tags automaticamente
- [ ] Sincronização reversa com Capacities

---

## 🤝 Contribuindo

Quer sugerir melhorias? Veja [`CONTRIBUTING.md`](./CONTRIBUTING.md)
