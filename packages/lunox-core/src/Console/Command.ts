import { spawn } from "child_process";
import { bgRed, cyanBright, whiteBright, yellow } from "colorette";
import type { Application } from "../Foundation";
import type { ObjectOf } from "../Types";

class Command {
  protected lunox!: Application;

  SUCCESS = 0 as const;
  FAILURE = 1 as const;
  INVALID = 2 as const;

  protected signature = "";
  protected description = "";

  protected args: ObjectOf<string> = {};
  protected opts: ObjectOf<any> = {};

  public async handle(): Promise<0 | 1 | 2> {
    return this.SUCCESS;
  }

  public getSignature() {
    return this.signature.replace(/\s\s+/g, " ");
  }
  public getDescription() {
    return this.description;
  }

  public setArguments(args: ObjectOf<string>) {
    this.args = args;
  }

  public setOptions(opts: ObjectOf<any>) {
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

  public async tryCommand(
    name: string,
    run: () => Promise<void>,
    onError: (error: string) => void
  ) {
    try {
      await run();
    } catch (error) {
      onError(error as string);
    }
  }

  public shellExec(command: string, watch = false) {
    const child = spawn(command, {
      shell: true,
    });

    let stdout = "";
    let stderr = "";

    return new Promise<void>((ok, fail) => {
      child.stderr.setEncoding("utf-8");
      child.stdout.setEncoding("utf-8");
      child.stdout.on("data", (data) => {
        if (watch) {
          this.line(data);
        }
        stdout += data;
      });

      child.stderr.on("data", (data) => {
        if (watch) {
          this.comment(data);
        }
        stderr += data;
      });

      child.on("close", (code) => {
        if (code === 0) {
          const messages = stdout.split("\n");
          if (messages[messages.length - 1] == "") {
            messages.pop();
          }
          this.line(messages.join("\n"));
          ok();
        } else {
          this.error(stderr);
          fail(stderr);
        }
      });

      child.on("error", fail);
    });
  }
}

export default Command;
