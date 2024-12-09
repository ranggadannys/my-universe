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
  