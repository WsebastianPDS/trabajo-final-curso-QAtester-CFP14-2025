// ========== VALIDACIÓN DEL FORMULARIO DE CONTACTO ==========
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contacto form");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // evita envío automático
        let errores = [];

        const nombre = form.nombre.value.trim();
        const email = form.email.value.trim();
        const telefono = form.telefono.value.trim();
        const fecha = form.fecha.value;
        const archivo = form.archivo.value;
        const terminos = form.terminos.checked;

        // ===== VALIDACIONES =====

        // Nombre: no vacío
        if (nombre === "") {
            errores.push("El nombre es obligatorio.");
        }

        // Email: formato correcto
        if (!validarEmail(email)) {
            errores.push("El correo electrónico no es válido.");
        }

        // Teléfono: si se ingresa, debe ser numérico
        if (telefono && !/^[0-9]+$/.test(telefono)) {
            errores.push("El teléfono solo debe contener números.");
        }

        // Fecha: no puede estar vacía
        if (fecha === "") {
            errores.push("Debe ingresar una fecha.");
        }

        // Archivo: obligatorio (opcional según consigna)
        if (archivo === "") {
            errores.push("Debe seleccionar un archivo.");
        }

        // Términos y condiciones: obligatorio
        if (!terminos) {
            errores.push("Debe aceptar los términos y condiciones.");
        }

        // ===== Mostrar resultado =====
        const mensajes = document.querySelector("#mensajes");
        if (mensajes) mensajes.remove(); // borra mensajes anteriores

        const contenedorMensajes = document.createElement("div");
        contenedorMensajes.id = "mensajes";
        contenedorMensajes.style.marginTop = "10px";

        if (errores.length > 0) {
            contenedorMensajes.style.color = "red";
            contenedorMensajes.innerHTML = `<ul>${errores.map(e => `<li>${e}</li>`).join("")}</ul>`;
            form.appendChild(contenedorMensajes);
        } else {
            contenedorMensajes.style.color = "green";
            contenedorMensajes.textContent = "Formulario enviado correctamente ✅";
            form.appendChild(contenedorMensajes);

            // En un entorno real, acá se enviaría al servidor
            form.reset();
        }
    });
});

// ===== FUNCIÓN AUXILIAR =====
function validarEmail(email) {
    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patron.test(email);
}