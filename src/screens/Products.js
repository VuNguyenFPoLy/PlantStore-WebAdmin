import React, { useState, useEffect } from 'react';
import FormProduct from './FormProduct';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  // getProducts
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3001/products/page/${page}`);
        const data = await response.json();
        if (data.status == true) setProducts(data.data);
        return null;
      } catch (error) {
        console.log('Get products error: ', error.message);
      }
    }
    getProducts();
  }, [page]);

  // get cagories
  useEffect(() => {
    const getCategories = async () => {
      try {
        const result = await fetch('http://localhost:3001/categories');
        const data = await result.json();
        if (data.status == true) setCategories(data.data);
        console.log(data.data)

        return null;
      } catch (error) {
        console.log('Get categories error: ', error.message)
      }
    };
    getCategories();
  }, []);

  const filterCategory = (categoryIds, categories) => {
    if (!categoryIds || categoryIds.length === 0) return [];

    const filteredCategories = categoryIds.map((categoryId) => {
      const category = categories.find((cat) => cat._id === categoryId);
      return category ? category.name : '';
    });

    return filteredCategories.filter((_, index) => index !== 0 && index !== 2);
  };


  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const toggleAddForm = () => {
    if (showAddForm) setProductToEdit(null);
    setShowAddForm(!showAddForm);
  };

  const handleUpdateProduct = (item) => {
    setProductToEdit(item);
    toggleAddForm();
  }

  const handleDeleteConfirmation = (productId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      handleDelete(productId);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3001/products/delete/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Xóa sản phẩm khỏi danh sách sau khi xóa thành công
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
        alert('Xóa sản phẩm thành công');
      } else {
        alert('Xóa sản phẩm thất bại');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Đã xảy ra lỗi khi xóa sản phẩm');
    }
  };

  return (
    < div className="container-fluid" >
      <div className="row">

        {/* <!-- Nav bar --> */}

        <nav className="navbar navbar-expand-md navbar-dark bg-success mb-4 ">
          <div className="container-fluid">
            <span className="navbar-brand" href="/">
              Products Manager
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
                  <a className="nav-link active" href="/products">
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

        {/* Add product */}

        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" onClick={toggleAddForm}>{showAddForm == true ? 'Cancel' : 'Add Product'}</button>
        </div>
        {showAddForm && <FormProduct
          product={productToEdit}
        />}

        {!showAddForm && <div id="manage-products" className="mt-5">

          {/* <!-- Table  --> */}
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">Type</th>
                <th scope="col">Price</th>
                <th scope="col">Size</th>
                <th scope="col">Brand</th>
                <th scope="col">Quantity</th>
                <th scope="col">Description</th>
                <th scope="col">Role</th>
                <th scope="col">Create</th>
                <th scope="col">Update</th>
                <th scope="col">Available</th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- Table data --> */}
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img src={product.image} alt={product.name} width="50" />
                  </td>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{filterCategory(product.categories, categories).join(', ')}</td>
                  <td>{product.type}</td>
                  <td>{product.price.toFixed(3) + 'đ'}</td>
                  <td>{product.size}</td>
                  <td>{product.brand}</td>
                  <td>{product.quantity}</td>
                  <td>{product.description}</td>
                  <td>{product.role}</td>
                  <td>{product.createdAt}</td>
                  <td>{product.updatedAt}</td>
                  <td>{product.available}</td>
                  <td>
                    <button className="btn btn-success btn-sm me-2" style={{ marginBottom: 5 }} onClick={() => handleUpdateProduct(product)}>Sửa</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteConfirmation(product._id)}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination buttons */}
          <div className="d-flex justify-content-end">
            <div className="d-flex justify-content-between align-items-center">
              {page === 1 ? (
                <button className="btn btn-primary" onClick={nextPage}>Next Page</button>
              ) : (
                <>
                  <button className="btn btn-primary" onClick={prevPage}>Previous Page</button>
                  <span>Page {page}</span>
                  <button className="btn btn-primary" onClick={nextPage}>Next Page</button>
                </>
              )}
            </div>
          </div>
        </div>}

      </div>
    </div >

  )
}

export default Products