export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER'
}

export const RolePermissions: { [key in Role]: string[] } = {
  USER: [],
  ADMIN: [
    'ADMIN_READ',
    'ADMIN_UPDATE',
    'ADMIN_DELETE',
    'ADMIN_CREATE',
    'MANAGER_READ',
    'MANAGER_UPDATE',
    'MANAGER_DELETE',
    'MANAGER_CREATE'
  ],
  MANAGER: [
    'MANAGER_READ',
    'MANAGER_UPDATE',
    'MANAGER_DELETE',
    'MANAGER_CREATE'
  ]
};

export interface SimpleGrantedAuthority {
  authority: string;
}

export function getAuthorities(role: Role): SimpleGrantedAuthority[] {
  const authorities: SimpleGrantedAuthority[] = RolePermissions[role].map(permission => ({
    authority: permission
  }));
  authorities.push({ authority: 'ROLE_' + role });
  return authorities;
}

