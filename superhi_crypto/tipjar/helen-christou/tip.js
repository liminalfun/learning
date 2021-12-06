const web3 = new Web3(Web3.givenProvider)

const form = document.querySelector("form")

const send = async function (amount) {
   const accounts =  await window.ethereum.request({ method: "eth_requestAccounts" })
  
   const wei = web3.utils.toWei(amount)

   if (accounts.length > 0) {
        window.ethereum.request({ 
            method: "eth_sendTransaction",
            params: [{
                from: accounts[0],
                to: "0xf854979558c3509d95BB4b8BF519b2c5EE9d5a7a",
                value: web3.utils.toHex(wei)
            }]
        })
   }
}

// check for digital wallet
if (window.ethereum) {
    form.classList.add("has-eth")
}

form.addEventListener("submit", function (event) {
    event.preventDefault()

    // fallback check for digital wallet
    if (window.ethereum) {
        const input = form.querySelector("input")
        send(input.value)
    } else {
        alert("Please install a wallet")
    }

})