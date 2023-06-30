// ==UserScript==
// @name         CPAssistant.js
// @namespace    memset0/CPAssistant
// @version      1.0.0
// @author       memset0
// @license      GPL-3.0-only
// @homepage     https://github.com/memset0/CPAssistant.js#readme
// @homepageURL  https://github.com/memset0/CPAssistant.js#readme
// @source       https://github.com/memset0/CPAssistant.js.git
// @supportURL   https://github.com/memset0/CPAssistant.js/issues
// @match        http://codeforces.com
// @match        https://codeforces.com
// @match        http://codeforces.com/*
// @match        https://codeforces.com/*
// @match        http://codeforc.es
// @match        https://codeforc.es
// @match        http://codeforc.es/*
// @match        https://codeforc.es/*
// @match        http://qoj.ac
// @match        https://qoj.ac
// @match        http://qoj.ac/*
// @match        https://qoj.ac/*
// @match        http://pjudge.ac
// @match        https://pjudge.ac
// @match        http://pjudge.ac/*
// @match        https://pjudge.ac/*
// @match        http://vjudge.net
// @match        https://vjudge.net
// @match        http://vjudge.net/*
// @match        https://vjudge.net/*
// @match        http://cn.vjudge.net
// @match        https://cn.vjudge.net
// @match        http://cn.vjudge.net/*
// @match        https://cn.vjudge.net/*
// @match        http://vjudge.z180.cn
// @match        https://vjudge.z180.cn
// @match        http://vjudge.z180.cn/*
// @match        https://vjudge.z180.cn/*
// ==/UserScript==

(function () {
  'use strict';

  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  const config = {
    match: {
      codeforces: [
        "codeforces.com",
        "codeforc.es"
      ],
      qoj: [
        "qoj.ac",
        "pjudge.ac"
      ],
      vjudge: [
        "vjudge.net",
        "cn.vjudge.net",
        "vjudge.z180.cn"
      ]
    }
  };
  config.matches = [];
  for (const module in config.match) {
    for (const domain of config.match[module]) {
      config.matches.push(`http://${domain}`);
      config.matches.push(`https://${domain}`);
      config.matches.push(`http://${domain}/*`);
      config.matches.push(`https://${domain}/*`);
    }
  }
  class Module {
    constructor(app2, name, match) {
      __publicField(this, "app");
      __publicField(this, "name");
      __publicField(this, "match");
      __publicField(this, "features");
      __publicField(this, "plugins");
      this.app = app2;
      this.name = name;
      this.match = match;
      this.features = [];
      this.plugins = [];
    }
    log(...args) {
      return this.app.log(`[${this.name}]`, ...args);
    }
    run() {
    }
    apply() {
      this.run();
      for (const feature of this.features) {
        feature.apply();
      }
      for (const pluginFunction of this.plugins) {
        pluginFunction();
      }
    }
    register(feature) {
      this.features.push(feature);
    }
  }
  class Feature {
    constructor(module, name) {
      __publicField(this, "app");
      __publicField(this, "module");
      __publicField(this, "name");
      this.app = module.app;
      this.module = module;
      this.name = name;
    }
    log(...args) {
      return this.module.log(`[${this.name}]`, ...args);
    }
    run() {
    }
    apply() {
      this.run();
    }
    plugin(moduleName, func) {
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
    on(match, func) {
      if (match instanceof Array) {
        let ok = false;
        for (const singleMatch of match) {
          ok = this.on(singleMatch, func);
          if (ok) {
            return ok;
          }
        }
        return false;
      }
      const args = {};
      const matchParts = match.slice(1).split("/");
      const pathParts = location.pathname.slice(1).split("/");
      if (pathParts.length < matchParts.length) {
        return false;
      }
      for (let i = 0; i < matchParts.length; i++) {
        if (matchParts[i] === "*") {
          break;
        } else if (matchParts[i].startsWith("<") && matchParts[i].endsWith(">")) {
          const key = matchParts[i].slice(1, matchParts[i].length - 1);
          args[key] = pathParts[i];
        } else {
          if (matchParts[i] != pathParts[i]) {
            return false;
          }
        }
      }
      func(args);
      return true;
    }
  }
  class AcceptedCounter extends Feature {
    run() {
      this.on("/user/*", () => {
        document.getElementsByClassName("toggle-detail")[0].onclick = () => {
          for (const $tr of document.querySelectorAll("#probRecords tbody tr:not(#templ)")) {
            let ojName = $tr.children[0].innerText.trim();
            let acceptedNum = $tr.children[1].children.length || 0;
            let attemptedNum = $tr.children[2].children.length || 0;
            $tr.children[0].innerHTML = `
						${ojName}
						<br>
						<span style="color: #999">
							${acceptedNum} / ${acceptedNum + attemptedNum}
						</span>
					`;
            console.log(ojName, acceptedNum, attemptedNum);
          }
        };
      });
    }
  }
  function wait(e) {
    return void 0 === e && (e = 0), new Promise(function(t) {
      return setTimeout(t, e);
    });
  }
  function htmlToElement(html) {
    const template = document.createElement("template");
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
  }
  function parseQueryString(query) {
    if (query.startsWith("?")) {
      query = query.slice(1);
    }
    const records = {};
    for (const kvString of query.split("&")) {
      const idx = kvString.indexOf("=");
      if (idx === -1) {
        continue;
      }
      const key = kvString.slice(0, idx);
      const value = kvString.slice(idx + 1, kvString.length);
      records[key] = decodeURI(value);
    }
    return records;
  }
  function generateQueryString(records) {
    let query = "?";
    for (let i = 0; i < Object.keys(records).length; i++) {
      const key = Object.keys(records)[i];
      const value = Object.values(records)[i];
      if (i) {
        query += "&";
      }
      query += `${key}=${encodeURI(value)}`;
    }
    return query;
  }
  function parseCPAData(query) {
    const records = parseQueryString(query);
    if (!records.cpa) {
      return null;
    }
    const json = atob(records.cpa);
    let data = null;
    try {
      data = JSON.parse(json);
    } catch (err) {
      console.error("JSON parse error!");
      return null;
    }
    return data;
  }
  function generateCPAData(data) {
    const json = JSON.stringify(data);
    return generateQueryString({ cpa: btoa(json) });
  }
  function openInNewTab(url) {
    const element = document.createElement("a");
    element.setAttribute("href", encodeURI(url));
    element.setAttribute("target", "_blank");
    element.click();
  }
  async function writeClipboard(text) {
    return navigator.clipboard.writeText(text);
  }
  class ForkContest extends Feature {
    async createContest(title, problemList) {
      let content = "";
      for (const problem of problemList) {
        content += `${problem.oj}	|	${problem.id}	|	1	|	
`;
      }
      document.getElementById("btn-create").click();
      await wait(500);
      document.getElementById("edit-plain").click();
      await wait(100);
      document.getElementById("contest-title").value = title;
      document.getElementById("problems-plain").value = content;
      await wait(100);
      document.getElementById("problems-plain-btn-confirm").click();
    }
    run() {
      this.on("/contest", async () => {
        const data = parseCPAData(location.search);
        if (data.type == "create-contest" && data.title && data.problems) {
          return this.createContest(data.title, data.problems);
        }
      });
    }
    registerPlugins() {
      async function copyPid(problems) {
        let result = "";
        for (const problem of problems) {
          result += `[problem:${problem.oj}-${problem.id}]
`;
        }
        if (result) {
          result.slice(0, result.length - 1);
        }
        return writeClipboard(result);
      }
      async function forkContest(problems, contestTitle) {
        openInNewTab("https://vjudge.net/contest" + generateCPAData({
          type: "create-contest",
          title: contestTitle,
          problems
        }));
      }
      this.plugin("codeforces", function() {
        this.log("setup");
        function setup(situation, roundId) {
          const $menu = document.getElementsByClassName("second-level-menu")[0];
          const $menuList = $menu.children[0];
          $menuList.appendChild(htmlToElement(`
					<li><a href="#" id="cpa-copy-pid">copy problem ids (VJ)</a></li>
				`));
          $menuList.appendChild(htmlToElement(`
					<li><a href="#" id="cpa-fork-contest">fork contest (VJ)</a></li>
				`));
          const $buttonCopyPid = document.getElementById("cpa-copy-pid");
          const $buttonForkContest = document.getElementById("cpa-fork-contest");
          function getProblems() {
            const $problemTableLines = Array.from(document.getElementsByClassName("problems")[0].children[0].children).slice(1);
            const problems = [];
            const onlineJudge = situation == "gym" ? "Gym" : "CodeForces";
            for (const $problemTableLine of $problemTableLines) {
              problems.push($problemTableLine.children[0].innerText.trim());
            }
            return problems.map((problemId) => ({ oj: onlineJudge, id: `${roundId}${problemId}` }));
          }
          function getContestTitle() {
            return document.getElementById("sidebar").children[0].children[0].children[0].children[0].children[0].innerText.trim();
          }
          $buttonCopyPid.onclick = async () => copyPid(getProblems());
          $buttonForkContest.onclick = async () => forkContest(getProblems(), getContestTitle());
        }
        this.on("/gym/<id>", (args) => {
          setup("gym", args.id);
        });
        this.on("/contest/<id>", (args) => {
          setup("contest", args.id);
        });
      });
    }
    constructor(module, name) {
      super(module, name);
      this.registerPlugins();
    }
  }
  class ModuleVjudge extends Module {
    run() {
    }
    constructor(app2) {
      super(app2, "vjudge", config.match.vjudge);
      this.register(new AcceptedCounter(this, "accepted-counter"));
      this.register(new ForkContest(this, "fork-contest"));
    }
  }
  class ModuleCodeforces extends Module {
    run() {
    }
    constructor(app2) {
      super(app2, "codeforces", config.match.codeforces);
    }
  }
  class App {
    constructor() {
      __publicField(this, "modules");
      __publicField(this, "_queuedPlugins");
      this._queuedPlugins = {};
      this.modules = {};
    }
    log(...args) {
      return console.log("[CPAssistant.js]", ...args);
    }
    apply() {
      for (const name in this.modules) {
        const module = this.modules[name];
        if (module.match.includes(location.host)) {
          module.apply();
          break;
        }
      }
    }
    register(module) {
      this.modules[module.name] = module;
      if (module.name in this._queuedPlugins) {
        for (const queuedPlugin of this._queuedPlugins[module.name]) {
          const { feature, func } = queuedPlugin;
          feature.plugin(module.name, func);
        }
      }
    }
  }
  const app = new App();
  app.register(new ModuleVjudge(app));
  app.register(new ModuleCodeforces(app));
  app.apply();

})();
