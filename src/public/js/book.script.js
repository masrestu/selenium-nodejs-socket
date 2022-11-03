const socket = io()
const btnStart = document.querySelector('#btnStart')
const loading = document.querySelector('#loading')

const start = async () => {
    await socket.emit('get_book')
    btnStart.classList.add('hidden')
    loading.classList.remove('hidden')
    // setTimeout(start, 40000)
}

socket.on('get_book', async function (data) {
    console.log(data)
    const tbody = document.querySelector("#result > table > tbody")
    tbody.innerHTML = ''

    await socket.emit('input_book', data)
    for (const iterator of data) {
        const dataRow = document.createElement('tr')
        
        const dataTitle = document.createElement('td')

        const dataLink = document.createElement('a')
        dataLink.setAttribute('href', iterator.bookLink)
        dataLink.setAttribute('target', '_blank')
        dataLink.textContent = iterator.bookTitle
        dataTitle.append(dataLink)

        const dataPrice = document.createElement('td')
        dataPrice.textContent = iterator.bookPrice

        const dataRating = document.createElement('td')
        let stars = ('⭐').repeat(parseInt(iterator.bookRating))
        dataRating.textContent = stars

        dataRow.append(dataTitle, dataPrice, dataRating)
        tbody.append(dataRow)
    }

    prevData = [...data]
    
    btnStart.classList.remove('hidden')
    loading.classList.add('hidden')
});