# 💸 AquéApp — Backend

Este é o backend da aplicação **AquéApp**, uma plataforma que conecta profissionais trans, não-binários e LGBTQIAPN+ a contratantes conscientes. A API é construída com **Node.js**, **Express** e **TypeScript**, e será responsável por autenticação, cadastro de usuários, criação de anúncios e muito mais.

---

## 🚀 Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)

---

## 📁 Estrutura inicial de pastas



```
aqueapp-back/
├── src/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ ├── config/
│ └── index.ts
├── .env
├── .gitignore
├── tsconfig.json
├── package.json

```




---

## 🛠️ Como rodar localmente

```bash
# Instale as dependências
npm install

# Rode o projeto em modo de desenvolvimento
npm run dev

```



## 🗂️ Endpoints futuros (exemplos)

POST /api/register → Cadastro de usuário

POST /api/login → Autenticação com JWT

POST /api/ads → Criar anúncio (somente profissionais)

GET /api/ads → Listar anúncios

GET /api/users/:id → Perfil público



## 🧩 Organização por etapas
Este backend está sendo construído por etapas, com base em issues no GitHub.

✅ Inicialização do projeto

🔜 Autenticação com JWT

🔜 CRUD de anúncios

🔜 Perfis públicos



## 🏳️‍⚧️ Sobre o nome
Aqué vem do Pajubá e significa “dinheiro”, reforçando a missão de gerar renda e empoderamento dentro da comunidade trans e LGBTQIAPN+.

## 📄 Licença
Este projeto está sob a licença MIT.