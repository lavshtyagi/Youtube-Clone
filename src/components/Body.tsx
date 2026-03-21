import { Sidebar } from './Sidebar';
import { MainContainer } from './MainContainer';

export const Body = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <MainContainer />
    </div>
  );
};