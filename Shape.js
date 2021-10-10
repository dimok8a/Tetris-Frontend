class Shape {
    constructor(ctx, type = "O", boxSize = 30, startX = 0, startY = 0, fieldWidth = 630, fieldHeight = 900, matrix) {
        this.ctx = ctx;
        this.type = type;
        this.coords = {
            x: new Array(4).fill(0),
            y: new Array(4).fill(0)
        }
        this.startX = startX;
        this.startY = startY;
        switch (type) {
            case "O":
                this.color = 'yellow'
                this.coords['x'][0] = this.startX + (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][1] = this.startX + (Math.floor(fieldWidth / boxSize / 2) + 1) * boxSize
                this.coords['x'][2] = this.startX + (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][3] = this.startX + (Math.floor(fieldWidth / boxSize / 2) + 1) * boxSize
                this.coords['y'][0] = this.startY;
                this.coords['y'][1] = this.startY;
                this.coords['y'][2] = this.startY + boxSize;
                this.coords['y'][3] = this.startY + boxSize;
                break;
            case "I":
                this.color = 'cyan'
                this.coords['x'][0] = this.startX + (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][1] = this.startX + (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][2] = this.startX + (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][3] = this.startX + (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['y'][0] = this.startY;
                this.coords['y'][1] = this.startY + boxSize;
                this.coords['y'][2] = this.startY + 2 * boxSize;
                this.coords['y'][3] = this.startY + 3 * boxSize;
                break;
            case "T":
                this.color = 'magenta'
                this.coords['x'][0] = this.startX + (Math.floor(fieldWidth / boxSize / 2) - 1) * boxSize
                this.coords['x'][1] = this.startX + (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][2] = this.startX + (Math.floor(fieldWidth / boxSize / 2) + 1) * boxSize
                this.coords['x'][3] = this.startX + (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['y'][0] = this.startY;
                this.coords['y'][1] = this.startY;
                this.coords['y'][2] = this.startY;
                this.coords['y'][3] = this.startY + boxSize;
                break;
            case "J":
                this.color = 'blue'
                this.coords['x'][0] = this.startX + (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][1] = this.startX + (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][2] = this.startX + (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][3] = this.startX + (Math.floor(fieldWidth / boxSize / 2) - 1) * boxSize
                this.coords['y'][0] = this.startY;
                this.coords['y'][1] = this.startY + boxSize;
                this.coords['y'][2] = this.startY + 2 * boxSize;
                this.coords['y'][3] = this.startY + 2 * boxSize;
                break;
            case "L":
                this.color = 'orange'
                this.coords['x'][0] = this.startX + (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][1] = this.startX + (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][2] = this.startX + (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][3] = this.startX + (Math.floor(fieldWidth / boxSize / 2) + 1) * boxSize
                this.coords['y'][0] = this.startY;
                this.coords['y'][1] = this.startY + boxSize;
                this.coords['y'][2] = this.startY + 2 * boxSize;
                this.coords['y'][3] = this.startY + 2 * boxSize;
                break;
            case "S":
                this.color = 'lime'
                this.coords['x'][0] = this.startX + (Math.floor(fieldWidth / boxSize / 2) + 1) * boxSize
                this.coords['x'][1] = this.startX + (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][2] = this.startX + (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][3] = this.startX + (Math.floor(fieldWidth / boxSize / 2) - 1) * boxSize
                this.coords['y'][0] = this.startY;
                this.coords['y'][1] = this.startY;
                this.coords['y'][2] = this.startY + boxSize;
                this.coords['y'][3] = this.startY + boxSize;
                break;
            case "Z":
                this.color = 'red'
                this.coords['x'][0] = this.startX + (Math.floor(fieldWidth / boxSize / 2) - 1) * boxSize
                this.coords['x'][1] = this.startX + (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][2] = this.startX + (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][3] = this.startX + (Math.floor(fieldWidth / boxSize / 2) + 1) * boxSize
                this.coords['y'][0] = this.startY;
                this.coords['y'][1] = this.startY;
                this.coords['y'][2] = this.startY + boxSize;
                this.coords['y'][3] = this.startY + boxSize;
                break;
        }
        this.boxSize = boxSize;
        this.matrix = matrix || new Array(fieldHeight / boxSize).fill(0).map(() => {
            return new Array(fieldWidth / boxSize).fill(0)
        });
        if (!this.checkLose()) {
            let a = confirm('You lost! Restart?');
            if (a) {
                document.location.reload();
            }
            return {
                isContinue: true,
                lost: true
            }
        }
        this.stop = false;
        this.fieldHeight = fieldHeight;
        this.fieldWidth = fieldWidth;
    }



    needToDelete(emptyLines) { // Удаляет клетки фигуры, если они соответствуют индексам пустых линий
        emptyLines.forEach(valEmpty => {
            this.coords['y'].forEach((valY, ind) => {
                if (valEmpty == (valY - this.startY) / this.boxSize) {
                    delete this.coords['y'][ind];
                    delete this.coords['x'][ind];
                }
            })
        })
    }

    isEmpty() { // Проверяет, остались ли в фигуре клетки
        if (this.coords['x'].every(val => {
                isNaN(val) == true
            })) {
            return true;
        }
        return false;
    }

    matrixFilter(matrix, emptyLines) {
        let tmpMatrix = matrix;
        emptyLines.forEach(val => {
            for (let i = val; i > 0; i--) {
                tmpMatrix[i] = tmpMatrix[i - 1]
            }
        })
        return tmpMatrix;
    }
    draw() {
        for (let i = 0; i < this.coords['x'].length; i++) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = 'black';
            this.ctx.fillStyle = this.color;
            this.ctx.strokeRect(this.coords['x'][i], this.coords['y'][i], this.boxSize, this.boxSize);
            this.ctx.fillRect(this.coords['x'][i], this.coords['y'][i], this.boxSize, this.boxSize);
            this.ctx.stroke();
            // this.ctx.fillStyle = "red";
            // this.ctx.fillText(i, this.coords['x'][i], this.coords['y'][i]);
        }
    }
    findMaxY() {
        let maxY = this.coords['y'][0];
        for (let i = 0; i < this.coords['x'].length; i++) {
            if (this.coords['y'][i] > maxY) {
                maxY = this.coords['y'][i]
            }
        }
        return maxY;
    }
    findMinY() {
        let minY = this.coords['y'][0];
        for (let i = 0; i < this.coords['x'].length; i++) {
            if (this.coords['y'][i] < minY) {
                minY = this.coords['y'][i]
            }
        }
        return minY;
    }
    findMinX() {
        let minX = this.coords['x'][0];
        for (let i = 0; i < this.coords['x'].length; i++) {
            if (this.coords['x'][i] < minX) {
                minX = this.coords['x'][i]
            }
        }
        return minX;
    }

    findMaxX() { // Находит максимальный х у фигуры
        let maxX = this.coords['x'][0];
        for (let i = 0; i < this.coords['x'].length; i++) {
            if (this.coords['x'][i] > maxX) {
                maxX = this.coords['x'][i]
            }
        }
        return maxX;
    }

    checkMatrix() { // Проверяет нет ли в фигуре других фигур
        const maxY = this.findMaxY();
        const ind = this.coords['y'].indexOf(maxY);
        if ((maxY - this.startY) / this.boxSize >= this.matrix.length) {
            return false;
        }
        if (this.matrix[(maxY - this.startY) / this.boxSize][this.coords['x'][ind] - this.startX / this.boxSize] == 1) {
            return false;
        }
        for (let i = 0; i < this.coords['x'].length; i++) {
            if (isNaN(this.coords['x'][i]) == false && (this.coords['y'][i] - this.startY) / this.boxSize > 0) {
                if (this.matrix[(this.coords['y'][i] - this.startY) / this.boxSize][(this.coords['x'][i] - this.startX) / this.boxSize] == 1) {
                    return false;
                }
            }
        }
        return true;
    }

    checkLose() { // Проверяет, проиграл ли пользователь
        const maxY = this.findMaxY();
        const ind = this.coords['y'].indexOf(maxY);
        if ((maxY - this.startY) / this.boxSize < this.matrix.length) {
            if (this.matrix[(maxY - this.startY) / this.boxSize][(this.coords['x'][ind] - this.startX) / this.boxSize] == 1) {
                return false;
            }
        }
        return true;
    }

    checkMatrixDown() { // Проверяет, есть ли под фигурой еще фигуры
        for (let i = 0; i < this.coords['y'].length; i++) {
            if (isNaN(this.coords['y'][i]) == false) {
                if ((this.coords['y'][i] - this.startY) / this.boxSize + 1 < this.matrix.length) {
                    if (this.matrix[(this.coords['y'][i] - this.startY) / this.boxSize + 1][(this.coords['x'][i] - this.startX) / this.boxSize] == 1) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        }
        return true;
    }

    checkMatrixLeft() { // Проверяет есть ли слева от фигуры еще фигуры
        for (let i = 0; i < this.coords['x'].length; i++) {
            if (this.matrix[(this.coords['y'][i] - this.startY) / this.boxSize][(this.coords['x'][i] - this.startX) / this.boxSize - 1] == 1) {
                return false;
            }
        }
        return true;
    }

    checkMatrixRight() {
        for (let i = 0; i < this.coords['x'].length; i++) {
            if (this.matrix[(this.coords['y'][i] - this.startY) / this.boxSize][(this.coords['x'][i] - this.startX) / this.boxSize + 1] == 1) {
                return false;
            }
        }
        return true;
    }

    moveDown() { // Движение фигуры вниз (возвращает true - движется дальше, false - остановка)
        let maxY = this.findMaxY();
        if (maxY < this.fieldHeight - this.boxSize && this.checkMatrixDown() == true) { // Если не вышли за пределы и внизу нет фигуры, продолжаем движение
            for (let i = 0; i < this.coords['x'].length; i++) {
                this.coords['y'][i] += this.boxSize;
            }
            return true;
        } else {
            // console.log(maxY < this.fieldHeight - this.boxSize, this.checkMatrixDown());
            // let tmpMatrix = this.matrix; // Иначе возвращаем матрицу фигур
            // for (let i = 0; i < this.coords['x'].length; i++) {
            //     tmpMatrix[this.coords['y'][i] / this.boxSize][this.coords['x'][i] / this.boxSize] = 1;
            // }
            return false;
        }
    }

    checkMatrixDownBox(i) {

        if ((this.coords['y'][i] - this.startY) / this.boxSize + 1 < this.matrix.length) {
            if (this.matrix[(this.coords['y'][i] - this.startY) / this.boxSize + 1][(this.coords['x'][i] - this.startX) / this.boxSize] == 1) {
                // console.log('ret1');
                return false;
            }
        } else {
            // console.log(this.coords['y'][i] / this.boxSize + 1);
            return false;
        }
        return true;
    }

    goDown(empty) { // Движение частичек вниз
        for (let i = 0; i < this.coords['x'].length; i++) {
            if (isNaN(this.coords['y'][i]) == false) {
                if ((this.coords['y'][i] - this.startY) / this.boxSize < empty) {
                    if (this.checkMatrixDownBox(i)) {
                        this.coords['y'][i] += this.boxSize;
                    }
                }
            }
        }
    }

    moveLeft() {
        let minX = this.findMinX();
        if (minX > this.startX && this.checkMatrixLeft()) { // Если минимальный х фигуры больше 0 и слева нет фигуры
            for (let i = 0; i < this.coords['x'].length; i++) {
                this.coords['x'][i] -= this.boxSize;
            }
        }
    }

    moveRight() {
        let maxX = this.findMaxX();
        if (maxX < this.fieldWidth - this.boxSize && this.checkMatrixRight()) { // Если справа нет фигуры и не выходим за границу
            for (let i = 0; i < this.coords['x'].length; i++) {
                this.coords['x'][i] += this.boxSize;
            }
        }
    }

    checkCoords() {
        for (let i = 0; i < this.coords['x'].length; i++) {
            if (this.coords['x'][i] < this.startX) {
                return false
            }
            if (this.coords['x'][i] >= this.fieldWidth) {
                return false
            }
            if (this.coords['y'][i] < this.startY) {
                return false
            }
            if (this.coords['y'][i] >= this.fieldHeight) {
                return false
            }
        }
        return true;
    }

    turnOver() {
        switch (this.type) {
            case "I":
                const newI = new Shape(this.ctx, "I", this.boxSize, this.startX, this.startY, this.fieldWidth, this.fieldHeight, this.matrix);
                if (this.coords['x'][0] !== this.coords['x'][1]) {
                    newI.coords = {
                        x: new Array(4).fill(this.coords['x'][2]),
                        y: [this.coords['y'][0] - this.boxSize, this.coords['y'][0], this.coords['y'][0] + this.boxSize, this.coords['y'][0] + 2 * this.boxSize]
                    }
                    if (newI.checkMatrix() && newI.checkCoords()) {
                        this.coords = newI.coords
                    }
                } else {
                    newI.coords = {
                        x: [this.coords['x'][0] - this.boxSize * 2, this.coords['x'][0] - this.boxSize, this.coords['x'][0], this.coords['x'][0] + this.boxSize],
                        y: new Array(4).fill(this.coords['y'][2])
                    }
                    if (newI.checkMatrix() && newI.checkCoords()) {
                        this.coords = newI.coords;
                    }
                }
                break;
            case "S":
                let newS = new Shape(this.ctx, "S", this.boxSize, this.startX, this.startY, this.fieldWidth, this.fieldHeight, this.matrix);
                if (this.coords['y'][0] == this.coords['y'][1]) {
                    newS.coords = {
                        x: [this.coords['x'][1], this.coords['x'][1], this.coords['x'][0], this.coords['x'][0]],
                        y: [this.coords['y'][0] - this.boxSize, this.coords['y'][1], this.coords['y'][1], this.coords['y'][3]]
                    }
                    if (newS.checkMatrix() && newS.checkCoords()) {
                        this.coords = newS.coords;
                    }
                } else {
                    newS.coords = {
                        x: [this.coords['x'][2], this.coords['x'][1], this.coords['x'][1], this.coords['x'][1] - this.boxSize],
                        y: [this.coords['y'][1], this.coords['y'][1], this.coords['y'][3], this.coords['y'][3]]
                    }
                    if (newS.checkMatrix() && newS.checkCoords()) {
                        this.coords = newS.coords;
                    }
                }
                break;
            case "Z":
                let newZ = new Shape(this.ctx, "Z", this.boxSize, this.startX, this.startY, this.fieldWidth, this.fieldHeight, this.matrix);
                if (this.coords['y'][0] == this.coords['y'][1]) {
                    newZ.coords = {
                        x: [this.coords['x'][3], this.coords['x'][3], this.coords['x'][1], this.coords['x'][2]],
                        y: [this.coords['y'][0] - this.boxSize, this.coords['y'][1], this.coords['y'][1], this.coords['y'][2]]
                    }
                    if (newZ.checkMatrix() && newZ.checkCoords()) {
                        this.coords = newZ.coords;
                    }
                } else {
                    newZ.coords = {
                        x: [this.coords['x'][2] - this.boxSize, this.coords['x'][2], this.coords['x'][2], this.coords['x'][2] + this.boxSize],
                        y: [this.coords['y'][1], this.coords['y'][1], this.coords['y'][3], this.coords['y'][3]]
                    }
                    if (newZ.checkMatrix() && newZ.checkCoords()) {
                        this.coords = newZ.coords;
                    }
                }
                break;
            case "L":
                let newL = new Shape(this.ctx, "L", this.boxSize, this.startX, this.startY, this.fieldWidth, this.fieldHeight, this.matrix);
                if (this.coords['x'][0] == this.coords['x'][1] && this.coords['x'][1] == this.coords['x'][2]) {
                    newL.coords = {
                        x: [this.coords['x'][0] - this.boxSize, this.coords['x'][0] - this.boxSize, this.coords['x'][1], this.coords['x'][3]],
                        y: [this.coords['y'][2], this.coords['y'][1], this.coords['y'][1], this.coords['y'][1]]
                    }
                    if (newL.checkMatrix() && newL.checkCoords()) {
                        this.coords = newL.coords;
                        return;
                    }
                } else if (this.coords['x'][0] == this.coords['x'][1] && this.coords['y'][0] - this.coords['y'][1] == this.boxSize) {
                    newL.coords = {
                        x: [this.coords['x'][0], this.coords['x'][2], this.coords['x'][2], this.coords['x'][2]],
                        y: [this.coords['y'][1] - this.boxSize, this.coords['y'][1] - this.boxSize, this.coords['y'][2], this.coords['y'][0]]
                    }
                    if (newL.checkMatrix() && newL.checkCoords()) {
                        this.coords = newL.coords;
                        return;
                    }
                } else if (this.coords['x'][1] == this.coords['x'][2] && this.coords['x'][2] == this.coords['x'][3]) {
                    newL.coords = {
                        x: [this.coords['x'][1] + this.boxSize, this.coords['x'][1] + this.boxSize, this.coords['x'][2], this.coords['x'][0]],
                        y: [this.coords['y'][0], this.coords['y'][2], this.coords['y'][2], this.coords['y'][2]]
                    }
                    if (newL.checkMatrix() && newL.checkCoords()) {
                        this.coords = newL.coords;
                        return;
                    }
                } else {
                    newL.coords = {
                        x: [this.coords['x'][2], this.coords['x'][2], this.coords['x'][2], this.coords['x'][0]],
                        y: [this.coords['y'][0], this.coords['y'][1], this.coords['y'][1] + this.boxSize, this.coords['y'][1] + this.boxSize]
                    }
                    if (newL.checkMatrix() && newL.checkCoords()) {
                        this.coords = newL.coords;
                        return;
                    }
                }
                break;
            case "J":
                let newJ = new Shape(this.ctx, "J", this.boxSize, this.startX, this.startY, this.fieldWidth, this.fieldHeight, this.matrix);
                if (this.coords['x'][0] == this.coords['x'][1] && this.coords['x'][1] == this.coords['x'][2]) {
                    newJ.coords = {
                        x: [this.coords['x'][0] + this.boxSize, this.coords['x'][1], this.coords['x'][1] - this.boxSize, this.coords['x'][3]],
                        y: [this.coords['y'][1], this.coords['y'][1], this.coords['y'][1], this.coords['y'][0]]
                    }
                    if (newJ.checkMatrix() && newJ.checkCoords()) {
                        this.coords = newJ.coords;
                        return;
                    }
                } else if (this.coords['y'][1] == this.coords['y'][2] && this.coords['x'][2] == this.coords['x'][3]) {
                    newJ.coords = {
                        x: [this.coords['x'][1], this.coords['x'][1], this.coords['x'][1], this.coords['x'][0]],
                        y: [this.coords['y'][0] + this.boxSize, this.coords['y'][1], this.coords['y'][3], this.coords['y'][3]]
                    }
                    if (newJ.checkMatrix() && newJ.checkCoords()) {
                        this.coords = newJ.coords;
                        return;
                    }
                } else if (this.coords['x'][1] == this.coords['x'][2] && this.coords['y'][2] == this.coords['y'][3]) {
                    newJ.coords = {
                        x: [this.coords['x'][0] - this.boxSize, this.coords['x'][1], this.coords['x'][1] + this.boxSize, this.coords['x'][3]],
                        y: [this.coords['y'][1], this.coords['y'][1], this.coords['y'][1], this.coords['y'][0]]
                    }
                    if (newJ.checkMatrix() && newJ.checkCoords()) {
                        this.coords = newJ.coords;
                        return;
                    }
                } else {
                    newJ.coords = { //переделать!!!
                        x: [this.coords['x'][1], this.coords['x'][1], this.coords['x'][1], this.coords['x'][1] - this.boxSize],
                        y: [this.coords['y'][0] - this.boxSize, this.coords['y'][1], this.coords['y'][1] + this.boxSize, this.coords['y'][3]]
                    }
                    if (newJ.checkMatrix() && newJ.checkCoords()) {
                        this.coords = newJ.coords;
                        return;
                    }
                }
                break;
            case "T":
                let newT = new Shape(this.ctx, "T", this.boxSize, this.startX, this.startY, this.fieldWidth, this.fieldHeight, this.matrix);
                if (this.coords['y'][3] - this.coords['y'][1] == this.boxSize) {
                    newT.coords = {
                        x: [this.coords['x'][1], this.coords['x'][1], this.coords['x'][1], this.coords['x'][1] - this.boxSize],
                        y: [this.coords['y'][1] - this.boxSize, this.coords['y'][1], this.coords['y'][1] + this.boxSize, this.coords['y'][1]]
                    }
                    if (newT.checkMatrix() && newT.checkCoords()) {
                        this.coords = newT.coords;
                        return;
                    }
                } else if (this.coords['x'][1] - this.coords['x'][3] == this.boxSize) {
                    newT.coords = {
                        x: [this.coords['x'][1] + this.boxSize, this.coords['x'][1], this.coords['x'][1] - this.boxSize, this.coords['x'][1]],
                        y: [this.coords['y'][1], this.coords['y'][1], this.coords['y'][1], this.coords['y'][1] - this.boxSize]
                    }
                    if (newT.checkMatrix() && newT.checkCoords()) {
                        this.coords = newT.coords;
                        return;
                    }
                } else if (this.coords['y'][1] - this.coords['y'][3] == this.boxSize) {
                    newT.coords = {
                        x: [this.coords['x'][1], this.coords['x'][1], this.coords['x'][1], this.coords['x'][1] + this.boxSize],
                        y: [this.coords['y'][1] + this.boxSize, this.coords['y'][1], this.coords['y'][1] - this.boxSize, this.coords['y'][1]]
                    }
                    if (newT.checkMatrix() && newT.checkCoords()) {
                        this.coords = newT.coords;
                        return;
                    }
                } else {
                    newT.coords = {
                        x: [this.coords['x'][1] - this.boxSize, this.coords['x'][1], this.coords['x'][1] + this.boxSize, this.coords['x'][1]],
                        y: [this.coords['y'][1], this.coords['y'][1], this.coords['y'][1], this.coords['y'][1] + this.boxSize]
                    }
                    if (newT.checkMatrix() && newT.checkCoords()) {
                        this.coords = newT.coords;
                        return;
                    }
                }
                break;
            default:
                return false;

        }
    }

}