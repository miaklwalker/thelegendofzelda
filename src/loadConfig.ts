import fs from 'fs';
import path from 'path';
import jsYaml from 'js-yaml';
import { promisify } from "util";

const baseDir = 'config/custom';

const readFileAsync = promisify(fs.readFile);

/**
 * Reads a yaml config file -- synchronously -- from config/custom/ directory into a js object or array (depending on yaml contents)
 *
 * example:
 * const healthDamageValues = loadConfigSync('health-damage-values')
 *
 * @param filePath
 */
export const loadConfigSync = (filePath: string): object | [object] =>
    jsYaml.safeLoad(fs.readFileSync(path.resolve(baseDir, filePath, '.yaml'), 'utf8'));

/**
 * Reads a yaml config file -- asynchronously --  from config/custom/ directory into a js object or array (depending on yaml contents)
 *
 * example:
 * const healthDamageValues = await loadConfigAsync('health-damage-values')
 *
 * @param filePath
 */
export const loadConfigAsync = async (filePath: string): Promise<object | [object]> => {
    const contents = await readFileAsync(path.resolve(baseDir, filePath, '.yaml'), 'utf8');
    return jsYaml.safeLoad(contents);
};