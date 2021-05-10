const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash;
    }

    calculateHash(){
        //run the constructor to calculate the hash
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];

    }

    createGenesisBlock(){
        return new Block(0, '01/21/2021', 'Genesis Block', '0');
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1]
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash =  newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }

}

let saloCoin = new Blockchain();
saloCoin.addBlock(new Block(1, '10/31/2021', {amount: 124}));
saloCoin.addBlock(new Block(2, '11/21/2021', {amount: 211}));
saloCoin.addBlock(new Block(3, '12/14/2021', {amount: 340}));



//Test Console.log
console.log(`Is Blockchain Valid? ${saloCoin.isChainValid()}`)
console.log(JSON.stringify(saloCoin, null, 4))

//Seperate Test Case, when tampering with blockchain the chain becomes invalid
// saloCoin.chain[1].data = {amount: 100}
// console.log(`Is Blockchain Valid? ${saloCoin.isChainValid()}`)

