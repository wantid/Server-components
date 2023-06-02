//Изменение часов расписания
function ChangeScheduleTime(in_Type, in_Name, in_Value) {
    var values = in_Value.split(":");
    var scheduleName = in_Name.split("_");
    if (values.length == 2)
        IR.SetVariable("Server.Tags."+scheduleName[0]+"Time", values[0]+":"+values[1]);
    else IR.Log("Неправильно переданы данные в "+in_Name);
};

//Изменение дней расписания
function ChangeScheduleDays(in_Type, in_Name, in_Value) {
    var values = in_Value.split("");
    var scheduleName = in_Name.split("_");
    if (values.length == 7)
    {
        var _data = "";
        for (var i = 0; i < Lib_Days.length; i++) {
            _data += values[i] === "1" ? Lib_Days[i]+" " : "";
        }
        IR.SetVariable("Server.Tags."+scheduleName[0]+"Days", _data);
    } else IR.Log("Неправильно переданы данные в "+in_Name);
};