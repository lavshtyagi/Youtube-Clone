import { ButtonList } from "./ButtonList"
import { VedioContainer } from "./VedioContainer"

export const MainContainer = () => {
  return (
    <div className="flex-1 flex flex-col overflow-x-hidden">
      <ButtonList />
      <VedioContainer />
    </div>
  )
}