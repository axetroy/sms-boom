async function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

function log() {
  console.log.apply(console, arguments);
}

exports.sleep = sleep;
exports.log = log;
