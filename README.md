# Dashboard dados Saúde

Dashboard web para análise de dados de saúde armazenados em PostgreSQL.

O projeto é dividido em:

- **Frontend:** React + TypeScript + Vite + Tailwind CSS + Recharts + TanStack Table + D3
- **Backend:** Python + FastAPI + psycopg
- **Banco de dados:** PostgreSQL remoto, acessado por túnel SSH


# Pré-requisitos

Antes de executar o projeto, instale:

- Git
- Python 3.11 ou superior
- Node.js 20.19 ou superior
- npm
- cliente OpenSSH

O acesso ao PostgreSQL depende também de credenciais e acesso SSH à infraestrutura remota.

---

# 1. Clonar o repositório

Abra o terminal e execute:

```bash
git clone https://github.com/Gustav0Luiz/Dashboard.git
cd Dashboard
```

---

# 2. Abrir o túnel SSH para o PostgreSQL

Antes de iniciar o backend, abra um túnel SSH em um terminal separado.


```bash
ssh -J lbduser@150.164.2.44 -L 8501:localhost:8501 datalake_datasus@150.164.2.13
```


> Mantenha esse terminal aberto durante toda a execução do dashboard.

Após o túnel estar aberto, o PostgreSQL remoto ficará acessível localmente em:

```text
127.0.0.1:5433
```

---

# 3. Configurar o backend

A partir da raiz do projeto:

```bash
python -m venv .venv
```

## Ativar o ambiente virtual

### Windows PowerShell

```powershell
.\.venv\Scripts\Activate.ps1
```

### Windows CMD

```bat
.\.venv\Scripts\activate.bat
```

### Linux/macOS

```bash
source .venv/bin/activate
```

Instale as dependências:

```bash
python -m pip install --upgrade pip
pip install -r backend/requirements.txt
```

---

# 4. Criar o arquivo de configuração do backend

Crie:

```text
backend/.env
```

com:

```env
DB_HOST=127.0.0.1
DB_PORT=5433
DB_NAME=DB_NAME
DB_USER=SEU_USUARIO
DB_PASSWORD=SUA_SENHA
```



# 5. Iniciar o backend

Execute este comando **a partir da raiz do repositório**:

```bash
python -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

O backend ficará disponível em:

```text
http://127.0.0.1:8000
```

Para testar a API:

```text
http://127.0.0.1:8000/health
```

Para testar a conexão com o PostgreSQL:

```text
http://127.0.0.1:8000/health/database
```

A resposta esperada da conexão é semelhante a:

```json
{
  "status": "ok",
  "database": "connected",
  "result": 1
}
```

A documentação automática do FastAPI pode ser acessada em:

```text
http://127.0.0.1:8000/docs
```

---

# 6. Configurar o frontend

Abra um **novo terminal** e entre na pasta:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

O `package-lock.json` deve ser mantido no repositório para que todos instalem versões compatíveis das dependências.

## Variável da API

Crie opcionalmente:

```text
frontend/.env
```

com:

```env
VITE_API_URL=http://127.0.0.1:8000
```

O frontend também possui `http://127.0.0.1:8000` como endereço padrão da API, mas manter o `.env` torna a configuração explícita.


---

# 7. Iniciar o frontend

Dentro de `frontend/`:

```bash
npm run dev
```


Abra esse endereço no navegador.
```text
http://localhost:5173
```


---

# Ordem recomendada para iniciar o projeto

Use três terminais.

## Terminal 1 — túnel SSH

```text
SSH → PostgreSQL
```

Mantenha aberto.

## Terminal 2 — backend

Na raiz do repositório:

```bash
python -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

## Terminal 3 — frontend

Na pasta `frontend/`:

```bash
npm run dev
```

Depois abra:

```text
http://localhost:5173
```

