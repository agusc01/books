import * as fs from 'fs';
import * as path from 'path';

function ensureDirectoryExists(directoryPath) {
	if (!fs.existsSync(directoryPath)) {
		fs.mkdirSync(directoryPath, { recursive: true });
	}
}

function generateEnumFromEnvFile(envFilePath) {
	const envFileContent = fs.readFileSync(envFilePath, 'utf-8');
	const lines = envFileContent.split('\n');
	let enumContent = 'export enum Env {\n';

	lines.forEach((line) => {
		const trimmedLine = line.trim();
		if (trimmedLine && !trimmedLine.startsWith('#')) {
			const [key] = trimmedLine.split('=');
			const enumKey = key.trim();
			enumContent += `    ${enumKey} = '${enumKey}',\n`;
		}
	});

	enumContent += '}\n';

	return enumContent;
}

function main() {
	const folderPath = 'src/models/enums';
	ensureDirectoryExists(folderPath);

	const envEnumContent = generateEnumFromEnvFile('.env');
	const filePath = path.join(folderPath, 'env.enum.ts');
	fs.writeFileSync(filePath, envEnumContent);
	console.log(`\x1b[32m[created]\x1b[0m enum`);
}

main();
