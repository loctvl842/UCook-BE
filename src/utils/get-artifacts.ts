import { basename, extname, join, parse } from 'path';
import * as glob from 'glob';
import { uniqueFilter } from './array';

/**
 * Extract artifacts (JavaScript/TypeScript modules) from an array of file paths.
 * @param arg - An array of file paths.
 * @returns An array of extracted artifacts.
 */
export function getArtifacts(arg: string[]) {
  const hasSupportedExtension = (path: string) =>
    ['.ts', '.js'].indexOf(extname(path)) !== -1;
  const isImportable = (file: string): boolean => {
    const filePart = file.slice(-3);
    return (
      filePart === '.js' || (filePart === '.ts' && file.slice(-5) !== '.d.ts')
    );
  };
  const getFullfilepathWithoutExtension = (file: string): string => {
    const parsedFile = parse(file);
    return join(parsedFile.dir, parsedFile.name);
  };
  const routeMatch = (fileName: string, member: string) => fileName === member;

  if (arg && typeof arg[0] === 'string') {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    return arg.reduce((artifacts: any[], dir) => {
      /* eslint-disable no-param-reassign */
      if (!glob.hasMagic(dir) && !hasSupportedExtension(dir)) {
        dir = join(dir as string, '/*');
      }
      const _artifact = glob
        .sync(dir as string)
        .filter(isImportable)
        .map(getFullfilepathWithoutExtension)
        .filter(uniqueFilter)
        .map((fullPath) => {
          /* eslint-disable import/no-dynamic-require, @typescript-eslint/no-var-requires */
          const module = require(fullPath);
          const fileName = basename(fullPath);

          const matchedMemberKey = Object.keys(module).find((m) =>
            routeMatch(fileName, m),
          );
          const matchedMember = matchedMemberKey
            ? module[matchedMemberKey]
            : undefined;

          if (!matchedMember && !module.default) {
            throw new Error(
              `No default export defined for file "${fileName}" or export does not satisfy filename.`,
            );
          }

          return matchedMember || module.default;
        });

      artifacts.push(..._artifact);

      return artifacts;
    }, []);
  }

  return arg;
}
