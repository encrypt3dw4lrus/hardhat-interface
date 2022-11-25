const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Basic", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

  
    const basic = await hre.ethers.getContractFactory("BasicContract");
    const Basic = await basic.deploy();
  
  
    await Basic.deployed();
    let abi = [
      "function addTwoValues(uint256,uint256)",
      "function getNumber() returns (uint256)",
      "function getString() returns (string)",
      "function saveStructToMap(tuple(string,string))"
    ];

    let iface = new ethers.utils.Interface(abi);
    //console.log(basic.interface.getSighash(abi));
    //console.log(iface.fragments);
    const interfaceHash = iface.getSighash("saveStructToMap(tuple(string,string))");
    const interfaceHash2 = iface.getSighash("addTwoValues(uint256,uint256)");
    const functionArray = toString(abi).split(',');
    let x = (interfaceHash ^ interfaceHash2);
    let x0 = "0x";
    const interfaceId = x0.concat(x.toString(16));
    let interfaceIdInFull;
    let amountOfFragments = Object.keys(iface.fragments).length;
    console.log(functionArray[0]);
    for(let i = 0; i < amountOfFragments; i++){
        let interface = (iface.getSighash(functionArray[0]) ^ iface.getSighash(functionArray[1]));
        if(i > 1){
          interfaceIdInFull = (interface ^ iface.getSighash(functionArray[i]));
        }
      }
    console.log(interfaceIdInFull);
    return { owner, otherAccount, Basic, interfaceId };
  }

  describe("Deployment", function () {
    it("Should match solidity and javascript interfaceId", async function () {
      const { Basic, interfaceId, } = await loadFixture(deployFixture);
      // expect(await Basic.getInterface()).to.equal(interfaceId);
      console.log(await Basic.getInterface(), " = ", interfaceId);
    });
  });
});