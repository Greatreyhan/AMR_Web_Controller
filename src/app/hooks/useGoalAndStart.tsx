import { useState } from 'react';
import { START, GOAL } from '../constants';

export const useGoalAndStart = () => {
    const [start, setStart] = useState(START);
    const [isStartSetting, setIsStartSetting] = useState(false);
    const [goal, setGoal] = useState(GOAL);
    const [isGoalSetting, setIsGoalSetting] = useState(false);

    return {
        start,
        setStart,
        goal,
        setGoal,
        isStartSetting,
        isGoalSetting,
        setIsStartSetting,
        setIsGoalSetting
    }
}
