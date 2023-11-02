const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers', 'manageRoles', 'manageProducts', 'manageOrders', 'manageCategories'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
