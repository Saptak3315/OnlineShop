import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css';
function Dashboard() {
    const navigate = useNavigate();
    const username = localStorage.getItem("liu");

    const [bal, sb] = useState(0);
    const [his, sh] = useState([]);
    const [fund, sf] = useState("");
    const [addp, saddp] = useState("");
    const [val, sprice] = useState("");
    const products = JSON.parse(localStorage.getItem("products")) || {};
    const users = JSON.parse(localStorage.getItem("users")) || {};
    useEffect(() => {
        if (!username) {
            navigate("/login");
        } else {
            let users = JSON.parse(localStorage.getItem("users")) || {};
            sb(users[username]?.balance || 0);
            sh(users[username]?.history || []);
        }
    }, []);

    const addfunds = () => {
        if (!fund || fund < 0) {
            alert("Please Enter a valid number");
            return;
        }
        const users = JSON.parse(localStorage.getItem("users")) || {};
        users[username].balance += Number(fund);
        users[username].history.push(`Added ${fund} tk in balance`);
        
        if (users[username].history.length > 5) {
            users[username].history.shift();
        }
        
        localStorage.setItem("users", JSON.stringify(users));
        sb(users[username].balance);
        sh(users[username].history);
        sf("");
    };

    const AddProduct = () => {
        if (!addp || !val || val < 0) {
            alert("Invalid Product or price");
            return;
        }
        const newProducts = { ...products, [addp]: { name: addp, price: Number(val) } };
        localStorage.setItem("products", JSON.stringify(newProducts));
        alert("Product Added Successfully");
        saddp("");
        sprice("");
    };

    const purchase = (product) => {
        const users = JSON.parse(localStorage.getItem("users")) || {};
        if (users[username].balance >= product.price) {
            users[username].balance -= product.price;
            users[username].history.push(`Bought ${product.name} for $${product.price}`);
            if (users[username].history.length > 5) {
                users[username].history.shift();
            }
            localStorage.setItem("users", JSON.stringify(users));
            sb(users[username].balance);
            sh(users[username].history);
            alert("Purchase successful!");
        } else {
            alert("Insufficient funds!");
        }
    };
    const logout=()=>{
        navigate("/");
    }
    return (
        <div className='style'>
            <h1>Welcome, {username}</h1>
            <h3>Balance: {bal}</h3>

            <input type="number" placeholder="Enter Amount" value={fund} onChange={(e) => sf(e.target.value)} />
            <button onClick={addfunds}>Add Fund</button>

            <br /><br />

            <input type="text" placeholder="Product Name" value={addp} onChange={(e) => saddp(e.target.value)} />
            <input type="number" placeholder="Price" value={val} onChange={(e) => sprice(e.target.value)} />
            <button onClick={AddProduct}>Add Product</button>

            <br /><br />

            <h2>Shop</h2>
            <ul>
                {Object.values(products).map((product, index) => (
                    <li key={index}>
                        {product.name}: {product.price} 
                        <button onClick={() => purchase(product)}>Buy</button>
                    </li>
                ))}
            </ul>
            <h2>Last 5 Transactions</h2>
            <ul>
                {
                    users[username]?.history?.map((i,id)=>(
                        <li key={id}>
                            <h3>{i}</h3>
                        </li>
                    ))
                }
            </ul>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Dashboard;
