pragma solidity >=0.4.22 < 0.6.0;

contract SupplyChain {

    string[] public EPCs;

    event Publish(string indexed EPCCode, string supplyJSON);

    function publish(string EPCCode, string supplyJSON) public {
        EPCs.push(supplyJSON);

        emit Publish(EPCCode, supplyJSON);
    }

}