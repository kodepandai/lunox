import { spawn } from "child_process";
import { bgRed, cyanBright, whiteBright, yellow } from "colorette";
import type { Application } from "../Foundation";

class Command {
  protected lunox!: Application;

  KEEPALIVE = -1 as const;
  SUCCESS = 0 as const;
  FAILURE = 1 as const;
  INVALID = 2 as const;

  protected signature = "";
  protected description = "";

  protected args: Record<string, string> = {};
  protected opts: Record<string, any> = {};

  public async handle(): Promise<-1 | 0 | 1 | 2> {
    return this.SUCCESS;
  }

  public getSignature() {
    return this.signature.replace(/\s\s+/g, " ");
  }
  public getDescription() {
    return this.description;
  }

  public setArguments(args: Record<string, string>) {
    this.args = args;
  }

  public setOptions(opts: Record<string, any>) {
    this.opts = opts;
  }

  public setLunox(lunox: Application) {
    this.lunox = lunox;
  }

  public arguments() {
    return this.args;
  }

  public argument(key: string) {
    return this.args[key];
  }

  public options() {
    return this.opts;
  }

  public option(key: string) {
    return this.opts[key];
  }

  protected info(message: string) {
    console.log(cyanBright(message));
  }

  protected line(message: string) {
    console.log(message);
  }

  protected error(message: string) {
    console.log(bgRed(whiteBright(message)));
  }
  protected newLine(line = 1) {
    for (let index = 0; index < line; index++) {
      console.log("");
    }
  }

  protected comment(message: string) {
    console.log(yellow(message));
  }

  public shellExec(command: string) {
    const child = spawn(command, {
      shell: true,
      stdio: "inherit",
    });

    return new Promise<void>((ok, fail) => {
      child.on("close", (code) => {
        if (code === 0) {
          ok();
        } else {
          fail();
        }
      });

      child.on("error", fail);
    });
  }
}

export default Command;
