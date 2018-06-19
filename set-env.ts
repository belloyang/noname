import { writeFile } from 'fs';
import { argv } from 'yargs';

// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();

// Would be passed to script like this:
// `ts-node set-env.ts --environment=dev --wamp_router='192.168.2.60'`
// we get it from yargs's argv object
const environment = argv.environment;
const isProd = environment === 'prod';

let wamp_router = argv.wamp_router;
console.log('set-env:', environment, wamp_router);

let targetPath: string;
if (environment == 'prod') {
  targetPath = `./src/environments/environment.${environment}.ts`;
} else {
  targetPath = `./src/environments/environment.ts`;
}

if (!wamp_router || wamp_router == '') {
  wamp_router = process.env.DEFAULT_WAMP_IP;
  console.log('Set wamp_router by default:', process.env.DEFAULT_WAMP_IP);
}

const envConfigFile = `
export const environment = {
  production: ${isProd},
  wsUrl: 'ws://${wamp_router}:9200/ws'
};
`;
writeFile(targetPath, envConfigFile, function(err) {
  if (err) {
    console.log(err);
  }

  console.log(`Output generated at ${targetPath}`);
});
