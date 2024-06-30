import AddPet from './AddPet'
import { Link } from 'wouter'
export default function Pets() {
  return (
    <>
      <div className="fixed z-40 flex size-full items-center justify-center">
        <div className="rounded bg-white p-8 shadow-lg">
          <h1 className="mb-4 text-center text-3xl font-bold">Pets</h1>
          <ul className="space-y-4 text-center">
            {[
              {
                nome: 'Spot',
                idade: 3,
                type: 'dog',
                peso: 10,
                raca: 'Labrador',
                dono: 'Maria'
              },
              {
                nome: 'Buddy',
                idade: 2,
                type: 'dog',
                peso: 15,
                raca: 'Poodle',
                dono: 'João'
              },
              {
                nome: 'Whiskers',
                idade: 1,
                type: 'cat',
                peso: 5,
                raca: 'British Shorthair',
                dono: 'Ana'
              }
            ].map((pet) => (
              <li key={pet.nome} className="border-b p-4 last:border-none">
                <h2 className="text-xl font-semibold">{pet.nome}</h2>
                <p>Idade: {pet.idade}</p>
                <p>Tipo: {pet.type}</p>
                <p>Peso: {pet.peso} kg</p>
                <p>Raça: {pet.raca}</p>
                <p>Dono: {pet.dono}</p>
              </li>
            ))}
          </ul>
          <button className="mt-6 rounded bg-purple-800 px-4 py-2 text-white">
            <Link href="/petscriar">Adicionar Pet</Link>
          </button>
        </div>
      </div>
    </>
  )
}
