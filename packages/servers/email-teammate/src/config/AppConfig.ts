import 'dotenv/config';
import Configuration from './Configuration';

export class AppConfig {
  private static config: Configuration;

  static init() {
    if (!this.config) {
      this.config = new Configuration(process.env);
    }
  }
  static getConfig(): Configuration {
    if (!this.config) {
      this.init();
    }
    return this.config;
  }
}

export default AppConfig.getConfig();
