import { ButtonList } from "./ButtonList"
import { VedioContainer } from "./VedioContainer"

export const MainContainer = ()=>{
    return (
        <div className="col-span-11">
            <ButtonList/>
            <h1>Main Container</h1>
            <VedioContainer/>
        </div>
    )
}