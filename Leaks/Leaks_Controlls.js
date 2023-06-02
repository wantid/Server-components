function LeakDetect(in_Type, in_Name, in_Value) {
    if (Lib_Leaks[in_Name] != null) {
        leaksHandle(Lib_Leaks[in_Name], in_Value);
    }
};

function LeaksReset(in_Type, in_Name, in_Value) {
    leaksAllReset();
};