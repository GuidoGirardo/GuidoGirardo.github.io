document.addEventListener("DOMContentLoaded", ()=>{ // cuando todo el DOM haya cargado

    const productos = document.querySelectorAll(".producto"); // el producto individual
    const carrito = document.getElementById("carrito"); // el div carrito de la segunda section
    let totalTotal = document.getElementById("totalTotal"); // h4 totalTotal txt
    let plataTotal = 0;

    if(totalTotal.textContent == "0") carrito.style.display = "none";
  
    // event listener para agregar productos al carrito
    productos.forEach((producto)=>{
        const agregarBtn = producto.querySelector(".agregar"); // asignamos el agregarBoton del carrito
        agregarBtn.addEventListener("click", ()=>{ // y le damos un event listener

          // mio
          let carrito1 = carrito.querySelector("#producto1"); // si el producto1 esta en el carrito
          if(producto.contains(document.getElementById("producto1")) && carrito1) return;
          let carrito2 = carrito.querySelector("#producto2"); // si el producto1 esta en el carrito
          if(producto.contains(document.getElementById("producto2")) && carrito2) return;

            const productoClonado = producto.cloneNode(true); // clonamos literalmente el producto
            const cantidad = productoClonado.querySelector("input").value; // le sacamos la cantidad del input
            productoClonado.querySelector(".agregar").textContent = "Eliminar"; // btnText a "Eliminar"
            productoClonado.querySelector("input").setAttribute("disabled", true); // desactivamos el input
            productoClonado.dataset.id = producto.dataset.id; // damos id personalizado
            agregarAlCarrito(productoClonado, cantidad); // llamamos a la función agregarAlCarrito();

            // 100% argentino
            const amountPaypal = document.getElementById("amountPaypal");
            let valor = cantidad * producto.querySelector("p").textContent.replace("$", "");
            plataTotal += valor;
            amountPaypal.value = plataTotal.toString();
            totalTotal.textContent = `Total: $${plataTotal}`;
            if(totalTotal.textContent != "0") carrito.style.display = "flex";
            console.log(plataTotal);
      });
    });
  
    // event listener para eliminar productos del carrito
    carrito.addEventListener("click", (event)=>{
      if(event.target.classList.contains("eliminar")) {
        event.target.parentElement.remove();
        let valorRestar = event.target.parentElement.querySelector("p").textContent.replace("$", "");
        plataTotal -= parseInt(valorRestar);
        amountPaypal.value = plataTotal.toString();
        totalTotal.textContent = `Total: $${plataTotal}`;
        if(totalTotal.textContent == "Total: $0") carrito.style.display = "none";
        console.log(plataTotal);
      }
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