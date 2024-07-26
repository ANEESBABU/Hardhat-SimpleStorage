const {ethers} = require("hardhat")
const {assert,expect} = require("chai")

describe("SimpleStorage", function(){
let simpleStorageFactory,simplestorage
  beforeEach(async function(){
    simpleStorageFactory = await ethers.getContractFactory(
      "SimpleStorage"
  )
  simplestorage = await simpleStorageFactory.deploy()
  await simplestorage.waitForDeployment()
  })
  it("Initial value of the favouriteNumber should be 0", async function(){
    const currentValue = await simplestorage.retrieve()
    assert.equal(currentValue.toString(),"0")
    //expect(currentValue.toString()).to.equal("0")
  })
  it("Should update value once store is called", async function(){
    const valueToStore = 7
    await simplestorage.store(valueToStore)
    const updatedValue = await simplestorage.retrieve()

    // assert.equal(updatedValue.toString(),"7")
    expect(updatedValue.toString()).to.equal("7")
  })
})