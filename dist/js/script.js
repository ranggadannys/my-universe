// Navbar Fixed
window.onscroll = function () {
    const header = document.querySelector('header');
    const fixedNav = header.offsetTop;
    const toTop = document.querySelector('#to-top')

    if(window.pageYOffset > fixedNav) {
        header.classList.add('navbar-fixed');
        toTop.classList.remove('hidden');
        toTop.classList.add('flex');
    } else {
        header.classList.remove('navbar-fixed');
        toTop.classList.remove('flex');
        toTop.classList.add('hidden');
    }
}


// Hamburger
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('hamburger-active');
    navMenu.classList.toggle('hidden');
} );

//klik di luar hamburger
window.addEventListener('click', function(e){
    if(e.target != hamburger && e.target != navMenu) {
        hamburger.classList.remove('hamburger-active');
        navMenu.classList.add('hidden');
    }
});

//dark mode toggle
const darkToggle = document.querySelector('#dark-toggle');
const html = document.querySelector('html');

darkToggle.addEventListener('click', function(){
    if (darkToggle.checked) {
        html.classList.add('dark');
        localStorage.theme = 'dark' ;
    } else {
        html.classList.remove('dark');
        localStorage.theme = 'light' ;
    }
});

// Atur posisi toggle sesuai mode
if (
    localStorage.theme === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    darkToggle.checked = true; // Aktifkan toggle untuk mode gelap
    document.documentElement.classList.add('dark'); // Tambahkan kelas 'dark' ke elemen HTML
  } else {
    darkToggle.checked = false; // Matikan toggle untuk mode terang
    document.documentElement.classList.remove('dark'); // Hapus kelas 'dark' dari elemen HTML
  }
  
  // Event listener untuk toggle
  darkToggle.addEventListener('change', function () {
    if (darkToggle.checked) {
      document.documentElement.classList.add('dark'); // Tambahkan kelas 'dark'
      localStorage.theme = 'dark'; // Simpan preferensi tema di localStorage
    } else {
      document.documentElement.classList.remove('dark'); // Hapus kelas 'dark'
      localStorage.theme = 'light'; // Simpan preferensi tema di localStorage
    }
  });

// FITUR READMORE --END
  const readMoreButtons = document.querySelectorAll(".read-more-btn");
  const blogTexts = document.querySelectorAll("[id^='blog-text']");

  readMoreButtons.forEach((button) => {
      button.addEventListener("click", () => {
          const targetId = button.getAttribute("data-target");
          const targetText = document.getElementById(targetId);

          // Tutup semua teks kecuali target
          blogTexts.forEach((text) => {
              if (text !== targetText) {
                  text.classList.add("line-clamp-3", "overflow-hidden");
              }
          });

          readMoreButtons.forEach((btn) => {
              if (btn !== button) {
                  btn.textContent = "Read More";
              }
          });

          // Toggle teks target
          if (targetText.classList.contains("line-clamp-3")) {
              targetText.classList.remove("line-clamp-3", "overflow-hidden");
              button.textContent = "Read Less";
          } else {
              targetText.classList.add("line-clamp-3", "overflow-hidden");
              button.textContent = "Read More";
          }
      });
  });
// FITUR READMORE --END

//FORM PENGIRIMAN PESAN--START
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Ambil nilai dari form
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validasi input kosong
    if (!name || !email || !message) {
      showMessage("⚠️ Oops! The owl needs all fields filled to deliver your message. 📝", "error");
      return;
    }

    // Data yang akan dikirim
    const formData = {
      name: name,
      email: email,
      message: message,
    };

    // Kirim data melalui AJAX
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://formspree.io/f/xvgonazk"); // URL endpoint
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
      if (xhr.status === 200) {
        showMessage("🦉 Hoot hoot! Your owl has delivered the message. ✉️", "success");
        document.getElementById("contactForm").reset(); // Reset form jika sukses
        hideStatusMessageAfterDelay(); // Sembunyikan status setelah 10 detik
      } else {
        showMessage("⚠️ Oops! Something went wrong. Please try again later. ⚡", "error");
      }
    };

    xhr.onerror = function () {
      showMessage("🦉 Oops! The owl got lost. Please try again. 🌌", "error");
    };

    xhr.send(JSON.stringify(formData));
  });

// Fungsi untuk menampilkan pesan status
function showMessage(message, type) {
  const statusDiv = document.getElementById("my-form-status");
  statusDiv.textContent = message;
  statusDiv.classList.remove("hidden");
}

// Fungsi untuk menyembunyikan pesan status setelah 10 detik
function hideStatusMessageAfterDelay() {
  setTimeout(function() {
    document.getElementById("my-form-status").classList.add("hidden");
  }, 10000); // 10 detik = 10000 ms
}

// Fungsi untuk menyembunyikan pesan status jika pengguna mulai mengetik
document.getElementById("name").addEventListener("input", hideStatusMessage);
document.getElementById("email").addEventListener("input", hideStatusMessage);
document.getElementById("message").addEventListener("input", hideStatusMessage);

function hideStatusMessage() {
  const statusDiv = document.getElementById("my-form-status");
  statusDiv.classList.add("hidden");
}
//FORM PENGIRIMAN PESAN --END