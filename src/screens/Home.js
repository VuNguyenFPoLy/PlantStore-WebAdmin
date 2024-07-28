import React, { useState, useEffect } from 'react'
import ChartComponent from './ChartComponent'
import moment from 'moment';

const Home = () => {

  const [stransactionHistory, setStransactionHistory] = useState([]);
  const [sumWeek, setSumWeek] = useState([]);
  const [sumMonth, setSumMonth] = useState([]);
  const [dayOfWeek, setDayOfWeek] = useState([]);
  const [month, setMonth] = useState([]);

  const date = new Date();
  const curDate = date.getDate();
  const curMonth = date.getMonth() + 1;

  useEffect(() => {
    const getTransaction = async () => {
      try {
        const result = await fetch('http://localhost:3001/transactions');
        const response = await result.json();
        if (response.status == true) {
          const data = response.data;
          setStransactionHistory(data);

          // Tính toán dữ liệu thống kê
          calculateWeeklyStats(data);
          calculateMonthlyStats(data);
        }
        return null;
      } catch (error) {
        console.log('Get transaction error: ', error.message);
      }
    };
    getTransaction();
  }, []);

  const calculateWeeklyStats = (data) => {
    const weeklyData = [];
    const weekDays = [];

    data.forEach((item) => {
      const createdAt = moment(item.createdAt);
      const dayOfWeek = createdAt.day(); // 0 (Sunday) to 6 (Saturday)
      const weekNumber = createdAt.week();
      let weekIndex = weekDays.findIndex((day) => day === dayOfWeek);

      if (weekIndex === -1) {
        weekDays.push(dayOfWeek);
        weekIndex = weekDays.length - 1;
        weeklyData[weekIndex] = { dayOfWeek, sum: 0 };
      }

      weeklyData[weekIndex].sum += item.sumPrice * 1000;
    });

    setSumWeek(weeklyData);
    setDayOfWeek(weekDays);
  };

  const calculateMonthlyStats = (data) => {
    const monthlyData = new Array(12).fill(0);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    data.forEach((item) => {
      const createdAt = moment(item.createdAt);
      const monthIndex = createdAt.month();
      monthlyData[monthIndex] += item.sumPrice * 1000;
    });

    setSumMonth(monthlyData);
    setMonth(months);
  };

  return (
    <div className="container-fluid">
      <div className="row">

        {/* <!-- Nav bar --> */}
        <nav className="navbar navbar-expand-md navbar-dark bg-success mb-4 ">
          <div className="container-fluid">
            <span className="navbar-brand" href="/">
              Dashboard
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
                  <a className="nav-link active" aria-current="page" href="/home">
                    Thống kê
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/products">
                    Quản lý sản phẩm
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/users">
                    Quản lý người dùng
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Đăng xuất
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>



        {/* <!-- Statistics --> */}
        <div className="row mb-4">

          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Tuần 1</h5>
                <ChartComponent sumWeek={sumWeek} sumMonth={sumMonth} dayOfWeek={dayOfWeek} month={month} />
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Tuần 2</h5>
                <ChartComponent sumWeek={sumWeek} sumMonth={sumMonth} dayOfWeek={dayOfWeek} month={month} />
              </div>
            </div>
          </div>
        </div>



        <div className="row mb-4">

          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Tuần 3</h5>
                <ChartComponent sumWeek={sumWeek} sumMonth={sumMonth} dayOfWeek={dayOfWeek} month={month} />
              </div>
            </div>
          </div>

          <div className="col-md-6" >
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Tuần 4</h5>
                <ChartComponent sumWeek={sumWeek} sumMonth={sumMonth} dayOfWeek={dayOfWeek} month={month} />
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Tháng {curMonth}</h5>
                <ChartComponent sumMonth={sumMonth} month={month} />
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Home