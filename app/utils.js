async function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

function log(...argv) {
  console.log.call(console, ...argv);
}

exports.sleep = sleep;
exports.log = log;
