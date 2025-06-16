# [Nome do Seu Jogo] - Aventura de Coleta e Exploração

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/Python-3.9%2B-blue)
![React](https://img.shields.io/badge/React-18%2B-blue)
![Vite](https://img.shields.io/badge/Vite-4%2B-orange)

## 📖 Descrição

[Nome do Seu Jogo] é um jogo interativo onde os jogadores exploram um mundo rico em recursos, interagem com personagens únicos e gerenciam seu progresso através de um sistema de coleta e troca.

**Tecnologias:**
- Frontend: React com Vite, Context API para gerenciamento de estado
- Backend: Python (Flask/FastAPI) com endpoints RESTful


---

## 🎯 Objetivos do Projeto

- [ ] Criar um mapa interativo com diferentes biomas (floresta, montanha, vila)
- [ ] Implementar sistema de movimento do jogador
- [ ] Desenvolver diálogos interativos com NPCs
- [ ] Sistema de coleta e armazenamento de recursos
- [ ] Interface de loja com economia dinâmica
- [ ] Painel de missões da guilda
- [ ] Integração frontend-backend via API REST

---

## 📂 Estrutura do Projeto

```bash
projeto-jogo/
├── backend/               # Servidor Python
│   ├── core/              # Lógica do jogo (NPCs, player, recursos)
│   ├── data/              # Dados persistidos (JSON)
│   ├── routes/            # Endpoints da API
│   ├── app.py             # Aplicação principal
│   └── requirements.txt   # Dependências
│
├── frontend/              # Aplicação React
│   ├── src/
│   │   ├── components/    # UI Components
│   │   ├── context/       # Gerenciamento de estado
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Telas do jogo
│   │   ├── services/      # API clients
│   │   └── utils/         # Funções auxiliares
│   └── ...                # Configurações Vite
│
└── README.md
```

## 🚀 Como Executar 

### Backend 
---

1. Criar ambiente virtual:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
# OU
.venv\Scripts\activate     # Windows
```

2. Instalar dependências:

```bash
pip install -r requirements.txt
```

3. Iniciar servidor:

```bash
python app.py
```
📌 API disponível em: http://localhost:4000

### Frontend

---

1. Instalar dependências:

```bash
cd frontend
npm install
```

2. Iniciar aplicação:

```bash
npm run dev
```

🌐 Disponível em: http://localhost:5173

## 🔧 Configuração

Variáveis de Ambiente: Crie um arquivo .env no frontend:

```env
VITE_API_URL=http://localhost:5000
```

## ✨ Recursos Implementados

* ✅ Sistema básico de movimento
* ✅ Renderização do mapa 2D
* ✅ Interação com NPCs
* ✅ API REST funcional
* ✅ Context API para gerenciamento de estado

## 📅 Roadmap

* Sistema de inventário
* Missões da guilda
* Loja com preços dinâmicos
* Sistema de crafting
* Interações com os npcs

## 🛠️ Desafios Técnicos e Soluções

| Desafio | Solução Implementada | Código Exemplo |
|---------|----------------------|----------------|
| Race conditions nos recursos | Semáforos binários | `threading.Semaphore(1)` |
| Atualização inconsistente do estado | Padrão Observer | `Publisher-Subscriber` |
| Deadlocks em interações complexas | Timeout em aquisição de locks | `lock.acquire(timeout=5)` |
| Latência na comunicação | Cache local no frontend | `useMemo` no React |
| Pathfinding de NPCs | Algoritmo A* simplificado | `priority_queue` em Python |

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