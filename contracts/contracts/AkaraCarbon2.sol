// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AkaraCarbon2 is ERC1155, ERC1155Supply, Ownable {
    struct Listing {
        address seller;
        uint256 amount;
        uint256 pricePerUnit;
        bool active;
    }

    // Platform fee settings
    uint256 public platformFeePercentage = 200; // 2% (basis points)
    address public feeRecipient;

    // Mapping from token ID to seller address to listing details
    mapping(uint256 => mapping(address => Listing)) public listings;

    // Events
    event TokenMinted(uint256 indexed tokenId, uint256 amount, address indexed developer);
    event TokenListed(uint256 indexed tokenId, uint256 amount, uint256 pricePerUnit, address indexed seller);
    event TokenSold(uint256 indexed tokenId, uint256 amount, address indexed seller, address indexed buyer, uint256 feeAmount);
    event ListingCancelled(uint256 indexed tokenId, uint256 amount, address indexed seller);
    event FeeUpdated(uint256 newFeePercentage, address newFeeRecipient);

    constructor(address initialFeeRecipient) ERC1155("https://akaracarbon.athichal.com/api/token/{id}.json") Ownable(msg.sender) {
        feeRecipient = initialFeeRecipient;
    }

    // Override required by Solidity for multiple inheritance
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    // Override _update from ERC1155Supply
    function _update(address from, address to, uint256[] memory ids, uint256[] memory values) internal virtual override(ERC1155, ERC1155Supply) {
        super._update(from, to, ids, values);
    }

    // Mint new tokens (only owner)
    function mint(address developer, uint256 tokenId, uint256 amount) external onlyOwner {
        _mint(developer, tokenId, amount, "");
        emit TokenMinted(tokenId, amount, developer);
    }

    // List tokens for sale
    function listTokens(uint256 tokenId, uint256 amount, uint256 pricePerUnit) external {
        require(amount > 0, "Amount must be greater than 0");
        require(pricePerUnit > 0, "Price must be greater than 0");
        require(balanceOf(msg.sender, tokenId) >= amount, "Insufficient balance");
        
        // Transfer tokens to contract
        _safeTransferFrom(msg.sender, address(this), tokenId, amount, "");
        
        listings[tokenId][msg.sender] = Listing({
            seller: msg.sender,
            amount: amount,
            pricePerUnit: pricePerUnit,
            active: true
        });

        emit TokenListed(tokenId, amount, pricePerUnit, msg.sender);
    }

    // Buy listed tokens
    function buyTokens(uint256 tokenId, uint256 amount, address seller) external payable {
        Listing storage listing = listings[tokenId][seller];
        require(listing.active, "Listing not active");
        require(amount <= listing.amount, "Insufficient listed amount");
        require(msg.value >= amount * listing.pricePerUnit, "Insufficient payment");

        uint256 totalPrice = amount * listing.pricePerUnit;
        uint256 feeAmount = (totalPrice * platformFeePercentage) / 10000;
        uint256 sellerAmount = totalPrice - feeAmount;

        // Update listing
        listing.amount -= amount;
        if (listing.amount == 0) {
            listing.active = false;
        }

        // Transfer tokens to buyer
        _safeTransferFrom(address(this), msg.sender, tokenId, amount, "");

        // Transfer payments
        (bool feeSuccess, ) = feeRecipient.call{value: feeAmount}("");
        require(feeSuccess, "Fee transfer failed");
        (bool sellerSuccess, ) = seller.call{value: sellerAmount}("");
        require(sellerSuccess, "Seller transfer failed");

        emit TokenSold(tokenId, amount, seller, msg.sender, feeAmount);
    }

    // Cancel listing
    function cancelListing(uint256 tokenId) external {
        Listing storage listing = listings[tokenId][msg.sender];
        require(listing.active, "Listing not active");
        
        uint256 amount = listing.amount;
        listing.active = false;
        listing.amount = 0;

        // Return tokens to seller
        _safeTransferFrom(address(this), msg.sender, tokenId, amount, "");

        emit ListingCancelled(tokenId, amount, msg.sender);
    }

    // Update fee settings (only owner)
    function updateFeeSettings(uint256 newFeePercentage, address newFeeRecipient) external onlyOwner {
        require(newFeePercentage <= 1000, "Fee cannot exceed 10%"); // Max 10% fee
        require(newFeeRecipient != address(0), "Invalid fee recipient");
        
        platformFeePercentage = newFeePercentage;
        feeRecipient = newFeeRecipient;
        
        emit FeeUpdated(newFeePercentage, newFeeRecipient);
    }
}