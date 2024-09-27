import React, { useState } from 'react';
import { products as initialProducts } from './data';

const ProductGrid = () => {
  const [products] = useState(initialProducts);
  const [orders, setOrders] = useState([]);
  const shippingCost = 100; // ค่าส่งคงที่ 100
  const discountCoupon = 50; // คูปองส่วนลด 50

  const handleBuy = (product) => {
    const existingOrder = orders.find(order => order.id === product.id);
    const price = product.id === 2 ? 250 : product.price; // Product 3 มี id เป็น 2

    if (existingOrder) {
      setOrders(
        orders.map(order =>
          order.id === product.id
            ? { ...order, quantity: order.quantity + 1, price }
            : order
        )
      );
    } else {
      setOrders([...orders, { ...product, quantity: 1, price }]);
    }
  };

  const calculateTotalPrice = () => {
    const productTotal = orders.reduce(
      (total, order) => total + order.price * order.quantity,
      0
    );
    return productTotal + shippingCost;
  };

  const handleDelete = (productId) => {
    setOrders(orders.filter(order => order.id !== productId));
  };

  return (
    <div>
      {/* แสดงป้ายคูปองส่วนลดเสมอ */}
      <div className="coupon-badge" style={{ backgroundColor: '#ffeb3b', padding: '10px', marginBottom: '20px', borderRadius: '5px' }}>
        🎟️ คูปองส่วนลด 50$ เมื่อซื้อ Rolex Datejust 36 MMหน้าปัดแบบ Iced Out | Two Tone | เพชร 10 กะรัต
      </div>

      {/* แสดงรายการคำสั่งซื้อ */}
      <div className="order-list">
        <h2>🛒 Order Summary</h2>
        {orders.length === 0 ? (
          <p>No items ordered yet.</p>
        ) : (
          <ul>
            {orders.map(order => (
              <li key={order.id}>
                {order.name} - {order.quantity} item(s) - ${order.price * order.quantity}
                <button onClick={() => handleDelete(order.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* แสดงยอดรวมของราคาสินค้าที่สั่งซื้อรวมกับค่าส่ง */}
      <div className="total-price">
        <h2>💰 Total Price: ${calculateTotalPrice()}</h2>
        <p>🚚 Shipping Cost: ${shippingCost}</p>
      </div>

      {/* แสดงรายการสินค้า */}
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <button onClick={() => handleBuy(product)}>Buy</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
