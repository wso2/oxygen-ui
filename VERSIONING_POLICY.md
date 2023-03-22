# Versioning Policy

This document outlines the versioning policy for Oxygen UI, which follows the Semantic Versioning 2.0.0 standard. This policy is intended to ensure consistency and clarity in the versioning of the project's releases.

## Semantic Versioning

Semantic Versioning (SemVer) is a widely adopted versioning standard that defines a structured approach to version numbering. SemVer specifies a three-part version number in the format of MAJOR.MINOR.PATCH, where:

- MAJOR indicates significant changes to the project that may introduce breaking changes to consumers of the project's API.
- MINOR indicates new features or functionality that are backwards-compatible with the previous release.
- PATCH indicates bug fixes or minor updates that do not introduce any new features or breaking changes.

## Release Process

The Oxygen UI project uses `release-it` to automate the versioning and release process. `release-it` provides a set of commands to increment the version number according to SemVer and generate release notes based on commit messages.

To make a new release using the GitHub Workflow, follow these steps:

1. Click on the "Run workflow" button in the Actions tab of the repository.
2. Select the workflow named "Release" from the list of available workflows.
3. Choose the appropriate version number based on the changes included in the release using the "version" input:
   - If you want the version to be automatically determined based on the changes made, select "Auto".
   - If the changes include major updates that may introduce breaking changes, select "Major".
   - If the changes include new features or functionality that are backwards-compatible with the previous release, select "Minor".
   - If the changes include bug fixes or minor updates that do not introduce any new features or breaking changes, select "Patch".
4. Optionally, specify a pre-release identifier for the version using the "preRelease" input. For example, you can use "beta" for a pre-release version.
5. Click on the "Run workflow" button to start the release process.
6. The workflow will automatically create a new branch for the release, increment the version number according to the chosen version, and generate release notes based on commit messages.
7. Verify the generated release notes and make any necessary edits.

`release-it` will automatically update the version number in the `package.json` files and create a new Git tag for the release.

## Versioning Policy

The following guidelines apply to versioning in Oxygen UI:

- When making changes to the project that introduce breaking changes to consumers of the project's API, increment the MAJOR version number.
- When adding new features or functionality to the project that are backwards-compatible with the previous release, increment the MINOR version number.
- When making bug fixes or minor updates that do not introduce any new features or breaking changes, increment the `PATCH` version number.
- Use pre-release versions (such as `alpha`, `beta`, or `rc`) to indicate that a release is not yet stable or complete.
- Include a `CHANGELOG.md` file in each release that describes the changes included in the release, including any breaking changes, new features, bug fixes, and other improvements.

## Conclusion

By following this versioning policy, we aim to ensure that Oxygen UI releases are consistent, predictable, and easy to understand. This policy should be reviewed periodically to ensure that it remains relevant and effective.
