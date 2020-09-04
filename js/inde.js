const LOttery = {
    //创建用户列表
    usersList: [],
    checked: [],
    //重组用户列表
    recombine: function () {
        let newArray = new Array();
        let index = 0;//设置一个初始值
        while (this.usersList.length > 0) {
            index = this.randomNumber();
            newArray.push(this.usersList[index]); //添加至末尾
            this.usersList.splice(index, 1); //替换
        };
        this.usersList = newArray; //将打乱后的用户数据赋给原来用户数据
        return newArray;
    },
    //封装用户列表长度
    size: function () {
        return this.usersList.length;
    },
    //获取用户列表随机数
    randomNumber: function () {
        return Math.floor(Math.random() * this.size());
    },
    //获取随机颜色
    randomColor: function (a) {
        //传参需判断其数据类型
        if (typeof a === "number") {
            a = a || 1;
        } else {
            throw new Error('我需要一个Number类型,但是你给了我一个' + typeof e);
        };
        let r = Math.floor(Math.random() * 255 + 100),
            g = Math.floor(Math.random() * 255 + 100),
            b = Math.floor(Math.random() * 255 + 100);
        return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    },
    //初始化
    getId: function (e) {
        return document.getElementById(e);
    },
    getTag: function () {
        //这里判断是因为获取到的tagname是全局的
        if (arguments.length === 2) {
            return arguments[0].getElementsByTagName(arguments[1]);
        } else {
            return document.getElementsByTagName(arguments[0]);
        }
    },
    getInformation: function () { //得到数据
        let self = this;
        let oList = this.getId('list');
        oList.innerHTML = "";
        self.recombine().forEach(function (value, index) { //第二个参数表示下标值
            oList.innerHTML += '<li style="background:' + self.randomColor(.8) + '">' + (index + 1) + '-' + value.name + '<p>' + '(' + value.group + ')' + '</p>' + '</li>';
        });
    },
    init: function (usersList) {
        let upsetList = this.getId('upsetList');
        let start = this.getId('start');
        let reset = this.getId('reset');
        let figure = this.getId('figure');
        let closeTime = null;
        let self = this;
        let n = 0;

        if (!localStorage.getItem('usersList')) {
            //getItem读取数据
            self.usersList = usersList;
        }else {
            self.usersList = JSON.parse(localStorage.getItem('usersList'));
        }

        this.getInformation(); //未点击前
        //重置数组
        reset.onclick = function () {
            /* location.reload();//重新加载当前文档 */
            localStorage.removeItem('usersList');
            //删除原有缓存,加入新的缓存
            self.init([
                { name: "李元(组长)", group: "君莫笑" },
                { name: "何世成", group: "君莫笑" },
                { name: "卢俊锋", group: "君莫笑" },
                { name: "马世杰", group: "君莫笑" },
                { name: "童宇珺", group: "君莫笑" },
                /* { name: "李成成(组长)", group: "Web男团" },
                { name: "张行", group: "Web男团" },
                { name: "李巍巍", group: "Web男团" },
                { name: "邱嘉诚", group: "Web男团" },
                { name: "张栋棋", group: "Web男团" },
                { name: "曹黎明", group: "Web男团" },
                { name: "陆涛涛", group: "Web男团" },
                { name: "文正茂", group: "Web男团" },
                { name: "熊灿(组长)", group: "一叶之秋" },
                { name: "颜洁", group: "一叶之秋" },
                { name: "刘鸿健", group: "一叶之秋" },
                { name: "徐双兴", group: "一叶之秋" },
                { name: "朱鹏富", group: "一叶之秋" },
                { name: "谭诗颖", group: "一叶之秋" },
                { name: "粟志洋", group: "一叶之秋" },
                { name: "徐凌峰(组长)", group: "沉迷学习" },
                { name: "张志阳", group: "沉迷学习" },
                { name: "王勤豪", group: "沉迷学习" },
                { name: "龚勇", group: "沉迷学习" },
                { name: "罗代丰", group: "沉迷学习" },
                { name: "潘义昕", group: "沉迷学习" },
                { name: "潘忠钊(组长)", group: "切面面向对象" },
                { name: "施佳烽", group: "切面面向对象" },
                { name: "陈仲", group: "切面面向对象" },
                { name: "梅书浩", group: "切面面向对象" },
                { name: "钱德淼", group: "切面面向对象" },
                { name: "施勇", group: "切面面向对象" },
                { name: "徐智威", group: "切面面向对象" },
                { name: "蒋超琼", group: "切面面向对象" } */
            ]);
        }
        //打乱数组
        upsetList.onclick = function () { //点击
            self.getInformation();
        };
        //开始抽奖
        start.onclick = function () { //点击
            let atThis = start;
            if (this.getAttribute('id') === 'start') {//得到id
                this.setAttribute('disabled', 'disabled');//把指定属性设置或更改为指定值
                this.classList.add('forbid'); //添加一个类名
                clearInterval(closeTime);
                closeTime = setInterval(function () {
                    n++;
                    // self.getInformation();
                    if (n > (self.randomNumber() + 1) * 5) {
                        clearInterval(closeTime);
                        atThis.removeAttribute('disabled');
                        atThis.classList.remove('forbid');
                        n = 0;//使第二次点击时n重头再来
                        let atLits = self.getTag(self.getId('list'),'li');
                        
                        // console.log(self.checked.length);
                        /* if (self.checked.length>0) {
                            self.checked.forEach(function (value) {
                                if(value.name === atLits[save].innerText) {
                                    console.log(self.getInformation());
                                }
                            })
                        } */
                            // self.checked.push(self.usersList[save]);
                            // console.log(self.checked);
                            var regular = /^[1-9]+[0-9]*$/; //正则匹配输入的人数是否合法
                            if (!regular.test(figure.value)) {
                                alert('必须输入数字');
                            }else {
                                for (var i = 0; i < figure.value; i++) {
                                    let save = self.randomNumber();
                                    atLits[save].classList.add('selected');
                                    self.usersList.splice(save,1);
                                    //已经抽到的人剔除之后,在本地缓存保存起来
                                    //setItem保存数据
                                    localStorage.setItem('usersList',JSON.stringify(self.usersList));
                                }
                            }
                    }else {
                        self.getInformation();
                    }
                }, 50);
            }else {
                self.getInformation();
            };
        };
    }
}
LOttery.init([
    { name: "李元(组长)", group: "君莫笑" },
    { name: "何世成", group: "君莫笑" },
    { name: "卢俊锋", group: "君莫笑" },
    { name: "马世杰", group: "君莫笑" },
    { name: "童宇珺", group: "君莫笑" },
    /* { name: "李成成(组长)", group: "Web男团" },
    { name: "张行", group: "Web男团" },
    { name: "李巍巍", group: "Web男团" },
    { name: "邱嘉诚", group: "Web男团" },
    { name: "张栋棋", group: "Web男团" },
    { name: "曹黎明", group: "Web男团" },
    { name: "陆涛涛", group: "Web男团" },
    { name: "文正茂", group: "Web男团" },
    { name: "熊灿(组长)", group: "一叶之秋" },
    { name: "颜洁", group: "一叶之秋" },
    { name: "刘鸿健", group: "一叶之秋" },
    { name: "徐双兴", group: "一叶之秋" },
    { name: "朱鹏富", group: "一叶之秋" },
    { name: "谭诗颖", group: "一叶之秋" },
    { name: "粟志洋", group: "一叶之秋" },
    { name: "徐凌峰(组长)", group: "沉迷学习" },
    { name: "张志阳", group: "沉迷学习" },
    { name: "王勤豪", group: "沉迷学习" },
    { name: "龚勇", group: "沉迷学习" },
    { name: "罗代丰", group: "沉迷学习" },
    { name: "潘义昕", group: "沉迷学习" },
    { name: "潘忠钊(组长)", group: "切面面向对象" },
    { name: "施佳烽", group: "切面面向对象" },
    { name: "陈仲", group: "切面面向对象" },
    { name: "梅书浩", group: "切面面向对象" },
    { name: "钱德淼", group: "切面面向对象" },
    { name: "施勇", group: "切面面向对象" },
    { name: "徐智威", group: "切面面向对象" },
    { name: "蒋超琼", group: "切面面向对象" } */
]);