import React from 'react';

const Shop = () => {
 const products = [
    {
      id: 1,
      name: "TruGoodBeautiful T-Shirt",
      price: 29.99,
      description: "A comfortable, eco-friendly t-shirt featuring our logo and message of hope.",
      image: "/t-shirt-shop.png",
      details: [
        "100% organic cotton",
        "Available in sizes S-XXL",
        "Sustainable manufacturing",
        "Ships within 2-3 business days"
      ]
    },
    {
      id: 2,
      name: "Long Sleeve Shirt",
      price: 34.99,
      description: "A cozy long-sleeve shirt perfect for spreading positivity in cooler weather.",
      image: "/long-sleeve-shop.png",
      details: [
        "100% organic cotton",
        "Available in sizes S-XXL",
        "Sustainable manufacturing",
        "Ships within 2-3 business days"
      ]
    },
    {
      id: 3,
      name: "Canvas Tote Bag",
      price: 24.99,
      description: "A durable, eco-friendly tote bag to carry your daily dose of good news.",
      image: "/bag-shop.png",
      details: [
        "100% recycled canvas",
        "Reinforced handles",
        "Interior pocket",
        "Machine washable"
      ]
    }
];

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
        <h1 className="text-xl font-medium text-slate-700 mb-6">
          Shop
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
         <div key={product.id} className="bg-stone-50 rounded-lg overflow-hidden flex flex-col">
         <div className="aspect-w-3 aspect-h-2">
           <img 
             src={product.image}
             alt={product.name}
             className="w-full h-full object-cover"
           />
         </div>
         <div className="p-6 flex-1 flex flex-col">
  <h2 className="text-lg font-medium text-slate-800 mb-2">
    {product.name}
  </h2>
  
  <div className="flex items-center justify-between mb-4">
    <span className="text-xl font-medium text-slate-900">
      ${product.price}
    </span>
    <button 
      className="px-4 py-2 bg-green-600 text-white rounded-lg 
        hover:bg-green-700 transition-colors duration-50 
        font-medium shadow-sm hover:shadow-md text-sm"
    >
      Add to Cart
    </button>
  </div>

  <p className="text-slate-600 mb-4 text-sm flex-1">
    {product.description}
  </p>

  <div className="mt-4 pt-4 border-t border-stone-200">
    <h3 className="font-medium text-slate-700 mb-2 text-sm">
      Product Details
    </h3>
    <ul className="space-y-1 text-slate-600 text-xs">
      {product.details.map((detail, index) => (
        <li key={index}>• {detail}</li>
      ))}
    </ul>
  </div>
</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;