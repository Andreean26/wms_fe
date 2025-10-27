# Project Architecture

## Design Principles

### 1. Separation of Concerns
- **Components**: UI-only, dumb components yang menerima props
- **Pages**: Smart components yang handle business logic & state
- **Services**: Data fetching & API integration layer
- **Hooks**: Reusable logic yang dapat digunakan di berbagai komponen
- **Utils**: Pure functions tanpa side effects
- **Store**: Global state management

### 2. Type Safety
- Semua data structures didefinisikan di `src/types/index.ts`
- No `any` types kecuali absolutely necessary
- Type guards untuk runtime validation
- Strict TypeScript config (`verbatimModuleSyntax`)

### 3. Component Composition
```
AppLayout (wrapper)
  └─ Outlet (router)
      ├─ DashboardPage
      │   └─ CardRoomTemperature (reusable)
      │       └─ StatusBadge (reusable)
      ├─ InventoryListPage
      │   ├─ SearchInput (reusable)
      │   └─ TableInventory (reusable)
      └─ AddInboundPage
          └─ Chakra Form components
```

## Data Flow

### Temperature Monitoring Flow
```
DashboardPage
  → usePolling hook (10s interval)
  → fetchTemperatures() service
  → getTemperatureStatus() util
  → setState → re-render
  → CardRoomTemperature component
```

### Inventory Management Flow
```
InventoryListPage
  → useInventoryStore (Zustand)
  → fetchInventory() service
  → merge with localStorage
  → filterInventoryBySearch() util
  → TableInventory component
```

### Add Inbound Flow
```
AddInboundPage
  → Form validation
  → addItem() store action
  → persist to localStorage (via Zustand middleware)
  → navigate to /inventory
  → toast notification
```

## State Management Strategy

### Local State (useState)
- UI states (loading, error)
- Form inputs
- Search queries

### Global State (Zustand)
- Inventory items (persisted)
- Shared across multiple pages

### Server State
- Temperature data (polling)
- Locations (fetch once)

## Testing Strategy

### Unit Tests
- Utils: Pure functions (temperature, date, search)
- Easy to test, no mocking needed

### Integration Tests (future)
- Components with user interactions
- Form validation scenarios
- Polling behavior

### E2E Tests (future)
- Full user journeys
- Dashboard → Inventory → Add Item flow

## Performance Optimizations

### 1. Polling Cleanup
```typescript
useEffect(() => {
  const interval = setInterval(callback, 10000);
  return () => clearInterval(interval); // Cleanup!
}, []);
```

### 2. Prevent Unnecessary Re-renders
- Zustand: Only subscribes to state slices used
- React.memo for expensive components (if needed)

### 3. Code Splitting (future)
```typescript
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
```

## Accessibility

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Form inputs have proper labels & focus states

### Semantic HTML
- Table uses `<table>`, `<thead>`, `<tbody>`
- Form uses `<form>`, `<label>`, `<input>`
- Navigation uses `<nav>`

### ARIA
- Chakra UI provides ARIA attributes by default
- Alert components have proper roles

## Security Considerations

### Input Validation
- Client-side validation (form)
- TypeScript type checking
- Date validation (no past dates for expiry)

### XSS Prevention
- React escapes content by default
- No `dangerouslySetInnerHTML` used

## Deployment Checklist

- [ ] Build passes without errors (`npm run build`)
- [ ] All tests pass (`npm test`)
- [ ] No TypeScript errors
- [ ] Environment variables configured
- [ ] Mock API replaced with real endpoints
- [ ] Performance tested (Lighthouse score)
- [ ] Accessibility audit passed
- [ ] Browser compatibility tested

## Future Enhancements

### Phase 2
- [ ] User authentication (JWT)
- [ ] Role-based access control
- [ ] Real-time updates (WebSocket)

### Phase 3
- [ ] Analytics dashboard
- [ ] Export/import functionality
- [ ] Multi-language support (i18n)

### Phase 4
- [ ] Mobile app (React Native)
- [ ] Offline support (PWA)
- [ ] Push notifications
