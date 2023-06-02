function leaksHandle(leakStruct, value) {
    if (value == 1) {
        IR.SetVariable(leakStruct.Feedback, value); 
        IR.Log(leakStruct.Push);
        eval(leakStruct.ValveCmd);
    } else if (value == 0) {
        IR.SetVariable(leakStruct.Feedback, IR.GetVariable(leakStruct.Feedback) > 0 ? 2 : 0); 
    } 
};

function leaksAllReset() {
    for (var key in Lib_Leaks) {
        if (IR.GetVariable(Lib_Leaks[key].Feedback) === 2)
            IR.SetVariable(Lib_Leaks[key].Feedback, 0); 
        IR.Log(Lib_Leaks[key].Feedback);
    }
};