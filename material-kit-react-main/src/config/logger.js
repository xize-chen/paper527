const logger = () => {
  let oldConsoleLog = null;
  const pub = {};

  pub.enableLogger = function enableLogger() {
    if (oldConsoleLog == null) return;
    window.console.log = oldConsoleLog;
  };

  pub.disableLogger = function disableLogger() {
    oldConsoleLog = console.log;
    window.console.log = () => {};
  };

  return pub;
};

export default logger;
