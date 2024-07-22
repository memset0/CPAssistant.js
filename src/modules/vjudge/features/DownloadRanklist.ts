import * as Papa from 'papaparse';
import saveAs from 'file-saver';
import Module from '../../../types/module';
import Feature from '../../../types/feature';

export default class ForkContest extends Feature {
  run() {}

  registerPlugins() {
    this.plugin('hdu', function (this: Feature) {
      this.on('/contest/rank', (_, params) => {
        const contestId = params.cid;
        const csvLink = `/contest/rank?cid=${contestId}&export=csv`;

        const $downloadButton = document.createElement('button');
        $downloadButton.innerText = 'Download Ranklist (VJ)';
        $downloadButton.setAttribute('href', '#');
        $downloadButton.onclick = async () => {
          $downloadButton.setAttribute('disabled', '');

          const response = await fetch(csvLink);
          if (!response.ok) {
            const errorMessage = `Request failed (code: ${response.status})!`;
            alert(errorMessage);
            throw new Error(errorMessage);
          }

          const csvPlain = await response.text();
          const csvData = Papa.parse(csvPlain).data.slice(1);

          const parse = (pattern: string): string => {
            let [acTime, penalty] = pattern.split(' ');
            if (pattern == '') {
              acTime = '--';
              penalty = '--';
            } else {
              if (acTime.startsWith('(')) {
                penalty = acTime;
                acTime = '--';
              } else {
                const [hour, minute, _second] = acTime.split(':');
                acTime = String(Number(hour) * 60 + Number(minute));
              }
              if (penalty !== undefined && penalty.startsWith('(')) {
                penalty = penalty.slice(2, -1);
              } else {
                penalty = '--';
              }
              if (acTime != '--' && penalty != '--') {
                penalty = String(Number(penalty) + 1); // The accepted submission counted.
              }
            }
            return acTime + ' # ' + penalty;
          };

          const data = [];
          for (const source of csvData) {
            const parsed = [source[1]];
            for (let i = 4; i < source.length; i++) {
              parsed.push(parse(source[i]));
            }
            data.push(parsed);
          }

          let blob = new Blob(
            [
              data.map((row) => row.join(',')).join('\n'), //
            ],
            { type: 'text/csv;charset=utf-8;' }
          );
          saveAs(blob, 'output.csv');

          $downloadButton.removeAttribute('disabled');
        };

        const $actionBar = document.querySelector('.page-card-heading-actions')!;
        $actionBar.appendChild($downloadButton);
      });
    });
  }

  constructor(module: Module, name: string) {
    super(module, name);

    this.registerPlugins();
  }
}
