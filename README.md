# SoftwareMind Demo assessment

A technical assessment for the SDET-QA/QC Engineer-Lead positions.

## The project 💻.

The following project was made using TS + Playwright. Review [here](./docs/Automation_QA_Engineer_.pdf) the assessment proposed.

## Tools 🛠️.

* **playwright/test** *v1.62.1*.
* **@types/node** *v26.2.0*.
* **@faker-js/faker**: *v10.6.0*.
* **dotenv**: *v17.4.2*.

## Main project structure 🗂️.

```bash
SoftwareMindDemo/
├── .github/
│   └── workflows/
│       └── playwright.yml                # CI/CD GitHub Actions workflow
├── constants/
│   └── Messages.ts                       # Application constant messages & error texts
├── data/
│   └── dataGenerators.ts                 # Dynamic test data generators (Faker / Random)
├── docs/
│   └── Automation_QA_Engineer_.pdf       # Assessment requirements & guidelines
├── enums/
│   └── CategoryOptions.ts                # Enum for product category options
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
   ```

## Executing the tests ⚡️.

Before running the tests, do not forget to create a `.env` file based on the template file `.env.template`.

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

## CI/CD 🔄.

The CI/CD pipeline is configured using **GitHub Actions**. The pipeline is triggered when a push or pull request is made to the main or master branch. The pipeline will execute the tests and generates a report. The report is uploaded as an artifact.

This step can be found in the `.github/workflows/playwright.yml` file.

> **N. B.!**
> 
> Do not forget to update the repository secrets in GitHub Actions repository settings if you are going to update the env variables.