const socket = io()
let prevData = []

const start = async () => {
    await socket.emit('get_data')
    console.clear()
    // setTimeout(start, 40000)
}

socket.on('get_data', function (data) {
    const tbody = document.querySelector("#result > table > tbody")
    tbody.innerHTML = ''

    for (const iterator of data) {
        const dataRow = document.createElement('tr')

        const dataCurrency = document.createElement('td')
        dataCurrency.textContent = iterator.currency

        const dataLastPrice = document.createElement('td')
        dataLastPrice.textContent = iterator.lastPrice

        const dataInfo = document.createElement('td')
        const obj = prevData.find(o => o.currency === iterator.currency)
        let info = ''
        if (obj) {
            info = (parseFloat(obj.lastPrice) < parseFloat(iterator.lastPrice)) ? 'up' : 'down';
            info = (parseFloat(obj.lastPrice) === parseFloat(iterator.lastPrice)) ? '' : info;
        }
        const spanInfo = document.createElement('span')
        spanInfo.classList.add('arrow')
        if (info !== '') spanInfo.classList.add(info)
        dataInfo.append(spanInfo)

        dataRow.append(dataCurrency, dataLastPrice, dataInfo)
        tbody.append(dataRow)
    }

    prevData = [...data]
});