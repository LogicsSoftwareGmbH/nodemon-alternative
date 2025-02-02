import chokidar from 'chokidar';
import { spawn, exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

/**
 * Main class for managing Node.js process and file watching
 */
export class NodemonAlternative {
  constructor(configPath = './nodemon-alternative.json') {
    this.server = null;
    this.isRestarting = false;
    this.restartTimeout = null;
    this.config = this.loadConfig(configPath);
  }

  // Load config
  loadConfig(configPath) {
    const DEFAULT_CONFIG = { // only used in case no config file is found
      watch: 'backend/**/*.{js,json}',
      ignore: ['**/node_modules/**', '.git'],
      port: 1233,
      script: 'backend/server.js',
      delay: {
        stabilityThreshold: 500,
        pollInterval: 100
      }
    };

    try {
      const configPathResolved = path.resolve(configPath);
      const configFile = fs.readFileSync(configPathResolved, 'utf8');
      console.log(`Found config file at ${configPathResolved}`);
      const config = JSON.parse(configFile);
      console.log('Successfully loaded configuration:', config);
      return config;
    } catch (error) {
      console.log(`No config file found at ${configPath}, using default configuration:`, DEFAULT_CONFIG);
      return DEFAULT_CONFIG;
    }
  }

  // Force kill any process using our port
  /**
   * Finds and terminates processes running on a specified port number in Windows.
   * Uses netstat to find processes and taskkill to terminate them.
   *
   * @async
   * @param {number} port - The port number to check for running processes
   * @returns {Promise<void>}
   * @throws {Error} If command execution fails for reasons other than no processes found
   *
   * @example
   * // Kill any process running on port 3000
   * await killPortProcess(3000);
   *
   * @remarks
   * - Uses Windows-specific commands (netstat and taskkill)
   * - Silently handles cases where no processes are found
   * - Forces process termination with /F flag
   * - Multiple processes on the same port will all be terminated
   */
  async killPortProcess(port) {
    try {
      const { stdout } = await execAsync(`netstat -ano | findstr :${port}`);
      const lines = stdout.split('\n');
      for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        if (parts.length > 4) {
          const pid = parseInt(parts[4]);
          if (pid && pid !== 0) {
            try {
              await execAsync(`taskkill /F /PID ${pid}`);
              console.log(`Killed process ${pid} using port ${port}`);
            } catch (e) {
              // Process might already be gone
            }
          }
        }
      }
    } catch (e) {
      // No processes found
    }
  }

  async startServer() {
    await this.killPortProcess(this.config.port);
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('\nStarting server with nodemon-alternative...');
    this.server = spawn('node', [this.config.script], {
      stdio: ['inherit', 'inherit', 'inherit']
    });

    this.server.on('error', (err) => {
      console.error('Failed to start server:', err);
      this.isRestarting = false;
    });

    this.server.on('exit', (code, signal) => {
      if (code !== 0 && signal !== 'SIGTERM') {
        console.error(`Server process exited with code ${code}`);
      }
      this.server = null;
      this.isRestarting = false;
    });
  }

  async restartServer() {
    if (this.isRestarting) return;
    this.isRestarting = true;

    console.log('\nChange detected, restarting server...');

    if (this.server) {
      this.server.kill('SIGTERM');
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Force kill if graceful shutdown didn't work
      if (this.server) {
        this.server.kill('SIGKILL');
      }
    }

    await this.startServer();
  }

  start() {
    const watcher = chokidar.watch(this.config.watch, {
      ignored: this.config.ignore,
      persistent: true,
      awaitWriteFinish: this.config.delay
    });

    watcher
      .on('ready', () => {
        console.log('Initial scan complete. Starting server...');
        this.startServer();
      })
      .on('change', (path) => {
        console.log(`\nFile ${path} has been changed`);
        if (this.restartTimeout) clearTimeout(this.restartTimeout);
        this.restartTimeout = setTimeout(() => this.restartServer(), 100);
      });

    // Handle cleanup
    process.on('SIGINT', async () => {
      if (this.server) {
        this.server.kill('SIGTERM');
        await this.killPortProcess(this.config.port);
      }
      process.exit();
    });
  }
}

// Export singleton instance creator
export const createWatcher = (configPath) => {
  return new NodemonAlternative(configPath);
};

// Auto-start if running directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createWatcher().start();
}
