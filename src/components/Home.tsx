import '../styles/home.css'
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="mb-8 text-pretty text-center text-4xl font-bold text-violet-700">
        Bem-vindo à Clinica Vet
      </h1>

      <div
        aria-label="Orange and tan hamster running in a metal wheel"
        role="img"
        className="wheel-and-hamster"
      >
        <div className="wheel"></div>
        <div className="hamster">
          <div className="hamster__body">
            <div className="hamster__head">
              <div className="hamster__ear"></div>
              <div className="hamster__eye"></div>
              <div className="hamster__nose"></div>
            </div>
            <div className="hamster__limb hamster__limb--fr"></div>
            <div className="hamster__limb hamster__limb--fl"></div>
            <div className="hamster__limb hamster__limb--br"></div>
            <div className="hamster__limb hamster__limb--bl"></div>
            <div className="hamster__tail"></div>
          </div>
        </div>
        <div className="spoke"></div>
      </div>

      <p className="mt-8 max-w-md text-center text-gray-600">
        Sistema de gestão para clínica veterinária. Gerencie clientes, pets,
        veterinários e consultas em um só lugar.
      </p>
    </div>
  )
}
