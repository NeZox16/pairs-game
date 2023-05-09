(() => {
    const game = document.getElementById('pairs-game');
    const num = document.querySelector('.num');
    let ul = document.createElement('ul');
    const modalStart = document.getElementById('modal-start');

    let pairsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let doublePairsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    function modal() {

        let modalTitle = document.createElement('h2');
        modalTitle.classList.add('modal-title');
        modalTitle.textContent = 'Select game size'

        let block = document.createElement('ul');
        block.classList.add('block')

        let blockItem = document.createElement('li');
        blockItem.classList.add('block-item')

        let btnExtra = document.createElement('button');
        btnExtra.classList.add('btn');
        btnExtra.textContent = '5x5';

        let btnMedium = document.createElement('button');
        btnMedium.classList.add('btn');
        btnMedium.textContent = '4x4';

        let btnSmall = document.createElement('button');
        btnSmall.classList.add('btn');
        btnSmall.textContent = '3x3';

        let btnStart = document.createElement('button');
        btnStart.classList.add('btn-start');
        btnStart.textContent = 'Start game';

        blockItem.append(btnExtra);
        blockItem.append(btnMedium);
        blockItem.append(btnSmall);
        blockItem.append(btnStart);
        

        block.append(modalTitle);
        block.append(blockItem);

        modalStart.append(block);

        btnStart.addEventListener('click', () => {
            pairsList.splice(8, 2);
            doublePairsList.splice(8, 2);
            randowArrAndRemoveModal();
            playTimer()
            return pairsList;
        })


        btnExtra.addEventListener('click', () => {
            randowArrAndRemoveModal();
            playTimer()
            return pairsList;
        })

        btnMedium.addEventListener('click', () => {
            pairsList.splice(8, 2);
            doublePairsList.splice(8, 2);
            randowArrAndRemoveModal();
            playTimer()
            return pairsList;
        })
        btnSmall.addEventListener('click', () => {
            pairsList.splice(6, 4);
            doublePairsList.splice(6, 4);
            randowArrAndRemoveModal();
            playTimer()
            return pairsList;
        })

        function randowArrAndRemoveModal() {
            pairsList.sort(() => Math.random() - 0.5);
            doublePairsList.sort(() => Math.random() - 0.5);
            for (let i = 0; i < pairsList.length; i++) {
                let copyList1 = pairsList[i];
                let copyList2 = doublePairsList[i];
                allCards.push(copyList1)
                allCards.push(copyList2)
            }
            createPairsListItem();
            modalStart.remove();
        }

    }

    modal();

    function createPairsTitle(title) {
        let pairsTitle = document.createElement('h1');
        pairsTitle.classList.add('title');
        pairsTitle.innerHTML = title;
        return pairsTitle;
    }

    let flipCards = [];
    let matchedCards = [];
    let allCards = [];
    
    function createPairsList() {
        ul.classList.add('list')
        return ul;
    }

    function flip() {
        if(flipCards.length === 2) {
            return;
        } 
        this.classList.add('open');
        flipCards.push(this);
        if (flipCards.length === 2) {
            checkFlipCard();
        }
    }

    function playTimer() {
        let time = document.querySelector('.time');
        let iconTImer = document.querySelector('.bx-timer');
        time.innerHTML = 60;
        let startTimer = setInterval(() => {
            time.innerHTML = --time.innerHTML; 
            if(time.innerHTML == 45) {
                time.style.backgroundColor = 'rgb(200, 255, 127)';
                iconTImer.style.color = 'rgb(200, 255, 127)';
            } else if (time.innerHTML == 30) {
                time.style.backgroundColor = 'rgb(242, 255, 127)';
                iconTImer.style.color = 'rgb(242, 255, 127)';
            } else if (time.innerHTML == 20) {
                time.style.backgroundColor = 'rgb(255, 204, 127)';
                iconTImer.style.color = 'rgb(255, 204, 127)';
            } else if (time.innerHTML == 15) {
                time.style.backgroundColor = 'rgb(255, 0, 0)';
                iconTImer.style.color = 'rgb(255, 0, 0)';
            } else if (time.innerHTML == 0) {
                time.style.backgroundColor = 'rgb(122, 20, 20)';
                iconTImer.style.color = 'rgb(122, 20, 20)';
                clearInterval(startTimer);
                modalEnd();
            }
        }, 1000);
    }


    let score = 0;

    function checkFlipCard() {

        let card1 = flipCards[0];
        let card2 = flipCards[1];
        if (card1.innerHTML === card2.innerHTML) {
            for(let i = 0; i < flipCards.length; i++) {
                flipCards[i].classList.add('match');
                matchedCards.push(flipCards[i]);
            };
            flipCards = [];
            checkToWin();
        } else {
            setTimeout(() => {
                for(let i = 0; i < flipCards.length; i++) {
                    flipCards[i].classList.remove('open');
                };
                flipCards = [];
            }, 2000);
            num.textContent = ++score;
            if (score === 6) {
                setTimeout(() => {
                    modalEnd();
                }, 2000);
            }
        }
    }

    function modalEnd() {
        let modalEnd = document.getElementById('modal-end');
        modalEnd.style.display = 'flex';

        let modalTitleEnd = document.createElement('h2');
        modalTitleEnd.classList.add('modal-title-end')
        modalTitleEnd.textContent = 'You have lost'

        let modalEndBlock = document.createElement('div');
        modalEndBlock.classList.add('modal-end-block');

        let btnEndGame = document.createElement('button');
        btnEndGame.classList.add('btn-end')
        btnEndGame.textContent = 'Restart game';

        btnEndGame.addEventListener('click', () => {
            location.reload();
        })

        modalEndBlock.append(btnEndGame);
        modalEndBlock.append(modalTitleEnd);
        modalEnd.append(modalEndBlock)
    }

    

    function checkToWin() {
        if(matchedCards.length === ul.children.length) {
            let modalWin = document.getElementById('modal-win');
            modalWin.style.display = 'flex';
    
            let modalWinTitle = document.createElement('h2');
            modalWinTitle.classList.add('modal-title-win')
            modalWinTitle.textContent = 'You have won'
    
            let modalWinBlock = document.createElement('div');
            modalWinBlock.classList.add('modal-win-block');
    
            let btnWinGame = document.createElement('button');
            btnWinGame.classList.add('btn-win')
            btnWinGame.textContent = 'Restart game';
    
            btnWinGame.addEventListener('click', () => {
                location.reload();
            });
    
            modalWinBlock.append(btnWinGame);
            modalWinBlock.append(modalWinTitle);
            modalWin.append(modalWinBlock);
        }
    }

    
    
    function createPairsListItem() {
        for (let i = 0; i < allCards.length; i++) {
            let li = document.createElement('li');
            li.classList.add('list-item');
            let button = document.createElement('button');
            button.classList.add('button');
            button.textContent = allCards[i];
            li.append(button);
            ul.append(li);
            switch(allCards[i]) {
                case 1:
                    button.style.backgroundColor = 'red';
                    break;
                case 2:
                    button.style.backgroundColor = 'yellow';
                    break;
                case 3:
                    button.style.backgroundColor = 'green';
                    break;
                case 4:
                    button.style.backgroundColor = 'pink';
                    break;
                case 5:
                    button.style.backgroundColor = 'orange';
                    break;
                case 6:
                    button.style.backgroundColor = 'purple';
                    break;
                case 7:
                    button.style.backgroundColor = 'aqua';
                    break;
                case 8:
                    button.style.backgroundColor = 'greenyellow';
                    break;     
                case 9:
                    button.style.backgroundColor = 'blueviolet';
                    break;     
                case 10:
                    button.style.backgroundColor = 'aquamarine';
                    break;     
            }

           li.addEventListener('click', flip);
        }
        return ul;
    }


    function pairsApp(title) { 

        let pairsTitle = createPairsTitle(title);
        let listItem = createPairsListItem();
        createPairsList();
        document.body.append(pairsTitle);
        game.append(listItem);
    };

    window.pairsApp = pairsApp;
})();
