# Repository Structure

This repository follows a Polyrepo approach, specifically focusing on the **Landing Page** frontend.

## Directory Layout

*   **src/**: Source code for the application.
    *   **components/**: Reusable UI components (Hero, Header, etc.).
    *   **pages/**: Route-level page components (LandingPage, PrivacyPolicy, etc.).
    *   **assets/**: Static assets like images and fonts.
    *   **App.tsx**: Main application component and Router configuration.
    *   **index.tsx**: Entry point.
*   **docs/**: Documentation files.
*   **dist/**: Production build output (gitignored).

## Maintenance Guidelines

1.  **Dead Code**: Unused components should be deleted, not just deprecated.
2.  **Security**: Never commit `.env` files. Keys are managed in local environment variables.
3.  **Refactoring**: Keep components small and focused. Break large components into smaller sub-components if they grow too large.
