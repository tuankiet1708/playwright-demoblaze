# DemoBlaze E2E Automation Framework (Playwright + TypeScript)

## Overview

This repository contains a scalable automation framework for DemoBlaze with coverage for Login and Cart/Order workflows.

The framework demonstrates:

- Cross-browser test execution (Chromium, Firefox, WebKit)
- Modular architecture using page objects, shared fixtures, and utilities
- Multiple automation test types in one framework:
  - UI tests
  - API tests
  - Regression tests
  - Performance checks
- CI/CD-ready pipeline through GitHub Actions
- Configurable execution via environment variables
- Rich reporting (HTML, JUnit XML, JSON)

## Project Structure

```text
.
|-- .github/workflows/playwright.yml
|-- docs/
|   `-- test-cases/
|       |-- login-cart-test-cases.csv
|       `-- login-cart-test-cases.md
|-- src/
|   |-- api/
|   |   `-- demoblaze-api.ts
|   |-- config/
|   |   `-- env.ts
|   |-- fixtures/
|   |   `-- test-fixtures.ts
|   |-- pages/
|   |   |-- cart.page.ts
|   |   |-- home.page.ts
|   |   |-- login.page.ts
|   |   `-- signup.page.ts
|   `-- utils/
|       |-- auth-flow.ts
|       |-- data-factory.ts
|       `-- dialog.ts
|-- tests/
|   |-- api/
|   |   `-- auth.api.spec.ts
|   |-- performance/
|   |   `-- home.performance.spec.ts
|   |-- regression/
|   |   `-- login-cart.regression.spec.ts
|   `-- ui/
|       |-- cart-order.spec.ts
|       `-- login.spec.ts
|-- playwright.config.ts
|-- tsconfig.json
|-- .env.example
`-- package.json
```

## Framework Design Rationale

- `src/pages/*`: isolates UI interaction details so test logic stays readable and low-maintenance.
- `src/fixtures/test-fixtures.ts`: central test object that injects page objects and API client.
- `src/api/*`: enables API-level setup/validation and backend-focused test coverage.
- `src/utils/*`: reusable helpers for generated data and dialog handling.
- `tests/*`: split by test type to support selective execution in local runs and CI.

## Test Coverage Implemented

### Login

- Valid login with newly created user
- Invalid login with unknown user
- Empty credential validation

### Cart and Order

- Add product to cart and complete purchase
- Submit place-order form without required fields
- Remove product from cart

### Additional Framework Demonstrations

- Authentication API tests (`tests/api`)
- Full login-to-purchase regression flow (`tests/regression`)
- Home page performance budget check (`tests/performance`)

## Test Case Documentation (Excel/Google Sheet Ready)

- Main suite: `docs/test-cases/login-cart-test-cases.csv`
- Companion doc: `docs/test-cases/login-cart-test-cases.md`

The `.csv` file can be opened directly in Excel or imported into Google Sheets.

## Setup

### 1. Install dependencies

```bash
npm ci
npx playwright install --with-deps
```

### 2. Configure environment

```bash
cp .env.example .env
```

Default values are already suitable for DemoBlaze. You can override:

- `BASE_URL`
- `API_URL`
- `DEFAULT_PASSWORD`
- `PERFORMANCE_BUDGET_MS`

## Execution Commands

```bash
npm test                     # Run all tests/projects
npm run test:ui              # UI tests only
npm run test:api             # API tests only
npm run test:regression      # Regression suite
npm run test:performance     # Performance checks
npm run test:smoke           # Tagged smoke tests
npm run test:chrome          # Run all tests on Chromium
npm run test:firefox         # Run all tests on Firefox
npm run test:webkit          # Run all tests on WebKit
npm run report               # Open Playwright HTML report
```

## CI/CD

GitHub Actions workflow is available at `.github/workflows/playwright.yml`.

- Pull Requests: smoke suite on all three browsers
- Push to main/master: smoke + chromium regression
- Artifacts uploaded: Playwright HTML report + machine-readable test results

## Notes on Requirement Wording

The challenge mentions Login + Cart features and also references Login + Search scripts.

DemoBlaze does not provide a dedicated search feature in the UI. This framework prioritizes the requested Login and Cart/Order flows while still demonstrating scalability with additional API, regression, and performance coverage.
