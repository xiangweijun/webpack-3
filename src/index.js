import forEach from 'lodash/forEach';
import element from 'element';
import './assets/sass/style.scss';
import f from './p';

$(() => {
    document.getElementById('content').innerHTML = element;
    $('#tt').text('flex');
    f();
    forEach([1, 2], (value) => {
        console.log(value);
    });
});
