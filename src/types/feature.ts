import App from '../app';
import Module from './module';
import { Dict } from '../utils/type';

export default class Feature {
  app: App;
  module: Module;
  name: string;

  log(...args: any[]) {
    return this.module.log(`[${this.name}]`, ...args);
  }

  run() {}

  apply() {
    this.run();
  }

  plugin(moduleName: string, func: () => void) {
    if (moduleName in this.app.modules) {
      const module = this.app.modules[moduleName];
      const virtualFeature = new Feature(module, `${this.module.name}::${this.name}`);
      virtualFeature.run = () => {
        func.call(virtualFeature);
      };
      module.register(virtualFeature);
    } else {
      if (!(moduleName in this.app._queuedPlugins)) {
        this.app._queuedPlugins[moduleName] = [];
      }
      this.app._queuedPlugins[moduleName].push({ feature: this, func });
    }
  }

  on(matcher: string | Array<string>, func: (args: Dict<string>, params: Dict<string>) => void): boolean {
    if (matcher instanceof Array) {
      let ok = false;
      for (const singleMatch of matcher) {
        ok = this.on(singleMatch, func);
        if (ok) {
          return ok;
        }
      }
      return false;
    }

    const args: Dict<string> = {};
    const matcherParts = matcher.slice(1).split('/');
    const currentPaths = location.pathname.slice(1).split('/');

    if (matcherParts[matcherParts.length - 1] == '') {
      --matcherParts.length;
    }
    if (currentPaths[currentPaths.length - 1] == '') {
      --currentPaths.length;
    }

    if (currentPaths.length < matcherParts.length) {
      return false;
    }
    if (currentPaths.length > matcherParts.length && matcherParts[matcherParts.length - 1] !== '*') {
      return false;
    }

    for (let i = 0; i < matcherParts.length; i++) {
      if (matcherParts[i] === '*') {
        break;
      } else if (matcherParts[i].startsWith('<') && matcherParts[i].endsWith('>')) {
        const key = matcherParts[i].slice(1, matcherParts[i].length - 1);
        args[key] = currentPaths[i];
      } else {
        if (matcherParts[i] != currentPaths[i]) {
          return false;
        }
      }
    }

    func(args, Object.fromEntries(new URLSearchParams(location.search)));
    return true;
  }

  constructor(module: Module, name: string) {
    this.app = module.app;
    this.module = module;
    this.name = name;
  }
}
