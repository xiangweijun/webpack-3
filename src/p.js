export default function () {
    const a = 'xx';
    const b = '';
    // 注释
    console.log(b);
    console.log(`env: ${APP_ENV}`);

    const obj = {
        aa: '1',
        bb: '2',
        cc: '',
    };
    const {
        aa,
        ...other
    } = obj;
    console.log(aa);
    console.log(other);
    alert(a);
}
