const { default: Web3 } = require("web3");

const PrismSale = artifacts.require("PrismSale");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("PrismSale", function (accounts) {
  it("should assert true", async function () {
    await PrismSale.deployed();
    return assert.isTrue(true);
  });

  it("should get the right accounts", async function () {
    const contract = await PrismSale.deployed()
    
    const owner = await contract.owner.call()
    const charity = await contract.charity.call()

    assert.isTrue(owner == 0x4501Cf7a6005A10c9eA98524b23937406081d436)
    assert.isTrue(charity == 0x16248e6838EE9Bd1fa7B3D4D557313bfa66F2141)
  })

  it("should split the payment to the owner", async function () {
    const contract = await PrismSale.deployed()
    
    const startBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]))

    const purchase = await contract.buy.sendTransaction({
      from: accounts[6],
      value: web3.utils.toWei("0.01", "ether")
    })
    const commission = web3.utils.toBN(web3.utils.toWei("0.008", "ether"))
    const endBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]))

    assert.equal(
      startBalance.add(commission).toString(), 
      endBalance.toString()
    )
  })
  it("should split the payment to the charity", async function () {
    const contract = await PrismSale.deployed()
    
    const startBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[4]))

    const purchase = await contract.buy.sendTransaction({
      from: accounts[7],
      value: web3.utils.toWei("0.01", "ether")
    })
    const commission = web3.utils.toBN(web3.utils.toWei("0.002", "ether"))
    const endBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[4]))

    assert.equal(
      startBalance.add(commission).toString(), 
      endBalance.toString()
    )
  })

});
