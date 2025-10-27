# Development Guidelines

## Code Style

### TypeScript
```typescript
// ✅ Good: Type-only imports
import type { InventoryItem } from '../types';

// ❌ Bad: Regular import for types
import { InventoryItem } from '../types';

// ✅ Good: Explicit return types
export function getStatus(temp: number): TemperatureStatus {
  // ...
}

// ❌ Bad: Inferred return type
export function getStatus(temp: number) {
  // ...
}
```

### React Components
```typescript
// ✅ Good: Interface for props
interface CardProps {
  title: string;
  children: React.ReactNode;
}

export function Card({ title, children }: CardProps) {
  return <div>{title}{children}</div>;
}

// ❌ Bad: Inline types
export function Card({ title, children }: { title: string; children: React.ReactNode }) {
  // ...
}
```

### Naming Conventions
- **Components**: PascalCase (`CardRoomTemperature.tsx`)
- **Hooks**: camelCase with `use` prefix (`usePolling.ts`)
- **Utils**: camelCase (`temperature.ts`)
- **Types**: PascalCase for interfaces (`TemperatureRoom`)
- **Constants**: UPPER_SNAKE_CASE (`POLLING_INTERVAL`)

## File Organization

### When to create a new component?
1. Component is used in multiple places
2. Component has complex logic (>100 lines)
3. Component can be unit tested independently

### When to create a new hook?
1. Logic is reusable across components
2. Logic has side effects (API calls, subscriptions)
3. Logic needs cleanup on unmount

### When to create a new util?
1. Pure function (no side effects)
2. Can be unit tested easily
3. Used in multiple places

## Git Workflow

### Commit Messages
```
feat: add temperature polling to dashboard
fix: correct expiry date validation logic
refactor: extract search logic to utils
docs: update README with setup instructions
test: add unit tests for temperature status
```

### Branch Naming
```
feature/dashboard-polling
bugfix/form-validation
refactor/extract-hooks
docs/architecture-guide
```

## Testing Guidelines

### What to test?
1. **Utils** (MUST): Pure functions
2. **Hooks** (SHOULD): Custom hooks
3. **Components** (OPTIONAL): Complex UI logic

### Example Test
```typescript
import { describe, it, expect } from 'vitest';
import { getTemperatureStatus } from './temperature';

describe('getTemperatureStatus', () => {
  it('returns Normal for -18', () => {
    expect(getTemperatureStatus(-18)).toBe('Normal');
  });
});
```

## Performance Best Practices

### 1. Avoid Inline Functions in JSX
```typescript
// ✅ Good
const handleClick = useCallback(() => {
  console.log('clicked');
}, []);

<Button onClick={handleClick}>Click</Button>

// ❌ Bad (creates new function every render)
<Button onClick={() => console.log('clicked')}>Click</Button>
```

### 2. Use Keys Properly
```typescript
// ✅ Good: Unique key
{items.map(item => (
  <div key={`${item.sku}-${item.batch}`}>{item.name}</div>
))}

// ❌ Bad: Index as key
{items.map((item, i) => (
  <div key={i}>{item.name}</div>
))}
```

### 3. Cleanup Side Effects
```typescript
// ✅ Good: Cleanup
useEffect(() => {
  const interval = setInterval(fetch, 10000);
  return () => clearInterval(interval);
}, []);

// ❌ Bad: No cleanup (memory leak!)
useEffect(() => {
  setInterval(fetch, 10000);
}, []);
```

## Common Pitfalls

### 1. Missing Dependencies in useEffect
```typescript
// ❌ Bad: Missing 'count' in deps
useEffect(() => {
  console.log(count);
}, []);

// ✅ Good: All deps included
useEffect(() => {
  console.log(count);
}, [count]);
```

### 2. Mutating State Directly
```typescript
// ❌ Bad: Direct mutation
items.push(newItem);
setItems(items);

// ✅ Good: Immutable update
setItems([...items, newItem]);
```

### 3. Not Handling Loading States
```typescript
// ❌ Bad: No loading state
const data = await fetchData();

// ✅ Good: Proper loading state
setLoading(true);
try {
  const data = await fetchData();
  setData(data);
} finally {
  setLoading(false);
}
```

## Debugging Tips

### 1. React DevTools
- Install React DevTools extension
- Inspect component props & state
- Profile performance

### 2. Console Debugging
```typescript
// Temporary debug (remove before commit)
console.log('🔍 Debug:', { temp, status });

// Production logging
if (import.meta.env.DEV) {
  console.log('Dev only log');
}
```

### 3. TypeScript Errors
```bash
# Check all TS errors
npx tsc --noEmit

# Watch mode
npx tsc --noEmit --watch
```

## Code Review Checklist

### Before Submitting PR
- [ ] No TypeScript errors
- [ ] All tests pass
- [ ] No console.log() statements
- [ ] Proper error handling
- [ ] Loading states implemented
- [ ] Accessibility considered
- [ ] Mobile responsive (if applicable)

### Reviewer Checklist
- [ ] Code follows style guide
- [ ] No unnecessary complexity
- [ ] Proper naming conventions
- [ ] Tests cover edge cases
- [ ] No performance issues
- [ ] Security considerations

## Resources

### Documentation
- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Chakra UI Docs](https://chakra-ui.com/docs)
- [Zustand Docs](https://docs.pmnd.rs/zustand/)
- [date-fns Docs](https://date-fns.org/)

### Tools
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Vite Docs](https://vite.dev/)

Happy Coding! 🚀
