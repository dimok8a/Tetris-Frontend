function setup() {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    const box = 30;
    const additWidth = 300;
    const additHeight = 10;
    const W = canvas.width = 540;
    canvas.width = W + additWidth;
    const H = canvas.height = 900;
    canvas.height = H + additHeight;
    canvas.style.width = W + additWidth;
    canvas.style.height = H + additHeight;
    const startY = 90;
    const startX = 150;
    const lineWidth = 1.5;
    const audio = new Audio("https://zvukipro.com/uploads/files/2019-03/1553774320_aa4b773936bb0cb.mp3")
    audio.volume = 0.7;


    const field = new Field(ctx, box, undefined, 'white', 'black', startX, startY, W, H, lineWidth, additWidth);
    field.clear();
    let shape = new Shape(ctx, randomShape(), box, startX, startY, W, H)
    shape.draw();
    let checkState = { // Проверка состояние фигуры
        isContinue: true,
        lost: false
    };

    let matrix = [];
    let arShapes = []
    let pocketShape = undefined;
    let emptyLines = []
    let score = 0;
    let prevShape = shape.type;
    let newSh = randomShape();
    let canAddPocket = true;


    while (newSh == prevShape) {
        newSh = randomShape();
    }

    let move = setInterval(() => {
        checkState['isContinue'] = shape.moveDown();
    }, 500)
    let game = setInterval(() => {
        if (checkState['isContinue'] == false) { // Проверяем упала ли фигура
            checkState['isContinue'] = true;

            canAddPocket = true; // Если фигура упала, добавляем возможность добавить фигуру в карман (новую)

            if (checkState['lost'] == true) { // Если мы проиграли, то останавливаем игру и фигуру
                clearInterval(game);
                clearInterval(move);
            }

            matrix = field.complementMatrix(shape); // Дополняем матрицу только что упавшей фигурой
            emptyLines = field.emptyLines(); // Засовываем в массив индексы пустых линий (по у)

            arShapes.push(shape); // В массив с лежащими фигурами добавляем только что упавшую
            shape = new Shape(ctx, newSh, box, startX, startY, W, H, matrix); // Меняем фигуру на новую
            prevShape = shape.type;
            newSh = randomShape();
            while (newSh == prevShape) { // Заранее определяем следующую фигуру
                newSh = randomShape();
            }
        }
        field.clear(); // Очищаем поле
        field.printText(`Счет: ${score}`, (W - startX) / 2 + startX - 30, 50, 20); // Выводим счет
        field.printText('Next  ', 40, 110, 20); // Выводим следующую фигуру
        field.printText('Карман', W + 20, 110, 20);

        field.printText('Управление: ', W + 20, H - 4 * box, 20);
        field.printText('↑', W + 23 + box, H - 3 * box, 20);
        field.printText('← ↓ → ', W + 20, H - 2 * box, 20);
        field.printText('ctrl - добавить в карман', W + 20, H - box, 20);


        drawOtherShape(newSh, ctx, field, box, -490, 150); // Рисуем следующую фигуру
        drawOtherShape(pocketShape, ctx, field, box, W + 30, 150); // Рисуем фигуру из кармана

        arShapes = printLyingShapes(arShapes, emptyLines, field); // Выводим лежащие фигуры
        let newParams = changeScore(emptyLines, score, audio, matrix, field); // Меняем счет и матрицу
        [matrix, emptyLines, score] = [newParams.matrix, newParams.emptyLines, newParams.score]
        shape.draw(); // Рисуем фигуру
        shape.drawShadow(); // Рисуем тень фигуры (снизу)

        field.drawSquares(); // Рисуем квадраты поля
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
            case "ControlRight":
                if (canAddPocket) {
                    let newParams = addPocketShape(pocketShape, shape, newSh, ctx, box, startX, startY, W, H, matrix);
                    [pocketShape, shape, newSh] = [newParams.pocketShape, newParams.shape, newParams.newSh];
                    canAddPocket = false;
                }
                break;
            case "ControlLeft":
                if (canAddPocket) {
                    let newParams = addPocketShape(pocketShape, shape, newSh, ctx, box, startX, startY, W, H, matrix);
                    [pocketShape, shape, newSh] = [newParams.pocketShape, newParams.shape, newParams.newSh];
                    canAddPocket = false;
                }
                break;
        }
    })

}

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

function printLyingShapes(arShapes, emptyLines, field) {
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
        }
        if (sh !== undefined) {
            sh.draw();
        }
    });
    arShapes = arShapes.filter(val => val !== undefined);
    return arShapes;
}

function changeScore(emptyLines, score, audio, matrix, field) {
    if (emptyLines.length > 0) {
        switch (emptyLines.length) {
            case 1:
                score += 100;
                audio.play();
                break;
            case 2:
                score += 300;
                audio.play();
                break;
            case 3:
                score += 700;
                audio.play();
                break;
            case 4:
                score += 1500;
                audio.play();
                break;
        }
        matrix = field.deleteEmptyLines();
        emptyLines = [];
    }
    return {
        matrix,
        emptyLines,
        score
    }
}



function drawOtherShape(newSh, ctx, field, box, startX, startY) {
    if (newSh != undefined) {
        if (newSh == "O") {
            let newShape = new Shape(ctx, newSh, box, startX - box, startY);
            newShape.drawWithLines(field.lineWidth);
        } else {
            let newShape = new Shape(ctx, newSh, box, startX, startY);
            newShape.drawWithLines(field.lineWidth);
        }
    }
}

function drawPocketShape(pocketShape, ctx, field, box, startX, startY) {
    if (pocketShape == "O") {
        let newShape = new Shape(ctx, newSh, box, startX - box, startY);
        newShape.drawWithLines(field.lineWidth);
    } else {
        let newShape = new Shape(ctx, newSh, box, startX, startY);
        newShape.drawWithLines(field.lineWidth);
    }
}

function addPocketShape(pocketShape, shape, newSh, ctx, box, startX, startY, W, H, matrix) {
    if (pocketShape == undefined) {
        pocketShape = shape.type;
        let prevShape = newSh;
        shape = new Shape(ctx, newSh, box, startX, startY, W, H, matrix);
        newSh = randomShape();
        while (newSh == prevShape) { // Заранее определяем следующую фигуру
            newSh = randomShape();
        }
        return {
            pocketShape,
            shape,
            newSh
        }
    }
    let prevPocketShape = pocketShape;
    pocketShape = shape.type;
    shape = new Shape(ctx, prevPocketShape, box, startX, startY, W, H, matrix);
    return {
        pocketShape,
        shape,
        newSh
    }

}

window.onload = () => {
    setup();
}