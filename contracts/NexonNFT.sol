//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract NexonNFT is ERC721URIStorage, Ownable, ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    constructor () ERC721 ("NexonNFT", "NFT") { }

    function tokensOfOwner(address _owner) 
        external
        view 
        returns (uint256[] memory) 
    {
        uint256 tokenCount = balanceOf(_owner);
        if (tokenCount == 0) {
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](tokenCount);
            uint256 index;
            for (index = 0; index < tokenCount; index++) {
                result[index] = tokenOfOwnerByIndex(_owner, index);
            }
            return result;
        }
    }

    function mintNFT(address recipient, string memory _tokenURI)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        /**
        * @dev Mints `tokenId(newItenId)` and transfers it to `to(recipient)`.
        *
        * WARNING: Usage of this method is discouraged, use {_safeMint} whenever possible
        *
        * Requirements:
        *
        * - `tokenId` must not exist.
        * - `to` cannot be the zero address.
        *
        * Emits a {Transfer} event.
        */
        _mint(recipient, newItemId);
        /**
        * @dev Sets `_tokenURI` as the tokenURI of `tokenId`.
        *
        * Requirements:
        *
        * - `tokenId` must exist.
        */
        _setTokenURI(newItemId, _tokenURI);
        return newItemId;
    }

    /**
    * @dev  Hook that is called before any token transfer. This includes minting and burning.
    */
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    /** 
     * @dev Destroys tokenId. The approval is cleared when the token is burned.
     */
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
