import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'

const TotalUser = () => {
    const [searchTerm, setSearchTerm] = useState("");  
    const [selectedFilter, setSelectedFilter] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    const navigate = useNavigate();

    const usersData = [

        { srNo: 1, name: "Aarav", orderNo: "---", logid: "SS507RAJARANI", amount: "10",timestamp: "2024-03-10 11:15 AM" },
        { srNo: 2, name: "Tanishka", orderNo: "---", logid: "SR507RAJARANI", amount: "15",timestamp: "2024-03-10 11:15 AM" },
        { srNo: 3, name: "Nikhil", orderNo: "RETAILORDER-838504", logid: "SA507RAJARANI", amount: "12",timestamp: "2024-03-10 11:15 AM"},
        { srNo: 4, name: "Swati", orderNo: "RETAILORDER-852741", logid: "SQ507RAJARANI", amount: "20", timestamp: "2024-03-10 11:15 AM" },
        { srNo: 5, name: "Aditya", orderNo: "RETAILORDER-789652", logid: "SZ507RAJARANI", amount: "25",timestamp: "2024-03-10 11:15 AM" },
        { srNo: 6, name: "Kavya", orderNo: "RETAILORDER-963252", logid: "SL507RAJARANI", amount: "10",timestamp: "2024-03-10 11:15 AM"},
        
    ];

    // Filter and sort users
    const filteredUsers = usersData
        .filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            user.logid.toLowerCase().includes(searchTerm.toLowerCase()) 
        )
        .filter(user =>
            (selectedMonth ? user.month === selectedMonth : true) 
        )
        .sort((a, b) => {
            if (selectedFilter === "A to Z") return a.name.localeCompare(b.name);
            if (selectedFilter === "High to Low") return parseFloat(b.amount) - parseFloat(a.amount);
            if (selectedFilter === "Low to High") return parseFloat(a.amount) - parseFloat(b.amount);
            return a.srNo - b.srNo;
        });

    // Pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const handleView = (user) => {
        navigate('/UserDetails', { state: { user } });
    };

    return (
        <div className="container table-container mt-4 mb-5">
            <div className="donation-search">
                <div className="row mt-3">
                    <div className="col-9">
                        <h3 className="mb-2">All Users List</h3>
                        <p className="mb-3">List of all Paid and Unpaid Users List</p>
                    </div>
                    <div className="col-3">
                        <input type="text" placeholder="Search by Name or Logid" className="form-control mb-3" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

                    </div>
                </div>

            </div>

            <div className="table-responsive">
                <table className="table table-striped text-center">
                    <thead>
                        <tr>
                            <th scope="col">Sr No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Parent Id</th>
                            <th scope="col">Log Id</th>
                            <th scope="col">Lavel</th>
                            <th scope="col">Join Date</th>
                            <th scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.length > 0 ? (
                            currentUsers.map((user, index) => (
                                <tr key={index}>
                                    <th scope="row">{user.srNo}</th>
                                    <td>{user.name}</td>
                                    <td>{user.orderNo}</td>
                                    <td>{user.logid}</td>
                                    <td>{user.amount}</td>
                                    <td>{user.timestamp}</td>
                                    <td>
                                        <button className="details" onClick={() => handleView(user)}>View</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-center align-items-center">
                <button className="btn btn-secondary me-2" onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1} style={{ background: "#22B6AF", border: "none" }}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button className="btn btn-secondary ms-2" onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages} style={{ background: "#22B6AF", border: "none" }} >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TotalUser;
