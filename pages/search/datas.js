var departments = [{
    "name": "全部课程",
    // "short": "public",
    "short": "全部课程",
    "type": 1
},{
        "name": "校公共必修课",
        // "short": "public",
        "short":"必修课",
        "type": 1
    },
    {
        "name": "任选课",
        "short": "UPEC",
        "type": 1
    },
    {
        "name": "材料科学与工程学院",
        "short": "MATE",
        "type": 1
    },
    {
        "name": "电子信息与光学工程学院",
        "short": "ELEC",
        "type": 1
    },
    {
        "name": "法学院",
        "short": "LAWS",
        "type": 1
    },
    {
        "name": "汉语言文化学院",
        "short": "CHIN",
        "type": 1
    },
    {
        "name": "化学学院",
        "short": "CHEM",
        "type": 1
    },
    {
        "name": "环境科学与工程学院",
        "short": "ENVI",
        "type": 1
    },
    // { "name": "计算机学院", "short": "CSSE", "type": 1 },
    {
        "name": "计算机与控制工程学院",
        "short": "COMP",
        "type": 1
    },
    {
        "name": "金融学院",
        "short": "FINA",
        "type": 1
    },
    {
        "name": "经济学院",
        "short": "ECON",
        "type": 1
    },
    {
        "name": "历史学院",
        "short": "HIST",
        "type": 1
    },
    {
        "name": "旅游与服务学院",
        "short": "TOUR",
        "type": 1
    },
    {
        "name": "马克思主义学院",
        "short": "MARX",
        "type": 1
    },
    // { "name": "人工智能学院", "short": "ARIN", "type": 1 },
    {
        "name": "软件学院",
        "short": "SOFT",
        "type": 1
    },
    {
        "name": "商学院",
        "short": "BUSI",
        "type": 1
    },
    {
        "name": "生命科学学院",
        "short": "LIFE",
        "type": 1
    },
    {
        "name": "数学科学学院",
        "short": "MATH",
        "type": 1
    },
    {
        "name": "天津大学工商管理双学位",
        "short": "TUDD",
        "type": 1
    },
    {
        "name": "统计与数据科学",
        "short": "STAT",
        "type": 1
    },
    {
        "name": "外国语学院",
        "short": "FORE",
        "type": 1
    },
    {
        "name": "文学院",
        "short": "LITE",
        "type": 1
    },
    {
        "name": "物理科学学院",
        "short": "PHYS",
        "type": 1
    },
    {
        "name": "药学院",
        "short": "PHAR",
        "type": 1
    },
    {
        "name": "医学院",
        "short": "MEDS",
        "type": 1
    },
    {
        "name": "哲学院",
        "short": "PHIL",
        "type": 1
    },
    {
        "name": "周恩来政府管理学院",
        "short": "GOVE",
        "type": 1
    }
]

var data1 = {
    name: '课程来源',
    choose_index: 0,
    datas: departments,
    type: 0
}

var location = [
    {
        name: '全部校区',
        short: '全部校区'
    },{
    name: '八里台校区',
    short: '八里台校区'
}, {
    name: '津南校区',
    short: '津南校区'
}, {
    name: '泰达校区',
    short: '泰达校区'
}, {
    name: '其他',
    short: '其他'
}]

var data2 = {
    name: '校区',
    choose_index: 0,
    datas: location,
    type: 0
}

var week = [{name:'1-16周',
short:'全部周次',
    start: 1,
    end: 16
}, {
        name: '1-8周',
        short: '1-8周',
    start: 1,
    end: 8
}, {
        name: '9-16周',
        short: '9-16周',
    start: 9,
    end: 16
}]
var data3 = {
    name: '周次',
    choose_index: 0,
    datas: week,
    type: 0
}

var clas = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""]
]

var data4 = {
    name: '节次',
    select_index: 0,
    datas: clas,
    type: 1,
    is_select:true
}

function get_all(){
    var lists=[]
    data1.datas.forEach(function(item){
        lists.push(item.name)
    })
    data1.datas_list = lists
    lists = []

    data2.datas.forEach(function (item) {
        lists.push(item.name)
    })
    data2.datas_list = lists
    lists = []

    data3.datas.forEach(function (item) {
        lists.push(item.name)
    })
    data3.datas_list = lists
    lists = []


    var datas = [data1, data2, data3, data4]
    return datas
}

module.exports.get_all = get_all