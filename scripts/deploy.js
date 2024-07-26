// imports
const { ethers,run, network } = require("hardhat")

// async main
async function main() {
    const simpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract...")
    const simplestorage = await simpleStorageFactory.deploy()
    await simplestorage.waitForDeployment()
    // await simplestorage.waitForDeployment(1).then(()=>{
    //     console.log(simplestorage.address)
    // })
    const address = await simplestorage.getAddress()
    //console.log(address)
    console.log(`Contract deployed to : ${address}\n`)
    // we dont need to verify the contract when it is deploying through HH network, We only want to verify when deploying on ethereum mainnet/testnet
    //console.log(await network.config)
    
    let initialValue = await simplestorage.retrieve()
    console.log(`Initial value = ${initialValue}`)
    await simplestorage.store(11)
    initialValue = await simplestorage.retrieve()
    console.log(`Updated Value = ${initialValue}`)

    if((network.config.chainId === 11155111) && (process.env.ETHERSCAN_API_KEY)){
        console.log("inside the if condition")
        await simplestorage.waitForDeployment(6)
        verify(address,[])
    }
}
async function verify(contractAddress, args){
    try{
            run("verify:verify", {
            address: contractAddress,
            constructor: args
        })
        console.log("Successfully verified")
    }
    catch(e){
        if(e.message.toLowerCase().includes("already verified")){
            console.log("Contract Already Verified")
        } else{
            console.log(e)
        }
    }
}

// calling main method
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })