import PetsIcon from '@mui/icons-material/Pets'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'
import EditIcon from '@mui/icons-material/Edit'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import MasksIcon from '@mui/icons-material/Masks'
import EventNoteIcon from '@mui/icons-material/EventNote'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/home', label: 'Home', icon: HomeIcon },
  { to: '/clientes', label: 'Clientes', icon: PeopleAltIcon },
  { to: '/pets', label: 'Pets', icon: PetsIcon },
  { to: '/vets', label: 'Veterinarios', icon: MasksIcon },
  { to: '/consultas', label: 'Consultas', icon: EventNoteIcon }
]

const disabledItems = [
  { label: 'Editar Perfil', icon: EditIcon },
  { label: 'Configuracoes', icon: SettingsIcon },
  { label: 'Sair', icon: ExitToAppIcon }
]

export default function Sidebar() {
  return (
    <div className="fixed z-50">
      <aside className="flex h-screen min-h-full w-72 flex-col items-center space-y-7 bg-[#1c212c] pb-2 pt-5">
        <div className="flex w-full flex-col gap-y-1 fill-gray-500 pr-3 text-sm text-gray-500">
          <div className="pl-4 font-quicksand text-xs uppercase text-gray-400/60">
            Clinica Vet
          </div>

          {navItems.map(({ to, label, icon: Icon }) => (
            <div
              key={to}
              className="group flex w-full select-none items-center gap-x-1.5"
            >
              <div className="relative h-8 w-1 overflow-hidden rounded-xl bg-transparent transition-colors duration-200">
                <div className="absolute left-0 top-0 h-[102%] w-full translate-y-full bg-violet-600 transition-all duration-300 group-hover:translate-y-0" />
              </div>
              <NavLink
                className={({ isActive }) =>
                  `flex w-full items-center space-x-2 self-stretch rounded pl-2 text-sm transition-all duration-200 group-hover:bg-white/10 group-active:scale-95 dark:hover:text-white dark:group-hover:text-white ${
                    isActive ? 'bg-white/10 text-white' : ''
                  }`
                }
                to={to}
              >
                <Icon />
                <span className="font-quicksand">{label}</span>
              </NavLink>
            </div>
          ))}
        </div>

        <div className="flex w-full flex-col gap-y-1 fill-gray-500 pr-3 text-sm text-gray-500">
          <div className="pl-4 font-quicksand text-xs uppercase text-gray-400/60">
            Perfil
          </div>

          {disabledItems.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="group flex w-full select-none items-center gap-x-1.5"
            >
              <div className="relative h-8 w-1 overflow-hidden rounded-xl bg-transparent transition-colors duration-200">
                <div className="absolute left-0 top-0 h-[102%] w-full translate-y-full bg-violet-600 transition-all duration-300" />
              </div>
              <button
                type="button"
                disabled
                className="flex w-full items-center space-x-2 self-stretch rounded pl-2 text-left text-sm opacity-60 transition-all duration-200"
              >
                <Icon />
                <span className="font-quicksand">{label}</span>
              </button>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}
