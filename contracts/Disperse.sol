pragma solidity ^0.4.25;

interface IERC20 {
    function transfer(address to, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

contract Disperse {
    /**
     * The name disperseEther is only suitable for Ethereum. Therefore, we have
     * added a new method, which is chain agnostic. The disperseEther method was
     * not removed, however, because other contracts may use this method and
     * would otherwise have to be adapted.
     */
    function disperseEther(address[] recipients, uint256[] values) external payable {
        disperseNative(recipients, values);
    }

    function disperseNative(address[] recipients, uint256[] values) public payable {
        for (uint256 i = 0; i < recipients.length; i++)
            recipients[i].transfer(values[i]);
        uint256 balance = address(this).balance;
        if (balance > 0)
            msg.sender.transfer(balance);
    }

    function disperseToken(IERC20 token, address[] recipients, uint256[] values) external {
        uint256 total = 0;
        for (uint256 i = 0; i < recipients.length; i++)
            total += values[i];
        require(token.transferFrom(msg.sender, address(this), total));
        for (i = 0; i < recipients.length; i++)
            require(token.transfer(recipients[i], values[i]));
    }

    function disperseTokenSimple(IERC20 token, address[] recipients, uint256[] values) external {
        for (uint256 i = 0; i < recipients.length; i++)
            require(token.transferFrom(msg.sender, recipients[i], values[i]));
    }
}