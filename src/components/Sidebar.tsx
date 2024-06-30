import PetsIcon from '@mui/icons-material/Pets'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'
import ConstructionIcon from '@mui/icons-material/Construction'
import EditIcon from '@mui/icons-material/Edit'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import MasksIcon from '@mui/icons-material/Masks'
import { Link } from 'wouter'
import Background from './Background'

export default function Sidebar() {
  return (
    <div className="fixed z-50">
      <aside className=" flex h-screen min-h-full w-72 flex-col items-center space-y-7 bg-[#1c212c] pb-2 pt-5">
        <div className="flex w-full flex-col gap-y-1 fill-gray-500 pr-3 text-sm text-gray-500">
          <div className="pl-4 font-quicksand text-xs uppercase text-gray-400/60">
            Clinica Vet
          </div>

          <div className="group flex w-full select-none items-center gap-x-1.5">
            <div className="relative h-8 w-1 overflow-hidden rounded-xl bg-transparent transition-colors duration-200">
              <div className="absolute left-0 top-0 h-[102%] w-full translate-y-0 bg-violet-600 transition-all duration-300 group-hover:translate-y-0"></div>
            </div>
            <Link
              className="flex w-full items-center space-x-2 self-stretch rounded bg-white/10 pl-2 text-sm text-white transition-all duration-200 group-hover:bg-white/10 group-active:scale-95 dark:hover:text-white dark:group-hover:text-white"
              href="/home"
            >
              <HomeIcon />
              <span className="font-quicksand">Home</span>
            </Link>
          </div>

          <div className="group flex w-full select-none items-center gap-x-1.5">
            <div className="relative h-8 w-1 overflow-hidden rounded-xl bg-transparent transition-colors duration-200">
              <div className="absolute left-0 top-0 h-[102%] w-full translate-y-full bg-violet-600 transition-all duration-300 group-hover:translate-y-0"></div>
            </div>
            <Link
              className="flex w-full items-center space-x-2 self-stretch rounded pl-2 text-sm transition-all duration-200 group-hover:bg-white/10 group-active:scale-95 dark:hover:text-white dark:group-hover:text-white"
              href="/clientes"
            >
              <PeopleAltIcon />
              <span className="font-quicksand">Clientes</span>
            </Link>
          </div>

          <div className="group flex w-full select-none items-center gap-x-1.5">
            <div className="relative h-8 w-1 overflow-hidden rounded-xl bg-transparent transition-colors duration-200">
              <div className="absolute left-0 top-0 h-[102%] w-full translate-y-full bg-violet-600 transition-all duration-300 group-hover:translate-y-0"></div>
            </div>
            <Link
              className="flex w-full items-center space-x-2 self-stretch rounded pl-2 text-sm transition-all duration-200 group-hover:bg-white/10 group-active:scale-95 dark:hover:text-white dark:group-hover:text-white"
              href="/pets"
            >
              <PetsIcon />
              <span className="font-quicksand">Pets</span>
            </Link>
          </div>

          <div className="group flex w-full select-none items-center gap-x-1.5">
            <div className="relative h-8 w-1 overflow-hidden rounded-xl bg-transparent transition-colors duration-200">
              <div className="absolute left-0 top-0 h-[102%] w-full translate-y-full bg-violet-600 transition-all duration-300 group-hover:translate-y-0"></div>
            </div>
            <Link
              className="flex w-full items-center space-x-2 self-stretch rounded pl-2 text-sm transition-all duration-200 group-hover:bg-white/10 group-active:scale-95 dark:hover:text-white dark:group-hover:text-white"
              href="/vets"
            >
              <MasksIcon />
              <span className="font-quicksand">Veterinarios</span>
            </Link>
          </div>
        </div>
        <div className="flex w-full flex-col gap-y-1 fill-gray-500 pr-3 text-sm text-gray-500">
          <div className="pl-4 font-quicksand text-xs uppercase text-gray-400/60">
            Perfil
          </div>

          <div className="group flex w-full select-none items-center gap-x-1.5">
            <div className="relative h-8 w-1 overflow-hidden rounded-xl bg-transparent transition-colors duration-200">
              <div className="absolute left-0 top-0 h-[102%] w-full translate-y-full bg-violet-600 transition-all duration-300 group-hover:translate-y-0"></div>
            </div>
            <Link
              className="flex w-full items-center space-x-2 self-stretch rounded pl-2 text-sm transition-all duration-200 group-hover:bg-white/10 group-active:scale-95 dark:hover:text-white dark:group-hover:text-white"
              href="#"
            >
              <EditIcon />
              <span className="font-quicksand">Editar Perfil</span>
            </Link>
          </div>

          <div className="group flex w-full select-none items-center gap-x-1.5">
            <div className="relative h-8 w-1 overflow-hidden rounded-xl bg-transparent transition-colors duration-200">
              <div className="absolute left-0 top-0 h-[102%] w-full translate-y-full bg-violet-600 transition-all duration-300 group-hover:translate-y-0"></div>
            </div>
            <Link
              className="flex w-full items-center space-x-2 self-stretch rounded pl-2 text-sm transition-all duration-200 group-hover:bg-white/10 group-active:scale-95 dark:hover:text-white dark:group-hover:text-white"
              href="#"
            >
              <SettingsIcon />
              <span className="font-quicksand">Configurações</span>
            </Link>
          </div>

          <div className="group flex w-full select-none items-center gap-x-1.5">
            <div className="relative h-8 w-1 overflow-hidden rounded-xl bg-transparent transition-colors duration-200">
              <div className="absolute left-0 top-0 h-[102%] w-full translate-y-full bg-violet-600 transition-all duration-300 group-hover:translate-y-0"></div>
            </div>
            <Link
              className="flex w-full items-center space-x-2 self-stretch rounded pl-2 text-sm transition-all duration-200 group-hover:bg-white/10 group-active:scale-95 dark:hover:text-white dark:group-hover:text-white"
              href="#"
            >
              <ExitToAppIcon />
              <span className="font-quicksand">Sair</span>
            </Link>
          </div>
        </div>
      </aside>
    </div>
  )
}
