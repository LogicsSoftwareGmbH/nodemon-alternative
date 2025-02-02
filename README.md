# nodemon-alternative

A Windows-focused alternative to nodemon's legacy watch mode, designed specifically for aggressive port management and process cleanup on Windows systems.

## Why Another Tool?

This tool was created because we encountered issues with nodemon on Windows systems where the server wouldn't properly shut down and restart, leading to port conflicts. While nodemon is a mature and feature-rich tool that works well in most scenarios, we needed something that:
- Handles port conflicts more aggressively on Windows
- Provides cleaner process termination on Windows
- Ensures reliable server restarts without port-in-use errors

Note: If nodemon works well for your use case, especially on Unix-based systems, you should stick with it. This alternative is specifically optimized for Windows environments where port management and process cleanup might be problematic.

## Features

- Windows-optimized port management
- Aggressive process cleanup
- Polling-based file watching (similar to nodemon's legacy watch mode)
- Clear logging of process management
- Simple configuration

## Important Notes

- **Windows Only**: Currently tested and supported on Windows 11 using Visual Studio Code and Powershell.
- **Configuration File**: This tool searches for a configuration file named `./nodemon-alternative.json`. Other filenames are not supported at the moment.
- **Performance Impact**: Uses file system polling, which may impact performance when watching large directory trees
- **Limited Feature Set**: Intentionally simpler than nodemon, focused on reliable Windows operation

## Installation

```bash
npm install --save-dev @logicssoftwarenpmjs/nodemon-alternative
```

## Quick Start

1. Copy the example configuration file into your project root as `nodemon-alternative.json`:
   ```bash
   cp node_modules/@logicssoftwarenpmjs/nodemon-alternative/nodemon-alternative.json ./nodemon-alternative.json
   ```

2. Adapt the configuration file according to your needs (see Configuration Options below).

3. In your project's package.json, add a script like:
   ```json
   {
     "scripts": {
       "dev": "nodemon-alternative"
     }
   }
   ```

> Note: You can also supply a custom configuration file when starting nodemon-alternative:
>
> ```bash
> nodemon-alternative --config ./my-custom-config.json
> ```
>
> or
>
> ```bash
> nodemon-alternative -c ./my-custom-config.json
> ```

## Configuration Options

The configuration file (nodemon-alternative.json) supports the following parameters:

- **script** (string, required): The entry point to run (e.g., "src/server.js")
- **watch** (string | array): Files or directories to monitor for changes
- **ignore** (string[] | string): Glob patterns for files to ignore. Use `**/node_modules/**` to ignore all node_modules directories and their contents
- **delay** (object): Controls file change detection behavior, according to https://github.com/paulmillr/chokidar/tree/3.6.0?tab=readme-ov-file#performance - These settings are particularly important when watching large files or when dealing with editors that perform atomic writes:
  - **stabilityThreshold** (number in ms): Defines how long a file size must remain constant before the watcher emits an event. This helps ensure the file is completely written before triggering a restart. For example, when saving large files, the watcher will wait until the file size hasn't changed for 500ms before considering it "complete".
  - **pollInterval** (number in ms): Specifies how frequently the watcher should check the file size when awaiting write completion. A lower value provides faster response but increases system load, while a higher value reduces system load but might delay detection of file completion.
- **port** (number): The port your application runs on. This is crucial for proper port cleanup on Windows

Example configuration:
```json
{
  "script": "src/server.js",
  "watch": "src/**/*.{js,ts,json}",
  "ignore": [
    "**/node_modules/**",
    "**/.git/**",
    "**/dist/**",
    "**/coverage/**"
  ],
  "delay": {
    "stabilityThreshold": 500,
    "pollInterval": 100
  },
  "port": 3000
}
```

## Comparison with nodemon

Feature | nodemon | nodemon-alternative
--------|---------|-------------------
Platform Support | ✅ Cross-platform | ⚠️ Windows only
Watch Modes | ✅ Multiple (native, legacy, polling) | ⚠️ Polling only
Process Management | ✅ Configurable | ✅ Aggressive (Windows-optimized)
Port Management | ❌ Basic | ✅ Aggressive cleanup
Configuration Options | ✅ Extensive | ⚠️ Basic
Stability | ⚠️ May have port conflicts | ✅ Reliable port management

## When to Use

Consider using nodemon-alternative if:
- You're developing on Windows
- You're experiencing port conflicts or process cleanup issues
- Your server fails to restart cleanly due to port-in-use errors
- nodemon's process management isn't working well for you

Otherwise, the original nodemon likely remains your best choice.

## Contributing

Contributions are welcome, especially:
- Linux/macOS support
- Testing docker, other shells etc.
- Bug fixes

## License

MIT © Logics Software GmbH

## Author

Logics Software GmbH
<br>[https://www.logics-connect.de/](https://www.logics-connect.de/)
