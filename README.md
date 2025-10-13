# 🧩 Captura Leads Backend

Backend responsável pela **triagem de leads**, **gerenciamento de assinaturas via Stripe**, **importação de planilhas** e **envio automatizado de mensagens pelo WhatsApp** utilizando **Baileys**.  
O sistema também realiza **envio recorrente de mensagens** e **gera relatórios automáticos** (diários, semanais e mensais).

---

## 🚀 Tecnologias Utilizadas

- **Node.js** — ambiente de execução  
- **Express** — framework para criação das rotas e APIs  
- **Prisma** — ORM para comunicação com o banco de dados  
- **Stripe** — gerenciamento de planos e assinaturas  
- **Redis + BullMQ** — filas e agendamento de tarefas (envios recorrentes)  
- **Baileys** — integração com o WhatsApp  
- **Multer** — upload e leitura de planilhas  
- **XLSX** — leitura e processamento de arquivos Excel  
- **JWT + Bcrypt** — autenticação e segurança  
- **Dotenv** — gerenciamento de variáveis de ambiente  

---

## 🧠 Principais Funcionalidades

- 📋 **Triagem de Leads** — formulário integrado ao site para capturar informações.  
- 💳 **Assinatura Stripe** — controle de planos e pagamentos.  
- 📤 **Importação de Planilhas** — upload de arquivos `.xlsx` contendo dados dos clientes.  
- 💬 **Envio de Mensagens WhatsApp** — comunicação instantânea e programada via **Baileys**.  
- 🕒 **Mensagens Recorrentes** — agendamento de envios automáticos (BullMQ + Redis).  
- 📈 **Relatórios Automáticos** — geração e envio diário, semanal e mensal.  

---

## 🛠️ Instalação e Execução

### 1. Clone o repositório
```bash
git clone https://github.com/WesleyReis13/Captura-de-leads
cd captura-leads-backend
```

---

### 2. Instale as dependências
```bash
npm install
```

---

### 3. Configure o arquivo `.env`
Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis (exemplo):

```bash
# Banco de dados
DATABASE_URL="mysql://<user>:<password>@localhost:3306/<db_name>"

# Stripe
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""

# JWT
JWT_SECRET=""

# Redis
REDIS_HOST="localhost"
REDIS_PORT=6379
```

> ⚠️ **Atenção:** não adicione valores reais no README nem envie o arquivo `.env` para o repositório.  
> Adicione o arquivo `.env` ao `.gitignore` para garantir que ele não seja versionado.

---

### 4. Configure o Prisma
```bash
npx prisma generate
npx prisma migrate dev
```

---

### 5. Execute o servidor
```bash
npm run dev
```

O servidor será iniciado em:
```
http://localhost:3000
```

---

## ⚙️ Fluxo Geral do Sistema

- O usuário preenche o formulário de triagem no site.  
- Os dados são salvos via API neste backend.  
- O usuário pode assinar um plano via **Stripe**.  
- O cliente pode importar uma planilha `.xlsx` com contatos.  
- As mensagens são enviadas via **Baileys (WhatsApp)**.  
- O sistema gera e envia relatórios automáticos aos assinantes.

---

## 👨‍💻 Desenvolvido por  
**Wesley Reis**  
Backend Developer • [LinkedIn](https://www.linkedin.com/in/wesleysnipeslopes/)
