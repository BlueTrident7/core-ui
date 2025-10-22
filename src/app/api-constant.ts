export class ApiConstant {
  public static readonly BASE_URL = 'http://localhost:3000/api';

  public static readonly CATEGORY = {
    GET_ALL: '/categories',
    CREATE: '/categories',
    UPDATE: '/categories',
    DELETE: '/categories',
  };

  public static readonly INVESTMENT_PLANS = {
    GET_ALL: '/investment-plans',
    CREATE: '/investment-plans',
    UPDATE: '/investment-plans',
    DELETE: '/investment-plans',
  };

  public static readonly ADMIN_PANEL = {
    OVERVIEW: '/admin/overview',
  };

  // Action types for callbacks
  public static readonly GET_CATEGORIES = 'GET_CATEGORIES';
  public static readonly SAVE_CATEGORY = 'SAVE_CATEGORY';
  public static readonly UPDATE_CATEGORY = 'UPDATE_CATEGORY';
  public static readonly DELETE_CATEGORY = 'DELETE_CATEGORY';

  public static readonly GET_INVESTMENT_PLANS = 'GET_INVESTMENT_PLANS';
  public static readonly SAVE_INVESTMENT_PLAN = 'SAVE_INVESTMENT_PLAN';
  public static readonly UPDATE_INVESTMENT_PLAN = 'UPDATE_INVESTMENT_PLAN';
  public static readonly DELETE_INVESTMENT_PLAN = 'DELETE_INVESTMENT_PLAN';

  public static readonly GET_ADMIN_OVERVIEW = 'GET_ADMIN_OVERVIEW';

  public static readonly USER_PROFILE = 'USER_PROFILE';
}
