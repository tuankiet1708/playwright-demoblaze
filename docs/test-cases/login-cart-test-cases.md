# Login and Cart Test Cases

This file mirrors the CSV suite for easy review in Git and can be imported to Google Sheets or Excel.

- Source spreadsheet file: `docs/test-cases/login-cart-test-cases.csv`
- Coverage: Functional, Edge, Negative, and Security scenarios for Login and Cart modules
- Total test cases: 24

## Suggested Columns (already included in CSV)

- `TestCaseID`
- `Module`
- `Type`
- `Priority`
- `Title`
- `Preconditions`
- `Steps`
- `TestData`
- `ExpectedResult`

## Notes

- Prioritize `High` test cases in smoke execution.
- Include `Medium` and `Low` in nightly regression.
- Keep test data deterministic for CI, and use generated data only where uniqueness is required.
