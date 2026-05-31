# Routing and API Stabilization Design

## Goal

Move the frontend from `wouter` to `react-router-dom v6` and finish the first-pass adoption of the typed `src/api/` layer for create/list flows.

## Scope

This slice updates only frontend routing and API imports. It does not add authentication, edit/detail pages, pagination, or backend service/repository changes.

## Routing Design

`src/components/App.tsx` will own the browser router and route table using `BrowserRouter`, `Routes`, `Route`, and `Navigate`.

The route map will keep the current URLs:

- `/home`
- `/clientes`
- `/clientes/new`
- `/pets`
- `/pets/new`
- `/vets`
- `/vets/new`
- `/consultas`
- `/consultas/new`

The root path `/` and any unknown path will redirect to `/home`. The home route keeps its current full-bleed treatment. Entity routes continue to render inside `Layout`.

## Navigation Design

All `Link` imports from `wouter` will become `Link` imports from `react-router-dom`, using `to` instead of `href`.

Form navigation will use `useNavigate` instead of `useLocation`. Back buttons and successful submits will navigate to the related list route.

Sidebar dead links currently pointing to `#` will become disabled buttons so they no longer create fake navigation destinations. The labels remain visible for future profile/settings/auth work.

## API Design

New and modified frontend code should import directly from `api/api`, not from `services/services`.

This slice will update:

- `AddCliente.tsx` to use `clientesApi.create`
- `AddPet.tsx` to use `petsApi.create` and `clientesApi.getAll`
- `AddVet.tsx` to use `vetsApi.create`
- `AddConsulta.tsx` to use `consultasApi.create`, `petsApi.getAll`, and `vetsApi.getAll`

The legacy `src/services/services.tsx` file stays in place for compatibility until all remaining consumers are gone.

## Error and Loading Behavior

This slice keeps existing loading and error UX mostly intact. It removes remaining `alert()` calls from add forms and routes success/error feedback through the existing toast provider where available.

## Testing

Add focused frontend tests around routing behavior:

- `/` redirects to `/home`
- entity routes render inside the shared layout
- unknown routes redirect to `/home`
- sidebar entity links point at the expected React Router paths

Existing component tests should continue to pass. Typecheck and build are required verification gates.

