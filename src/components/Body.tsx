import { Sidebar } from './Sidebar';
import { MainContainer } from './MainContainer';

export const Body = ()=>{
    return (
        <div className='grid grid-flow-col'>
            <Sidebar/>
            <MainContainer/>
        </div>
    )
}