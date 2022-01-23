// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

 struct Issue{
     bool open;
     mapping(address => bool) voted;
     mapping(address => uint) ballots;
     uint[] scores;

 }

contract Votes {

    address _admin;
    mapping(uint => Issue) _issues;
    uint _issuesId;
    uint _min;
    uint _max;


        event StatusChange(uint indexed issuesid, bool open);
        event Vote(uint indexed issuesid, address voter, uint indexed option);


    constructor() {
        _admin = msg.sender;
        _min = 1;
        _max = 3;

       
    }

    modifier onlyAdmin {
        require(msg.sender == _admin, "unauth");
        _;
    }

    function open() public onlyAdmin {
        require(!_issues[_issuesId].open,"vote opening");

        _issuesId++ ;
        _issues[_issuesId].open = true;
        _issues[_issuesId].scores = new uint[](_max+1);
        emit StatusChange(_issuesId,true);
    }

    function close() public onlyAdmin {
        require(_issues[_issuesId].open, "vote close");

        _issues[_issuesId].open = false;
        emit StatusChange(_issuesId,false);
    }

    function vote(uint option) public {
        require(_issues[_issuesId].open, "vote closed");
        require(!_issues[_issuesId].voted[msg.sender], "you're voted");
        require(option >= _min && option <=_max, "incorrect option");

        _issues[_issuesId].scores[option]++;
        _issues[_issuesId].voted[msg.sender] = true;
        _issues[_issuesId].ballots[msg.sender] = option;
        emit Vote(_issuesId, msg.sender, option);
        
    }

    function status() public view returns(bool open_) {
        return _issues[_issuesId].open;
    }

    function ballot() public view returns(uint option) {
        require(_issues[_issuesId].voted[msg.sender], "you're not vote");
        return _issues[_issuesId].ballots[msg.sender];

    }

    function scores() public view returns(uint[] memory){
        return _issues[_issuesId].scores;
    }
}