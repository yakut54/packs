export const Admin = {
  state: () => ({
    adminTitle: 'Список упаковок',
  }),
  mutations: {
    setAdminTitle: (state, adminTitle) => {
      state.adminTitle = adminTitle}
  }
}