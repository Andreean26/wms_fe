# WMS Cold Storage Mini Dashboard# React + TypeScript + Vite



> **Warehouse Management System** untuk monitoring suhu ruang penyimpanan dan mengelola inventory dengan React + TypeScriptThis template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.



[![React](https://img.shields.io/badge/React-19.1-blue.svg)](https://reactjs.org/)Currently, two official plugins are available:

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)

[![Vite](https://img.shields.io/badge/Vite-7.1-purple.svg)](https://vitejs.dev/)- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

[![Chakra UI](https://img.shields.io/badge/Chakra_UI-2.10-teal.svg)](https://chakra-ui.com/)- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



---## React Compiler



## 📋 Table of ContentsThe React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).



- [Overview](#-overview)## Expanding the ESLint configuration

- [Features](#-features)

- [Tech Stack](#-tech-stack)If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

- [Project Structure](#-project-structure)

- [Getting Started](#-getting-started)```js

- [Usage](#-usage)export default defineConfig([

- [Testing](#-testing)  globalIgnores(['dist']),

- [Architecture Decisions](#-architecture-decisions)  {

    files: ['**/*.{ts,tsx}'],

---    extends: [

      // Other configs...

## 🎯 Overview

      // Remove tseslint.configs.recommended and replace with this

Aplikasi web untuk memantau suhu ruang cold storage dan mengelola inventory barang yang disimpan. Dibangun dengan **React 18+**, **TypeScript strict mode**, dan **Chakra UI** untuk memberikan pengalaman yang clean, modular, dan type-safe.      tseslint.configs.recommendedTypeChecked,

      // Alternatively, use this for stricter rules

**Key Capabilities:**      tseslint.configs.strictTypeChecked,

- ✅ Real-time temperature monitoring dengan auto-polling (10 detik)      // Optionally, add this for stylistic rules

- ✅ Inventory management dengan search & near-expiry highlighting      tseslint.configs.stylisticTypeChecked,

- ✅ Form validation untuk inbound items

- ✅ Persistent storage dengan localStorage      // Other configs...

- ✅ Fully typed dengan TypeScript (no `any`)    ],

    languageOptions: {

---      parserOptions: {

        project: ['./tsconfig.node.json', './tsconfig.app.json'],

## ✨ Features        tsconfigRootDir: import.meta.dirname,

      },

### 1. 🌡️ Dashboard - Temperature Monitoring      // other options...

- **Auto-polling setiap 10 detik** untuk data suhu terkini    },

- **Status badge**: Normal (-20°C to -16°C) atau Abnormal  },

- **Visual alerts** untuk ruangan dengan suhu abnormal])

- **Last update timestamp** dengan auto-cleanup on unmount```

- **Loading & error states** yang jelas

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

### 2. 📦 Inventory List

- **Search functionality**: filter berdasarkan SKU atau nama produk (case-insensitive)```js

- **Near-expiry highlighting**: highlight otomatis untuk barang yang akan expired ≤ 30 hari// eslint.config.js

- **Table view** dengan kolom: SKU, Name, Batch, Expiry, Quantity, Location, Statusimport reactX from 'eslint-plugin-react-x'

- **Empty state & no results** handlingimport reactDom from 'eslint-plugin-react-dom'



### 3. ➕ Add Inbound Formexport default defineConfig([

- **Comprehensive validation**:  globalIgnores(['dist']),

  - Semua field wajib diisi  {

  - Quantity > 0    files: ['**/*.{ts,tsx}'],

  - Expiry date >= hari ini (tidak boleh tanggal lampau)    extends: [

- **Dynamic location dropdown** (fetch dari API)      // Other configs...

- **Toast notification** untuk success/error feedback      // Enable lint rules for React

- **Auto-redirect** ke inventory list setelah submit berhasil      reactX.configs['recommended-typescript'],

      // Enable lint rules for React DOM

---      reactDom.configs.recommended,

    ],

## 🛠 Tech Stack    languageOptions: {

      parserOptions: {

| Category | Technology |        project: ['./tsconfig.node.json', './tsconfig.app.json'],

|----------|-----------|        tsconfigRootDir: import.meta.dirname,

| **Framework** | React 19.1 |      },

| **Language** | TypeScript 5.6 (strict mode) |      // other options...

| **Build Tool** | Vite 7.1 |    },

| **UI Library** | Chakra UI 2.10 |  },

| **Routing** | React Router v6.30 |])

| **State Management** | Zustand 5.0 (dengan persist middleware) |```

| **Date Utilities** | date-fns 4.1 |
| **Testing** | Vitest + Testing Library |

---

## 📁 Project Structure

```
wms_fe/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AppLayout.tsx
│   │   ├── CardRoomTemperature.tsx
│   │   ├── SearchInput.tsx
│   │   ├── StatusBadge.tsx
│   │   └── TableInventory.tsx
│   ├── pages/              # Page components
│   │   ├── DashboardPage.tsx
│   │   ├── InventoryListPage.tsx
│   │   └── AddInboundPage.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── usePolling.ts   # Auto-refresh hook
│   │   └── useFetch.ts     # Generic fetch hook
│   ├── services/           # API layer
│   │   └── api.ts          # Mock API dengan delay simulation
│   ├── store/              # Zustand stores
│   │   └── inventoryStore.ts
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/              # Utility functions
│   │   ├── date.ts         # Date validation & expiry logic
│   │   ├── search.ts       # Search filter logic
│   │   └── temperature.ts  # Temperature status logic
│   ├── test/               # Test setup
│   │   └── setup.ts
│   ├── App.tsx             # Main app with routing
│   └── main.tsx            # Entry point
├── vitest.config.ts        # Vitest configuration
├── tsconfig.json           # TypeScript config (strict)
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Installation

```bash
# Navigate to project directory
cd wms_fe

# Install dependencies
npm install

# Run development server
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build untuk production
npm run preview  # Preview production build
npm run test     # Run unit tests
npm run lint     # Run ESLint
```

---

## 💡 Usage

### 1. Monitoring Suhu
- Buka halaman Dashboard (`/`)
- Data suhu akan otomatis refresh setiap 10 detik
- Badge **Normal** (hijau) atau **Abnormal** (merah)
- Alert muncul jika ada ruangan dengan suhu abnormal

### 2. Melihat Inventory
- Navigate ke Inventory (`/inventory`)
- Gunakan search bar untuk filter berdasarkan SKU/nama
- Barang dengan expiry ≤ 30 hari akan ter-highlight dengan warna orange

### 3. Tambah Barang Baru
- Klik tombol **"Add Inbound"** di Inventory page
- Isi semua field (SKU, Name, Batch, Expiry, Quantity, Location)
- Sistem akan validasi:
  - Quantity harus > 0
  - Expiry date tidak boleh tanggal lampau
- Setelah submit, data tersimpan di localStorage dan tampil di inventory list

---

## 🧪 Testing

### Run Unit Tests

```bash
npm test
```

### Test Coverage

Unit tests tersedia untuk:
- ✅ **Temperature status logic** (`temperature.test.ts`)
  - Normal boundary: -20°C dan -16°C
  - Abnormal cases: di luar range

**Test Cases:**
```typescript
✓ should return Normal when temperature is -20 (minimum boundary)
✓ should return Normal when temperature is -16 (maximum boundary)
✓ should return Abnormal when temperature is -15.5 (above max)
✓ should return Abnormal when temperature is -21 (below min)
```

---

## 🏗 Architecture Decisions

### 1. **Zustand untuk State Management**
**Mengapa Zustand?**
- Lebih sederhana dibanding Redux (less boilerplate)
- Built-in middleware untuk localStorage persistence
- Lightweight & fast
- Perfect untuk aplikasi skala kecil-menengah

### 2. **Custom Hooks untuk Reusability**
- `usePolling`: Encapsulate polling logic dengan auto-cleanup
- `useFetch`: Generic data fetching dengan loading/error states
- Mencegah code duplication dan memudahkan testing

### 3. **Chakra UI untuk UI Library**
- Component-based, accessible by default
- Built-in theming & responsive design
- Mengurangi waktu development untuk styling
- Good TypeScript support

### 4. **date-fns untuk Date Operations**
- Tree-shakeable (hanya import fungsi yang dipakai)
- Immutable & pure functions
- Better performance dibanding Moment.js

### 5. **Strict TypeScript**
- `verbatimModuleSyntax`: enforce type-only imports
- No implicit `any`
- Mencegah runtime errors dengan compile-time checking

### 6. **Mock API dengan Delay**
- Simulasi real network latency (300-500ms)
- Random variation pada temperature untuk real-time feel
- Mudah di-replace dengan real API endpoint

---

## 🎯 Acceptance Criteria

- ✅ Dashboard melakukan polling dan memperbarui suhu setiap 10 detik
- ✅ Status warna/badge jelas untuk Normal/Abnormal
- ✅ Inventory dapat di-search oleh SKU/nama
- ✅ Barang dengan expiry ≤ 30 hari ter-highlight
- ✅ Validasi form inbound berjalan (wajib, qty>0, expiry>=hari ini)
- ✅ TypeScript strict tanpa 'any' sembarangan
- ✅ Struktur folder rapi & komponen/hook modular
- ✅ Minimal 1 unit test lulus

---

## 🚀 Bonus Features Implemented

- ✅ **localStorage persistence** untuk inventory data
- ✅ **Toast notifications** saat tambah barang berhasil
- ✅ **Responsive design** dengan Chakra UI
- ✅ **Keyboard accessible** components
- ✅ **Empty & error states** handling

---

## 📝 Notes

### Mock Data
Aplikasi menggunakan mock data yang di-hardcode di `src/services/api.ts`. Untuk production:
1. Replace mock functions dengan real API calls
2. Add environment variables untuk API base URL
3. Implement proper error handling & retry logic

### Future Enhancements
- [ ] Dark mode toggle
- [ ] Export inventory to CSV/Excel
- [ ] Advanced filtering (by location, expiry range)
- [ ] User authentication & authorization
- [ ] Real-time notifications dengan WebSocket
- [ ] Pagination untuk large inventory

---

## 👨‍💻 Developer

Built with ❤️ for WMS Cold Storage monitoring needs.

**Duration:** ~3.5 hours  
**Level:** Junior-Mid

---

## 📄 License

MIT License - feel free to use this project for learning purposes.
