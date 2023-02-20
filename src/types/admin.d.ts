interface AdminObjItf {
  id?: number
  username?: string
  nickName?: string
  email?: string
  password?: string
  note?: string
  status?: number
}

interface AdminRoleFormData {
  roleLists: RoleObjItf[]
  userRoles: RoleObjItf[]
  adminId:number
}
