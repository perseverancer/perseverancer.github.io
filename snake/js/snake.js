function Snake(parentWidth, parentHeight) {
    this.parentWidth = parentWidth;
    this.parentHeight = parentHeight;
    this.itemWidth = 25;
    this.itemHeight = 25;
    this.stepW = this.parentWidth / this.itemWidth;
    this.stepH = this.parentHeight / this.itemHeight;
    this.snakeArr = [];
    this.direction = "left";
    this.addItem = false;
    this.speed = 1000;
    this.foodCount = 0;

    this.draw = function (canvas) {
        if (this.snakeArr.length == 0) {
            this.initSnakeArr();

            for (var i = 0; i < this.snakeArr.length; i++) {
                canvas.fillStyle = i == 0 ? 'green' : 'red';
                canvas.fillRect(
                    this.snakeArr[i].x * this.itemWidth,
                    this.snakeArr[i].y * this.itemHeight,
                    this.itemWidth,
                    this.itemHeight);
            }
        }
        else {
            for (var i = this.snakeArr.length - 1; i >= 0; i--) {
                if (i == 0) {
                    canvas.fillStyle = 'green';
                    var xy = { x: this.snakeArr[i].x, y: this.snakeArr[i].y };
                    if (this.direction == "left") {
                        xy.x -= 1;
                    } else if (this.direction == "right") {
                        xy.x += 1;
                    }
                    else if (this.direction == "up") {
                        xy.y -= 1;
                    }
                    else if (this.direction == "down") {
                        xy.y += 1;
                    }
                    canvas.fillRect(
                        xy.x * this.itemWidth,
                        xy.y * this.itemHeight,
                        this.itemWidth,
                        this.itemHeight);

                    this.snakeArr[0] = {
                        x: xy.x,
                        y: xy.y
                    };
                }
                else {
                    canvas.fillStyle = 'red';
                    canvas.fillRect(
                        this.snakeArr[i - 1].x * this.itemWidth,
                        this.snakeArr[i - 1].y * this.itemHeight,
                        this.itemWidth,
                        this.itemHeight);
                    this.snakeArr[i] = {
                        x: this.snakeArr[i - 1].x,
                        y: this.snakeArr[i - 1].y
                    };
                }

                if (this.addItem) {
                    this.addItem = false;
                    this.snakeArr[this.snakeArr.length] = {
                        x: this.snakeArr[this.snakeArr.length - 1].x,
                        y: this.snakeArr[this.snakeArr.length - 1].y
                    };
                }
            }
            this.validLocation(this.snakeArr[0]);
        }
    }

    this.initSnakeArr = function () {
        for (var i = 0; i < 5; i++) {
            this.snakeArr[i] = {
                x: this.stepW / 2 + i - 2,
                y: this.stepH / 2
            };
        }
    }

    this.validLocation = function (obj) {
        var arr = [];
        for (var i = 0; i < this.snakeArr.length; i++) {
            if (i == 0) {
                continue;
            }
            arr.push(this.snakeArr[i]);
        }

        if (obj.x < 0 || obj.y < 0 || obj.x >= this.stepW || obj.y >= this.stepH || this.validLocation1(arr, [obj.x, obj.y])) {
            endTime = new Date();
            var time = (endTime - startTime) / 1000;

            alert("游戏结束！\r\n吃到食物：" + this.foodCount + "个\r\n生存时间：" + time + "秒");
            clearInterval(interval);
            window.clearCanvas();
            window.start();
        } else if (obj.x == food.location.x && obj.y == food.location.y) {
            food.location = {};
            //food.draw();
            this.addItem = true;
            this.speed -= 50;
            if (this.speed <= 100) {
                this.speed = 100;
            }
            setSpeed();
            this.foodCount++;
        }
    }

    this.validLocation1 = function (snakeArr, arr) {
        for (var i = 0; i < snakeArr.length; i++) {
            if (snakeArr[i].x == arr[0] && snakeArr[i].y == arr[1]) {
                return true;
            }
        }
        return false;
    }
}