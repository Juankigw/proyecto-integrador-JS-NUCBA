const products= document.querySelector(".products-container");
const filterSelect = document.getElementById('filter');
const btnload= document.getElementById("btn-load")


let cart = JSON.parse(localStorage.getItem("cart")) || [];
const saveLocalStorage= (carList)=>{
    localStorage.setItem("cart", JSON.stringify(carList));
}
const renderproduct = (product)=>{
    const {name, marca, precio, img } = product
    return `
    <div class="card-producto">
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
    if (category === "all" || !category) {
        renderDividedProducts(index);
        return; 
    }
    renderFilteredProducts(category);
}

const changeShowMore=(category) =>{
    if (category === "all") {
        btnload.classList.remove("hidden");
        return
    }
    btnload.classList.add("hidden");
}
const filterProducts = ()=>{
    const selectedValue = filterSelect.value;
    changeShowMore(selectedValue);
    if (selectedValue === 'all') {
        products.innerHTML = "";
        renderProducts();
    } else {
        renderProducts(0, selectedValue);
        productsController.nextProductsIndex=1
    }
}
const isLastIndex =()=>{
    return (
        productsController.nextProductsIndex === productsController.productsLimit
    )
}
const ShowMoreProducts= ()=>{
    renderProducts(productsController.nextProductsIndex);
    productsController.nextProductsIndex++;
    if (isLastIndex()) {
        btnload.classList.add("hidden")
    }

}
const init = ()=>{
    renderProducts();
    filterSelect.addEventListener('change', filterProducts);
    btnload.addEventListener("click", ShowMoreProducts);
}

init();