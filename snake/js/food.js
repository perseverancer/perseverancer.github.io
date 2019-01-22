function Food(snake) {
    this.height = 25;
    this.width = 25;
    this.snakeStep = 25;
    this.snakeStepW = snake.stepW;
    this.snakeStepH = snake.stepH;
    this.location = {};
    this.draw = function (canvas, snakeArr) {
        if (typeof (this.location.x) == "undefined") {
            this.location = this.getLocation(snakeArr);
        }

        canvas.fillStyle = 'red';
        canvas.fillRect(
            this.location.x * this.snakeStep,
            this.location.y * this.snakeStep,
            this.width,
            this.height);
    }

    this.getLocation = function (snakeArr) {
        var x = Math.floor(Math.random() * 20);
        var y = Math.floor(Math.random() * 20);

        if (!this.validLocation(snakeArr, [x, y])) {
            return this.getLocation();
        }
        return { x: x, y: y };
    }

    this.validLocation = function (snakeArr, arr) {
        for (var i = 0; i < snakeArr.length; i++) {
            if (snakeArr[i].x == arr[0] && snakeArr[i].y == arr[1]) {
                return false;
            }
        }
        return true;
    }
}