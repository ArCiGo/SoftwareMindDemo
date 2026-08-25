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
TBD...
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

TBD...