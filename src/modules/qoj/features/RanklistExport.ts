// import * as h from 'h';
import Module from '../../../types/module';
import Feature from '../../../types/feature';
import { writeClipboard } from '../../../utils/browser';

interface RanklistProblem {
  id: string;
  accepted: number;
  attempted: number;
  link?: string;
  $el: HTMLElement;
}

interface RanklistTeam {
  name: string;
  solved: number;
  penalty: number;
  status: Array<string>;
  selected: boolean;
  $el: HTMLElement;
}

export default class RankListExport extends Feature {
  run() {
    this.on('/results/<name>', (args) => {
      const $ranklist = document.getElementsByClassName('standings')[0];

      const problems = Array.from($ranklist.children[0].children[0].children)
        .slice(2, -3)
        .map(($el) => {
          const text = ($el as HTMLElement).innerText;
          const data = text.split(/[\s\/]+/);
          return {
            id: data[0],
            accepted: parseInt(data[1], 10),
            attempted: parseInt(data[2], 10),
            $el,
          } as RanklistProblem;
        });
      console.log(problems);

      const teams = Array.from($ranklist.children[0].children)
        .slice(1, -2)
        .map(($el) => {
          const children = Array.from($el.children).map(($el) => ($el as HTMLElement).innerText.trim());

          return {
            name: children[1],
            solved: parseInt(children[children.length - 3], 10),
            penalty: parseInt(children[children.length - 2], 10),
            status: children.slice(2, -3),
            selected: false,
            $el,
          } as RanklistTeam;
        });
      console.log(teams);

      for (const team of teams) {
        team.$el.addEventListener('click', () => {
          this.log(team.name);
          team.selected = !team.selected;
          if (team.selected) {
            team.$el.style.color = 'red';
          } else {
            team.$el.style.color = '';
          }
        });
      }

      const exportRank = (teams: Array<RanklistTeam>) => {
        const data: Array<Array<string>> = [[`[Team](https://qoj.ac/results/${args.name})`]];
        data[0].push('Solved');
        data[0].push('Penalty');
        data[0].push.apply(
          data[0],
          problems.map((problem) => `${problem.id}<br>${problem.accepted}`)
        );
        for (const team of teams) {
          const line = [team.name];
          line.push(team.solved.toString());
          line.push(team.penalty.toString());
          line.push.apply(
            line,
            team.status.map((source) => {
              const data = source.trim().split(/\n+/);
              if (data[0].startsWith('+')) {
                data[0] = '**' + data[0] + '**';
                return '[' + data.join('<br>') + '](#)';
              } else {
                return data.join('<br>');
              }
            })
          );
          data.push(line);
        }
        this.log(data);

        let result = '| ';
        for (let i = 0; i < data[0].length; i++) {
          result += data[0][i] + ' | ';
        }
        result += '\n| ';
        for (let i = 0; i < data[0].length; i++) {
          result += ' --- |';
        }
        result += '\n';
        for (let i = 1; i < data.length; i++) {
          result += '| ';
          for (let j = 0; j < data[i].length; j++) {
            result += data[i][j] + ' | ';
          }
          result += '\n';
        }
        this.log('export rank', result);
        writeClipboard(result);
      };

      const $buttonExport = document.createElement('button');
      $buttonExport.innerText = 'Export';
      $buttonExport.addEventListener('click', () => {
        exportRank(teams.filter((team) => team.selected));
      });
      const $buttonExportAll = document.createElement('button');
      $buttonExportAll.innerText = 'Export All';
      $buttonExportAll.addEventListener('click', () => {
        exportRank(teams);
      });
      document.body.children[0].appendChild($buttonExport);
      document.body.children[0].appendChild($buttonExportAll);
    });
  }

  constructor(module: Module, name: string) {
    super(module, name);
  }
}
