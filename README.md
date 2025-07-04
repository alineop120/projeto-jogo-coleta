# 🌲 Gina Mission - Aventura de Coleta e Exploração


![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/Python-3.9%2B-blue)
![React](https://img.shields.io/badge/React-18%2B-blue)
![Vite](https://img.shields.io/badge/Vite-4%2B-orange)

---

## 📖 Descrição

Gina Mission é um jogo interativo onde os jogadores exploram um mundo rico em recursos, interagem com personagens únicos e gerenciam seu progresso através de um sistema de coleta e troca.

**Tecnologias Utilizadas:**

- 🔵 **Frontend**: React (Vite), Context API, uso de hooks customizados
- 🐍 **Backend**: Python (Flask ou FastAPI), com API RESTful organizada
- 📦 **Comunicação**: Axios + Proxy entre Vite e Flask

---

## 🎯 Objetivos do Projeto

- ✅ Criar um mapa interativo com terrenos e obstáculos
- ✅ Movimento de NPCs com lógica (aleatória + direcionada)
- ✅ Interação condicional com Loja e Guilda
- ✅ Coleta de recursos convertida em moedas
- 🔄 Economia dinâmica e compra de itens
- 🔜 Painel de missões com regras por guilda

---

## 📂 Estrutura do Projeto

```bash
projeto-jogo/
├── backend/
│ ├── app.py # Inicialização da API
│ ├── core/ # Lógica principal (jogador, npcs, recursos)
│ ├── data/ # Dados mockados (JSON)
│ ├── routes/ # Rotas da API
│ └── requirements.txt
│
├── frontend/
│ ├── src/
│ │ ├── api/ # Integração com backend
│ │ ├── components/ # Componentes visuais
│ │ ├── context/ # Contextos separados (Player, NPCs, Recursos)
│ │ ├── GameMap/ # Lógica e mapa
│ │ └── App.jsx # Entrada principal
│ └── vite.config.js
│
├── .gitignore
└── README.md
```

## 🚀 Como Executar 

## 🚀 Como Executar o Projeto

### 🧠 Backend (Python)

```bash
cd backend

# Linux/Mac
python -m venv .venv
source .venv/bin/activate     
# Windows
.venv\Scripts\activate      

pip install -r requirements.txt
python app.py
```

📌 API disponível em: http://localhost:5000/api

### 💻 Frontend (React)

---

```bash
cd frontend
npm install
npm run dev
```

🌐 Disponível em: http://localhost:5173

## 🔧 Variáveis de Ambiente

No frontend, crie um arquivo .env:

```env
VITE_API_URL=http://localhost:5000/api
```

## ✨ Funcionalidades Atuais

* ✅ Mapa 2D com terrenos navegáveis e obstáculos
* ✅ Sistema de coleta de recursos
* ✅ NPCs com movimento inteligente e randômico
* ✅ Loja e guilda com painéis exclusivos
* ✅ Sistema de moedas para compra de itens
* ✅ Controle de entrada na guilda baseado em semáforo

## 🛠️ Regras de Negócio Encapsuladas

* localizacaoEspecial: movida para PainelInteracao.jsx
* Lógica de compra no contexto PlayerContext
* NPCs respeitam semáforos para não sobrepor o jogador
* Contextos desacoplados e centralizados via GameProvider

## 📅 Roadmap Futuro
* Sistema de crafting com uso de recursos coletados
* Missões específicas por guilda
* Inventário completo com gerenciamento visual
* Caminhos alternativos para NPCs (A*)
* Sistema de reputação e ranking

## 🧠 Desafios Técnicos

| Desafio | Solução Implementada |
|---------|----------------------|
| Concorrência nos recursos | Semáforos binários (`Semaphore`) | 
| Evitar sobreposição de estados |	Contextos reativos + memoização|
| Entradas simultâneas na guilda | Controle de ocupação com `NPC.id`|
| Evitar flickering na UI |	Uso de `useMemo` e `React.memo`|

## 👥 Equipe

Projeto desenvolvido por:

| Nome                  | Função                     | GitHub                                       |
|-----------------------|----------------------------|----------------------------------------------|
| *Aline Oliveira*      | Desenvolvedora Back-end    | [@alineop120](https://github.com/alineop120) |
| *Ana Beatriz Amorim*  | Analista de Requisitos     | [@Anabamorim](https://github.com/Anabamorim) |
| *Camila Mendes*       | Desenvolvedora Front-end   | N/A                                          |

## 🤝 Contato

> 📌 Para qualquer dúvida ou sugestão, [abra uma issue aqui](https://github.com/alineop120/projeto-coleta-recursos-jogo/issues).

---

>**⌨️ com ❤️ por [Aline](https://github.com/alineop120), [Ana Beatriz](https://github.com/Anabamorim) & [Camila](https://github.com/)**  
_Projeto acadêmico desenvolvido para a disciplina de Sistemas Operacionais - 2025_