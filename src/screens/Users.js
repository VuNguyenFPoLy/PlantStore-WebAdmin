import React, { useEffect, useState } from 'react'


const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const result = await fetch('http://localhost:3001/users');
                const data = await result.json();
                console.log(data.data)
                if (data.status == true) setUsers(data.data);
                return null;
            } catch (error) {
                console.log('Get users error: ', error.message);
            }
        }
        getUsers();
    }, []);


    return (
        <div className="container-fluid">
            <div className="row">


                {/* <!-- Nav bar --> */}
                <nav className="navbar navbar-expand-md navbar-dark bg-success mb-4 ">
                    <div className="container-fluid">
                        <span className="navbar-brand" href="/">
                            Users Manager
                        </span>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarCollapse"
                            aria-controls="navbarCollapse"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse " id="navbarCollapse">
                            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                <li className="nav-item">
                                    <a className="nav-link " aria-current="page" href="/home">
                                        Thống kê
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/products">
                                        Quản lý sản phẩm
                                    </a>
                                </li>
                                <li className="nav-item ">
                                    <a className="nav-link active" href="/users">
                                        Quản lý người dùng
                                    </a>
                                </li>
                                <li className="nav-item ">
                                    <a className="nav-link" href="/login">
                                        Đăng xuất
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>



                <div>
                    {/* <!-- Table for displaying products --> */}
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Avatar</th>
                                <th scope="col">Name</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Address</th>
                                <th scope="col">Create</th>
                                <th scope="col">Update</th>
                                <th scope="col">Role</th>
                                <th scope="col">Available</th>
                            </tr>
                        </thead>

                        <tbody>
                            {/* <!-- data --> */}
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td><img src={user.avatar} alt="avatar" width="50" height="50" /></td>
                                    <td>{user.name}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address}</td>
                                    <td>{user.createAt}</td>
                                    <td>{user.updateAt}</td>
                                    <td>{user.role}</td>
                                    <td>{user.available ? 'true' : 'false'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


            </div>
        </div>

    )
}

export default Users