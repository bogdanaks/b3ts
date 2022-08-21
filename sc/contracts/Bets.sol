// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
// Import this file to use console.log
import "hardhat/console.sol";

contract Bets is Ownable {
    using SafeMath for uint256;
    enum MatchStatus {
        CREATED,
        RUNNING,
        FINISHED,
        CANCELED
    }

    struct Bet {
        uint256 id;
        address user;
        string market;
        uint256 amount;
        uint256 createdAt;
    }

    struct Match {
        uint256 id;
        MatchStatus status;
        string[] wonMarkets;
        string[][] markets;
        Bet[] bets;
        uint256 createdAt;
    }

    event AddBet(
        uint256 betId,
        uint256 matchId,
        uint256 amount,
        string market,
        address user
    );
    event CreateMatch(uint256 id, string[][] marketsList);
    event UpdateMatch(uint256 id, MatchStatus status, string[] wonMarkets);

    uint32 constant MULTFACTOR = 1000000;
    uint256 internal betId = 1;
    uint256 public matchesLength = 0;
    uint256 private feePercent;
    address internal piggyBank;
    mapping(uint256 => Match) public matches;
    mapping(address => uint256[]) public matchesIds;
    bool public isPaused = false;

    constructor(uint256 _feePercent, address _piggyBank) {
        feePercent = _feePercent;
        piggyBank = _piggyBank;
    }

    modifier onlyIfRunning() {
        require(!isPaused);
        _;
    }

    function changeStateContract(bool state) public onlyOwner {
        isPaused = state;
    }

    // Match
    function createMatch(uint256 id, string[][] memory marketsList)
        public
        onlyIfRunning
        onlyOwner
    {
        Match storage newMatch = matches[id];
        newMatch.id = id;
        newMatch.status = MatchStatus.CREATED;
        newMatch.markets = marketsList;
        newMatch.createdAt = block.timestamp;
        matchesLength++;
        emit CreateMatch(id, marketsList);
    }

    function getMatches(uint256[] memory ids)
        public
        view
        returns (Match[] memory findMatches)
    {
        Match[] memory _matchesList = new Match[](ids.length);
        for (uint256 i = 0; i < ids.length; i++) {
            Match memory _findMatch = matches[ids[i]];
            _matchesList[i] = _findMatch;
        }
        return _matchesList;
    }

    function getMyMatches() public view returns (Match[] memory findMatches) {
        // add limit, offset
        Match[] memory _matchesList = new Match[](
            matchesIds[msg.sender].length
        );
        for (uint256 i = 0; i < matchesIds[msg.sender].length; i++) {
            Match memory _findMatch = matches[matchesIds[msg.sender][i]];
            _matchesList[i] = _findMatch;
        }
        return _matchesList;
    }

    function updateMatch(
        uint256 id,
        MatchStatus status,
        string[] memory wonMarkets
    ) public onlyIfRunning onlyOwner {
        matches[id].status = status;
        matches[id].wonMarkets = wonMarkets;
        emit UpdateMatch(id, status, wonMarkets);
    }

    // Bets
    function addBet(uint256 matchId, string memory market)
        public
        payable
        onlyIfRunning
    {
        Bet memory newBet = Bet(
            betId,
            msg.sender,
            market,
            msg.value,
            block.timestamp
        );
        matches[matchId].bets.push(newBet);
        matchesIds[msg.sender].push(matchId);
        emit AddBet(betId, matchId, msg.value, market, msg.sender);
        betId++;
    }

    function getBetsByMatchId(uint256 matchId)
        public
        view
        returns (Bet[] memory findBets)
    {
        return matches[matchId].bets;
    }

    // Withdraw
    function withdrawByMatchId(uint256 matchId) public onlyIfRunning {
        Match memory findMatch = matches[matchId];
        require(
            findMatch.status == MatchStatus.FINISHED ||
                findMatch.status == MatchStatus.CANCELED,
            "Match status not completed"
        );

        Bet[] memory findAllBets = getBetsByMatchId(matchId);
        require(findAllBets.length > 0, "Bets not found");

        uint256 myTotalAmount;
        uint256 totalAmountMyMarket;
        uint256 totalAmountAnotherMarket;
        (
            myTotalAmount,
            totalAmountMyMarket,
            totalAmountAnotherMarket
        ) = getMatchAmount(findMatch.wonMarkets, findAllBets);

        if (findMatch.status == MatchStatus.CANCELED) {
            payable(msg.sender).transfer(myTotalAmount);
        }
        if (findMatch.status == MatchStatus.FINISHED) {
            uint256 calculateWin = calculateWinAmount(
                myTotalAmount,
                totalAmountMyMarket,
                totalAmountAnotherMarket
            );
            uint256 percentAmount = (calculateWin.div(100).mul(feePercent)).div(
                100
            );
            payable(piggyBank).transfer(percentAmount);
            uint256 calculateWithPercent = calculateWin.sub(percentAmount);
            payable(msg.sender).transfer(calculateWithPercent);
        }
    }

    function calculateWinAmount(
        uint256 myTotalAmount,
        uint256 totalAmountMyMarket,
        uint256 totalAmountAnotherMarket
    ) internal pure returns (uint256) {
        uint256 proportion = (myTotalAmount.mul(MULTFACTOR)).div(
            totalAmountMyMarket
        );
        uint256 wonAmount = proportion.mul(totalAmountAnotherMarket).div(
            MULTFACTOR
        );
        return wonAmount.add(myTotalAmount);
    }

    function getMatchAmount(
        string[] memory wonMarkets,
        Bet[] memory findAllBets
    )
        internal
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        uint256 totalAmountMyMarket = 0;
        uint256 totalAmountAnotherMarket = 0;
        uint256 myTotalAmount = 0;
        for (uint256 i = 0; i < findAllBets.length; i++) {
            for (uint256 k = 0; k < wonMarkets.length; k++) {
                if (
                    keccak256(abi.encodePacked(wonMarkets[k])) ==
                    keccak256(abi.encodePacked(findAllBets[i].market))
                ) {
                    totalAmountMyMarket += findAllBets[i].amount;

                    if (address(findAllBets[i].user) == msg.sender) {
                        myTotalAmount += findAllBets[i].amount;
                    }
                } else {
                    totalAmountAnotherMarket += findAllBets[i].amount;
                }
            }
        }

        return (myTotalAmount, totalAmountMyMarket, totalAmountAnotherMarket);
    }
}