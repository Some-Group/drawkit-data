/**
 *  Build all schemas into the `dist` folder.
 * */

import * as process from "process";

import { writeFileSync } from "fs";
import { execSync } from "child_process";
import { basename } from "path";
import { bgRed } from "chalk";

const assemble = (a: string) => {
  return a as any;
};

const build = async (entry: string) => {
  const schema = await assemble(entry);
  writeFileSync(
    `src/${basename(entry, ".yaml")}.json`,
    JSON.stringify(schema, null, 2),
    { encoding: "utf8" }
  );
};

const main = async (args: string[]) => {
  const [schemaDir, outDir] = args.slice(2, 4);
  if (!schemaDir) {
    console.error(bgRed("missing path to directory containing schemas"));
    process.exit(1);
  }
  if (!outDir) {
    console.error(bgRed("missing path to directory containing schemas"));
    process.exit(1);
  }

  try {
    await Promise.all([build(`${schemaDir}/layers/page.schema.yaml`)]);
    execSync(`npm prettier --write "${outDir}/*.json"`);
  } catch (err) {
    console.error(bgRed(err));
    process.exit(1);
  }
};

main(process.argv);
