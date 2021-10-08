class Field {
    constructor(ctx, sizeOfBox = 30, bgcColor = 'white', color = 'black', width = 600, height = 900) {
        this.ctx = ctx;
        this.sizeOfBox = sizeOfBox;
        this.bgcColor = bgcColor;
        this.color = color;
        this.width = width;
        this.height = height;
    }

    draw() {
        this.ctx.strokeStyle = this.color;
        for (let i = 0; i < this.width; i += this.sizeOfBox) {
            this.ctx.beginPath();
            this.ctx.moveTo(i, 0);
            this.ctx.lineTo(i, this.height);
            this.ctx.stroke();
        }
        for (let i = 0; i < this.height; i += this.sizeOfBox) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(this.width, i);
            this.ctx.stroke();
        }
    }
    clear() {
        this.ctx.fillStyle = this.bgcColor;
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.draw();
    }

    drawMatrix(matrix) {
        if (matrix != undefined && matrix.length > 0) {
            for (let i = 0; i < matrix.length; i++) {
                for (let j = 0; j < matrix[i].length; j++) {
                    if (matrix[i][j] == 1) {
                        this.ctx.fillStyle = "grey";
                        this.ctx.fillRect(i * this.sizeOfBox, j * this.sizeOfBox, this.sizeOfBox, this.sizeOfBox);
                    }
                }
            }
        }

    }

}