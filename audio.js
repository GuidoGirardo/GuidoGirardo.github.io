const audio = document.getElementById('audio');
        const volumeButton = document.getElementById('volume');
        let isPlaying = false;
        let isMuted = false;
        audio.volume = 0.1;

        // Función para iniciar la reproducción cuando se mueva el mouse
        function startPlaying() {
          if (!isPlaying) {
            audio.play(); // Reproduce el audio
            isPlaying = true;
          }
        }

        // Función para pausar el audio cuando el mouse deje de moverse
        let timeout;

        function stopPlaying() {
          if (isPlaying) {
            audio.pause(); // Pausa el audio
            isPlaying = false;
          }
        }

        // Detecta movimiento del mouse
        document.addEventListener('mousemove', () => {
          startPlaying(); // Reproduce audio al mover el mouse
          clearTimeout(timeout); // Reinicia el temporizador

          // Detiene la reproducción si no se mueve el mouse en 50ms
          timeout = setTimeout(stopPlaying, 50);
        });

        // Función para mutear/desmutear el audio y cambiar el ícono
        volumeButton.addEventListener('click', () => {
            if (isMuted) {
                audio.muted = false; // Desmutea el audio
                volumeButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>'; // Ícono de volumen alto
            } else {
                audio.muted = true; // Mutea el audio
                volumeButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>'; // Ícono de volumen muteado
            }
            isMuted = !isMuted; // Cambia el estado de mute
        });