var alertError = function (message) {
    toastify.toast({
        text: message,
        duration: 5000,
        close: false,
        style: {
            background: 'linear-gradient(to right, #ff5f6d, #ffc371)',
            color: 'white',
            textAlign: 'center'
        }
    });
};
var alertSuccess = function (message) {
    toastify.toast({
        text: message,
        duration: 5000,
        close: false,
        style: {
            background: 'linear-gradient(to right, #00b09b, #96c93d)',
            color: 'white',
            textAlign: 'center'
        }
    });
};
document.querySelector('#decode').addEventListener('click', function () {
    var input = document.querySelector('#input');
    var iterations = document.querySelector('#iterations');
    var output = document.querySelector('#output');
    var inputValue = input.value;
    var iterationsValue = iterations.valueAsNumber;
    var currentValue = inputValue;
    for (var i = 0; i < iterationsValue; i++) {
        currentValue = atob(currentValue);
    }
    output.value = currentValue;
    alertSuccess('Decoded successfully!');
});
//# sourceMappingURL=decode.js.map