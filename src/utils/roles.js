const Role = {
    user:'ISP',
    internalAdmin:'admin',
    admin:'client'
}

/**
 * Test Portal auditor = ISP + designation "test" (e.g. giva_test).
 * Real auditors / admin / client keep subsection UI.
 */
export const isTestPortalUser = (user = {}) => {
  const data = user?.data || user || {};
  const userType = String(data.user_type || '').trim();
  const designation = String(data.designation || '').trim().toLowerCase();
  return userType === Role.user && designation === 'test';
};

export default Role
