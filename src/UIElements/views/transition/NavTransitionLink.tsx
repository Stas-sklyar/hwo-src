import { NavigationContext } from "UIElements/views/navigation/NavigationContext";
import React, { FC, useCallback, useContext } from "react";


const useTransiotionAnimation = (name: string) => {
    const ctx = useContext(NavigationContext);

    const setTransition = useCallback(() => {
        ctx?.setPreset(name);
    }, [name]);

    const resetTransition = useCallback(() => {
        //ctx?.setPreset(Constants.DEFAULT_ANIMATION_PRESET);
    }, []);


    return {
        setTransition,
        resetTransition
    }
}

interface Props {
    children: React.ReactNode;
    transition: string;
}

function NavTransitionLink ({ children, transition, ...rest }: Props) {

    const {setTransition, resetTransition} = useTransiotionAnimation(transition);

    return (
        <div onMouseDown={setTransition} onMouseLeave={resetTransition}>{children}</div>
    );
}

export { NavTransitionLink };