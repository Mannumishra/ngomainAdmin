import React, { useState } from 'react';

const TotalDoner = () => {
    const [searchTerm, setSearchTerm] = useState(""); // Combined search term
    const [donorFilter, setDonorFilter] = useState("");
    const [donorMonthFilter, setDonorMonthFilter] = useState("");
    const [donorCurrentPage, setDonorCurrentPage] = useState(1);

    // States for New Signups
    const [signupSearchTerm, setSignupSearchTerm] = useState("");
    const [signupFilter, setSignupFilter] = useState("");
    const [signupCurrentPage, setSignupCurrentPage] = useState(1);

    const usersPerPage = 15;

    // Latest Donors Data
    const usersData = [
        
        { srNo: 1, name: "Aarav", parentId: "---", logid: "SS507RAJARANI", amount: "1000.00", month: "January", timestamp: "2024-01-15 10:30 AM" },
        { srNo: 2, name: "Tanishka", parentId: "---", logid: "SR507RAJARANI", amount: "15000.00", month: "September", timestamp: "2024-02-20 02:45 PM" },
        { srNo: 3, name: "Nikhil", parentId: "RETAILORDER-838504", logid: "SA507RAJARANI", amount: "1200.00", month: "November", timestamp: "2024-03-10 11:15 AM" },
    ];

    // New Signups Data
    const newSignupsData = [
        { srNo: 1, name: "Aarav", parentId: "---", logid: "SS507RAJARANI", amount: "1000.00", month: "January", timestamp: "2024-01-15 10:30 AM" },
        { srNo: 2, name: "Tanishka", parentId: "---", logid: "SR507RAJARANI", amount: "15000.00", month: "September", timestamp: "2024-02-20 02:45 PM" },
        { srNo: 3, name: "Nikhil", parentId: "RETAILORDER-838504", logid: "SA507RAJARANI", amount: "1200.00", month: "November", timestamp: "2024-03-10 11:15 AM" },

    ];

// Filter and sort for Latest Donors
const filterAndSortDonors = (data) => {
    return data
        .filter(item =>
            // Check if name and logid are defined before calling toLowerCase
            ((item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
            (item.logid && item.logid.toLowerCase().includes(searchTerm.toLowerCase()))) &&
            // Filter by month
            (donorMonthFilter ? item.month.toLowerCase().includes(donorMonthFilter.toLowerCase()) : true)
        )
        .sort((a, b) => {
            if (donorFilter === "A to Z") return a.name.localeCompare(b.name);
            if (donorFilter === "High to Low") return parseFloat(b.amount) - parseFloat(a.amount);
            if (donorFilter === "Low to High") return parseFloat(a.amount) - parseFloat(b.amount);
            return 0;
        });
};



  // Filter and sort for New Signups
const filterAndSortSignups = (data) => {
    return data
        .filter(item =>
            // Check if name and logid are defined before calling toLowerCase
            (item.name && item.name.toLowerCase().includes(signupSearchTerm.toLowerCase())) ||
            (item.logid && item.logid.toLowerCase().includes(signupSearchTerm.toLowerCase()))
        )
        .sort((a, b) => signupFilter === "A to Z" ? a.name.localeCompare(b.name) : 0);
};

    // Pagination for both tables
    const getPaginatedData = (data, currentPage) => {
        const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;
        const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);
        const totalPages = Math.ceil(data.length / usersPerPage);
        return { currentUsers, totalPages };
    };

    const { currentUsers: latestDonors, totalPages: latestDonorsTotalPages } = getPaginatedData(filterAndSortDonors(usersData), donorCurrentPage);
    const { currentUsers: newSignups, totalPages: newSignupsTotalPages } = getPaginatedData(filterAndSortSignups(newSignupsData), signupCurrentPage);

    return (
        <>
            {/* Latest Donors Table */}
            <div className="container table-container mt-4 mb-5">
            <div className="row mt-3">
            <div className="col-9">
                <h3 className="mb-2">Latest Donations</h3>
                <p className="mb-3">List of all Latest Donations</p>
                </div>

                
                    {/* <div className="col-3 mb-3">
                        <input type="text" placeholder="Search by Name or Log ID" className="form-control mb-3" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <select onChange={(e) => setDonorFilter(e.target.value)}
                            className="form-control mb-3" >
                            <option value="">Sort Option</option>
                            <option value="A to Z">A to Z</option>
                            <option value="High to Low">Amount (High to Low)</option>
                            <option value="Low to High">Amount (Low to High)</option>
                        </select>
                        
                        <select className="form-select" onChange={(e) => setDonorMonthFilter(e.target.value)} value={donorMonthFilter}>
                            <option value="">All Months</option>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                        </select>
                    </div> */}


                </div>
                <div className="table-responsive">
                    <table className="table table-striped text-center">
                        <thead>
                            <tr>
                                <th>Sr No</th>
                                <th>Name</th>
                                <th>Parent ID</th>
                                <th>Log ID</th>
                                <th>Amount</th>
                                <th>Date / Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {latestDonors.length > 0 ? (
                                latestDonors.map((user, index) => (
                                    <tr key={index}>
                                        <th scope="row">{user.srNo}</th>
                                        <td>{user.name}</td>
                                        <td>{user.parentId}</td>
                                        <td>{user.logid}</td>
                                        <td>{user.amount}</td>
                                        <td>{user.timestamp}</td>
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
                <div className="d-flex justify-content-center align-items-center">
                    <button className="btn btn-next me-2" onClick={() => setDonorCurrentPage(prev => Math.max(prev - 1, 1))} disabled={donorCurrentPage === 1}>
                        Previous
                    </button>
                    <span>Page {donorCurrentPage} of {latestDonorsTotalPages}</span>
                    <button className="btn btn-next ms-2" onClick={() => setDonorCurrentPage(prev => Math.min(prev + 1, latestDonorsTotalPages))} disabled={donorCurrentPage === latestDonorsTotalPages}>
                        Next
                    </button>
                </div>
            </div>

            {/* New Signups Table */}
            <div className="container table-container mb-5">
            <div className="row mt-3">
            <div className="col-9">
                <h3 className="mb-2">New Signups</h3>
                <p className="mb-3">List of all New Signups</p>
                </div>
                    {/* <div className="col-3 mb-3">
                        <input type="text" placeholder="Search by Name or Log ID" className="form-control" value={signupSearchTerm} onChange={(e) => setSignupSearchTerm(e.target.value)} />
                    </div> */}
                </div>
                <div className="table-responsive">
                    <table className="table table-striped text-center">
                        <thead>
                            <tr>
                                <th>Sr No</th>
                                <th>Name</th>
                                <th>Parent ID</th>
                                <th>Logid</th>
                                <th>Date / Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {newSignups.length > 0 ? (
                                newSignups.map((signup, index) => (
                                    <tr key={index}>
                                        <th scope="row">{signup.srNo}</th>
                                        <td>{signup.name}</td>
                                        <td>{signup.parentId}</td>
                                        <td>{signup.logid}</td>
                                        <td>{signup.timestamp}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No signups found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <button className="btn btn-next me-2" onClick={() => setSignupCurrentPage(prev => Math.max(prev - 1, 1))} disabled={signupCurrentPage === 1}>
                        Previous
                    </button>
                    <span>Page {signupCurrentPage} of {newSignupsTotalPages}</span>
                    <button className="btn btn-next ms-2" onClick={() => setSignupCurrentPage(prev => Math.min(prev + 1, newSignupsTotalPages))} disabled={signupCurrentPage === newSignupsTotalPages}>
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default TotalDoner;
