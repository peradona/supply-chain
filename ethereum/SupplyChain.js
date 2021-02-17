import web3 from './web3';
import SupplyChain from './build/SupplyChain.json';

const instance = new web3.eth.Contract(
    JSON.parse(SupplyChain.interface),
    "0x4F774264Ba962f6c5385B71f9Ee4783dF99F2272"
// "0x36Bfec2cEA6387141818C363050dcE99C93674ef"
);

export default instance;