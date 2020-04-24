# Tests
We decided to follow three approaches for testing:
- TDD (or BDD "Behavioural Driven Development): Mostly for backend functionality that is essential for the application and used by different endpoints (e.g. `parser` tool). Since different features depend on it and might be modified by multiple people, tests for the correct behaviour and functionality will be written to ensure subsequent changes don't break current features.
- Partial unit tests: For CRUD endpoints, since there are many of these and this is a demo rather than a production build, we decided to invest our time in implementing more features rather than thoroughly writing tests for each endpoint covering all edge cases, however partial tests for some methods will be written as a sanity check.
- End to end tests: Test specific use cases (e.g. a clinician request a form, fill it and submit a FormResponse), we will do this towards the end of the project once most of the functionality is implemented.

# Test tools:
We are using [mocha](https://mochajs.org/) and [chai](https://www.chaijs.com/) to test the backend, [Jest](https://jestjs.io/) for frontend apps. For the final end-to-end testing we will use [Selenium](https://www.seleniumhq.org/). In addition we set up Continious Integration CI using [Travis CI](https://travis-ci.org/) to prevent merging any code that breaks any of the tests, fails to build or doesn't follow our code style that is enforced using [ESLint](https://eslint.org/).

Each member will participate in TDD and partial unit tests, however the end-to-end testing will be implemented by one or two members (to be decided when we're ready to write these tests).
