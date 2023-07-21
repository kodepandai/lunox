import type { RollupOptions } from "rollup";
import type { LogLevel } from "esbuild";
import type { Options } from "rollup-plugin-esbuild";
import type { Options as DtsOptions } from "rollup-plugin-dts";

declare const bundleTs: (
  file: string | string[],
  option?: Partial<{
    format: string;
    baseDir: string;
    outputDir: string;
    declaration: boolean;
    declarationOnly: boolean;
    logLevel: LogLevel;
    beforeBuild: RollupOptions["plugins"];
    afterBuild: RollupOptions["plugins"];
    esbuildConfig: Options;
    dtsConfig: DtsOptions;
    rollupConfig: RollupOptions;
  }>
) => RollupOptions[];

declare const serve: () => void;
