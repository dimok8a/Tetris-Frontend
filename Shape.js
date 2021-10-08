class Shape {
    constructor(ctx, type = "O", boxSize = 30, fieldWidth = 630, fieldHeight = 900, matrix) {
        this.ctx = ctx;
        this.type = type;
        this.coords = {
            x: new Array(4).fill(0),
            y: new Array(4).fill(0)
        }
        switch (type) {
            case "O":
                this.color = 'yellow'
                this.coords['x'][0] = (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][1] = (Math.floor(fieldWidth / boxSize / 2) + 1) * boxSize
                this.coords['x'][2] = (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][3] = (Math.floor(fieldWidth / boxSize / 2) + 1) * boxSize
                this.coords['y'][0] = (fieldHeight / boxSize - 30) * boxSize;
                this.coords['y'][1] = (fieldHeight / boxSize - 30) * boxSize;
                this.coords['y'][2] = (fieldHeight / boxSize - 29) * boxSize;
                this.coords['y'][3] = (fieldHeight / boxSize - 29) * boxSize;
                break;
            case "I":
                this.color = 'cyan'
                this.coords['x'][0] = (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][1] = (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][2] = (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][3] = (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['y'][0] = (fieldHeight / boxSize - 30) * boxSize;
                this.coords['y'][1] = (fieldHeight / boxSize - 29) * boxSize;
                this.coords['y'][2] = (fieldHeight / boxSize - 28) * boxSize;
                this.coords['y'][3] = (fieldHeight / boxSize - 27) * boxSize;
                break;
            case "T":
                this.color = 'magenta'
                this.coords['x'][0] = (Math.floor(fieldWidth / boxSize / 2) - 1) * boxSize
                this.coords['x'][1] = (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][2] = (Math.floor(fieldWidth / boxSize / 2) + 1) * boxSize
                this.coords['x'][3] = (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['y'][0] = (fieldHeight / boxSize - 30) * boxSize;
                this.coords['y'][1] = (fieldHeight / boxSize - 30) * boxSize;
                this.coords['y'][2] = (fieldHeight / boxSize - 30) * boxSize;
                this.coords['y'][3] = (fieldHeight / boxSize - 29) * boxSize;
                break;
            case "J":
                this.color = 'blue'
                this.coords['x'][0] = (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][1] = (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][2] = (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][3] = (Math.floor(fieldWidth / boxSize / 2) - 1) * boxSize
                this.coords['y'][0] = (fieldHeight / boxSize - 30) * boxSize;
                this.coords['y'][1] = (fieldHeight / boxSize - 29) * boxSize;
                this.coords['y'][2] = (fieldHeight / boxSize - 28) * boxSize;
                this.coords['y'][3] = (fieldHeight / boxSize - 28) * boxSize;
                break;
            case "L":
                this.color = 'orange'
                this.coords['x'][0] = (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][1] = (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][2] = (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][3] = (Math.floor(fieldWidth / boxSize / 2) + 1) * boxSize
                this.coords['y'][0] = (fieldHeight / boxSize - 30) * boxSize;
                this.coords['y'][1] = (fieldHeight / boxSize - 29) * boxSize;
                this.coords['y'][2] = (fieldHeight / boxSize - 28) * boxSize;
                this.coords['y'][3] = (fieldHeight / boxSize - 28) * boxSize;
                break;
            case "S":
                this.color = 'lime'
                this.coords['x'][0] = (Math.floor(fieldWidth / boxSize / 2) + 1) * boxSize
                this.coords['x'][1] = (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][2] = (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][3] = (Math.floor(fieldWidth / boxSize / 2) - 1) * boxSize
                this.coords['y'][0] = (fieldHeight / boxSize - 30) * boxSize;
                this.coords['y'][1] = (fieldHeight / boxSize - 30) * boxSize;
                this.coords['y'][2] = (fieldHeight / boxSize - 29) * boxSize;
                this.coords['y'][3] = (fieldHeight / boxSize - 29) * boxSize;
                break;
            case "Z":
                this.color = 'red'
                this.coords['x'][0] = (Math.floor(fieldWidth / boxSize / 2) - 1) * boxSize
                this.coords['x'][1] = (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][2] = (Math.floor(fieldWidth / boxSize / 2)) * boxSize
                this.coords['x'][3] = (Math.floor(fieldWidth / boxSize / 2) + 1) * boxSize
                this.coords['y'][0] = (fieldHeight / boxSize - 30) * boxSize;
                this.coords['y'][1] = (fieldHeight / boxSize - 30) * boxSize;
                this.coords['y'][2] = (fieldHeight / boxSize - 29) * boxSize;
                this.coords['y'][3] = (fieldHeight / boxSize - 29) * boxSize;
                break;
        }
        this.boxSize = boxSize;
        this.matrix = matrix || new Array(fieldHeight / boxSize).fill(0).map(() => {
            return new Array(fieldWidth / boxSize).fill(0)
        });
        if (!this.checkMatrix()) {
            confirm('You lost! Restart?');
            document.location.reload();
            return {
                isStopped: true,
                lost: true
            }
        }
        this.stop = false;
        this.fieldHeight = fieldHeight;
        this.fieldWidth = fieldWidth;
    }

    draw() {
        for (let i = 0; i < this.coords['x'].length; i++) {
            this.ctx.strokeStyle = 'black';
            this.ctx.fillStyle = this.color;
            this.ctx.strokeRect(this.coords['x'][i], this.coords['y'][i], this.boxSize, this.boxSize);
            this.ctx.fillRect(this.coords['x'][i], this.coords['y'][i], this.boxSize, this.boxSize);
            this.ctx.fillStyle = "red";
            this.ctx.fillText(i, this.coords['x'][i], this.coords['y'][i]);

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
        for (let i = 0; i < this.coords['x'].length; i++) {
            if (this.matrix[this.coords['x'][i] / this.boxSize] == undefined) {
                return false;
            }
            if (this.matrix[this.coords['x'][i] / this.boxSize][this.coords['y'][i] / this.boxSize] == 1) {
                return false;
            }
        }
        return true;
    }

    checkMatrixDown() { // Проверяет, есть ли под фигурой еще фигуры
        for (let i = 0; i < this.coords['x'].length; i++) {
            if (this.matrix[this.coords['x'][i] / this.boxSize][this.coords['y'][i] / this.boxSize + 1] == 1) {
                return false;
            }
        }
        return true;
    }

    checkMatrixLeft() { // Проверяет есть ли слева от фигуры еще фигуры
        for (let i = 0; i < this.coords['x'].length; i++) {
            if (this.matrix[this.coords['x'][i] / this.boxSize - 1][this.coords['y'][i] / this.boxSize] == 1) {
                return false;
            }
        }
        return true;
    }

    checkMatrixRight() {
        for (let i = 0; i < this.coords['x'].length; i++) {
            if (this.matrix[this.coords['x'][i] / this.boxSize + 1][this.coords['y'][i] / this.boxSize] == 1) {
                return false;
            }
        }
        return true;
    }

    moveDown() { // Движение фигуры вниз
        let maxY = this.findMaxY();
        if (maxY < this.fieldHeight - this.boxSize && this.checkMatrixDown() == true) { // Если не вышли за пределы и внизу нет фигуры, продолжаем движение
            for (let i = 0; i < this.coords['x'].length; i++) {
                this.coords['y'][i] += this.boxSize;
            }
            return {
                isStopped: false
            }
        } else {
            let tmpMatrix = this.matrix; // Иначе возвращаем матрицу фигур
            for (let i = 0; i < this.coords['x'].length; i++) {
                tmpMatrix[this.coords['x'][i] / this.boxSize][this.coords['y'][i] / this.boxSize] = 1;
            }
            this.stop = true;
            return {
                matrix: tmpMatrix,
                isStopped: true
            };
        }
    }

    moveLeft() {
        let minX = this.findMinX();
        if (minX > 0 && this.checkMatrixLeft()) { // Если минимальный х фигуры больше 0 и слева нет фигуры
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
            if (this.coords['x'][i] < 0) {
                return false
            }
            if (this.coords['x'][i] >= this.fieldWidth) {
                return false
            }
            if (this.coords['y'][i] < 0) {
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
                const newI = new Shape(this.ctx, "I", this.boxSize, this.fieldWidth, this.fieldHeight, this.matrix);
                if (this.coords['x'][0] !== this.coords['x'][1]) {
                    newI.coords = {
                        x: new Array(4).fill(this.coords['x'][2]),
                        y: [this.coords['y'][0] - this.boxSize, this.coords['y'][0], this.coords['y'][0] + this.boxSize, this.coords['y'][0] + 2 * this.boxSize]
                    }
                    if (newI.checkMatrix() == true) {
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
                let newS = new Shape(this.ctx, "S", this.boxSize, this.fieldWidth, this.fieldHeight, this.matrix);
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
                let newZ = new Shape(this.ctx, "Z", this.boxSize, this.fieldWidth, this.fieldHeight, this.matrix);
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
                let newL = new Shape(this.ctx, "L", this.boxSize, this.fieldWidth, this.fieldHeight, this.matrix);
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
            default:
                return false;

        }
    }

}