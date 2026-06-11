const game = {
    canvas: document.getElementById("canvas"),
    context: null,
    bird: new Image(),
    background: new Image(),
    column1: new Image(),
    column2: new Image(),
    gap: 150,
    columns: [],
    score: 0,
    xPos: 10,
    yPos: 150,
    grav: 1.5,
    isGameOver: false,

    init() {
        this.context = this.canvas.getContext("2d");
        document.addEventListener("keydown", () => this.fly());
        this.loadImages();
    },

    loadImages() {
        let loadedCount = 0;
        const images = [this.bird, this.background, this.column1, this.column2];
        
        const onImageLoad = () => {
            loadedCount++;
            if (loadedCount === images.length) {
                this.createColumn();
                requestAnimationFrame(() => this.draw());
            }
        };

        this.bird.onload = onImageLoad;
        this.background.onload = onImageLoad;
        this.column1.onload = onImageLoad;
        this.column2.onload = onImageLoad;

        this.bird.src = "bird.png";
        this.background.src = "background.png";
        this.column1.src = "col1.png";
        this.column2.src = "col2.png";
    },

    createColumn() {
        const minHeight = 50;
        const maxHeight = this.canvas.height - this.gap - minHeight;
        const columnHeight = Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight;
        
        this.columns.push({ 
            x: this.canvas.width, 
            y: columnHeight - this.column1.height 
        });
    },

    fly() {
        if (!this.isGameOver) {
            this.yPos -= 45;
        }
    },

    draw() {
        if (this.isGameOver) return this.restart();

        this.context.drawImage(this.background, 0, 0);

        for (let i = 0; i < this.columns.length; i++) {
            const col = this.columns[i];
            
            this.context.drawImage(this.column1, col.x, col.y);
            this.context.drawImage(this.column2, col.x, col.y + this.column1.height + this.gap);
            
            col.x -= 2;

            if (col.x === 120) {
                this.createColumn();
            }

            if (col.x === 0) {
                this.score++;
            }

            if (this.isColliding(col)) {
                this.isGameOver = true;
            }
        }

        if (this.columns.length > 0 && this.columns[0].x < -this.column1.width) {
            this.columns.shift();
        }

        this.context.drawImage(this.bird, this.xPos, this.yPos);
        this.yPos += this.grav;

        this.context.fillStyle = "#000";
        this.context.font = "24px Calibri";
        this.context.fillText("Счет: " + this.score, 10, 40);

        requestAnimationFrame(() => this.draw());
    },

    isColliding(column) {
        const hitBottom = this.yPos + this.bird.height >= this.canvas.height;
        const hitTop = this.yPos <= 0;
        
        const hitColumn = this.xPos + this.bird.width >= column.x && 
                          this.xPos <= column.x + this.column1.width && 
                          (this.yPos <= column.y + this.column1.height || 
                           this.yPos + this.bird.height >= column.y + this.column1.height + this.gap);

        return hitBottom || hitTop || hitColumn;
    },

    restart() {
        location.reload();
    }
};

game.init();