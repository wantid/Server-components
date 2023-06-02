/*

handle - блок работы сценария, последовательность выполняемых действий
    >Run: "" - любая выполняемая команда
    >Delay: 0 - время ожидания (сек), перед выполнением команды

*/

/* Первичная инициализация */
IR.AddListener(IR.EVENT_START, 0, function () {
    IR.SetVariable("Server.Tags.SceneTimer_Zone1", "СЦЕНАРИИ");
});

//Библиотека сценариев
var Lib_Scenes = {
    "Scene1": {
        Name: "Сценарий 1",
        Zone: "Zone1",
        Timer: 50,
        handle: [
            { Run: 'IR.Log("cmd1");' },
            { Delay: 35, Run: 'IR.Log("cmd2");' },
        ],
        sceneDescription: "scene dsc"
    },
};