// const mockJsYaml = {
//     safeLoad: jest.fn()
// };
// const mockFs = {
//     readFileSync: jest.fn(),
//     readFile: jest.fn()
// };
// const mockPath = {
//     resolve: jest.fn()
// };

// const mockReadFileAsync = jest.fn();
// const mockUtil = {
//     promisify: jest.fn().mockReturnValue(mockReadFileAsync)
// };

// jest.mock('js-yaml', () => mockJsYaml);
// jest.mock('fs', () => mockFs);
// jest.mock('path', () => mockPath);
// jest.mock('util', () => mockUtil);


// import { loadConfigSync, loadConfigAsync } from "../src/loadConfig";

// describe('loadConfig', () => {
//     const baseDir = 'config/custom';
//     // leave off the extension (.yaml)
//     const filePath = 'foo/bar';
//     const resolvedPath = '/system/path/to/file.yaml';
//     const contents = 'some test contents';
//     const asyncContents = 'other stuff';

//     beforeEach(() => {
//         // set up mocks
//         mockPath.resolve.mockReturnValue(resolvedPath);
//         mockFs.readFileSync.mockReturnValue(contents);
//         mockReadFileAsync.mockResolvedValue(asyncContents);
//     });

//     afterEach(jest.clearAllMocks);

//     it('#loadConfigSync() happy path -- loads given config file synchronously', () => {
//         const expected = {abc: 123};
//         mockJsYaml.safeLoad.mockReturnValue(expected);

//         const actual = loadConfigSync(filePath);

//         expect(actual).toEqual(expected);

//         expect(mockPath.resolve).toHaveBeenCalledWith(baseDir, filePath, '.yaml');
//         expect(mockFs.readFileSync).toHaveBeenCalledWith(resolvedPath, 'utf8');
//         expect(mockJsYaml.safeLoad).toHaveBeenCalledWith(contents);

//         expect(mockPath.resolve).toHaveBeenCalledTimes(1);
//         expect(mockFs.readFileSync).toHaveBeenCalledTimes(1);
//         expect(mockJsYaml.safeLoad).toHaveBeenCalledTimes(1);
//     });

//     it('#loadConfigAsync() happy path -- loads given config file async via promise', async () => {
//         const expected = {xyz: 'baz'};
//         mockJsYaml.safeLoad.mockReturnValue(expected);

//         const actual = await loadConfigAsync(filePath);

//         expect(actual).toEqual(expected);

//         expect(mockPath.resolve).toHaveBeenCalledWith(baseDir, filePath, '.yaml');
//         expect(mockReadFileAsync).toHaveBeenCalledWith(resolvedPath, 'utf8');
//         expect(mockJsYaml.safeLoad).toHaveBeenCalledWith(asyncContents);

//         expect(mockPath.resolve).toHaveBeenCalledTimes(1);
//         expect(mockReadFileAsync).toHaveBeenCalledTimes(1);
//         expect(mockJsYaml.safeLoad).toHaveBeenCalledTimes(1);
//     });
// });