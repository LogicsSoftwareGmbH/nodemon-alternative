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
npm install --save-dev @logicssoftwaregmbh/nodemon-alternative
```

## Quick Start

1. Ensure the configuration file is named `nodemon-alternative.json`:
```bash
# Copy the config file into your project root as 'nodemon-alternative.json'
cp node_modules/@logicssoftwaregmbh/nodemon-alternative/nodemon-alternative.json ./nodemon-alternative.json
```

2. Add to package.json:
```json
{
  "scripts": {
    "dev": "nodemon-alternative"
  }
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
[https://www.logics-connect.de/](https://www.logics-connect.de/)
