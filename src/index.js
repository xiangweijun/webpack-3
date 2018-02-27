import './assets/sass/style.scss';
import f from './p';
import element from './element';

$(() => {
    document.getElementById('content').innerHTML = element;
    $('#tt').text('flex');
    f();
    window.G1 = '12';
});
