
import './App.css';
import { AddRelation } from './component/AddRelation';
import { Tree } from './component/Tree';
import { UserCreate } from './component/UserCreate';
import FamilyTree from './familyTree';

function App() {
  return (
    <>
      <div className="App ">
        <div className='leftcontainer'>    <UserCreate /></div>
        <div className='rightcontainer'>
          
          <div className='search'>
       
            <AddRelation />
          </div>
        </div>
      </div>
      <div>
        <div className='family'>
          <Tree />
        </div>
      </div>
    </>
  );
}

export default App;
