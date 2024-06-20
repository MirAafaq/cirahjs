# CIRAHJS - File Organizer

CIRAH is a simple and efficient file organizer tool that helps you move files with specified extensions into a target directory. It includes detailed logging (auditing) to keep track of all operations.


## Features

- Organize files based on their extensions.
- Specify the target directory for organized files.
- Detailed logging of operations.
- Undo changes on the go
- Run the script from any directory.
  

## Installation
#### npm installation

To install CIRAH globally on your system, use npm: (-g will install globally)
```bash
npm install -g cirah
```
## Usage
once you have installed with npm command , you are ready to go

```bash
# To Organise Enter below command & Follow the prompt : 
cirah

# For help enter
cirah --help



```
Note : for organising in current directory leave the first prompt as it is.

## Git cloning...
To clone run command

```bash
git clone https://github.com/miraafaq/cirahjs.git
```
## Testing 
Install package 
```bash
npm i
npm test
```
You will see below kind of result if all passed
```bash


 PASS  __tests__/index.test.js
  File Organizer
    √ should move files with specified extensions (141 ms)
    √ should log messages (2 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.494 s, estimated 2 s
Ran all test suites.
```
