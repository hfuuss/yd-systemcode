import * as React from "react";
const { useContext, useReducer, createContext } = React;

//核心一定返回状态回去
function reducerInAction(state, action) {
    if (typeof action.reducer == "function") {
        // console.log("reducer处理过后的",netxState)
        return action.reducer(state);
    }
    return state;
}
export default function createStore(params) {
    const { initialState = {}, reducer } = {
        ...params,
        reducer: reducerInAction
    }
    //实际是由createContext所有的状态版本的管理
    const Appcontext = createContext();
    const middleWareReducer = (lastState, action) => {
        console.log("🍊", action.type)
        // switch (action.type) {
        //     case "addCount":
        //         return {
        //             ...lastState,
        //             age: action.reducer
        //         }
        //     default:
        //         return lastState;
        // }
        let netxState = reducer(lastState, action);
        store._state = netxState;
        return netxState;
    }
    const store = {
        _state: initialState,
        dispatch: undefined,
        getState: () => {
            return store._state
        },
        useContext: () => {
            return useContext(Appcontext)
        }
    }
    const Provider = props => {
        const [state, dispatch] = useReducer(middleWareReducer, initialState);
        if (!store.dispatch) {
            store.dispatch = async (action) => {
                if (typeof action === "function") {
                    await action(dispatch,store.getState());
                } else {
                    dispatch(action);
                }
            }
        }
        return <Appcontext.Provider {...props} value={state} />
    }
    return {
        Provider,
        store
    }
}