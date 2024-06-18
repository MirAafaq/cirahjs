# CIRAHJS - File Organizer

CIRAH is a simple and efficient file organizer tool that helps you move files with specified extensions into a target directory. It includes detailed logging (auditing) to keep track of all operations.

## Features

- Organize files based on their extensions.
- Specify the target directory for organized files.
- Detailed logging of operations.
- Run the script from any directory.
- Backup Before Move: Automatically create a backup of files before moving them.
- Undo Operation: Undo the last move operation, restoring files to their original location.
- Confirmation Prompt: Prompt the user for confirmation before performing file movements.
- Symlink Creation: Offer an option to create symbolic links in the original location, pointing to the new location of the files.


## Installation

To install CIRAH globally on your system, use npm:

```bash
npm install -g cirah
