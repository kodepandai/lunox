import type Repository from "../Config/Repository";
import Encrypter from "../Encryption/Encrypter";
import Command from "./Command";
import fs from "fs";
import path from "path";

class KeyGenerateCommand extends Command {
  protected signature = `key:generate
        {--show : Display the key instead of modifying files}
        {--force : Force the operation to run when in production}`;

  protected description = "Set the application key";

  public async handle() {
    const key = this.generateRandomKey();
    if (this.option("show")) {
      this.comment(key);
      return this.SUCCESS;
    }
    this.setKeyInEnvironmentFile(key);
    this.info("Application key set successfully.");
    this.lunox.make<Repository>("config").set("app.key", key);

    return this.SUCCESS;
  }

  protected generateRandomKey() {
    return (
      "base64:" +
      Encrypter.base64Encode(
        Encrypter.generateKey(
          this.lunox.make<Repository>("config").get("app.cipher")
        )
      )
    );
  }

  protected setKeyInEnvironmentFile(key: string) {
    const envPath = path.join(process.cwd(), ".env");
    if (!fs.existsSync(envPath)) {
      this.shellExec("cp .env.example .env");
    }
    let envContent = fs.readFileSync(path.join(process.cwd(), ".env"), "utf-8");
    envContent = envContent.replace(/APP_KEY=?.+/m, "APP_KEY=" + key);
    fs.writeFileSync(envPath, envContent, "utf-8");
  }
}

export default KeyGenerateCommand;
