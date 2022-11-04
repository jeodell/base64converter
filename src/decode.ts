const alertError = (message: string) => {
  toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: 'linear-gradient(to right, #ff5f6d, #ffc371)',
      color: 'white',
      textAlign: 'center',
    },
  })
}

const alertSuccess = (message: string) => {
  toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: 'linear-gradient(to right, #00b09b, #96c93d)',
      color: 'white',
      textAlign: 'center',
    },
  })
}

document.querySelector('#decode').addEventListener('click', () => {
  const input = <HTMLInputElement>document.querySelector('#input')
  const iterations = <HTMLInputElement>document.querySelector('#iterations')
  const output = <HTMLInputElement>document.querySelector('#output')

  const inputValue = input.value
  const iterationsValue = iterations.valueAsNumber

  let currentValue = inputValue
  for (let i = 0; i < iterationsValue; i++) {
    currentValue = atob(currentValue)
  }

  output.value = currentValue
  alertSuccess('Decoded successfully!')
})
