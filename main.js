const products= document.querySelector(".products-container");



let cart = JSON.parse(localStorage.getItem("cart")) || [];
const saveLocalStorage= (carList)=>{
    localStorage.setItem("cart", JSON.stringify(carList));
}
const renderproduct = (product)=>{
    const {name, marca, precio, img } = product
    return `
    <div class="producto">
          <img  src="${img}"/>
          <h2>${name}</h2>
          <p class="precio">$${precio}</p>
          <p class="marca">${marca}</p>
          <button><a><i class="fa-solid fa-cart-shopping cart-icon"></i></a> </button>
      </div>
    `
}

const renderDividedProducts = (index = 0) =>{
products.innerHTML += productsController.dividedProducts[index].map(renderproduct).join("")
}

const renderFilteredProducts= (category) =>{
    const productlist = productsData.filter((product)=>{
        return product.category === category;
    })
    products.innerHTML = productlist.map(renderproduct).join("")
}

const renderProducts= (index=0, category=undefined)=>{
    if (!category) {
        renderDividedProducts(index);
        return; 
    }
    renderFilteredProducts(category)
}
const init = ()=>{
    renderProducts();
}

init();