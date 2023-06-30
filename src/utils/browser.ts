export function openInNewTab(url: string): void {
	const element = document.createElement('a');
	element.setAttribute('href', encodeURI(url));
	element.setAttribute('target', '_blank');
	element.click();
}

export async function readClipboard(): Promise<string> {
	return navigator.clipboard.readText();
}

export async function writeClipboard(text: string): Promise<void> {
	return navigator.clipboard.writeText(text);
}