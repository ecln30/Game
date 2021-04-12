blocks.forEach( f => {
    const block = document.createElement('div')
    block.classList.add('block') 
    block.style.left = s.bottomLeft[0] + 'px'
    block.style.bottom = s.bottomLeft[1] + 'px'
    grid.append(block)
})




for (var s of blocks) {
    const block = document.createElement('div')
    block.classList.add('block') 
    block.style.left = s.bottomLeft[0] + 'px'
    block.style.bottom = s.bottomLeft[1] + 'px'
    grid.append(block)
}