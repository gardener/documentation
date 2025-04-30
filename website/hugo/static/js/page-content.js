function moveElements() {
    const elements = document.querySelectorAll('.td-toc');
    const targetDiv = document.querySelector('.taxonomy');
    if (elements.length > 0 && targetDiv != null) {
        var header = targetDiv.getElementsByTagName('h5');
        if (header.length == 1) {
            header[0].textContent = 'Page Content'
        }
        elements.forEach(element => { 
            element.style.fontSize = 'medium';
            targetDiv.appendChild(element);
        });
        var terms = targetDiv.querySelectorAll('.taxonomy-terms')
        if (terms.length > 0) {
            terms.forEach(term => term.style.display = 'none');
        }
    } else if (targetDiv != null) {
        targetDiv.style.display = 'none';
    }
}

moveElements();