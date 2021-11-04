// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol";

contract GameItems is ERC1155PresetMinterPauser {
    uint256 public constant GOLD = 0;
    uint256 public constant SILVER = 1;
    uint256 public constant THORS_HAMMER = 2;
    uint256 public constant SWORD = 3;
    uint256 public constant SHIELD = 4;

    address public owner;

    constructor()
        ERC1155PresetMinterPauser(
            "https://abcoathup.github.io/SampleERC1155/api/token/{id}.json"
        )
    {
        owner = msg.sender;
        _mint(owner, GOLD, 10**18, "");
        _mint(owner, SILVER, 10**27, "");
        _mint(owner, THORS_HAMMER, 1, "");
        _mint(owner, SWORD, 10**9, "");
        _mint(owner, SHIELD, 10**9, "");
    }

    function faucet(uint256 id, uint256 amount) public {
        require(0 <= id && id <= 4, "invalid id");
        _safeTransferFrom(owner, msg.sender, id, amount, "");
    }
}
