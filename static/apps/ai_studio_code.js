    btn.onclick = async () => {
        if (!fileInput.files[0]) return alert("Por favor, selecciona un archivo.");
        
        btn.disabled = true;
        btn.innerHTML = `<span class="loader"></span>Procesando...`;
        status.innerText = "Preparando audio... (audios largos pueden tardar)";
        output.innerText = "Transcribiendo...";

        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
            const arrayBuffer = await fileInput.files[0].arrayBuffer();
            const buffer = await audioContext.decodeAudioData(arrayBuffer);
            const audioData = buffer.getChannelData(0);

            // LLAMADA REFORZADA PARA AUDIOS LARGOS
            const result = await transcriber(audioData, { 
                language: 'spanish', 
                task: 'transcribe',
                chunk_length_s: 30, // Divide el audio en trozos de 30s
                stride_length_s: 5,  // Solapa trozos para no perder palabras a la mitad
                return_timestamps: false,
                force_full_sequences: false
            });

            output.innerText = result.text;
            btnCopy.style.display = "block";
            status.innerText = "✓ Finalizado con éxito";
        } catch (err) {
            console.error(err);
            status.innerText = "❌ Error. El audio podría ser demasiado grande para el navegador.";
            output.innerText = "Error: " + err.message;
        } finally {
            btn.disabled = false;
            btn.innerText = "Nueva Transcripción";
        }
    };