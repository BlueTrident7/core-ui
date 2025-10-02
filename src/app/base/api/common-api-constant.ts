export class CommonApiConstant {
    public static AUTH_REFRESHTOKEN = 'ltauth/refreshtoken';
    public static AUTH_LOGIN = 'ltauth/login';
    public static LTAUTH_PASSCODE_VERIFICATION = 'ltauth/passcode/verification';
    public static AUTH_IDENTITY_LOGIN = 'ltauth/identitylogin';
    public static AUTH_REFRESHTOKEN_FOR_HATI =
        '/identity-service/auth/generateTokenByRefreshToken';
    public static AUTH_LOGIN_AUTHENTICATION = 'ltauth/login/authentication';
    public static REMOVE_USER_ACTIVE_SESSIONS = 'ltauth/remove/user/sessions';
    public static UM_USER_PROFILE_ = 'ums/user/profile/';
    public static PERSON_DOWNLOAD_IMAGE = 'person/download/image/';

    public static UMS_APPLICATION_COMPONENTS = 'ums/application/components';
    public static UMS_APPLICATION_ACCESS_RIGHTS =
        'ums/application/access/rights';
    public static UMS_USER_APPLICATION_ACCESS_RIGHTS =
        'ums/users/application/access/rights';

    public static HIS_CS_PERSON_DOWNLOADEDIMAGE_GET = 'person/downloadImage/';
    public static HIS_CS_PERSON_DOWNLOADED_SIGNATURE =
        'core/person/download/signature/';
    public static HIS_CS_REMOVE_PERSON_PROFILE_PHOTO_ =
        'core/person/remove/profile/photo/';
    public static HIS_CS_SITE_DOWNLOAD_IMAGE = 'site/downloadImage/';
    public static HIS_CS_PERSON_PROFILE_PHOTO_ =
        'file-store/person/profile/photo/';

    public static AUTH_EXTERNAL_LOGIN = '/ltauth/external/login';
    public static UM_USER_ = 'ums/user/';
    public static HIS_CS_SYSTEM_LANGUAGE = 'core/system/language';
    public static CLINICAL_FORMS_CATALOGUE = 'ipd-clinical/forms/Catalogue';
    public static UM_USER_APP_LANGUAGE = 'ums/user/app/language';
    public static UM_COMPONENT_ACCESS_RIGHTS_ = 'ums/component/access/rights/';
    public static PHYSICIANS_GET = 'ums/user/physicians/';
    public static SYSTEM_MASTERS_LANGUAGE_GET = 'core/language/system/masters';
    public static HIS_CS_SYSTEM_MASTER = '/core/system/master';
    public static COUNTRY_LIST = 'core/countries';
    public static STATE_LIST = 'core/states/';
    public static CITY_LIST = 'core/city/';
    public static HIS_PERSONALDETAILS_GET = 'core/patient/';

    public static HIS_CS_PERSON_SIGNATURE = 'core/person/signature/';
    public static HIS_FILE_STORE_PERSON_SIGNATURE =
        'file-store/person/signature/';
    public static USER_PROFILE_UPDATE = 'ums/user/profile/details?';
    public static UM_USER_PROFILE = 'ums/user/profile/';
    public static CLINICAL_SETTINGS_GET = 'ipd-clinical/settings';
    public static HIS_CS_SITE_GET = 'core/sites/';
    public static HIS_CS_SYSTEM_LANGUAGE_GET = 'core/system/language';
    public static CLINICAL_GENERAL_SETTINGS_GET =
        'ipd-clinical/general/settings';
    public static CUSTOMER_MASTER_GET = 'core/cws/customer/master';
    public static HIS_CS_PATIENT_DETAILED_REGISTER = '';
    public static ADMIT_PATIENT_POST = 'core/patient/admission';
    public static CLINICAL_EADMISSION_ADMIT_DETAILS_GET =
        'ipd-clinical/admission/order/store';
    public static CUSTOMER_MASTER_GET_DETAILS = '/core/cws/customer/master/get';
    public static CUSTOMER_SUB__MASTER_GET_DETAILS =
        '/core/cws/customer/master/get';
    public static HIS_PATIENT_GET = 'core/patient/list';
    public static HIS_CS_UPDATE_SITE = 'core/update/site';
    public static HIS_CS_SITE_IMAGE = 'core/site/image/';
    public static HIS_FILESTORE_SITE_IMAGE = 'file-store/site/image/';
    public static HIS_CS_SITE_IMAGE_GET = 'core/site/image/{siteId}';

    public static PHYSICIAN_SELF_PAY_TERRIF = 'core/physician/selfpay/terif';
    public static GET_WORKFLOW_SETTINGS = 'core/settings/workflow';
    public static UMS_USER_ENABLE_PORTAL = 'ums/user/enable/portal';
    public static CORE_CUSTOMER_MASTER_GET = 'core/customer/master/get';
    public static HIS_CS_DEPARTMENT_GET = '/core/department/get';
    public static CORE_EXTERNAL_SITES_ = 'core/external/sites/';
    public static HIS_CS_LIST_BED_SITEMASTER = '/core/list/bed/sitemaster';

    public static SHIFT_LOGIN = '/shift/login';
    public static HIS_CS_PATIENTS_INSURANCE_GET = 'core/patients/insurances';
    public static BILLING_GENERATE_INVOICE = 'billing/generate/invoice';
    public static BILLING_PATIENT_LEDGER_GET = 'billing/patient/ledger';
    public static BILLING_FINALIZED_BILLS = 'billing/finalized/bills';
    public static HIS_CS_PATIENT_INSURANCE = 'core/patient/insurance';
    public static HIS_CS_INSURANCE_NETWORK_GET = 'core/insurance/networks';
    public static HIS_CS_INSURANCE_RECEIVERS = 'core/insurance/receivers';
    public static HIS_CS_INSURANCE_RECEIVER_PAYER_MAPPINGS =
        'core/insurance/receiver/payer/mappings';
    public static CUSTOMER_COPAY_TYPE_GET = 'core/customer/copay/types';
    public static HIS_CHARGE_GROUP_GET = 'core/charge/group';
    public static CLINICAL_FORMS = 'ipd-clinical/forms';
    public static HIS_CLINICAL_CONSULT_APPOINTMENT_GET = 'core/consult/queue/';
    public static FORMS = 'FORMS';
    public static FORM = 'FORM';
    public static CLINICAL_DASHBOARD_GET = 'ipd-clinical/dashboard/list';
    public static IN_PATIENT_GET = 'core/list/';
    public static ER_Q_GET_PATIENT = 'core/list/erq/';
    public static TEMP_CAT = 'TEMP-CAT';
    public static TEMP_SUB_CAT = 'TEMP-SUB-CAT';
    public static ADD_ATTACHMENT = 'file-store/report';
    public static GET_OLD_MEDICAL_RECORDS = '/core/oldmedical/report';
    public static DOWNLOAD_REPORT = '/file-store/report/download/';

    public static HIS_CS_PATIENT_INSURANCE_COPAY =
        'core/patient/insurance/copay';
    public static GET_INVENTORY_WORKFLOW_SETTINGS =
        'inventory/inventory/workflow/settings';
    public static CORE_ENCOUNTER_INSURANCE = 'core/encounter/insurance';

    public static BILLING_ENCOUNTER_INSURANCE =
        '/ipd/fetch/encounter/insurance';

    public static ADD_INSURANCE_AUTHORIZATION =
        'ipd/confirm/insurance/authorization';

    public static GET_INSURANCE_AUTHORIZATION =
        '/ipd/fetch/insurance/authorization';

    public static ADD_ENCOUNTER_INSURANCE = '/core/encounter/insurance';
    public static ADD_PATIENT_INSURANCE = '/core/current/patient/insurance';

    public static PASSWORD_CHANGE_ADD = 'ltauth/user/update/password';

    public static HIS_GET_ALL_HISLOCATION = '/core/his/all/locations';
    public static UM_USER_APP_DOCTOR_ROOM_MAPPING =
        'ums/user/app/doctor/room/mapping';

    public static GET_IPD_ENCOUNTER_INSURANCES = 'ipd/ip/encounter/insurance';

    public static HIS_CS_UOM_GET = 'core/uoms';
    public static HIS_CS_UOM_PUT = 'core/uom/display';
    public static HIS_CS_REASONS_ADD = 'core/reason';
    public static HIS_CS_REASONS_UPDATE = 'core/reason/put/';
    public static HIS_CS_REASONS_GET = 'core/reason/get';
    public static HIS_CS_REASONS_DELETE = 'core/reason/delete/';
    public static HIS_CS_EQUIPMENT_PUT = 'core/equi/note/';
    public static HIS_CS_EQUIPMENT = 'core/equipment';
    public static HIS_CS_GET_EQUIPMENT = 'core/get/equipment';
    public static HIS_CS_EQUIPMENT_DELETE = 'core/equipment/note/';
    public static HIS_CS_EXTERNAL_SITE_GET = 'core/external/sites/';
    public static HIS_CS_EXTERNAL_SITE_NAME_GET = 'core/external/sites/name/';
    public static DELETE_INS_AUTHORIZATION_IN_IPD =
        'ipd/delete/insurance/authorization/';
    public static UPDATE_INS_AUTHORIZATION_IN_IPD =
        'ipd/update/insurance/authorization';

    public static BILLING_WORKFLOW_SETTINGS =
        'ipd/opd/billing/workflow/settings';
    public static GET_INVENTORY_GENRAL_SETTINGS =
        'inventory/inventory/pharmacy/settings';

    public static CUSTOMER_USER_GET = 'core/customer/user/data';

    public static ADD_EMPLOYER_ORGANIZATION =
        'core/customer/master/organization';
    public static INVENTORY_GENRAL_SETTING =
        'inventory/inventory/genral/setting';
    public static UMS_GET_APPLICATIONCOMPONENTS =
        'ums/get/applicationcomponents/';
    public static UMS_BUTTON_ACCESS_SETTINGS = 'ums/button/access/settings';

    public static IPD_CURRENT_VISIT_TYPE = 'ipd/followup/rule/get/visit/type';

    public static FOLLOWUP_RULE_SETTINGS = 'ipd/followup/rule';
    public static GET_FOLLOWUP_RULE_SETTINGS = 'ipd/followup/rule';
    public static DELETE_FOLLOWUP_RULE_SETTINGS = 'ipd/followup/rule/';
    public static SAVE_SITE_FOLLOWUP_RULES = 'ipd/site/followup/rule';
    public static GET_SAVED_SITE_FOLLOWUP_RULES = 'ipd/site/followup/rule';

    public static OPD_COMPONENT_FILTER = 'ipd/opd/component/filter';
    public static OPD_COMPONENT_FILTER_DEFAULT =
        'ipd/opd/component/filter/default';
    public static OPD_COMPONENT_FILTER_UPDATE =
        'ipd/opd/component/filter/update';
    public static OPD_COMPONENT_FILTER_DELETE = 'ipd/opd/component/filter/';

    public static CORE_COMPONENT_FILTER = 'core/opd/component/filter';
    public static CORE_COMPONENT_FILTER_DEFAULT =
        'core/opd/component/filter/default';
    public static CORE_COMPONENT_FILTER_UPDATE =
        'core/opd/component/filter/update';
    public static CORE_COMPONENT_FILTER_DELETE = 'core/opd/component/filter/';

    public static APPOINTMENT_COMPONENT_FILTER =
        'appointment/opd/component/filter';
    public static APPOINTMENT_COMPONENT_FILTER_DEFAULT =
        'appointment/opd/component/filter/default';
    public static APPOINTMENT_COMPONENT_FILTER_UPDATE =
        'appointment/opd/component/filter/update';
    public static APPOINTMENT_COMPONENT_FILTER_DELETE =
        'appointment/opd/component/filter/';
    public static HIS_CS_EMPLOYEE_LIST = '/core/employee/list';
    public static HIS_CS_PERSON_PROFILE_PHOTO_FILE =
        'file-store/person/profile/photo/';
    public static HIS_CS_PERSON_DOWNLOADEDIMAGE = 'person/downloadImage/';
    public static HIS_CUSTOMER_DETAILS = 'his/customer/details';
    public static GET_NEW_COMPONENTS = 'ums/new/components';
    public static UPDATE_ACCESS_RIGHT_COMPONENTS =
        'ums/component/access/rights/update/';
    public static HIS_CS_BED_SITEMASTER = 'core/bed/sitemaster';
    public static HIS_CS_BED_SELECT_PCU = 'core/bed/select/pcu';

    public static GENERATE_DISCOUNT_REPORT = 'report/generate/discount/report';

    public static INTERNAL_RELAY_SERVICE_GET_USER_STATUS =
        'internal-relay-service/get-user-status';
    public static INTERNAL_RELAY_SERVICE_GET_CHAT_HISTORY =
        'internal-relay-service/get-chat-history';
    public static INTERNAL_RELAY_SERVICE_GET_BROADCAST_HISTORY =
        'internal-relay-service/get-broadcast-history';
    public static CLINICAL_COMPONENT_GET = 'ums/clinical/components';
    public static CORE_REASON_GET = 'core/reason';
    public static USER_BY_SITEID_GET = 'ums/user/by/site/';
    public static GET_ALL_CUSTOMER_MASTER = 'core/customer/master/getAll';
    public static UM_CUSTOMIZE_COUNSUL_USER_PUT =
        'ums/clinical/component/user/access';

    public static CORE_CITY_PINCODE = 'core/city/pincode';
    // public static USER_NOTIFICATION_QUEUE = 'notification/queue/browser/';
    public static USER_NOTIFICATION_QUEUE =
        'notification//all/user/notification';
    public static HIS_BOM_DETAILS_GET = 'core/boms';
    public static HIS_BOM_DELETE = 'core/bom/';
    public static HIS_CS_ROUTE_UOM_GET = '/core/orderable/drug/route';
    public static GET_BOM_DETAILS = 'core/item-association';
    public static GET_DOCTOR_CONSULT_ROOMS = 'core/his/location/doctor/rooms';
    public static GET_WARD_STORE_ROOMS = 'core/his/ward/store/rooms';

    public static INVENTORY_NEW_TRANSFER_ITEM_BATCH_DETAILS =
        'inventory/new/transfer/items/batch/details';

    public static GET_CHILD_BOM_DETAILS = 'core/item-association/child-item';

    public static IP_MEWS_ADD = 'ipd-clinical/add/mews/score';
    public static IP_MEWS_Score_GET = 'ipd-clinical/get/mews/score';

    public static LIS_PATIENT_LAB_RESULT_GET =
        'lis/lab/all/result/for/encounter';

    public static Er_MARK_ORDER_RECONCILLATION =
        'ipd-clinical/er/mark/order/reconcillation';

    public static INVENTORY_IND_RECEIVE = 'inventory/indent/stock/receive';

    public static HIS_CS_CATALOGUE_ITEM_GET_SEARCH =
        'core/catalogue/items/get/search';

    public static IP_MARK_ORDER_STANDING_ORDERS =
        'ipd-clinical/er/mark/order/standing/orders';

    public static LIS_PATIENT_LAB_RESULT_GET_PREVIOUS =
        'lis/lab/all/result/for/patient';

    public static ADMISSION_ACK_DETAILS_UPDATE = 'ipd-clinical/ackdetails';

    public static ADMISSION_PATIENT_LIST_GET = 'ipd-clinical/admission/list';

    public static QUEUE_PRIORITY_TOKENS_LIST = 'queue/priority/tokens';
    public static OP_DASHBOARD_PRIORITY_TOKENS_LIST =
        'ipd-clinical/op/dashboard/priority/token/list';
    public static GET_REMOVED_DIAGNOSIS_DATA =
        'ipd-clinical/active/removed/datefilter/get';
    public static HIS_CATALOGUE_ITEM_GET = 'core/catalogue/item';
    public static ACTIVE_DIAGNOSIS_GET = 'ipd-clinical/active/diagnosis';
    public static HIS_CATALOGUE_CATEGORY_GET = 'core/catalogue/category';
    public static HIS_CATALOGUE_CATEGORY_POST = 'core/catalogue/category/post';
    public static HIS_CATALOGUE_CATEGORY_PUT = 'core/catalogue/category/put';
    public static HIS_CATALOGUE_CATEGORY_DELETE =
        'core/catalogue/category/delete';
    public static HIS_CS_CLINICAL_COMMON_NAME_CATEGORIES =
        'core/common/name/categories';
    public static AUTH_PASSWORD_POLICY = 'ltauth/password-policy';
    public static NOTIFICATION_UPDATE_READ =
        'notification/notification/queue/read/';
    public static GET_ALL_CUSTOMER_IMAGE = 'core/get/all/customer/image';
    public static PREVIEW_IMAGE = 'preview/image/';
    public static MASTER_ALIAS_DATA = 'core/get/master/alias';
    public static AI_REGISTER_USER = 'ai-service/ai/face/register';
    public static CORE_DOCTOR_LOCATION_CODE_GET = 'core/doctor/location/code';
    public static GET_PROMPT_BUILDER_MASTER =
        'supplementary/aipromptbuilder/prompt-items/master';
    public static SAVE_PROMPT_BUILDER_ITEM =
        'supplementary/aipromptbuilder/prompt-items/add/items';
    public static GET_PROMPT_BUILDER_ITEM =
        'supplementary/aipromptbuilder/prompt-items/get/items';
    public static DELETE_PROMPT_BUILDER_ITEM =
        'supplementary/aipromptbuilder/prompt-items/remove/';
    public static SUP_AI_PROMPT_BUILDER = 'supplementary/api/prompts';
    public static AI_PROMPT_CHAT_POST = 'ai-service/ai/openai/create-assistant';
    public static SUP_AI_GET_PROMPTS = 'supplementary/api/prompts/details';
}
