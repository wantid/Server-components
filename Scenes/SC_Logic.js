var currentScenes = [], scenesToStop = [];

function checkAvailabilityScene(sceneToCheck) {
    if (currentScenes != null && currentScenes.length > 0) {
        /* Запущена ли уже эта сцена */
        if (IndexOf(currentScenes, sceneToCheck) > -1) {
            if (IndexOf(scenesToStop, sceneToCheck) > -1)
                return { Result: false, Reason: "Cценарий прерывается,\nпожалуйста подождите." };
            else
                return { Result: false, Interrupt: sceneToCheck, Reason: "Cценарий уже запущен,\nВы хотите его прервать?" };
        }

        /* Проверка на наличие таймера */
        if (Lib_Scenes[sceneToCheck].Timer != null) {
            /* Запущен ли сценарий в зоне */
            for (var i = 0; i < currentScenes.length; i++) {
                var _sceneStruct = Lib_Scenes[currentScenes[i]];
                if (Lib_Scenes[sceneToCheck].Zone == _sceneStruct.Zone && _sceneStruct.Timer != null)
                    return { Result: false, Reason: "Невозможно запустить сценарий,\nт.к. выполняется сценарий:\n\"" + IR.GetVariable("Server.Tags.SceneTimer_" + Lib_Scenes[sceneToCheck].Zone) };
            }
        }
    }

    return { Result: true };
};

function startScene(sceneToStart) {
    currentScenes.push(sceneToStart);
    sceneHandler(sceneToStart, 0);

    IR.Log("Started scene: " + sceneToStart);
};

function stopScene(sceneToStop) {
    var ss_index = IndexOf(currentScenes, sceneToStop);
    if (ss_index > -1) {
        scenesToStop.push(sceneToStop);
        IR.Log("Interrupted scene: " + sceneToStop);
    }
};

function onFinishScene(finishedScene) {
    var fs_index = IndexOf(currentScenes, finishedScene);
    currentScenes.splice(fs_index, 1);

    var is_index = IndexOf(scenesToStop, finishedScene);
    if (is_index > -1) scenesToStop.splice(is_index, 1);

    var _check = checkAvailabilityScene(IR.GetVariable("Server.Tags.SelectedScene"));
    IR.SetVariable("Server.Tags.SelectedSceneDsc", _check.Result ? Lib_Scenes[IR.GetVariable("Server.Tags.SelectedScene")].sceneDescription : _check.Reason);
    if (Lib_Scenes[finishedScene].Timer != null) IR.SetVariable("Server.Tags.SceneTimer_" + Lib_Scenes[finishedScene].Zone, "СЦЕНАРИИ");

    IR.Log("Finished scene: " + finishedScene + "\nRunning scenes: " + currentScenes);
};

function sceneHandler(runningScene, step, elapsedTime) {
    IR.Log("runningScene:"+runningScene +" step:"+ step+" elapsedTime:"+elapsedTime);

    if (elapsedTime == undefined) elapsedTime = 0;
    _sceneStruct = Lib_Scenes[runningScene];
    if (_sceneStruct.Timer != null) {
        /* Отработка сценария */
        var _handleStruct = _sceneStruct.handle[step];
        IR.SetVariable("Server.Tags.SceneTimer_" + Lib_Scenes[runningScene].Zone, Lib_Scenes[runningScene].Name + ": осталось " + (_sceneStruct.Timer - elapsedTime) + " сек.");

        if (elapsedTime < _sceneStruct.Timer && IndexOf(scenesToStop, runningScene) < 0) {
            elapsedTime++;

            if (_handleStruct != null && (_handleStruct.Delay == null || _handleStruct.Delay < elapsedTime)) {
                eval(_handleStruct.Run);
                step++;
            }

            IR.SetTimeout(1000, function () {
                sceneHandler(runningScene, step, elapsedTime);
            });
        } else onFinishScene(runningScene);
    } else {
        /* Отработка сцены */
        for (var i = 0; i < _sceneStruct.handle.length; i++) {
            eval(_sceneStruct.handle[i].Run);
        };
        onFinishScene(runningScene);
    }
}