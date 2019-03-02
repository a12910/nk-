var dep_get0 = [
  {"name":"校公共必修课","short":"public","type":1},
  { "name": "任选课", "short": "UPEC", "type": 1 },
  { "name": "材料科学与工程学院", "short": "MATE", "type": 1 },
  { "name": "电子信息与光学工程学院", "short": "ELEC", "type": 1 },
  { "name": "法学院", "short": "LAWS", "type": 1 },
  { "name": "汉语言文化学院", "short": "CHIN", "type": 1 },
  { "name": "化学学院", "short": "CHEM", "type": 1 },
  { "name": "环境科学与工程学院", "short": "ENVI", "type": 1 },
  // { "name": "计算机学院", "short": "CSSE", "type": 1 },
  { "name": "计算机与控制工程学院", "short": "COMP", "type": 1 },
  { "name": "金融学院", "short": "FINA", "type": 1 },
  { "name": "经济学院", "short": "ECON", "type": 1 },
  { "name": "历史学院", "short": "HIST", "type": 1 },
  { "name": "旅游与服务学院", "short": "TOUR", "type": 1 },
  { "name": "马克思主义学院", "short": "MARX", "type": 1 },
  // { "name": "人工智能学院", "short": "ARIN", "type": 1 },
  { "name": "软件学院", "short": "SOFT", "type": 1 },
  { "name": "商学院", "short": "BUSI", "type": 1 },
  { "name": "生命科学学院", "short": "LIFE", "type": 1 },
  { "name": "数学科学学院", "short": "MATH", "type": 1 },
  { "name": "天津大学工商管理双学位", "short": "TUDD", "type": 1 },
  { "name": "统计与数据科学", "short": "STAT", "type": 1 },
  { "name": "外国语学院", "short": "FORE", "type": 1 },
  { "name": "文学院", "short": "LITE", "type": 1 },
  { "name": "物理科学学院", "short": "PHYS", "type": 1 },
  { "name": "药学院", "short": "PHAR", "type": 1 },
  { "name": "医学院", "short": "MEDS", "type": 1 },
  { "name": "哲学院", "short": "PHIL", "type": 1 },
  { "name": "周恩来政府管理学院", "short": "GOVE", "type": 1 }
]

var loc_get=[{name:'八里台校区',short:1},{name:'津南校区',short:2},{name:'泰达校区',short:3},{name:'其他',short:0}]
function dep_get(data){
  if(data.short != undefined){
    return data
  }
  for(var q=0; q<dep_backup.length; q++){
    if(data==dep_backup[q].name||data==dep_backup[q].short){
      return dep_backup[q]
    }
  }
}


module.exports.dep_get0 = dep_get0
module.exports.loc_get = loc_get
module.exports.dep_get = dep_get

// module.exports.dep_get1 = dep_get1
// module.exports.dep_get2 = dep_get2
// module.exports.dep_get3 = dep_get3

var dep_backup = [
  { "name": "毕业生", "short": "900" },
  { "name": "高等数学教育部", "short": "AMTD" },
  { "name": "人工智能学院", "short": "ARIN" },
  { "name": "商学院", "short": "BUSI" },
  { "name": "化学学院", "short": "CHEM" },
  { "name": "汉语言文化学院", "short": "CHIN" },
  { "name": "计算机与控制工程学院", "short": "COMP" },
  { "name": "公共计算机教学部", "short": "COTD" },
  { "name": "计算机学院", "short": "CSSE" },
  { "name": "经济学院", "short": "ECON" },
  { "name": "电子信息与光学工程学院", "short": "ELEC" },
  { "name": "公共英语教学部", "short": "ENTD" },
  { "name": "环境科学与工程学院", "short": "ENVI" },
  { "name": "金融学院", "short": "FINA" },
  { "name": "外国语 学院", "short": "FORE" },
  { "name": "周恩来政府管理", "short": "GOVE" },
  { "name": "历史学院", "short": "HIST" },
  { "name": "马克思主义基础理论教学部", "short": "IPTD" },
  { "name": "法学院", "short": "LAWS" },
  { "name": "生命科学学院", "short": "LIFE" },
  { "name": "文学院", "short": "LITE" },
  { "name": "马克思主义学院", "short": "MARX" },
  { "name": "材料科学与工程", "short": "MATE" },
  { "name": "数学科学学院", "short": "MATH" },
  { "name": "医学院", "short": "MEDS" },
  { "name": "军事教研室", "short": "MITD" },
  { "name": "体育教学部", "short": "PETD" },
  { "name": "药学院", "short": "PHAR" },
  { "name": "物理科学学院", "short": "PHYS" },
  { "name": "哲学院", "short": "PHIL" },
  { "name": "软件学院", "short": "SOFT" },
  { "name": "统计与数据科学学院", "short": "STAT" },
  { "name": "旅游与服务学院", "short": "TOUR" },
  { "name": "天津大学工商管理双学位课程", "short": "TUDD" },
  { "name": "教务处", "short": "UPEC" },
  { "name": "基础物理教学部", "short": "CPTD" }
]