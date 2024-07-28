import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn chặn tải lại trang khi gửi form

    const body = {
      email: email,
      password: password
    };

    const options = {
      method: 'POST', // Sử dụng phương thức POST
      headers: {
        'Content-Type': 'application/json' // Định dạng dữ liệu gửi lên là JSON
      },
      body: JSON.stringify(body) // Chuyển đổi dữ liệu thành chuỗi JSON
    };

    try {
      const result = await fetch('http://localhost:3001/users/login', options);
      const response = await result.json();

      if (response.status === true && response.data && typeof response.data.role !== 'undefined' && response.data.role === 2) {
        localStorage.setItem('token', response.token);
        console.log(response.token);
        navigate('/home');
      } else {
        alert('Đăng nhập thất bại');
      }
    } catch (err) {
      console.log(err);
      alert('Đăng nhập thất bại')
    }
  }


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title text-center">Login</h4>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input type="text" className="form-control" id="username" name="username" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-block" onClick={handleLogin}>Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Login