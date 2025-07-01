import { dirname } from 'path';
import fs from 'node:fs';


// Before writing the file, ensure the directory exists
export function writeJsonDebug(fileName: string, data: object): void {
  const filePath = `${import.meta.dirname}/debug/${fileName}`

  const dir = dirname(filePath);
  
  // Create directory if it doesn't exist (recursive: true creates all needed directories)
  fs.mkdirSync(dir, { recursive: true });
  
  // Then write the file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}