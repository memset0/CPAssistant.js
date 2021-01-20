function translate(translationMap) {
	for (let selector in translationMap) {
		let textMap = translationMap[selector];
		$(selector).each(function () {
			const $this = $(this);
			for (let sourceText in textMap) {
				let targetText = textMap[sourceText];
				if (sourceText.startsWith('replace::')) {
					sourceText = sourceText.slice(9);
					if ($this.text().match(sourceText)) {
						$this.text($this.text().replace(sourceText, targetText));
					}
				} else if (sourceText.startsWith('replaceHTML::')) {
					sourceText = sourceText.slice(13);
					console.log(sourceText, this.innerHTML);
					if (this.innerHTML.match(sourceText)) {
						this.innerHTML = this.innerHTML.replace(sourceText, targetText);
					}
				} else {
					if ($this.text().trim() == sourceText) {
						$this.text(targetText);
						break;
					}
				}
			}
		})
	}
}

module.exports = translate;