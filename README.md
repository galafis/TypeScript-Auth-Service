# TypeScript-Auth-Service

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.18+-000000?style=for-the-badge&logo=express&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0.0-green.svg?style=for-the-badge)

**Authentication and Authorization Service**

*Enterprise-grade TypeScript application with type safety and modern architecture*

[🇺🇸 English](#english) | [🇧🇷 Português](#português)

</div>

---

## 🇺🇸 English

### 📋 Overview

Authentication and Authorization Service built with TypeScript for enhanced type safety and developer experience. This project demonstrates advanced TypeScript development skills, modern Node.js architecture, and enterprise-level software engineering practices.

### ✨ Key Features

• JWT token management
• Multi-factor authentication
• Role-based access control
• OAuth 2.0 integration
• Session management
• Password security policies
• Audit logging
• API key management

### 🛠️ Technology Stack

- **TypeScript 5.0+** - Strongly typed JavaScript superset
- **Node.js 18+** - JavaScript runtime environment
- **Express.js 4.18+** - Web application framework
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Jest** - Testing framework with TypeScript support
- **ts-node** - TypeScript execution environment

### 🚀 Quick Start

#### Prerequisites
- Node.js 18 or higher
- npm 8 or higher
- TypeScript knowledge

#### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/galafis/TypeScript-Auth-Service.git
   cd TypeScript-Auth-Service
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Start production server**
   ```bash
   npm start
   ```

### 📖 Usage Examples

#### Type-Safe API Usage

```typescript
// Example API interface
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Usage example
const response: ApiResponse<User> = await fetchUser(userId);
```

### 🏗️ Project Structure

```
TypeScript-Auth-Service/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── types/
│   └── utils/
├── dist/
├── tests/
├── package.json
├── tsconfig.json
├── .eslintrc.js
└── README.md
```

### 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Type checking
npm run type-check
```

### 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### 👨‍💻 Author

**Gabriel Demetrios Lafis**
- GitHub: [@galafis](https://github.com/galafis)
- LinkedIn: [Gabriel Demetrios Lafis](https://linkedin.com/in/gabriel-lafis)

---

## 🇧🇷 Português

### 📋 Visão Geral

Authentication and Authorization Service construído com TypeScript para maior segurança de tipos e experiência do desenvolvedor. Este projeto demonstra habilidades avançadas de desenvolvimento TypeScript, arquitetura moderna Node.js e práticas de engenharia de software de nível empresarial.

### ✨ Principais Funcionalidades

• JWT token management
• Multi-factor authentication
• Role-based access control
• OAuth 2.0 integration
• Session management
• Password security policies
• Audit logging
• API key management

### 🛠️ Stack Tecnológica

- **TypeScript 5.0+** - Superset do JavaScript com tipagem forte
- **Node.js 18+** - Ambiente de execução JavaScript
- **Express.js 4.18+** - Framework de aplicação web
- **ESLint** - Linting e formatação de código
- **Prettier** - Formatação de código
- **Jest** - Framework de testes com suporte TypeScript
- **ts-node** - Ambiente de execução TypeScript

### 🚀 Início Rápido

#### Pré-requisitos
- Node.js 18 ou superior
- npm 8 ou superior
- Conhecimento em TypeScript

#### Instalação e Configuração

1. **Clone o repositório**
   ```bash
   git clone https://github.com/galafis/TypeScript-Auth-Service.git
   cd TypeScript-Auth-Service
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Compile o projeto**
   ```bash
   npm run build
   ```

4. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

5. **Inicie o servidor de produção**
   ```bash
   npm start
   ```

### 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

### 👨‍💻 Autor

**Gabriel Demetrios Lafis**
- GitHub: [@galafis](https://github.com/galafis)
- LinkedIn: [Gabriel Demetrios Lafis](https://linkedin.com/in/gabriel-lafis)

---

<div align="center">

**⭐ Se este projeto foi útil para você, considere dar uma estrela!**

**🚀 Desenvolvido com ❤️ por Gabriel Demetrios Lafis**

</div>
