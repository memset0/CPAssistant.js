import config from '../../config';
import App from '../../app';
import Module from '../../types/module';

export default class ModuleCodeforces extends Module {
  run() {}

  constructor(app: App) {
    super(app, 'codeforces', config.match.codeforces);
  }
}
