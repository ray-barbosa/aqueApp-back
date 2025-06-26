# 💸 AquéApp — Backend

O **AquéApp** é uma plataforma que conecta profissionais trans, não-binários e LGBTQIAPN+ a contratantes conscientes. Este é o backend da aplicação, construído com **Node.js**, **Express**, **TypeScript**, e **MongoDB**, com autenticação via **JWT**.


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
  ├── utils/ # Geração de token JWT
│ ├── config/
│ └── index.ts
├── .env
├── .gitignore
├── tsconfig.json
├── package.json

```



---

## 🔐 Variáveis de ambiente (.env)

```env
PORT=4000
MONGO_URI=mongodb+srv://...       # sua URI do MongoDB Atlas
JWT_SECRET=chave_secreta
JWT_EXPIRES_IN=7d

```



---

## 🛠️ Como rodar localmente

```bash
# Instale as dependências
npm install

# Rode o projeto em modo de desenvolvimento
npm run dev

```



## 📦 Endpoints disponíveis


| Método | Rota            | Descrição                                   | Autenticado |
| ------ | --------------- | ------------------------------------------- | ----------- |
| POST   | `/api/register` | Cria novo usuário (cliente ou profissional) | ❌           |
| POST   | `/api/login`    | Login com email e senha, retorna JWT        | ❌           |



## 🏳️‍⚧️ Profissionais


| Método | Rota                     | Descrição                             | Autenticado  |
| ------ | ------------------------ | ------------------------------------- | ------------ |
| GET    | `/api/professionals`     | Lista todos os usuários profissionais | ❌            |
| GET    | `/api/professionals/:id` | Retorna perfil público por ID         | ❌            |
| PUT    | `/api/profile`           | Edita dados do próprio perfil         | ✅            |
| DELETE | `/api/profile`           | Deleta a própria conta                | ✅ (pendente) |



## 📣 Anúncios (Ads) (em desenvolvimento)


| Método | Rota           | Descrição                 |
| ------ | -------------- | ------------------------- |
| POST   | `/api/ads`     | Cria um novo anúncio      |
| GET    | `/api/ads`     | Lista todos os anúncios   |
| GET    | `/api/ads/:id` | Ver um anúncio específico |
| PUT    | `/api/ads/:id` | Editar anúncio            |
| DELETE | `/api/ads/:id` | Excluir anúncio           |



## 🛠️ Funcionalidades já implementadas

✅ Conexão com MongoDB Atlas

✅ Cadastro com criptografia de senha (bcrypt)

✅ Autenticação com JWT

✅ Listagem de profissionais

✅ Validação de campos específicos para professional

✅ Tipagem com TypeScript

✅ Separação de responsabilidades em controllers e models




## 📌 Organização por Issues

O projeto está sendo desenvolvido com base em issues numeradas e descritas no GitHub 



## 🏳️‍🌈 Missão do projeto

A palavra "Aqué" vem do Pajubá e significa "dinheiro". O objetivo da plataforma é fomentar a circulação de renda dentro da comunidade trans e LGBTQIAPN+, promovendo visibilidade, autonomia e acesso digno ao trabalho.