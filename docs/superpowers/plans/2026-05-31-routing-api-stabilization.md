# Routing and API Stabilization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `wouter` with `react-router-dom v6` and finish direct typed API usage in current create/list flows.

**Architecture:** `App.tsx` owns the `BrowserRouter` and route table. Route links and imperative navigation use React Router primitives. Create forms call `src/api/api.ts` methods directly and use the existing toast system for user feedback.

**Tech Stack:** React 18, Vite, TypeScript, React Router DOM v6, Vitest, Testing Library.

---

### Task 1: Add Routing Regression Tests

**Files:**
- Create: `src/components/App.test.tsx`

- [ ] **Step 1: Write failing routing tests**

```tsx
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import App from './App'

vi.mock('api/api', () => ({
  clientesApi: {
    getAll: vi.fn().mockResolvedValue({ data: { clientes: [] } }),
  },
  petsApi: {
    getAll: vi.fn().mockResolvedValue({ data: { pets: [] } }),
  },
  vetsApi: {
    getAll: vi.fn().mockResolvedValue({ data: { vets: [] } }),
  },
  consultasApi: {
    getAll: vi.fn().mockResolvedValue({ data: { consultas: [] } }),
  },
}))

describe('<App /> routing', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/')
  })

  it('redirects the root route to home', async () => {
    render(<App />)

    expect(await screen.findByText(/clinica vet/i)).toBeInTheDocument()
    expect(window.location.pathname).toBe('/home')
  })

  it('renders entity routes inside the shared layout', async () => {
    window.history.pushState({}, '', '/clientes')

    render(<App />)

    expect(await screen.findByRole('heading', { name: 'Clientes' })).toBeInTheDocument()
    expect(screen.getByText('Pets')).toBeInTheDocument()
    expect(screen.getByText('Consultas')).toBeInTheDocument()
  })

  it('redirects unknown routes to home', async () => {
    window.history.pushState({}, '', '/rota-inexistente')

    render(<App />)

    expect(await screen.findByText(/clinica vet/i)).toBeInTheDocument()
    expect(window.location.pathname).toBe('/home')
  })
})
```

- [ ] **Step 2: Run the focused test and confirm it fails**

Run: `npm test -- src/components/App.test.tsx --run`

Expected: failure caused by current `wouter` routing behavior and/or missing test file.

### Task 2: Migrate Route Table to React Router

**Files:**
- Modify: `src/components/App.tsx`

- [ ] **Step 1: Replace `wouter` route primitives**

Use `BrowserRouter`, `Routes`, `Route`, and `Navigate`.

- [ ] **Step 2: Preserve existing route layout behavior**

`/home` renders `Home` directly. Entity routes render the same component inside `Layout`.

- [ ] **Step 3: Run the focused test**

Run: `npm test -- src/components/App.test.tsx --run`

Expected: remaining failures only from unmigrated links/navigation, if any.

### Task 3: Migrate Links and Imperative Navigation

**Files:**
- Modify: `src/components/Sidebar.tsx`
- Modify: `src/components/Clientes.tsx`
- Modify: `src/components/Pets.tsx`
- Modify: `src/components/Vets.tsx`
- Modify: `src/components/Consultas.tsx`
- Modify: `src/components/AddCliente.tsx`
- Modify: `src/components/AddPet.tsx`
- Modify: `src/components/AddVet.tsx`
- Modify: `src/components/AddConsulta.tsx`

- [ ] **Step 1: Convert `Link` usage**

Import `Link` from `react-router-dom` and replace `href` props with `to`.

- [ ] **Step 2: Convert form navigation**

Import `useNavigate` from `react-router-dom`, replace `const [, setLocation] = useLocation()` with `const navigate = useNavigate()`, and replace `setLocation('/path')` with `navigate('/path')`.

- [ ] **Step 3: Replace sidebar `#` links**

Render disabled button-style rows for profile/settings/logout placeholders.

- [ ] **Step 4: Run the focused test**

Run: `npm test -- src/components/App.test.tsx --run`

Expected: all routing tests pass.

### Task 4: Replace Legacy Service Imports in Add Forms

**Files:**
- Modify: `src/components/AddCliente.tsx`
- Modify: `src/components/AddPet.tsx`
- Modify: `src/components/AddVet.tsx`
- Modify: `src/components/AddConsulta.tsx`

- [ ] **Step 1: Use direct API objects**

Replace `services/services` imports with the matching API objects from `api/api`.

- [ ] **Step 2: Preserve request payloads**

Keep the existing form data shapes and call `.create()` or `.getAll()` on the direct API object.

- [ ] **Step 3: Remove remaining `alert()` usage in migrated forms**

Use `useToast` in `AddVet` and `AddConsulta` so success/error feedback matches the other forms.

- [ ] **Step 4: Run typecheck**

Run: `npm run typecheck`

Expected: TypeScript exits 0.

### Task 5: Remove Wouter Dependency and Verify

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Uninstall `wouter`**

Run: `npm uninstall wouter`

- [ ] **Step 2: Confirm no imports remain**

Run: `rg "wouter|useLocation|href=\"/|href='#'|href=\"#\"" src package.json`

Expected: no `wouter` imports or dependency references.

- [ ] **Step 3: Run final frontend verification**

Run:

```bash
npm test -- --run
npm run typecheck
npm run build
```

Expected: each command exits 0.

