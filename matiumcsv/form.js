document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formulario").addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar el envío del formulario

        // Obtener los valores de los campos del formulario
        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        
        // Validar campos obligatorios
        if (!nombre || !apellido || !email || !telefono) {
            Swal.fire({
                title: "Error",
                text: "Por favor completa todos los campos del formulario.",
                icon: "error"
            });
            return;
        }

        // Validar formato de correo electrónico
        const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail)\.com$/;
        if (!emailPattern.test(email)) {
            Swal.fire({
                title: "Error",
                text: "El correo electrónico debe ser una dirección válida de Gmail o Hotmail.",
                icon: "error"
            });
            return;
        }

        // Validar formato de teléfono (10 dígitos numéricos)
        const telefonoPattern = /^[0-9]{10}$/;
        if (!telefonoPattern.test(telefono)) {
            Swal.fire({
                title: "Error",
                text: "El número de teléfono debe contener exactamente 10 dígitos numéricos.",
                icon: "error"
            });
            return;
        }

        // Si todos los campos son válidos, mostrar mensaje de éxito y enviar el formulario
        Swal.fire({
            title: "Felicidades, entraste a la página",
            text: "¡Enviaste el formulario!",
            icon: "success"
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById("formulario").submit(); // Enviar el formulario después de cerrar la alerta
            }
        });
    });
});
