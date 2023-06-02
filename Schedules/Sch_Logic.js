//Подписка на минуты
IR.SubscribeTagChange("System.Time.Minutes");

function checkSchedules() {
    var hour = IR.GetVariable("System.Time.Hour");
    var minutes = IR.GetVariable("System.Time.Minutes");
    var day = IR.GetVariable("System.Date.DayOfWeek");
    for (var i = 0; i < Lib_Schedules.length; i++) {
        var _days = String(IR.GetVariable("Server.Tags."+Lib_Schedules[i].Name+"Days"));
        var _time = String(IR.GetVariable("Server.Tags."+Lib_Schedules[i].Name+"Time"));
        if (IR.GetVariable("Server.Tags."+Lib_Schedules[i].Name+"Enabled_fb")
            && _days.split(Lib_Days[day]).length > 1
            && hour == _time.split(":")[0]
            && minutes == _time.split(":")[1]) {
            scheduleHandler(Lib_Schedules[i].handle);
        }
    }
};


//Отработка логики расписания
function scheduleHandler(actions) {
    for (var i = 0; i < actions.length; i++) {
        eval(actions[i]);
    }
};
