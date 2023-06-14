import Feature from "../../../types/feature"

export default class AcceptedCounter extends Feature {
	run() {
		this.on('/user/*', () => {
			(document.getElementsByClassName('toggle-detail')[0] as HTMLElement).onclick = () => {
				for (const $tr of document.querySelectorAll('#probRecords tbody tr:not(#templ)')) {
					let ojName = ($tr.children[0] as HTMLElement).innerText.trim()
					let acceptedNum = $tr.children[1].children.length || 0
					let attemptedNum = $tr.children[2].children.length || 0
					$tr.children[0].innerHTML = `
						${ojName}
						<br>
						<span style="color: #999">
							${acceptedNum} / ${acceptedNum + attemptedNum}
						</span>
					`
					console.log(ojName, acceptedNum, attemptedNum)
				}
			}
		})
	}
}
