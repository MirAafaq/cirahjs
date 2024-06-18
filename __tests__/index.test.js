const fs = require('fs');
const path = require('path');
const { moveFiles, logMessage } = require('../lib/index');  

describe('File Organizer', () => {
  const srcDir = './testSrc';
  const targetDir = './testTarget';
  const testFileTxt = 'testFile.txt';
  const testFilePdf = 'testFile.pdf';
  
  beforeAll(() => {
    if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir);
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);
    fs.writeFileSync(path.join(srcDir, testFileTxt), 'Test file content');
    fs.writeFileSync(path.join(srcDir, testFilePdf), 'Test file content');
  });

  afterAll(() => {
    fs.unlinkSync(path.join(srcDir, testFileTxt));
    fs.unlinkSync(path.join(srcDir, testFilePdf));
    fs.rmdirSync(srcDir);
    fs.unlinkSync(path.join(targetDir, testFileTxt));
    fs.unlinkSync(path.join(targetDir, testFilePdf));
    fs.rmdirSync(targetDir);
  });

  test('should move files with specified extensions', () => {
    moveFiles(srcDir, ['txt'], targetDir);
    expect(fs.existsSync(path.join(targetDir, testFileTxt))).toBe(true);
    expect(fs.existsSync(path.join(srcDir, testFileTxt))).toBe(false);
  });

  test('should log messages', () => {
    logMessage('Test log message');
    const logs = fs.readFileSync('audit.log', 'utf-8');
    expect(logs).toMatch(/Test log message/);
  });
});
