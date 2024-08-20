let pagina = 1;

const botonAnterior = document.getElementById("btnAnterior");
const botonSiguiente = document.getElementById("btnSiguiente");

botonSiguiente.addEventListener("click", () => {
  if (pagina < 1000) {
    pagina += 1;
    cargarPaseadores();
  }
});

botonAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina -= 1;
    cargarPaseadores();
  }
});

const cargarPaseadores = async () => {
  const endLimit = pagina === 1 ? pagina * 6 : pagina * 6
  const beginLimit = pagina === 1 ? 0 : endLimit - 6

  try {
    const respuesta = await fetch(`http://127.0.0.1:4000/getPaseadores?beginLimit=${beginLimit}&endLimit=${endLimit}`);
    if (respuesta.status === 200) {
      const paseadores = await respuesta.json();
      console.log(paseadores);

      let paseadoresHTML = "";
      paseadores.forEach((paseador) => {
        paseadoresHTML += `
                <div class="paseador">
                <image class="foto" src="../img/${paseador.id_paseador}.jpg">
                <h3 class="chewy-regular-title">${paseador.nombre}</h3>
                </div>
                `;
      });

      document.getElementById("contenedor").innerHTML = paseadoresHTML;
    } else if (respuesta.status === 401) {
      alert("pusiste el API Path erroneo");
    } else if (respuesta.status === 404) {
      alert("No se encuentra paseador");
    }
  } catch (error) {
    console.log(error);
  }
};


cargarPaseadores();