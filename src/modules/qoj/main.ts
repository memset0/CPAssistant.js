import config from '../../config';
import App from '../../app';
import Module from '../../types/module';
import RanklistExport from './features/RanklistExport';

export default class ModuleQOJ extends Module {
  run() {}

  constructor(app: App) {
    super(app, 'qoj', config.match.qoj);

    this.register(new RanklistExport(this, 'ranklist-export'));
  }
}
