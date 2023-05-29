const products= document.querySelector(".products-container");
const filterSelect = document.getElementById('filter');
const btnload= document.getElementById("btn-load");

const productsCart = document.querySelector(".cart-container");
//El total en precio del carrito
const total = document.querySelector(".total");
// El contenedor de las categorías
const buyBtn = document.querySelector(".btn-buy");
// Botón para abrir y cerrar carrito
const cartBtn = document.querySelector(".cart-label");
// Botón para abrir y cerrar menú
const barsBtn = document.querySelector(".menu-label");
// Carrito
const cartMenu = document.querySelector(".cart");
//  Menú (Hamburguesa)
const barsMenu = document.querySelector(".navbar-list");
//  Overlay para tirar facha abajo del menú hamburguesa y el cart.
const overlay = document.querySelector(".overlay");
const deleteBtn = document.querySelector(".btn-delete");


let cart = JSON.parse(localStorage.getItem("cart")) || [];
const saveLocalStorage= (carList)=>{
    localStorage.setItem("cart", JSON.stringify(carList));
}
const renderproduct = (product)=>{
    const {name, marca, precio, img, id } = product
    return `
    <div class="card-producto">
          <img  src="${img}"/>
          <h2>${name}</h2>
          <p class="precio">$${precio}</p>
          <p class="marca">${marca}</p>
          <button class="btn-add" data-id="${id}"
          data-name="${name}"
          data-precio="${precio}"
          data-img="${img}"><a><i class="fa-solid fa-cart-shopping cart-icon"></i></a> 
          </button>
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


//


const toggleMenu = () => {
	barsMenu.classList.toggle("open-menu");
	if (cartMenu.classList.contains("open-cart")) {
		cartMenu.classList.remove("open-cart");
		return;
	}
	overlay.classList.toggle("show-overlay");
};

const toggleCart = () => {
	cartMenu.classList.toggle("open-cart");
	if (barsMenu.classList.contains("open-menu")) {
		barsMenu.classList.remove("open-menu");
		return;
	}
	overlay.classList.toggle("show-overlay");
};

const closeOnClick = (e) => {
	if (!e.target.classList.contains("navbar-link")) {
		return;
	}
	barsMenu.classList.remove("open-menu");
	overlay.classList.remove("show-overlay");
};

const closeOnScroll = () => {
	if (
		!barsMenu.classList.contains("open-menu") &&
		!cartMenu.classList.contains("open-cart")
	) {
		return;
	}
	barsMenu.classList.remove("open-menu");
	cartMenu.classList.remove("open-cart");
	overlay.classList.remove("show-overlay");
};

const closeOnOverlayClick = () => {
	barsMenu.classList.remove("open-menu");
	cartMenu.classList.remove("open-cart");
	overlay.classList.remove("show-overlay");
};

const renderCardProduct = (cartProduct) => {
	const { id, name, precio, img, quantity } = cartProduct;
	return `
	<div class="cart-item">
		<img src=${img} alt="Nft del carrito" />
		<div class="item-info">
			<h3 class="item-title">${name}</h3>
			<p class="item-precio">Precio</p>
			<span class="item-precio">$${precio}</span>
		</div>
		<div class="item-handler">
			<span class="quantity-handler down" data-id=${id}>-</span>
			<span class="item-quantity">${quantity}</span>
			<span class="quantity-handler up" data-id=${id}>+</span>
		</div>
	</div>
	`;
};

const renderCart = () => {
	if (!cart.length) {
		productsCart.innerHTML = `<p class="empty-msg">No hay productos en el carrito.</p>`;
		return;
	}
	productsCart.innerHTML = cart.map(renderCardProduct).join("");
};

const getCartTotal = () => {
	return cart.reduce((acc, cur) => {
		return acc + Number(cur.precio) * cur.quantity;
	}, 0);
};

const showTotal = () => {
	total.innerHTML = `$${getCartTotal().toFixed(2)}`;
};


const disableBtn = (btn) => {
	if (!cart.length) {
		btn.classList.add("disabled");
	} else {
		btn.classList.remove("disabled");
	}
};

const checkCartState = () => {
	saveLocalStorage(cart);
	renderCart();
	showTotal();
	disableBtn(buyBtn);
	disableBtn(deleteBtn);
};

const addProduct = (e) => {
	if (!e.target.classList.contains("btn-add")) {
		return;
	}
	const { id, name, precio, img } = e.target.dataset;

	const product = productData(id, name, precio, img);

	if (isExistingCartProduct(product)) {
		addUnitToProduct(product);
	} else {
		createCartProduct(product);
	}

	checkCartState();
};

const productData = (id, name, precio, img) => {
	return { id, name, precio, img };
};

const isExistingCartProduct = (product) => {
	return cart.find((item) => {
		return item.id === product.id;
	});
};

const addUnitToProduct = (product) => {
	cart = cart.map((cartProduct) => {
		return cartProduct.id === product.id
			? { ...cartProduct, quantity: cartProduct.quantity + 1 }
			: cartProduct;
	});
};


const createCartProduct = (product) => {
	cart = [
		...cart,
		{
			...product,
			quantity: 1,
		},
	];
};

const handleMinusBtnEvent = (id) => {
	const existingCartProduct = cart.find((item) => {
		return item.id === id;
	});

	if (existingCartProduct.quantity === 1) {
		if (window.confirm("¿Desea eliminar el producto del carrito?")) {
			removeProductFromCart(existingCartProduct);
		}
		return;
	}

	substractProductUnit(existingCartProduct);
};

const handlePlusBtnEvent = (id) => {
	const existingCartProduct = cart.find((item) => {
		return item.id === id;
	});

	addUnitToProduct(existingCartProduct);
};

const removeProductFromCart = (existingProduct) => {
	cart = cart.filter((product) => product.id !== existingProduct.id);
	checkCartState();
};

const substractProductUnit = (existingProduct) => {
	cart = cart.map((product) => {
		return product.id === existingProduct.id
			? { ...product, quantity: Number(product.quantity) - 1 }
			: product;
	});
};

const handleQuantity = (e) => {
	if (e.target.classList.contains("down")) {
		handleMinusBtnEvent(e.target.dataset.id);
	} else if (e.target.classList.contains("up")) {
		handlePlusBtnEvent(e.target.dataset.id);
	}
	checkCartState();
};

const resetCartItems = () => {
	cart = [];
	checkCartState();
};


const completeBuy = () => {
	completeCartAction("¿Desea completar su compra?", "¡Gracias por su compra!");
};

const deleteCart = () => {
	completeCartAction("¿Desea eliminar su carrito?", "Carrito eliminado");
};

//

const init = ()=>{
    renderProducts();
    filterSelect.addEventListener('change', filterProducts);
    btnload.addEventListener("click", ShowMoreProducts);
    barsBtn.addEventListener("click", toggleMenu);
	cartBtn.addEventListener("click", toggleCart);
	barsMenu.addEventListener("click", closeOnClick);
	window.addEventListener("scroll", closeOnScroll);
	overlay.addEventListener("click", closeOnOverlayClick);
	document.addEventListener("DOMContentLoaded", renderCart);
	document.addEventListener("DOMContentLoaded", showTotal);
	products.addEventListener("click", addProduct);
	productsCart.addEventListener("click", handleQuantity);
	buyBtn.addEventListener("click", completeBuy);
	deleteBtn.addEventListener("click", deleteCart);
	disableBtn(buyBtn);
	disableBtn(deleteBtn);
}

init();