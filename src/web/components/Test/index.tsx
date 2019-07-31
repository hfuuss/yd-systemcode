import * as React from 'react';
const { Suspense } = React;
import { useFetch } from 'react-hooks-fetch';

const DisplayRemoteData = () => {
    const { error, data } = useFetch('/api/data');
    if (error) return <span>❎组件出错:{error.message}</span>;
    if (!data) return null; // this is important
    return <span>RemoteData:{data.result}</span>;
};

const Test = () => (
    <Suspense fallback={<span>Loading...</span>}>
        <DisplayRemoteData />
    </Suspense>
);
export default Test;