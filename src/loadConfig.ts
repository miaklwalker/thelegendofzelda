import fs from 'fs';
import path from 'path';
import jsYaml from 'js-yaml';
import { promisify } from "util";

const baseDir = 'config/custom';

const readFileAsync = promisify(fs.readFile);

/**
 * TODO: jsdoc
 * @param filePath
 */
export const loadConfigSync = (filePath: string): object | [object] =>
    jsYaml.safeLoad(fs.readFileSync(path.resolve(baseDir, filePath, '.yaml'), 'utf8'));

export const loadConfigAsync = async (filePath: string): Promise<object | [object]> => {
    const contents = await readFileAsync(path.resolve(baseDir, filePath, '.yaml'), 'utf8');
    return jsYaml.safeLoad(contents);
};