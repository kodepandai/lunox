import type { AppConfig } from "../Contracts/Config";
import type Repository from "../Config/Repository";
import ServiceProvider from "../Support/ServiceProvider";
import Encrypter from "./Encrypter";
import MissingAppKeyException from "./MissingAppKeyException";

class EncryptionServiceProvider extends ServiceProvider {
  async register(): Promise<void> {
    this.app.singleton("encrypter", () => {
      const config = this.app.make<Repository>("config").get<AppConfig>("app");
      return new Encrypter(this.parseKey(config), config.cipher);
    });
  }

  protected parseKey(config: AppConfig) {
    const key = this.key(config);
    if (key.includes("base64:")) {
      return Encrypter.base64Decode(key.substring(7));
    }
    return Encrypter.base64Decode(key);
  }

  protected key(config: AppConfig) {
    if (!config.key) {
      throw new MissingAppKeyException();
    }
    return config.key;
  }
}

export default EncryptionServiceProvider;
