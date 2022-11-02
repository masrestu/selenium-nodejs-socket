const socket = io()

const start = async () => {
    console.log('start')
    await socket.emit('get_book')
    console.clear()
    // setTimeout(start, 40000)
}

socket.on('get_book', function (data) {
    console.log(data)
    const tbody = document.querySelector("#result > table > tbody")
    tbody.innerHTML = ''

    for (const iterator of data) {
        const dataRow = document.createElement('tr')
        
        const dataTitle = document.createElement('td')
        const dataLink = document.createElement('a')
        dataLink.setAttribute('href', iterator.bookLink)
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
});