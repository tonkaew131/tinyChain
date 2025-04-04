// SPDX-License-Identifier: UNLICENSE
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import {ERC1155} from '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import {ERC1155Supply} from '@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol';
import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';

contract AkaraCarbon is ERC1155, Ownable, ERC1155Supply {
    uint256 private currentTokenId = 0;
    address public ownerAddress;
    constructor(
        address initialOwner
    )
        ERC1155('https://akaracarbon.athichal.com/api/token/{id}.json')
        Ownable(initialOwner)
    {
        ownerAddress = initialOwner;
    }

    struct Token {
        uint256 expiry;
    }
    mapping(uint256 => Token) public tokens;

    event TokenMinted(uint256 tokenId);

    function mint(
        uint256 amount,
        bytes memory data,
        uint256 expiryTimestamp
    ) public onlyOwner returns (uint256) {
        require(expiryTimestamp > block.timestamp, 'AkaraCarbon: EXPIRY_PAST');

        uint256 tokenId = currentTokenId++;

        tokens[tokenId] = Token(expiryTimestamp);
        _mint(ownerAddress, tokenId, amount, data);

        emit TokenMinted(tokenId);
        return tokenId;
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }

    function isExpired(uint256 tokenId) public view returns (bool) {
        return tokens[tokenId].expiry < block.timestamp;
    }

    function destoryExpired(
        uint256[] memory tokenIds,
        address[] memory tokenOwners
    ) public onlyOwner {
        require(
            tokenIds.length == tokenOwners.length,
            'AkaraCarbon: LENGTH_MISMATCH'
        );
        for (uint256 i = 0; i < tokenIds.length; i++) {
            require(isExpired(tokenIds[i]), 'AkaraCarbon: NOT_EXPIRED');

            _burn(tokenOwners[i], tokenIds[i], 1);
            delete tokens[tokenIds[i]];
        }
    }

    function _update(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values
    ) internal override(ERC1155, ERC1155Supply) {
        super._update(from, to, ids, values);
    }
}
