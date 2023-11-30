// SPDX-License-Identifier: MIT
pragma solidity 0.8.22;

contract TollPlaza {

    struct vehicle {

        string vehicle_number;
        string vehicle_type;
        string vehicle_model;

    }

    struct Toll{

        string toll_plaza_id;
        string toll_plaza_name;
        uint256 time; //time enter

    }

    uint public car_tollprice = 500000000000000;
    uint public van_tollprice = 1000000000000000;
    uint public bus_tollprice = 1500000000000000;

    address payable public owner;
    mapping (address => vehicle [] ) vehicles;
    mapping (address => uint) account_balance;
    address[] public vehicle_Accts;
    Toll[] public Toll_list;
    // mapping(uint256 => Toll) public Toll_list;
    mapping (string => Toll []) vehicle_history;



    modifier onlyOwner {
        require(msg.sender == owner, "Only owner is allowed");
        _;
    }

    constructor() {
        owner=payable(msg.sender);
    }


    function Init_Toll(string memory _name,string memory _id) onlyOwner public {

        Toll memory toll_obj = Toll(_id,_name,block.timestamp);
        Toll_list.push(toll_obj);

    }


    // event TollInitialized(string indexed id, string name, uint256 time);

    // function Init_Toll(string memory _name, string memory _id) onlyOwner public {

    //     Toll memory toll_obj = Toll(_id, _name, block.timestamp);
    //     Toll_list.push(toll_obj);
    //     emit TollInitialized(_id, _name, block.timestamp);

    // }

    function Register_Vehicle(string memory _vehnum,string memory _vehtype,string memory _vehmodel) public {

        vehicles[msg.sender].push(vehicle(_vehnum, _vehtype,_vehmodel));
        vehicle_Accts.push(msg.sender);

    }

    function Charge_balance() payable public {

        uint8 vehicleExists = 0;

        for (uint i=0; i<vehicle_Accts.length; i++) {
            if (msg.sender == vehicle_Accts[i]) {

                account_balance[vehicle_Accts[i]] += msg.value;
                vehicleExists = 1;
                break;

            }
        }

        if (vehicleExists == 0) {
            revert("vehicle account does not exist for this sender.");
        }

    }

    function getVehicles(address _address)  internal view returns ( vehicle[] memory) {
        
        return vehicles[_address];

    }


        
    function Check_ownership(string memory _vehnum,string memory _vehtype,string memory _vehmodel) public view returns(bool){
        vehicle[] memory obj=getVehicles(msg.sender);

        if (obj.length != 0) {
            for (uint i=0; i<obj.length; i++) {
                if( 
                    ( keccak256(bytes(obj[i].vehicle_number)) == keccak256(bytes(_vehnum)) ) && 
                    ( keccak256(bytes(obj[i].vehicle_type)) == keccak256(bytes(_vehtype)) ) && 
                    ( keccak256(bytes(obj[i].vehicle_model)) == keccak256(bytes(_vehmodel)) ) 
                ) { return true; }
            }
        }

        return false;

    }

    event TollTaxPaid(address indexed payerAddr, string indexed _id, string indexed _tollname, string _vehnum, string _type, string _vehmodel);


    function Pay_Tolltax (address payerAddr, string memory _id, string memory _tollname, string memory _vehnum, string memory _type, string memory _vehmodel) public returns(bool){

        // bool _check=false;

        if (Check_ownership(_vehnum,_type,_vehmodel) || (msg.sender == owner)){

            if ( keccak256(bytes(_type)) == keccak256(bytes("car")) && account_balance[payerAddr] >= car_tollprice){
                
                account_balance[payerAddr] -= car_tollprice;
                // _check=true;

            }
            else if ( keccak256(bytes(_type)) == keccak256(bytes("van")) && account_balance[payerAddr] >= van_tollprice){
                
                account_balance[payerAddr] -= van_tollprice;
                // _check=true;

            }
            else if ( keccak256(bytes(_type)) == keccak256(bytes("bus")) && account_balance[payerAddr] >= bus_tollprice){
                
                account_balance[payerAddr] -= bus_tollprice;
                // _check=true;  

            }
            else {
                
                return false;
                // _check=false;

            }

            // if (_check == true) {
                vehicle_history[_vehnum].push(Toll(_id,_tollname,block.timestamp));
                
                emit TollTaxPaid(payerAddr, _id, _tollname, _vehnum, _type, _vehmodel);
                return true;
            // }

        }

        // return _check;
        return false;

    }

    function get_History(string memory _num) public view returns(Toll[] memory) {

        return vehicle_history[_num];

    }

    function get_paidhistory(string memory _num,string memory _type) public view returns(uint){

        uint amount=0;
        Toll[] memory obj=get_History(_num);
        if( keccak256(bytes(_type)) == keccak256(bytes("car")) ) {

            amount = obj.length*car_tollprice;

        }
        else if( keccak256(bytes(_type)) == keccak256(bytes("van")) ){

            amount = obj.length*van_tollprice;

        }
        else if( keccak256(bytes(_type)) == keccak256(bytes("bus")) ){

            amount = obj.length*bus_tollprice;

        }
            
        return amount;       

    }

    function withdraw_amount() public onlyOwner {

        payable(msg.sender).transfer(address(this).balance);

    }


    function check_balance() public view returns(uint){

        return account_balance[msg.sender];    

    }

    function get_owner() public view returns(address){

        return owner;

    }

}

