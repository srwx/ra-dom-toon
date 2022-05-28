const path = require("path")
const solc = require("solc")
const fs = require("fs-extra")

const buildPath = path.resolve(__dirname, "..", "build") // Get path of build folder
fs.removeSync(buildPath) // Remove build folder if it already exists

const contractPath = path.resolve(__dirname, "..", "contracts", "Campaign.sol") // Get path of Campaign.sol file
const source = fs.readFileSync(contractPath, "utf8") // Read content in Campaign.sol file

// input stand for input to solc (solc = solidity compiler)
const input = {
  language: "Solidity",
  sources: {
    "Campaign.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
}

// output is result from solc compile Campaign.sol file
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  "Campaign.sol"
]

fs.ensureDirSync(buildPath) //create build directory if not exists

// Create output from solc to .json files (Campaign, CampaignFactory) in build folder
for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract + ".json"),
    output[contract]
  )
}
