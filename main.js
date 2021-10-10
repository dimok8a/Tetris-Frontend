function setup() {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    const box = 30;
    const W = canvas.width = 510;
    const H = canvas.height = 900;
    const startY = 90;
    const startX = 150;

    const field = new Field(ctx, box, undefined, 'white', 'black', startX, startY, W, H);
    field.clear();
    let shape = new Shape(ctx, randomShape(), box, startX, startY, W, H)
    shape.draw();
    let checkState = { // Проверка состояние фигуры
        isContinue: true,
        lost: false
    };

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

    let matrix = [];
    let arShapes = []
    let emptyLines = []
    let score = 0;
    let prevShape = shape.type;
    let newSh = randomShape();
    let move = setInterval(() => {
        checkState['isContinue'] = shape.moveDown();
    }, 500)
    let game = setInterval(() => {
        if (checkState['isContinue'] == false) {
            checkState['isContinue'] = true;
            if (checkState['lost'] == true) {
                clearInterval(game);
                clearInterval(move);
            }
            // console.log(matrix);
            matrix = field.complementMatrix(shape);

            emptyLines = field.emptyLines();
            arShapes.push(shape);
            shape = new Shape(ctx, newSh, box, startX, startY, W, H, matrix);
            prev = shape.type;
            newSh = randomShape();
            while (newSh == prev) {
                newSh = randomShape();
            }
            // console.log(matrix['matrix']);
        }
        field.clear();
        field.printText(`Счет: ${score}`, (W - startX) / 2 + startX - 30, 50, 20);
        field.drawShape(newSh, -250, 150);
        field.printText('Next', 50, 110)
        // matrix = field.deleteEmptyLines();
        arShapes.forEach((sh, ind) => {
            if (emptyLines.length > 0) {
                sh.needToDelete(emptyLines);
                if (sh.isEmpty()) {
                    arShapes[ind] = undefined;
                }
                sh.matrix = field.createTmpMatrix(sh);
                emptyLines.forEach(val => {
                    sh.goDown(val);
                });
                matrix = field.complementMatrix(sh);
                // clearInterval(game);
                // clearInterval(move)
            }
            if (sh !== undefined) {
                sh.draw();
            }
        });
        arShapes = arShapes.filter(val => val !== undefined);
        if (emptyLines.length > 0) {
            switch (emptyLines.length) {
                case 1:
                    score += 100;
                    break;
                case 2:
                    score += 300;
                    break;
                case 3:
                    score += 700;
                    break;
                case 4:
                    score += 1500;
                    break;
            }
            matrix = field.deleteEmptyLines();
            emptyLines = [];
        }
        // field.deleteEmptyLines();
        shape.draw();
    }, 10)

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