import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { Card } from "../components/ui"
function HomePage() {
  const data = useContext(AuthContext);
  return (
    <Card>
      <h1 className='font=bold justify-center text-2xl py-4'>
        Esto es un proyecto Pern</h1>
      <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem consectetur illum nihil nesciunt incidunt obcaecati quo hic eligendi perspiciatis eos in ad, unde voluptatum possimus sequi consequuntur recusandae assumenda rerum maiores quibusdam, aliquam iusto, consequatur sint quos. Eligendi, corporis quae!</h3>  
    </Card>
  )
}

export default HomePage 