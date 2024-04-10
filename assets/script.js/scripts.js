document.getElementById('menu-button').addEventListener('click', function() {
    var dropdown = document.getElementById('dropdown-menu');
    if (dropdown.style.display === 'none') {
        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
});