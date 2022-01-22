pragma solidity ^0.8.2;

library WordGenerator {
    function random() private view returns (uint) {
        // convert hash to integer
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, "random")));
    }
    function randomWord() public view returns (bytes memory) {
        bytes[10] memory word_list = [bytes("ethereum"), bytes("solidity"), bytes("block"), bytes("gold"), bytes("blockchain"), bytes("hash"), bytes("cryptographic"), bytes("gas"), bytes("token"), bytes("cryptocurrency")];
        
        uint random_idx = random() % word_list.length;

        return word_list[random_idx];
    }    
}
