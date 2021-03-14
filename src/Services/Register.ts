import * as fs from "fs";
import * as path from "path";

/**
 * Recursivley walk a directory for files
 *
 * @export
 * @param {string} dir The base directory to scan
 * @param {(file: string) => void} callback Callback method to handle a file
 */
export function register(dir: string, callback: (file: string) => void): void {
	const paths = fs.readdirSync(dir);
	for (const f of paths) {
		const dirPath = path.join(dir, f);
		const isDirectory = fs.statSync(dirPath).isDirectory();
		isDirectory ? register(dirPath, callback) : callback(path.join(dir, f));
	}
}