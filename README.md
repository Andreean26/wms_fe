# WMS Cold Storage Mini Dashboard

> **Warehouse Management System** untuk monitoring suhu ruang penyimpanan dan mengelola inventory dengan React + TypeScript

[![React](https://img.shields.io/badge/React-19.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1-purple.svg)](https://vitejs.dev/)
[![Chakra UI](https://img.shields.io/badge/Chakra_UI-2.10-teal.svg)](https://chakra-ui.com/)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Architecture Decisions](#-architecture-decisions)
- [Best Practices](#-best-practices)

---

## 🎯 Overview

  
Aplikasi web untuk memantau suhu ruang cold storage dan mengelola inventory barang yang disimpan. Dibangun dengan **React 18+**, **TypeScript strict mode**, dan **Chakra UI** untuk memberikan pengalaman yang clean, modular, dan type-safe.     



**Key Capabilities:**     

- ✅ Real-time temperature monitoring dengan auto-polling (10 detik)     

- ✅ Inventory management dengan search & near-expiry highlighting      tseslint.configs.stylisticTypeChecked,

- ✅ Form validation untuk inbound items

- ✅ Persistent storage dengan localStorage      

- ✅ Fully typed dengan TypeScript (no `any`)    

## ✨ Features

### 1. 🌡️ Dashboard - Temperature Monitoring
- **Auto-polling setiap 10 detik** untuk data suhu terkini
- **Status badge**: Normal (-20°C to -16°C) atau Abnormal
- **Visual alerts** untuk ruangan dengan suhu abnormal
- **Last update timestamp** dengan auto-refresh indicator
- **Dark mode support** untuk kenyamanan mata
- **Reusable state components** (Loading, Error, Empty states)

### 2. 📦 Inventory List
- **Search functionality**: filter berdasarkan SKU atau nama produk (case-insensitive)
- **Near-expiry highlighting**: highlight otomatis untuk barang yang akan expired ≤ 30 hari
- **Table view** dengan kolom: SKU, Name, Batch, Expiry, Quantity, Location, Status
- **Deduplication logic** untuk mencegah data duplikat
- **Dark mode support** dengan color scheme yang konsisten

### 3. 🎨 UI/UX Features
- **Dark mode toggle** - Switch antara light/dark theme
- **Sidebar navigation** dengan active state indicators
- **Full-width responsive layout**
- **Consistent loading, error, dan empty states**
- **Toast notifications** untuk user feedback

---

## � Screenshots

> Cuplikan antarmuka utama aplikasi.

- Dashboard

  ![Dashboard](<src/assets/dashboard.jpg>)

- Inventory List

  ![Inventory List](<src/assets/inventory list.jpg>)

- Add New Item

  ![Add New Item](<src/assets/add new item.jpg>)

- Toast Notification

  ![Toast](<src/assets/toast.jpg>)

- Dark Mode

  ![Dark Mode](<src/assets/darkmode.jpg>)

---

## �🛠 Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | React | 19.1 |
| **Language** | TypeScript (strict mode) | 5.6 |
| **Build Tool** | Vite | 7.1 |
| **UI Library** | Chakra UI | 2.10 |
| **Routing** | React Router | 6.30 |
| **State Management** | Zustand (dengan persist) | 5.0 |
| **Date Utilities** | date-fns | 4.1 |
| **Icons** | React Icons | 5.4 |
| **Testing** | Vitest + Testing Library | Latest |

---

## 📁 Project Structure

```
wms_fe/
├── src/
│   ├── assets/             # Static files (images, fonts)
│   │
│   ├── components/         # Reusable UI components
│   │   ├── AppLayout.tsx           # Main layout wrapper
│   │   ├── Sidebar.tsx             # Navigation sidebar
│   │   ├── DarkModeToggle.tsx      # Theme switcher
│   │   ├── CardRoomTemperature.tsx # Temperature card
│   │   ├── SearchInput.tsx         # Search input field
│   │   ├── StatusBadge.tsx         # Status indicator
│   │   ├── TableInventory.tsx      # Inventory table
│   │   ├── LoadingState.tsx        # Reusable loading component
│   │   ├── ErrorState.tsx          # Reusable error component
│   │   ├── EmptyState.tsx          # Reusable empty component
│   │   └── index.ts                # Barrel exports
│   │
│   ├── pages/              # Page-level components
│   │   ├── DashboardPage.tsx       # Temperature monitoring
│   │   ├── InventoryListPage.tsx   # Inventory management
│   │   └── AddInboundPage.tsx      # Add new item form
│   │
│   ├── hooks/              # Custom React hooks
│   │   ├── usePolling.ts           # Auto-refresh hook (10s interval)
│   │   └── useFetch.ts             # Generic fetch with loading/error
│   │
│   ├── services/           # API layer & external services
│   │   └── api.ts                  # Mock API dengan delay simulation
│   │
│   ├── store/              # State management (Zustand)
│   │   └── inventoryStore.ts       # Inventory global state + localStorage
│   │
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts                # All interfaces & types
│   │
│   ├── utils/              # Helper functions & utilities
│   │   ├── temperature.ts          # Temperature status logic
│   │   ├── date.ts                 # Date/expiry calculations
│   │   └── search.ts               # Search filter logic
│   │
│   ├── test/               # Unit tests
│   │   └── temperature.test.ts     # Temperature utils tests
│   │
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   ├── theme.ts            # Chakra UI theme config (dark mode)
│   ├── index.css           # Global CSS
│   └── App.css             # App-specific CSS
│
├── .gitignore
├── package.json
├── tsconfig.json           # TypeScript config (strict mode)
├── vite.config.ts          # Vite configuration
└── README.md
```

**Penjelasan Struktur:**
- **`components/`** - Komponen UI yang reusable, termasuk state components (Loading, Error, Empty)
- **`pages/`** - Komponen level halaman yang di-route
- **`hooks/`** - Custom hooks untuk logic reuse (polling, fetch)
- **`services/`** - Layer untuk API calls dan external services
- **`store/`** - Global state management dengan Zustand
- **`types/`** - TypeScript type definitions terpusat
- **`utils/`** - Pure functions untuk business logic
- **`test/`** - Unit tests dengan Vitest

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ atau 20+
- **npm** atau **yarn** atau **pnpm**

### Installation

```bash
# Clone repository (jika dari Git)
git clone <repository-url>
cd wms_fe

# Install dependencies
npm install

# Run development server
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173` (atau port lain jika 5173 sudah digunakan)

### Available Scripts

```bash
npm run dev          # Start development server dengan HMR
npm run build        # Build untuk production
npm run preview      # Preview production build locally
npm run test         # Run unit tests dengan Vitest
npm run test:ui      # Run tests dengan UI
npm run lint         # Run ESLint untuk check code quality
```

### Build untuk Production

```bash
# Build optimized production bundle
npm run build

# Preview production build
npm run preview
```

File hasil build akan tersimpan di folder `dist/`

---

## 💡 Usage

### 1. 🌡️ Monitoring Suhu Ruangan
1. Buka halaman **Dashboard** (`/`)
2. Lihat temperature cards untuk setiap ruang penyimpanan
3. Data akan **auto-refresh setiap 10 detik**
4. Perhatikan:
   - Badge **Normal** (hijau) untuk suhu -20°C hingga -16°C
   - Badge **Abnormal** (merah) untuk suhu di luar range
   - Alert muncul di atas jika ada ruangan abnormal
   - Last update timestamp di bawah heading

### 2. 📦 Mengelola Inventory
1. Navigate ke **Inventory** (`/inventory`) via sidebar
2. Gunakan **search bar** untuk filter berdasarkan SKU atau nama produk
3. Lihat informasi:
   - Barang dengan expiry ≤ 30 hari akan ter-highlight **merah**
   - Badge "X days left" menunjukkan sisa hari sebelum expired
   - Badge "Good" untuk barang yang masih aman
4. Klik tombol **"Add Item"** untuk tambah barang baru

### 3. ➕ Tambah Barang Baru (Add New Items)
1. Klik tombol **"Add Item"** di halaman Inventory
2. Isi form dengan data:
   - **SKU** - Kode unik produk
   - **Product Name** - Nama produk
   - **Batch Number** - Nomor batch produk
   - **Expiry Date** - Tanggal kadaluarsa
   - **Quantity** - Jumlah barang (harus > 0)
   - **Storage Location** - Pilih lokasi penyimpanan
3. Sistem akan melakukan validasi:
   - ✅ Semua field wajib diisi
   - ✅ Quantity harus > 0
   - ✅ Expiry date tidak boleh tanggal lampau (harus ≥ hari ini)
4. Setelah submit:
   - Data tersimpan ke localStorage via Zustand
   - Toast notification muncul (success/error)
   - Auto-redirect ke Inventory List

### 4. 🌙 Dark Mode
1. Klik icon **moon (🌙)** di header untuk enable dark mode
2. Klik icon **sun (☀️)** untuk kembali ke light mode
3. Preference tersimpan otomatis di browser

---

## 🧪 Testing

### Run Unit Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Test Coverage

Unit tests tersedia untuk:
- ✅ **Temperature status logic** (`src/test/temperature.test.ts`)
  - Normal boundary: -20°C dan -16°C
  - Abnormal cases: di luar range

**Test Results:**
```
✓ src/test/temperature.test.ts (8)
  ✓ getTemperatureStatus (8)
    ✓ should return Normal when temperature is -20 (minimum boundary)
    ✓ should return Normal when temperature is -16 (maximum boundary)
    ✓ should return Normal when temperature is -18 (middle of range)
    ✓ should return Abnormal when temperature is -15.5 (above max)
    ✓ should return Abnormal when temperature is -21 (below min)
    ✓ should return Abnormal when temperature is 0
    ✓ should return Abnormal when temperature is -25
    ✓ should return Abnormal when temperature is -10
```

---

## 🏗 Architecture Decisions

### 1. **Zustand untuk State Management**

**Mengapa Zustand?**
- ✅ **Sederhana** - Lebih sedikit boilerplate dibanding Redux
- ✅ **Built-in Persistence** - Middleware untuk localStorage integration
- ✅ **Lightweight** - Bundle size kecil (~1KB gzipped)
- ✅ **TypeScript First** - Excellent type inference
- ✅ **No Provider Hell** - Tidak perlu wrap dengan Provider seperti Context API
- ✅ **Perfect untuk skala kecil-menengah** seperti aplikasi ini

**Implementasi:**
```typescript
// Simple store dengan persist middleware
const useInventoryStore = create<InventoryStore>()(
  persist(
    (set) => ({
      items: [],
      setItems: (items) => set({ items }),
      addItem: (item) => set((state) => ({ 
        items: [...state.items, item] 
      })),
    }),
    { name: 'inventory-storage' }
  )
);
```

### 2. **Reusable State Components (LoadingState, ErrorState, EmptyState)**

**Mengapa?**
- ✅ **DRY Principle** - Tidak ada duplicate code untuk loading/error states
- ✅ **Consistency** - Semua halaman memiliki UX yang seragam
- ✅ **Maintainability** - Update 1 komponen, semua halaman terupdate
- ✅ **Reduced Page Complexity** - Page components jadi lebih clean

**Before:**
```typescript
// Duplicate di setiap page (140+ lines)
if (loading) {
  return (
    <Box px={...} py={6}>
      <Center h="60vh">
        <Spinner ... />
        <Text>Loading...</Text>
      </Center>
    </Box>
  );
}
```

**After:**
```typescript
// Clean & reusable (1 line!)
if (loading) {
  return <LoadingState message="Loading inventory..." />;
}
```

### 3. **Custom Hooks untuk Reusability**

**`usePolling`** - Auto-refresh dengan cleanup
- Encapsulate polling logic dengan `setInterval`
- Auto-cleanup saat component unmount
- Configurable interval

**`useFetch`** - Generic data fetching
- Unified loading/error/data states
- Type-safe dengan generics
- Reusable di berbagai pages

**Benefit:**
- ✅ Mencegah code duplication
- ✅ Easier testing (test hooks independently)
- ✅ Separation of concerns

### 4. **Chakra UI untuk UI Library**

**Mengapa Chakra UI?**
- ✅ **Component-based** - Composable & flexible
- ✅ **Accessible by default** - ARIA attributes built-in
- ✅ **Built-in theming** - Dark mode support out of the box
- ✅ **Responsive design** - Responsive props (base, md, lg, xl)
- ✅ **TypeScript support** - Excellent type definitions
- ✅ **Small bundle size** - Tree-shakeable

**Dark Mode Implementation:**
```typescript
// theme.ts - Simple config
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// Usage di components
const bg = useColorModeValue('white', 'gray.800');
```

### 5. **date-fns untuk Date Operations**

**Mengapa date-fns?**
- ✅ **Tree-shakeable** - Hanya import fungsi yang dipakai
- ✅ **Immutable & Pure** - Tidak modify original date
- ✅ **Modular** - Import individual functions
- ✅ **Better performance** - Lebih cepat dari Moment.js
- ✅ **TypeScript native** - First-class TS support

### 6. **Strict TypeScript Configuration**

**tsconfig.json settings:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "verbatimModuleSyntax": true,
    // ... more strict options
  }
}
```

**Benefits:**
- ✅ Catch errors at compile-time, bukan runtime
- ✅ Better IDE autocomplete & IntelliSense
- ✅ Self-documenting code dengan explicit types
- ✅ Easier refactoring

### 7. **Separation of Concerns**

**Layer Architecture:**
```
Pages (UI Logic)
    ↓
Hooks (Reusable Logic)
    ↓
Services (API Layer)
    ↓
Utils (Pure Functions)
```

- **Pages** - Hanya UI logic & composition
- **Hooks** - Reusable stateful logic
- **Services** - API calls & external communication
- **Utils** - Pure functions untuk business logic
- **Store** - Global state management

**Benefits:**
- ✅ Easier testing (test each layer independently)
- ✅ Better code organization
- ✅ Easier to understand & maintain

### 8. **Mock API dengan Realistic Delay**

**Mengapa simulate delay?**
- ✅ Test loading states dengan realistic timing
- ✅ Prepare untuk real API integration
- ✅ Identify UX issues early (loading too long, etc)

```typescript
// Mock delay 300-500ms
await new Promise(resolve => 
  setTimeout(resolve, 300 + Math.random() * 200)
);
```

### 9. **Barrel Exports (index.ts)**

**Pattern:**
```typescript
// components/index.ts
export { LoadingState } from './LoadingState';
export { ErrorState } from './ErrorState';
export { EmptyState } from './EmptyState';
// ... all exports
```

**Benefits:**
- ✅ Cleaner imports: `import { LoadingState, ErrorState } from '../components'`
- ✅ Single source of truth untuk exports
- ✅ Easier refactoring (rename file tidak perlu update semua imports)

---

## 📝 License

This project is created for Company Test purposes.

---

## 👨‍💻 Author

**AdamAndreean** - WMS Cold Storage Dashboard

---



## 👨‍💻 Developer

Built with ❤️ for WMS Cold Storage monitoring needs.

**Duration:** ~3.5 hours  
**Level:** Junior-Mid

---

## 📄 License

MIT License - this is for company test.
