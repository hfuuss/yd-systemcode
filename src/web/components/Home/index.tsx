// 函数组件 + Hooks
import * as React from "react";
import HooksRedux from "./HooksRedux";
const {
    Provider,
    store
} = HooksRedux({
    initialState: { name: "京程一灯🏮", age: 0 }
});
function timeOutAdd(a) {
    return new Promise(cb => setTimeout(() => cb(a + 1), 500))
}
const actionOfAdd = () => async (dispatch, ownState) => {
    const age = await timeOutAdd(ownState.age);
    dispatch({
        type: "addCount",
        reducer(state) {
            return {
                ...state,
                age
            }
        }
    })
}
// const actionOfAdd = () => {
//     return {
//         type: "addCount",
//         reducer(state) {
//             return {
//                 ...state,
//                 age: state.age + 1
//             }
//         }
//     }
// }
// function actionOfAdd() {
//     return {
//         type: "addCount"
//     }
// }
const Button = () => {
    function handleAdd() {
        store.dispatch(actionOfAdd());
    }
    return <button onClick={handleAdd}>点击增加</button>
}
const Home = () => {
    const state = store.useContext();
    console.log("🍎", state)
    return (
        <div>
            基础的Home组件
            {state.age}
            <hr />
            <Button />
        </div>
    );
}
const WrapHome = () => {
    return (
        <Provider>
            <Home />
        </Provider>
    )
}
export default WrapHome;