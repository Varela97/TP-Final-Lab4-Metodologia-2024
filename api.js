// Definir la URL de la API
const url = "https://api.potterdb.com/v1/spells";

// Función para obtener el listado de hechizos
async function obtenerHechizos() {
    let hechizosTotales = [];
    let siguientePagina = url;
  
    try {
      // Mientras haya una siguiente página, continuar haciendo solicitudes
      while (siguientePagina) {
        const response = await fetch(siguientePagina, { method: "GET" });
        
        if (!response.ok) {
          throw new Error("Error en la solicitud HTTP");
        }
  
        const datos = await response.json();
        let nuevoID = -1;
        // Concatenar los hechizos actuales a la lista total
        hechizosTotales = hechizosTotales.concat(
          datos.data.map(hechizo => ({
            id: ++nuevoID,
            name: hechizo.attributes.name,
            description: hechizo.attributes.description
          }))
        );
  
        // Verificar si hay un enlace a la siguiente página
        siguientePagina = datos.links?.next || null;
      }
  
      console.log("Total de hechizos obtenidos:", hechizosTotales.length);
      console.log(hechizosTotales);
      return hechizosTotales;
    } catch (error) {
      console.error("Hubo un error al obtener los hechizos:", error);
    }
  }
