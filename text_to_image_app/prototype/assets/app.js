// JavaScript untuk integrasi model line art ringan
document.addEventListener('DOMContentLoaded', function() {
    // Konfigurasi model
    const MODEL_CONFIG = {
        modelUrl: './assets/model.onnx', // Path ke model ONNX yang dioptimasi
        vocabUrl: './assets/vocab.json',  // Path ke vocabulary untuk tokenizer
        maxLength: 77,                    // Panjang maksimum token
        width: 512,                       // Lebar output gambar
        height: 512,                      // Tinggi output gambar
        steps: 20,                        // Jumlah langkah inferensi
        guidanceScale: 7.5                // Skala guidance untuk kontrol hasil
    };

    // Status aplikasi
    let appState = {
        modelLoaded: false,
        isGenerating: false,
        history: []
    };

    // Elemen UI
    const generateBtn = document.getElementById('generate-btn');
    const promptInput = document.getElementById('prompt');
    const styleSelect = document.getElementById('style');
    const loadingContainer = document.getElementById('loading');
    const resultsContainer = document.getElementById('results');

    // Inisialisasi aplikasi
    async function initApp() {
        // Cek dukungan WebGL/WebGPU
        const hasWebGL = checkWebGLSupport();
        
        if (!hasWebGL) {
            showNotification('Browser Anda tidak mendukung WebGL. Beberapa fitur mungkin tidak berfungsi optimal.', 'warning');
        }
        
        // Coba load model (simulasi untuk prototype)
        try {
            await simulateModelLoading();
            appState.modelLoaded = true;
            showNotification('Model berhasil dimuat!', 'success');
        } catch (error) {
            console.error('Error loading model:', error);
            showNotification('Gagal memuat model. Menggunakan mode fallback.', 'error');
        }
        
        // Load history dari localStorage
        loadHistory();
    }

    // Cek dukungan WebGL
    function checkWebGLSupport() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return gl instanceof WebGLRenderingContext;
    }

    // Simulasi loading model (untuk prototype)
    function simulateModelLoading() {
        return new Promise((resolve) => {
            // Simulasi delay loading model
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
    }

    // Tampilkan notifikasi
    function showNotification(message, type = 'info') {
        // Implementasi notifikasi sederhana
        alert(message);
    }

    // Load history dari localStorage
    function loadHistory() {
        try {
            const savedHistory = localStorage.getItem('lineArtHistory');
            if (savedHistory) {
                appState.history = JSON.parse(savedHistory);
                // Tampilkan history di UI jika ada
                if (appState.history.length > 0) {
                    displayResults(appState.history);
                }
            }
        } catch (error) {
            console.error('Error loading history:', error);
        }
    }

    // Simpan history ke localStorage
    function saveHistory() {
        try {
            localStorage.setItem('lineArtHistory', JSON.stringify(appState.history));
        } catch (error) {
            console.error('Error saving history:', error);
        }
    }

    // Generate line art (simulasi untuk prototype)
    async function generateLineArt(prompt, style) {
        if (!prompt) {
            showNotification('Silakan masukkan deskripsi gambar terlebih dahulu!', 'warning');
            return;
        }
        
        if (appState.isGenerating) {
            showNotification('Proses generasi sedang berjalan. Mohon tunggu.', 'info');
            return;
        }
        
        // Update state
        appState.isGenerating = true;
        
        // Tampilkan loading
        loadingContainer.style.display = 'block';
        
        try {
            // Simulasi proses generasi
            const results = await simulateGeneration(prompt, style);
            
            // Tambahkan ke history
            appState.history = [...results, ...appState.history].slice(0, 20); // Simpan maksimal 20 hasil
            saveHistory();
            
            // Tampilkan hasil
            displayResults(results);
            
        } catch (error) {
            console.error('Error generating line art:', error);
            showNotification('Terjadi kesalahan saat membuat line art. Silakan coba lagi.', 'error');
        } finally {
            // Update state
            appState.isGenerating = false;
            
            // Sembunyikan loading
            loadingContainer.style.display = 'none';
        }
    }

    // Simulasi proses generasi (untuk prototype)
    function simulateGeneration(prompt, style) {
        return new Promise((resolve) => {
            // Simulasi delay proses
            setTimeout(() => {
                // Buat 3 hasil simulasi
                const results = [];
                for (let i = 0; i < 3; i++) {
                    results.push({
                        id: Date.now() + i,
                        prompt: prompt,
                        style: style,
                        timestamp: new Date().toISOString(),
                        // Gunakan placeholder SVG untuk simulasi hasil
                        imageUrl: `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiBmb250LWZhbWlseT0ic3lzdGVtLXVpLCBzYW5zLXNlcmlmIiBmaWxsPSIjNjY2NjY2Ij5TaW11bGFzaSBIYXNpbCAke2krMX06ICR7cHJvbXB0fTwvdGV4dD48L3N2Zz4=`
                    });
                }
                resolve(results);
            }, 2000);
        });
    }

    // Tampilkan hasil di UI
    function displayResults(results) {
        // Bersihkan hasil sebelumnya
        resultsContainer.innerHTML = '';
        
        // Tambahkan hasil baru
        results.forEach(result => {
            const resultCard = document.createElement('div');
            resultCard.className = 'result-card';
            
            resultCard.innerHTML = `
                <img src="${result.imageUrl}" class="result-image" alt="Generated Line Art">
                <div class="result-info">
                    <div class="result-prompt">${result.prompt} (${result.style})</div>
                    <div class="result-actions">
                        <button class="btn btn-warning" data-id="${result.id}">Unduh</button>
                    </div>
                </div>
            `;
            
            resultsContainer.appendChild(resultCard);
        });
        
        // Tambahkan event listener untuk tombol unduh
        const downloadButtons = document.querySelectorAll('.btn-warning');
        downloadButtons.forEach(button => {
            button.addEventListener('click', function() {
                const resultId = this.getAttribute('data-id');
                downloadImage(resultId);
            });
        });
    }

    // Fungsi unduh gambar (simulasi untuk prototype)
    function downloadImage(resultId) {
        // Dalam implementasi sebenarnya, ini akan mengunduh gambar hasil
        // Untuk prototype, kita hanya tampilkan pesan
        showNotification('Fitur unduh akan tersedia dalam versi lengkap aplikasi.', 'info');
    }

    // Event listener untuk tombol generate
    generateBtn.addEventListener('click', function() {
        const prompt = promptInput.value;
        const style = styleSelect.value;
        generateLineArt(prompt, style);
    });

    // Inisialisasi aplikasi
    initApp();
});
