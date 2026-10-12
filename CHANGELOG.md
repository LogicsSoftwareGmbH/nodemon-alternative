# Changelog

All notable changes to the project will be documented in this file.

## [1.0.11] - 2026-10-12
### Deprecated
- The package is deprecated and no longer maintained. Use Node.js' built-in watch mode (`node --watch`) instead; see the migration guide in README.md.
- Known issue that will not be fixed: `npm audit` reports GHSA-vfj7-8cjw-p6xm in `braces` (via `chokidar` 3.x). No patched `braces` release exists, and fixing it would require a breaking upgrade to `chokidar` 4+.

## [1.0.7] - 2025-02-02
### Added
- SECURITY.md added

## [1.0.6] - 2025-02-02
### Changed
- package.json: keywords updated

## [1.0.5] - 2025-02-02
### Changed
- package.json and README.md: renamed npmjs.com organization to @logicssoftwarenpmjs

## [1.0.4] - 2025-02-02
### Changed
- README.md docs improved

## [1.0.3] - 2025-02-02
### Added
- Added package-lock.json file
- Added .gitignore file

## [1.0.2] - 2025-02-02
### Added
- Automatic publishing the package to the https://www.npmjs.com/ registry via Github.com action

## [1.0.1] - 2025-02-02
### Fixed
- Bugfix: Renamed "example.nodemon-alternative.json" to "nodemon-alternative.json" in package.json "files"

## [1.0.0] - 2025-02-02
### Added
- Initial release of nodemon-alternative.
- Windows-focused file watching and port management.
- Basic CLI support with configuration file via `nodemon-alternative.json`.

### Changed
- Updated README documentation to reflect testing on Windows 10.

### Planned
(currently empty)