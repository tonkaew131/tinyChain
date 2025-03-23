// SPDX-License-Identifier: UNLICENSE
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import {ERC1155} from '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import {ERC1155Supply} from '@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol';
import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';

contract AkaraCarbon is ERC1155, Ownable, ERC1155Supply {
    constructor(
        address initialOwner
    )
        ERC1155('https://akaracarbon.athichal.com/api/token/{id}.json')
        Ownable(initialOwner)
    {}

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        _mint(account, id, amount, data);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }

    // The following functions are overrides required by Solidity.

    function _update(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values
    ) internal override(ERC1155, ERC1155Supply) {
        super._update(from, to, ids, values);
    }
}
