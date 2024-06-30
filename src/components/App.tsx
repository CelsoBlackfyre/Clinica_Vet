import Background from './Background'
import Home from './Home'
import Sidebar from './Sidebar'
import { Route, Switch } from 'wouter'
import Pacientes from './Pets'
import AddPet from './AddPet'
import Clientes from './Clientes'
import Vets from './Vets'
import Pets from './Pets'
import ListClientes from './Clientes'

function App() {
  return (
    <>
      <Sidebar />
      <Background />
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/clientes" component={Clientes} />
        <Route path="/pets" component={Pets} />
        <Route path="/pets/:id" component={Pets} />
        <Route path="/petscriar" component={AddPet} />
        <Route path="/vets" component={Vets} />
      </Switch>
    </>
  )
}

export default App
