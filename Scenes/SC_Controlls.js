//Выбор сценария
function Scenes_Select(in_Type, in_Name, in_Value)
{
    if (Lib_Scenes[in_Value] != null) {
        IR.SetVariable("Server.Tags.SelectedScene", in_Value);
        IR.SetVariable("Server.Tags.SelectedSceneName", Lib_Scenes[in_Value].Name);
        var _check = checkAvailabilityScene(in_Value);
        IR.SetVariable("Server.Tags.SelectedSceneDsc", _check.Result ? Lib_Scenes[in_Value].sceneDescription : _check.Reason);
    }
};

//Запуск ранее выбранного сценария
function Scenes_Confirm()
{
    var selectedScene = IR.GetVariable("Server.Tags.SelectedScene");
    IR.SetVariable("Server.Tags.SelectedSceneName", Lib_Scenes[selectedScene].Name);
    
    if (selectedScene != null && Lib_Scenes[selectedScene] != null) {
        var _check = checkAvailabilityScene(selectedScene);
        if (_check.Result) startScene(selectedScene);
        else if (_check.Interrupt != null) stopScene(_check.Interrupt);
        else IR.SetVariable("Server.Tags.SelectedSceneDsc", _check.Reason);
    }
};

//Запуск сценария без подтверждения
function Scenes_ForcedSelect(in_Type, in_Name, in_Value)
{
    IR.SetVariable("Server.Tags.SelectedScene", in_Value);
    var selectedScene = IR.GetVariable("Server.Tags.SelectedScene");
    IR.SetVariable("Server.Tags.SelectedSceneName", Lib_Scenes[selectedScene].Name);
    
    if (selectedScene != null && Lib_Scenes[selectedScene] != null) {
        var _check = checkAvailabilityScene(selectedScene);
        if (_check.Result) startScene(selectedScene);
        else IR.SetVariable("Server.Tags.SelectedSceneDsc", _check.Reason);
    }
};

