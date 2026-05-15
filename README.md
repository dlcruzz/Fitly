# Fitly — Plataforma de Gestão de Treinos Fitness

Fitly é uma aplicação web full-stack para gestão de treinos fitness, permitindo que usuários registrem treinos, acompanhem evolução de cargas, definam metas e visualizem seu progresso ao longo do tempo.

---

## Stack Tecnológica

### Frontend
| Tecnologia | Versão |
|---|---|
| React | 18.x |
| Vite | 5.x |
| Tailwind CSS | 3.x |
| React Router DOM | 6.x |
| Axios | 1.x |
| Framer Motion | 11.x |
| Recharts | 2.x |
| Lucide React | latest |

### Backend
| Tecnologia | Versão |
|---|---|
| Java | 17 |
| Spring Boot | 3.x |
| Spring Security | 6.x |
| Spring Data JPA | 3.x |
| Oracle JDBC | 21.x |
| JJWT | 0.11.5 |
| Lombok | latest |
| Maven | 3.x |

---

## Estrutura do Projeto

```
fitly/
├── frontend/                   # Aplicação React + Vite
│   └── src/
│       ├── components/         # Componentes reutilizáveis
│       │   ├── ui/             # Botões, inputs, cards, badges
│       │   └── layout/         # Header, Sidebar, Footer
│       ├── context/            # Contextos React (Auth, Treino, etc.)
│       ├── hooks/              # Hooks customizados
│       ├── pages/              # Páginas da aplicação
│       ├── routes/             # Configuração de rotas
│       ├── services/           # Serviços de comunicação com a API
│       └── utils/              # Funções utilitárias
│
└── backend/                    # API Spring Boot
    └── src/main/java/com/fitly/api/
        ├── controller/         # Controladores REST
        ├── service/            # Regras de negócio
        ├── repository/         # Acesso ao banco de dados
        ├── model/              # Entidades JPA
        ├── dto/                # Objetos de transferência de dados
        ├── config/             # Configurações (Security, CORS)
        └── security/           # JWT e autenticação
```

---

## Funcionalidades Planejadas

- Cadastro e autenticação de usuários com JWT
- Criação e gerenciamento de treinos personalizados
- Registro de exercícios com séries, repetições e carga
- Execução guiada de treinos com timer
- Histórico completo de sessões de treino
- Evolução de carga por exercício com gráficos
- Definição e acompanhamento de metas fitness
- Perfil do usuário com dados físicos e objetivos
- Onboarding personalizado para novos usuários

---

## Setup Local

### Pré-requisitos

- Node.js 18+
- Java 17+
- Maven 3.8+
- Oracle Database (ou Oracle Cloud Free Tier)

### Frontend

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Backend

1. Configure as variáveis de banco de dados em `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:oracle:thin:@SEU_HOST:1521/SEU_SERVICE
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA
jwt.secret=SEU_SECRET_JWT
```

2. Execute a aplicação:

```bash
cd backend
mvn spring-boot:run
```

A API estará disponível em `http://localhost:8080`

---

## Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| POST | `/auth/login` | Autenticação de usuário |
| POST | `/auth/register` | Cadastro de novo usuário |
| POST | `/auth/refresh` | Renovação de token JWT |
| GET | `/treinos` | Listar treinos do usuário |
| POST | `/treinos` | Criar novo treino |
| PUT | `/treinos/{id}` | Atualizar treino |
| DELETE | `/treinos/{id}` | Remover treino |
| GET | `/exercicios` | Listar exercícios |
| GET | `/historico` | Buscar histórico de sessões |
| GET | `/historico/evolucao` | Evolução de carga por exercício |
| GET | `/metas` | Listar metas do usuário |
| POST | `/metas` | Criar nova meta |
| PUT | `/metas/{id}` | Atualizar meta |
| DELETE | `/metas/{id}` | Remover meta |

---

## Contribuição

1. Crie uma branch a partir de `main`: `git checkout -b feature/nome-da-feature`
2. Faça suas alterações e escreva commits descritivos
3. Abra um Pull Request descrevendo as mudanças

---

## Licença

Projeto desenvolvido para fins acadêmicos — FIAP.
