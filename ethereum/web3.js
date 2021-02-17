import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider);
    console.log('Provider is metamask');
} else {
    web3 = new Web3("https://rinkeby.infura.io/v3/60c9a632ca3144d5ad41fb15b9f76cb0");
    console.log('Provider is Http');
}


export default web3;


