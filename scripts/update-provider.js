const fs = require('fs-extra');
const path = require('path');
const config = require('../config');
const axios = require('axios');
const pTimeout = require('p-timeout');
const pRetry = require('p-retry');

const http = axios.create({
  timeout: 1000 * 10,
  params: {
    client_id: 'b8257841dd7ca5eef2aa',
    client_secret: '4da33dd6fcb0a01d395945ad18613ecf9c12079e'
  }
});

/**
 * get all latest providers from Github
 * @param outputDir
 * @returns {Promise.<void>}
 */
async function updateProviders(outputDir = 'app/providers') {
  const res = await http.get(
    'https://api.github.com/repos/axetroy/sms-boom/contents/app/providers'
  );

  const remoteProvidersPath = path.join(config.paths.root, outputDir);

  await fs.ensureDir(remoteProvidersPath);

  const files = res.data;

  const promiseList = files.map(file => {
    // if the file is not .js, then cross this
    if (/\.js$/.test(file.name) === false) return Promise.resolve();
    return pTimeout(
      pRetry(
        async () => {
          try {
            const response = await http.get(file.download_url);

            if (response.status >= 400) throw response;
            const distFile = path.join(remoteProvidersPath, file.name);
            const remoteSourceCode = response.data;

            let shouldWriteFile = false;

            if (await fs.pathExists(distFile)) {
              // if file exist, diff and then update
              const localSourceCode = await fs.readFile(distFile, { encoding: 'utf8' });
              if (remoteSourceCode && remoteSourceCode.trim() !== localSourceCode.trim()) {
                shouldWriteFile = true;
              }
            } else {
              // if file not exist then create it
              shouldWriteFile = true;
            }
            // update providers
            shouldWriteFile &&
              (await fs.writeFile(distFile, remoteSourceCode, { encoding: 'utf8' }));
          } catch (err) {
            console.error(`Get Remote file ${file.name} fail. ${err.message}`);
            throw err;
          }
        },
        { retries: 5 }
      ),
      1000 * 30
    );
  });

  return await Promise.all(promiseList);
}

module.exports = updateProviders;
