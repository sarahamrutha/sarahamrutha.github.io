const products = [
  {
    name: "Organic Apples",
    price: "$3.99 / kg",
    image: "https://source.unsplash.com/featured/?apples"
  },
  {
    name: "Fresh Broccoli",
    price: "$2.49 / piece",
    image: "https://source.unsplash.com/featured/?broccoli"
  },
  {
    name: "Milk (1L)",
    price: "$1.25",
    image: "https://source.unsplash.com/featured/?milk"
  },
  {
    name: "Whole Wheat Bread",
    price: "$2.00",
    image: "https://source.unsplash.com/featured/?bread"
  },
  {
    name: "Free-range Eggs",
    price: "$3.50 / dozen",
    image: "https://source.unsplash.com/featured/?eggs"
  }
];

const productGrid = document.getElementById("productGrid");

products.forEach(product => {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <h3>${product.name}</h3>
    <p>${product.price}</p>
  `;
  productGrid.appendChild(card);
});
