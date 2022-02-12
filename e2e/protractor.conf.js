// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
const jasmineReporters = require('jasmine-reporters');

const reporter = new HtmlScreenshotReporter({
  dest: 'e2e/screenshots',
  filename: 'index.html',
  reportOnlyFailedSpecs: true,
  captureOnlyFailedSpecs: true,
  preserveDirectory: false
});


exports.config = {
  //chromeDriver: '/usr/bin/chromedriver', // disable if run not in docker
  allScriptsTimeout: 11000,
  specs: [
    './src/*.e2e-spec.ts'
  ],
  capabilities: {
    // count: 5,
    browserName: 'chrome',
    chromeOptions: {
      args: ['incognito', "--no-sandbox", "--disable-gpu", "--headless" ,"--window-size=1440,937", "--mute-audio",
        '--ignore-certificate-errors', '--ignore-urlfetcher-cert-requests', '--disable-dev-shm-usage']
    }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine2',
  jasmineNodeOpts: {
    onComplete: null,
    showColors: true,
    defaultTimeoutInterval: 50000,
    print: function () {
    }
  },
  // Setup the report before any tests start
  beforeLaunch: function () {
    return new Promise(function (resolve) {
      reporter.beforeLaunch(resolve);
    });
  },
  onPrepare: function () {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    browser.waitForAngularEnabled(true);
    browser.driver.manage().timeouts().implicitlyWait(3000);
    jasmine.getEnv().addReporter(new SpecReporter({spec: {displayStacktrace: 'raw'}}));
    jasmine.getEnv().addReporter(reporter);
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      filePrefix: 'xmloutput'
    }));
  },
  // Close the report after all tests finish
  afterLaunch: function (exitCode) {
    return new Promise(function (resolve) {
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
  }
};
