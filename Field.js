class Field {
    constructor(ctx, sizeOfBox = 30, matrix, bgcColor = 'white', color = 'black', startX = 0, startY = 0, width = 600, height = 900, lineWidth = 2, additWidth = 300, additHeight = 10) {
        this.ctx = ctx;
        this.sizeOfBox = sizeOfBox;
        this.matrix = matrix || new Array((height - startY) / sizeOfBox).fill(0).map(() => {
            return new Array((width - startX) / sizeOfBox).fill(0)
        });
        this.bgcColor = bgcColor;
        this.color = color;
        this.startX = startX;
        this.startY = startY;
        this.width = width;
        this.height = height;
        this.lineWidth = lineWidth;
        this.additWidth = additWidth;
        this.additHeight = additHeight;
    }

    drawSquares() {
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.lineWidth;
        for (let i = this.startX; i <= this.width; i += this.sizeOfBox) {
            this.ctx.beginPath();
            this.ctx.moveTo(i, this.startY);
            this.ctx.lineTo(i, this.height);
            this.ctx.stroke();
        }
        for (let i = this.startY; i <= this.height; i += this.sizeOfBox) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.startX, i);
            this.ctx.lineTo(this.width, i);
            this.ctx.stroke();
        }
        // this.ctx.lineWidth = this.lineWidth * 2;
        // this.ctx.beginPath()
        // this.ctx.moveTo(this.width, this.startY);
        // this.ctx.lineTo(this.width, this.height);
        // this.ctx.lineTo(this.startX, this.height);
        // this.ctx.stroke();
    }

    printText(text = "Sample text", x = 0, y = 0, size = 20, color = "black") {
        this.ctx.fillStyle = color;
        this.ctx.font = `italic ${size}pt Roboto`;
        this.ctx.fillText(text, x, y, this.width / 2);
    }

    clear() {
        this.ctx.beginPath()
        this.ctx.fillStyle = this.bgcColor;
        this.ctx.fillRect(0, 0, this.width + this.additWidth, this.height + this.additHeight);
        this.ctx.stroke();
    }


    emptyLines() {
        const emptyLines = [];
        if (this.matrix && this.matrix.length > 1) {
            this.matrix.forEach((val, ind) => {
                if (val.every(elem => elem == 1)) {
                    emptyLines.push(ind);
                }
            });
        }
        return emptyLines;
    }
    deleteEmptyLines() { // Удаляет пустые линии матрицы
        const emptyLines = this.emptyLines();
        if (emptyLines.length > 0) {
            emptyLines.forEach(val => {
                for (let i = val; i > 0; i--) {
                    this.matrix[i] = this.matrix[i - 1]
                }
            })
        }
        return this.matrix;
    }

    createTmpMatrix(shape) { // Создает матрицу без указанной фигуры
        let tmpMatrix = this.createEmptyTmpMatrix();
        if (tmpMatrix) {
            for (let i = 0; i < shape.coords['x'].length; i++) {
                if (shape.coords['y'][i]) {
                    tmpMatrix[(shape.coords['y'][i] - this.startY) / shape.boxSize][(shape.coords['x'][i] - this.startX) / shape.boxSize] = 0;
                }
            }
        }
        return tmpMatrix;
    }

    createEmptyTmpMatrix() { // Создает матрицу с пустыми линиями (нулями)
        const emptyLines = this.emptyLines();
        let tmpMatrix = this.matrix;
        if (emptyLines.length > 0) {
            emptyLines.forEach(val => {
                tmpMatrix[val] = new Array(this.matrix[0].length).fill(0);
            })
        }
        return tmpMatrix;
    }

    complementMatrix(shape) { // Дополняет готовую матрицу указанной фигурой (единицами)
        if (this.matrix) {
            for (let i = 0; i < shape.coords['y'].length; i++) {
                if (isNaN(shape.coords['y'][i]) == false && isNaN(shape.coords['x'][i]) == false) {
                    this.matrix[(shape.coords['y'][i] - this.startY) / shape.boxSize][(shape.coords['x'][i] - this.startX) / shape.boxSize] = 1;
                }
            }
        }
        return this.matrix;
    }

}