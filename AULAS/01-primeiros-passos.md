# Aula 1 — Primeiros passos com Spring Boot

## O que a gente fez até aqui

1. Apagamos o backend antigo do Fitly (ficou salvo no histórico do git, então nada se perdeu de verdade).
2. Geramos um projeto novo, do zero, usando o **Spring Initializr** (start.spring.io) — é assim que praticamente todo projeto Spring Boot profissional começa.
3. Criamos o primeiro endpoint da API: `GET /api/health`.

## Conceitos novos

### O que é Maven (`pom.xml`)

Maven é o "gerente de dependências e construção" do mundo Java — parecido com o `package.json` do Node. O arquivo `backend/pom.xml` diz:

- **Quais bibliotecas** o projeto usa (`<dependencies>`) — ex: `spring-boot-starter-webmvc` (pra criar API REST), `spring-boot-starter-data-jpa` (pra falar com banco de dados), `postgresql` (o driver de conexão com o Postgres).
- **Qual versão do Java** usar (`<java.version>17</java.version>`).
- **Como empacotar** o projeto pra rodar (o plugin `spring-boot-maven-plugin`).

Você não baixa essas bibliotecas manualmente — o Maven baixa sozinho na primeira vez que você compilar.

### O que é `mvnw` / `mvnw.cmd`

É o **Maven Wrapper**. Em vez de precisar instalar o Maven na sua máquina, esse arquivinho baixa a versão certa do Maven sozinho e usa ela. É por isso que rodamos `./mvnw` (ou `mvnw.cmd` no Windows) em vez de só `mvn`.

### `@SpringBootApplication`

Abra `backend/src/main/java/com/fitly/api/FitlyApiApplication.java`. Essa anotação faz 3 coisas de uma vez:
- Liga o **auto-configure** (o Spring tenta configurar sozinho tudo que ele encontra no classpath)
- Liga o **component scan** (o Spring procura, dentro do pacote `com.fitly.api` e subpastas, todas as classes marcadas com `@RestController`, `@Service`, `@Repository`, etc, e as registra automaticamente)
- Marca essa classe como o ponto de entrada da aplicação (tem um `main()` dentro dela)

### `@RestController` e `@GetMapping`

Em `HealthController.java`, criamos nosso primeiro endpoint:

```java
@RestController
public class HealthController {

    @GetMapping("/api/health")
    public Map<String, String> health() {
        return Map.of("status", "ok", "app", "Fitly API");
    }
}
```

- `@RestController` diz ao Spring: "essa classe responde requisições HTTP, e o retorno dos métodos vira JSON automaticamente" (sem você precisar converter nada na mão).
- `@GetMapping("/api/health")` diz: "quando alguém fizer um `GET` em `/api/health`, chama esse método".
- O retorno é um `Map` — o Spring converte ele pra JSON sozinho: `{"status": "ok", "app": "Fitly API"}`.

### A linha temporária no `application.properties`

Colocamos o projeto pra rodar **sem banco de dados** por enquanto (a linha `spring.autoconfigure.exclude=...`), só pra você ver a API de pé rapidinho, sem já precisar configurar o Postgres. Na Aula 2 a gente conecta o banco de verdade e remove essa linha.

## Como rodar

```bash
cd backend
./mvnw spring-boot:run
```

No Windows (PowerShell), é `.\mvnw.cmd spring-boot:run`.

Depois que aparecer `Started FitlyApiApplication` no terminal, abra no navegador:

```
http://localhost:8080/api/health
```

Deve aparecer: `{"status":"ok","app":"Fitly API"}`

## Próxima aula

Aula 2: conectar o Postgres de verdade (criar o banco `fitly_db`, configurar usuário/senha, entender o que é uma **entidade JPA** e criar a primeira tabela: `Usuario`).
