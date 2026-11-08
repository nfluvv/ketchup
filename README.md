<h1 align="center">🍅 Ketchup</h1>

<p align="center">
An open-source <b>Quizlet alternative</b> for students and developers, built as a <b>Telegram Mini App (TWA)</b> with <b>Next.js 16</b>, <b>Auth.js v5</b>, <b>Prisma</b>, <b>PostgreSQL</b>, and <b>Feature-Sliced Design (FSD)</b>.
</p>

<p align="center">
<a href="http://t.me/doceox_bot/ketchup"><b>🚀 Launch</b></a>
</p>

---

> [!NOTE]
> Ketchup uses the **SM2 spaced repetition algorithm** on the server. It shows each card at the right time, so learning is faster and more effective.

> [!TIP]
> The project uses **Feature-Sliced Design (FSD)**. Each layer has a clear job, so the code stays clean as the app grows.

---

## ✨ Features

<table>
  <thead>
    <tr>
      <th width="280" align="left">Feature</th>
      <th align="left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="280"><b>SM2 Algorithm</b></td>
      <td>Smart repetition for effective learning.</td>
    </tr>
    <tr>
      <td width="280"><b>Telegram Auth</b></td>
      <td>Secure login with cryptographic validation of Telegram data.</td>
    </tr>
    <tr>
      <td width="280"><b>Telegram Stars</b></td>
      <td>Native in-app payments and monetization.</td>
    </tr>
    <tr>
      <td width="280"><b>Public & Private Decks</b></td>
      <td>Keep decks for yourself or share them with others.</td>
    </tr>
    <tr>
      <td width="280"><b>Streak Notifications</b></td>
      <td>Reminders to keep your learning streak alive.</td>
    </tr>
    <tr>
      <td width="280"><b>Flat FSD Routing</b></td>
      <td>Simple routing that follows FSD rules.</td>
    </tr>
    <tr>
      <td width="280"><b>Dynamic UI Sync</b></td>
      <td>The interface follows Telegram theme colors.</td>
    </tr>
    <tr>
      <td width="280"><b>Haptic Feedback</b></td>
      <td>Fast, smooth interface with native touch feedback.</td>
    </tr>
    <tr>
      <td width="280"><b>Admin Panel</b></td>
      <td>Admin tools inside Telegram.</td>
    </tr>
  </tbody>
</table>

---

## 🔥 Tech Stack

<table>
  <thead>
    <tr>
      <th width="220" align="left">Area</th>
      <th align="left">Tools</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="220"><b>Framework</b></td>
      <td>Next.js 16 (App Router)</td>
    </tr>
    <tr>
      <td width="220"><b>UI</b></td>
      <td>React 19</td>
    </tr>
    <tr>
      <td width="220"><b>Telegram</b></td>
      <td>TWA context and type drivers</td>
    </tr>
    <tr>
      <td width="220"><b>Authentication</b></td>
      <td>Auth.js v5 with a custom provider</td>
    </tr>
    <tr>
      <td width="220"><b>Database & ORM</b></td>
      <td>PostgreSQL, Prisma</td>
    </tr>
    <tr>
      <td width="220"><b>State</b></td>
      <td>Zustand (client), TanStack Query v5 (server)</td>
    </tr>
    <tr>
      <td width="220"><b>Forms</b></td>
      <td>React Hook Form + Zod</td>
    </tr>
    <tr>
      <td width="220"><b>UI Components</b></td>
      <td>shadcn/ui + Radix UI</td>
    </tr>
    <tr>
      <td width="220"><b>Styling</b></td>
      <td>Tailwind CSS 4</td>
    </tr>
    <tr>
      <td width="220"><b>Testing & CI</b></td>
      <td>Vitest, GitHub Actions</td>
    </tr>
  </tbody>
</table>

---

## 🏗️ Architecture

> [!IMPORTANT]
> Each layer can only import from the layers below it. This keeps the code simple to read and easy to scale.

<details>
<summary><b>Project structure</b></summary>

<br>

```text
src/
├── app/          # Entry points, providers, styles, and layouts
├── views/        # Screen-level compositions
├── widgets/      # Reusable UI blocks that connect features and entities
├── features/     # User actions, payments, and business logic
├── entities/     # Domain models, Prisma queries, and state
├── shared/       # UI kit, TWA SDK hooks, and API clients
└── auth.ts       # Custom Telegram data validation for login

app/              # Next.js routing layer
```

</details>