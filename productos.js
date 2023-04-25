const productsData = [
    {
      id: 1,
      name: "Auricular Redragon Ares",
      marca: "redragon",
      precio: 5600,
      category: "auricular",
      img: "./imagenes/productos/auricularredragonares.webp",
    },
    {
      id: 2,
      name: "Auricular Redragon H520",
      marca: "redragon",
      precio: 27000,
      category: "auricular",
      img: "./imagenes/productos/auricularredragonh520.webp",
    },
    {
      id: 3,
      name: "Auricular Redragon Pandora 2",
      marca: "redragon",
      precio: 13600,
      category: "auricular",
      img: "./imagenes/productos/auricularredragonpandora2.webp",
    },
    {
      id: 4,
      name: "Auricular T-Dagger gh-101",
      marca: "tdagger",
      precio: 5400,
      category: "auricular",
      img: "./imagenes/productos/auriculartdaggerrgh101.webp",
    },
    {
      id: 5,
      name: "Joystick Ps3",
      marca: "sony",
      precio: 4200,
      category: "joystick",
      img: "./imagenes/productos/joystickps3.webp",
    },
    {
      id: 6,
      name: "Joystick Redragon Harrow",
      marca: "redragon",
      precio: 15170,
      category: "joystick",
      img: "./imagenes/productos/joystickredragonharrow.jpg",
    },
    {
      id: 7,
      name: "Joystick T-Dagger Aries",
      marca: "tdagger",
      precio: 4950,
      category: "joystick",
      img: "./imagenes/productos/joysticktdaggeraries.webp",
    },
    {
      id: 8,
      name: "Joystick Ps4",
      marca: "sony",
      precio: 11600,
      category: "joystick",
      img: "./imagenes/productos/jpystickps4.webp",
    },
    {
      id: 9,
      name: "Mouse Redragon Cobra FPS",
      marca: "redragon",
      precio: 9000,
      category: "mouse",
      img: "./imagenes/productos/mouseredragoncobrafps.webp",
    },
    {
      id: 10,
      name: "Mouse Redragon Mirage",
      marca: "redragon",
      precio: 4400,
      category: "mouse",
      img: "./imagenes/productos/mouseredragonmirage.webp",
    },
    {
      id: 11,
      name: "Mouse Redragon Storm Elite",
      marca: "redragon",
      precio: 10360,
      category: "mouse",
      img: "./imagenes/productos/mouseredragonstormelite.webp",
    },
    {
      id: 12,
      name: "Mouse T-Dagger tgm-106",
      precio: 2030,
      category: "mouse",
      img: "./imagenes/productos/mousetdaggertgm106.webp",
    },
    {
      id: 13,
      name: "Teclado Redragon Draconic",
      marca: "redragon",
      precio: 18000,
      category: "teclado",
      img: "./imagenes/productos/tecladoredragondraconic.webp",
    },
    {
      id: 14,
      name: "Teclado Redragon Born",
      marca: "redragon",
      precio: 7930,
      category: "teclado",
      img: "./imagenes/productos/tecladoredragondragonborn.webp",
    },
    {
      id: 15,
      name: "Teclado Redragon Kumara",
      marca:"redragon",
      precio: 20700,
      category: "teclado",
      img: "./imagenes/productos/tecladoredragonkumara.webp",
    },
    {
      id: 16,
      name: "Teclado T-Dagger tkg310",
      marca:"tdagger",
      precio: 9000,
      category: "teclado",
      img: "./imagenes/productos/tecladotdaggertkg310.webp",
    },
  ];

  const splitProducts=(size)=>{
    let dividedProducts=[];

    for (let i = 0; i < productsData.length; i+= size) {
      dividedProducts.push(productsData.slice(i, i+ size))
    }
    return dividedProducts;
  }

  const productsController ={
    dividedProducts: splitProducts(6), 
    nextProductsIndex:1,
    productsLimit: splitProducts(6).length, 
  }