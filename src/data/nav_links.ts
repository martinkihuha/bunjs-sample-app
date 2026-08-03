export type NavLink = {
  id: number;
  title: string;
  url: string;
  icon: string;
  iconSolid: string;
  listOrder?: number;
}

export const navLinks: NavLink[] = [
  {
    id: 1,
    title: 'Dashboard',
    url: '/dashboard',
    icon: 'heroicons:home',
    iconSolid: 'heroicons:home-solid',
    listOrder: 1
  },
  {
    id: 2,
    title: 'Pets',
    url: '/pets',
    icon: 'fluent:animal-paw-print-20-regular',
    iconSolid: 'fluent:animal-paw-print-20-filled',
    listOrder: 2
  }
]