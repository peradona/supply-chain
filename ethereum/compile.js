const path = require('path');
const s = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const supplyChainPath = path.resolve(__dirname, 'contracts', 'SupplyChain.sol');
const source = fs.readFileSync(supplyChainPath, 'utf8');
const output = s.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
      path.resolve(buildPath, contract.replace(':', '') + '.json'),
      output[contract]
  );
}