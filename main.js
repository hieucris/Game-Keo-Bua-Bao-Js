const VALUE = [
    {
        id : 'scissors',
        value : '✌️'
    },
    {
        id : 'rock',
        value : '✊'
    },
    {
        id : 'paper',
        value : '🖐'
    }
];

let i = 0;

const handleChange = () => {
    const computer = document.querySelector('.computer');
    computer.textContent = VALUE[i].value;
    computer.dataset.id = VALUE[i].id;

    if(i === VALUE.length - 1){
        i=0;
    }
    else {
        i++
    }
}

let interval = setInterval(handleChange,100);

const compare = (user,computer) => {
    const indexUser = VALUE.findIndex((item) => item.id === user);
    const indexComputer = VALUE.findIndex((item) => item.id === computer);
    const check = indexUser - indexComputer;
    if ([1,-2].includes(check)) {
        return 1;
    }
    else if ([-1,2].includes(check)) {
        return -1;
    }
    else {
        return 0;
    }
}

var doc = document.querySelectorAll('.user').forEach(btn => {
    btn.addEventListener('click', (event) =>{
        clearInterval(interval);
        event.target.classList.add('active');
        const valueComputer = document.querySelector('.computer').dataset.id;
        const valueUser = event.target.id;
        const result = compare(valueUser, valueComputer);

        const alert = document.createElement('div');
        alert.classList.add('alert');
        let message = '';
        if(result === 1) {
            message = 'Bạn đã chiến thắng';
            alert.classList.add('alert-success');
        }
        else if(result === -1) {
            message = 'Bạn đã thua cuộc';
            alert.classList.add('alert-dark');
        }
        else {
            message = 'Bạn đã hòa';
            alert.classList.add('alert-warning');
        }

        alert.textContent = message;
        document.querySelector('.notification').appendChild(alert);
        document.querySelectorAll('.user').forEach(fix_item => {
            fix_item.style.pointerEvents = 'none';
        })

        document.querySelector('.play-again').classList.remove('d-none');
    })
})

document.querySelector('.play-again').addEventListener('click',()=>{
    interval = setInterval(handleChange,100);
    document.querySelector('.notification').innerHTML = '';
    document.querySelector('.user.active').classList.remove('active');
    document.querySelectorAll('.user').forEach(fix_item => {
        fix_item.style.pointerEvents = 'unset';
    })
    document.querySelector('.play-again').classList.add('d-none')
})