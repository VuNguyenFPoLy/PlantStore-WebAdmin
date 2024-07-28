import React, { useEffect, useState } from 'react';

const FormProduct = (props) => {

    const product = props?.product;

    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        image: '',
        name: '',
        category: '',
        type: '',
        price: '',
        size: '',
        origin: '',
        quantity: '',
        description: '',
        role: ''
    });

    // set data in form
    useEffect(() => {
        if (product) {
            setFormData({
                image: product.image || '',
                name: product.name || '',
                category: product.categories[1] || '',
                type: product.type || '',
                price: product.price.toFixed(3) || '',
                size: product.size || '',
                origin: product.brand || '',
                quantity: product.quantity || '',
                description: product.description || '',
                role: product.role || ''
            });
        } else {
            setFormData({
                image: '',
                name: '',
                category: '',
                type: '',
                price: '',
                size: '',
                origin: '',
                quantity: '',
                description: '',
                role: ''
            });
        }
    }, [product]);

    console.log(formData.role)

    // get categories

    useEffect(() => {
        const getCategories = async () => {
            try {
                const result = await fetch('http://localhost:3001/categories');
                const data = await result.json();
                if (data.status == true) setCategories(data.data);
                return null;
            } catch (error) {
                console.log('Get categories error: ', error.message)
            }
        };
        getCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(value)
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = {
            name: formData.name,
            categories: [
                {
                    id: categories[0]._id
                },
                {
                    id: formData.category
                },
                {
                    id: categories[1]._id
                }
            ],
            type: formData.type,
            price: parseInt(formData.price),
            size: formData.size,
            brand: formData.origin,
            quantity: parseInt(formData.quantity),
            image: formData.image,
            role: formData.role,
            description: formData.description
        }
        if (!body.name || !body.categories[2], !body.type, !body.price,
            !body.size, !body.brand, !body.quantity, !body.image, !body.role) alert('Vui lòng nhập đầy đủ thông tin');

        const options = {
            method: product ? "PUT" : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        };

        console.log(body);


        try {
            const link = product ? `/update/${product._id}` : ''
            console.log(link);

            const result = await fetch(`http://localhost:3001/products${link}`, options);
            const response = await result.json();
            if (response.status == true) {
                setFormData({
                    image: '',
                    name: '',
                    category: '',
                    type: '',
                    price: '',
                    size: '',
                    origin: '',
                    quantity: '',
                    description: '',
                    role: ''
                });
                return alert('Hoàn tất')

            }
            return alert('Thất bại')
        } catch (error) {
            console.log('Post product error: ', error.message);
        }

    };



    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="image" className="form-label">Image URL</label>
                <input type="text" className="form-control" id="image" name="image" value={formData.image} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Product Name</label>
                <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select
                    className="form-select"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="">Chọn danh mục</option>
                    {categories.map((item) => (
                        <option key={item._id} value={item._id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="type" className="form-label">Type</label>
                <input type="text" className="form-control" id="type" name="type" value={formData.type} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input type="number" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="size" className="form-label">Size</label>
                <select
                    className="form-select"
                    id="size"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                >
                    <option value="">Chọn kích thước</option>
                    <option value="Nhỏ">Nhỏ</option>
                    <option value="Vừa">Vừa</option>
                    <option value="Lớn">Lớn</option>

                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="origin" className="form-label">Origin</label>
                <input type="text" className="form-control" id="origin" name="origin" value={formData.origin} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="quantity" className="form-label">Quantity</label>
                <input type="number" className="form-control" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="role" className="form-label">Role</label>
                <select
                    className="form-select"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                >
                    <option value="">Chọn loại</option>
                    <option value="1">Cây trồng</option>
                    <option value="2">Chậu cây</option>
                    <option value="3">Dụng cụ</option>

                </select>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default FormProduct