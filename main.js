function setup() {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    const box = 30;
    const W = canvas.width = 630;
    const H = canvas.height = 900;

    const field = new Field(ctx, 30, 'white', 'black', W, H);
    field.clear();
    let shape = new Shape(ctx, "J", box, W, H)
    shape.draw();
    let matrix = [
        []
    ];

    function randomShape() {
        const rnd = Math.floor(Math.random() * (6 + 1));
        switch (rnd) {
            case 0:
                return "O"
            case 1:
                return "I"
            case 2:
                return "T"
            case 3:
                return "J"
            case 4:
                return "L"
            case 5:
                return "S"
            case 6:
                return "Z"
        }
    }

    const arShapes = []
    let move = setInterval(() => {
        matrix = shape.moveDown();
    }, 500)
    let game = setInterval(() => {
        if (matrix['isStopped'] == true) {
            matrix['isStopped'] = false;
            if (matrix['lost'] == true) {
                clearInterval(game);
                clearInterval(move);
            }
            let prev = shape.type;
            let newSh = randomShape();
            while (newSh == prev) {
                newSh = randomShape();
            }
            arShapes.push(shape);
            shape = new Shape(ctx, newSh, box, W, H, matrix['matrix']);
        }
        field.clear();
        arShapes.forEach(sh => sh.draw());
        shape.draw();
    }, 50)

    document.addEventListener('keydown', function (e) {
        switch (e.code) {
            case "ArrowLeft":
                shape.moveLeft();
                break;
            case "ArrowRight":
                shape.moveRight();
                break;
            case "ArrowDown":
                shape.moveDown();
                break;
            case "ArrowUp":
                shape.turnOver();
                break;
        }
    })

}
window.onload = () => {
    setup();
}