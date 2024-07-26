import config from '../../config';
import App from '../../app';
import Module from '../../types/module';
import RankListExport from './features/RanklistExport';

export default class ModuleQOJ extends Module {
  run() {}

  constructor(app: App) {
    super(app, 'qoj', config.match.qoj);

    this.register(new RankListExport(this, 'ranklist-export'));
  }
}
