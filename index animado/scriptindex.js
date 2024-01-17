document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section");

    let scrolling = false;

    // Función para manejar el evento de desplazamiento con rueda de mouse
    function handleScroll(event) {
        if (scrolling) return;
        scrolling = true;

        setTimeout(() => {
            scrolling = false;
        }, 1000); // Evitar que se desencadene demasiado rápido

        const delta = event.deltaY;
        let currentSection = null;

        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();

            if (rect.top <= 0 && rect.bottom >= 0) {
                currentSection = section;
            }
        });

        if (currentSection) {
            const currentIndex = Array.from(sections).indexOf(currentSection);
            let nextIndex = currentIndex;

            if (delta > 0 && currentIndex < sections.length - 1) {
                nextIndex++;
            } else if (delta < 0 && currentIndex > 0) {
                nextIndex--;
            }

            const nextSection = sections[nextIndex];

            if (nextSection) {
                smoothScroll(nextSection);
            }
        }
    }

    // Función para desplazamiento suave
    function smoothScroll(target) {
        const targetPosition = target.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000; // Duración en milisegundos

        let start = null;
        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        }

        window.requestAnimationFrame(step);
    }

    // Función para la curva de aceleración
    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t * t + b;
        t -= 2;
        return (c / 2) * (t * t * t + 2) + b;
    }

    // Agregar evento de desplazamiento de rueda de mouse al documento
    document.addEventListener("wheel", handleScroll);
});
