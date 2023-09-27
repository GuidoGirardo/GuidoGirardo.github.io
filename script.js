document.addEventListener("DOMContentLoaded", ()=>{ // cuando todo el DOM haya cargado

    const productos = document.querySelectorAll(".producto"); // el producto individual
    const carrito = document.getElementById("carrito"); // el div carrito de la segunda section
  
    // event listener para agregar productos al carrito
    productos.forEach((producto)=>{
        const agregarBtn = producto.querySelector(".agregar"); // asignamos el agregarBoton del carrito
        agregarBtn.addEventListener("click", ()=>{ // y le damos un event listener

            // chequeamos que no haya items repetidos
            const productoExistente = carrito.querySelector(`[data-id="${producto.dataset.id}"]`);
            if(productoExistente) return;

            const productoClonado = producto.cloneNode(true); // clonamos literalmente el producto
            const cantidad = productoClonado.querySelector("input").value; // le sacamos la cantidad del input
            productoClonado.querySelector(".agregar").textContent = "Eliminar"; // btnText a "Eliminar"
            productoClonado.querySelector("input").setAttribute("disabled", true); // desactivamos el input
            productoClonado.dataset.id = producto.dataset.id; // damos id personalizado
            agregarAlCarrito(productoClonado, cantidad); // llamamos a la función agregarAlCarrito();

            // 100% argentino
            let amountPaypal = document.getElementById("amountPaypal");
            let valor = cantidad * producto.querySelector("p").textContent.replace("$", "");
            amountPaypal.value = valor.toString();  
      });
    });
  
    // event listener para eliminar productos del carrito
    carrito.addEventListener("click", (event)=>{
      if(event.target.classList.contains("eliminar")) event.target.parentElement.remove();
    });
  
    // FUNCIÓN para agregar producto al carrito
    function agregarAlCarrito(producto, cantidad){
        const subtotal = producto.querySelector("p").textContent.replace("$", "") * cantidad; // $ total
        producto.querySelector("p").textContent = `$${subtotal}`; // escribimos el total en el <p>
        const eliminarBtn = document.createElement("button");  // creamos el boton eliminar
        eliminarBtn.textContent = "Eliminar"; // le damos texto
        eliminarBtn.classList.add("eliminar"); // le añadimos la clase eliminar
        producto.appendChild(eliminarBtn); // se lo ponemos al padre
        carrito.appendChild(producto); // agregamos el producto al carrito como unos nazis que somos
    }
});