# SoftwareMind Demo assessment

A technical assessment for the SDET-QA/QC Engineer-Lead positions.

## The project 💻.

The following project was made using TS + Playwright. Review [here](./docs/Automation_QA_Engineer_.pdf) the assessment proposed.

## Tools 🛠️.

* **playwright/test** *v1.62.1*.
* **@types/node** *v26.2.0*.
* **@faker-js/faker**: *v10.6.0*.
* **dotenv**: *v17.4.2*.
* **typescript**: *v5.9.3*.
* **eslint**: *v9.39.2*.
* **prettier**: *v3.8.1*.

## Main project structure 🗂️.

```bash
SoftwareMindDemo/
├── .github/
│   └── workflows/
│       └── playwright.yml                # CI/CD GitHub Actions workflow
├── config/
│   └── env.ts                            # Fail-fast env validation
├── constants/
│   └── Messages.ts                       # Application constant messages & error texts
├── data/
│   └── dataGenerators.ts                 # Dynamic test data generators (Faker / Random)
├── docs/
│   └── Automation_QA_Engineer_.pdf       # Assessment requirements & guidelines
├── enums/
│   └── CategoryOptions.ts                # Enum for product category options
├── fixtures/
│   └── Fixtures.ts                       # Playwright custom fixtures (POMs + auth setup)
├── models/
│   ├── IProduct.ts                       # TypeScript interface for Product entity
│   └── IUser.ts                          # TypeScript interface for User credentials entity
├── page-objects/
│   ├── DashboardPage.ts                  # POM for Dashboard & Product Management CRUD
│   ├── LoginPage.ts                      # POM for Sign‑In & Authentication flows
│   ├── RegisterPage.ts                   # POM for User Registration flow
│   └── shared/
│       └── components/
│           └── Toasts.ts                 # Re‑usable toast‑notification component
├── tests/
│   └── UI/
│       ├── dashboard.spec.ts             # Product‑Management tests (Create, Filter, Delete)
│       ├── login.spec.ts                 # Sign‑In tests (Positive & Negative flows)
│       └── registration.spec.ts          # User‑Registration tests (Happy Path)
├── .env.template                         # Template for required environment variables
├── .gitignore                            # Ignores node_modules, reports, .env, etc.
├── eslint.config.mjs                     # ESLint configuration
├── package.json                          # Project dependencies & test scripts
├── playwright.config.ts                  # Playwright runner, reporters & browser config
├── README.md                             # Project documentation and setup guide
└── tsconfig.json                         # TypeScript compiler configuration
```

## Setup ⚙️.

1. Open your favorite terminal (or you can use the terminal provided by your favorite IDE).
   1. Clone the repository on your computer at any path you prefer.-

        ```bash
        > git clone https://github.com/ArCiGo/SoftwareMindDemo.git
        ```
2. In the path you cloned the repository, open the project folder and install the packages.-
   ```bash
   > cd SoftwareMindDemo
   > npm i
   > npx playwright install chromium
   ```

## Executing the tests ⚡️.

Before running the tests, create a `.env` file based on the template file `.env.template`. Required variables:

- `VALID_USERNAME` / `VALID_PASSWORD` — demo credentials for positive login and CRUD pre-condition.
- `INVALID_USERNAME` / `INVALID_PASSWORD` — credentials for negative login.
- `BASE_URL` (optional) — defaults to the SoftwareMind assessment S3 host.

```bash
# If you want to execute the tests using the Playwright GUI, you can execute the following command.-
> npm run test:open:ui
# If you just want to execute the tests using the CLI, you can execute the following command.-
> npm run test
```

If you want to open the report after the tests have been executed, you can execute the following command.-

```bash
> npm run test:report
```

Additional quality scripts:

```bash
> npm run typecheck
> npm run lint
> npm run format:check
```

## CI/CD 🔄.

The CI/CD pipeline is configured using **GitHub Actions**. The pipeline is triggered when a push or pull request is made to the main or master branch. The pipeline will run typecheck, lint, execute the tests, and generate a report. The HTML report and failure artifacts (traces, screenshots, videos) are uploaded.

This step can be found in the `.github/workflows/playwright.yml` file.

> **N. B.!**
>
> Do not forget to update the repository secrets in GitHub Actions repository settings if you are going to update the env variables.

## Decisions & trade-offs

- **Chromium only** — The assessment targets a single demo app; one browser keeps CI fast and scope focused. Multi-browser coverage can be added as a nightly job if needed.
- **Page Object Model + custom fixtures** — POMs encapsulate selectors and actions; fixtures inject page objects and an `authenticatedDashboard` fixture so CRUD tests do not repeat login steps.
- **Faker for test data** — Randomized usernames, emails, and product names allow repeated runs without collisions on the static demo app.
- **Environment variables for credentials** — No secrets in source; CI injects a base64-encoded `.env` via GitHub Secrets.
- **Web-first assertions** — Tests use Playwright `expect(locator)` instead of snapshot `isVisible()` / `textContent()` reads to reduce race conditions.
- **UI login for CRUD arrange** — The demo app is a static S3-hosted SPA with no public API; authentication is arranged via UI login in a fixture. A `storageState` setup project would be the next step if session persistence becomes a bottleneck.
- **Product names include a random ID** — Makes filter/delete verification deterministic across parallel runs.
- **Strict TypeScript + lint in CI** — Treats test code with the same engineering standards as application code.
