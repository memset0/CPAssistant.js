// import * as h from 'h';
import wait from 'wait';
import Module from '../../../types/module';
import Feature from "../../../types/feature";
import { htmlToElement } from '../../../utils/element';
import { parseCPAData, generateCPAData } from '../../../utils/query-string';
import { writeClipboard, openInNewTab } from '../../../utils/browser';

export interface VjudgeProblem {
	oj: string;
	id: string;
};

export default class ForkContest extends Feature {
	async createContest(title: string, problemList: Array<VjudgeProblem>) {
		let content = '';
		for (const problem of problemList) {
			content += `${problem.oj}\t|\t${problem.id}\t|\t1\t|\t\n`;
		}

		(document.getElementById('btn-create') as HTMLElement).click();
		await wait(500);
		(document.getElementById('edit-plain') as HTMLElement).click();
		await wait(100);
		(document.getElementById('contest-title') as HTMLInputElement).value = title;
		(document.getElementById('problems-plain') as HTMLTextAreaElement).value = content;
		await wait(100);
		(document.getElementById('problems-plain-btn-confirm') as HTMLElement).click();
	}

	run() {
		this.on('/contest', async () => {
			const data = parseCPAData(location.search);
			if (data.type == 'create-contest' && data.title && data.problems) {
				return this.createContest(data.title, data.problems);
			}
		})
	}

	registerPlugins() {
		async function copyPid(problems: Array<VjudgeProblem>): Promise<void> {
			let result = '';
			for (const problem of problems) {
				result += `[problem:${problem.oj}-${problem.id}]\n`;
			}
			if (result) { result.slice(0, result.length - 1); }
			return writeClipboard(result);
		}

		async function forkContest(problems: Array<VjudgeProblem>, contestTitle: string): Promise<void> {
			openInNewTab('https://vjudge.net/contest' + generateCPAData({
				type: 'create-contest',
				title: contestTitle,
				problems: problems,
			}));
		}

		this.plugin('codeforces', function (this: Feature) {
			this.log('setup');

			function setup(situation: string, roundId: string) {
				const $menu = document.getElementsByClassName('second-level-menu')[0];
				const $menuList = $menu.children[0];
				$menuList.appendChild(htmlToElement(`
					<li><a href="#" id="cpa-copy-pid">copy problem ids (VJ)</a></li>
				`));
				$menuList.appendChild(htmlToElement(`
					<li><a href="#" id="cpa-fork-contest">fork contest (VJ)</a></li>
				`));

				const $buttonCopyPid: HTMLElement = document.getElementById('cpa-copy-pid')!;
				const $buttonForkContest: HTMLElement = document.getElementById('cpa-fork-contest')!;

				function getProblems(): Array<VjudgeProblem> {
					const $problemTableLines = Array.from(document.getElementsByClassName('problems')[0].children[0].children).slice(1);
					const problems: Array<string> = [];
					const onlineJudge = situation == 'gym' ? 'Gym' : 'CodeForces';
					for (const $problemTableLine of $problemTableLines) {
						problems.push(($problemTableLine.children[0] as HTMLElement).innerText.trim());
					}
					return problems.map((problemId) => ({ oj: onlineJudge, id: `${roundId}${problemId}` }));
				}

				function getContestTitle(): string {
					return ((document.getElementById('sidebar') as HTMLElement).children[0].children[0].children[0].children[0].children[0] as HTMLElement).innerText.trim();
				}

				$buttonCopyPid.onclick = async () => copyPid(getProblems());
				$buttonForkContest.onclick = async () => forkContest(getProblems(), getContestTitle());
			}

			this.on('/gym/<id>', (args) => { setup('gym', args.id); })
			this.on('/contest/<id>', (args) => { setup('contest', args.id); })
		});

		this.plugin('qoj', function (this: Feature) {
			this.on('/contest/<id>', () => {
				const $nav = document.getElementsByClassName('nav-tabs')[0];
				$nav.appendChild(htmlToElement(`<li class="nav-item"><a href="#" class="nav-link" id="cpa-copy-pid">Copy Problem IDs (VJ)</a></li>`));
				$nav.appendChild(htmlToElement(`<li class="nav-item"><a href="#" class="nav-link" id="cpa-fork-contest">Fork Contest (VJ)</a></li>`));

				function getProblems(): Array<VjudgeProblem> {
					const problems: Array<VjudgeProblem> = [];
					for (const $problemLink of document.querySelectorAll('.table-responsive')[0].querySelectorAll('table>tbody a')) {
						const href = $problemLink.attributes.getNamedItem('href')!.value;
						const id = href.split('/').at(-1)!;
						problems.push({ oj: 'QOJ', id });
					}
					return problems;
				}
				function getContestTitle(): string {
					return document.querySelector('.uoj-content .text-center h1')!.innerHTML.trim();
				}

				document.getElementById('cpa-copy-pid')!.onclick = async () => copyPid(getProblems());
				document.getElementById('cpa-fork-contest')!.onclick = async () => forkContest(getProblems(), getContestTitle());
			});
		});
	}

	constructor(module: Module, name: string) {
		super(module, name);

		this.registerPlugins();
	}
}
