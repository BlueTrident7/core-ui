
# Fix TypeScript Compilation Errors

## Issues Identified
1. ApiCallBack interface signature mismatch with component implementations.
2. CategoryPostDto and InvestmentPlanPostDto used as constructors but are interfaces.
3. AdminPanelDto missing 'stats' and 'users' properties used in template.

## Plan
- Update ApiCallBack interface to match component usage (onResult and onError signatures).
- Convert CategoryPostDto and InvestmentPlanPostDto from interfaces to classes.
- Update AdminPanelDto to include stats and users properties.
- Ensure components implement ApiCallBack<any> correctly.
- Add ApiCallBack implementation to InvestmentPlansComponent.

## Files to Edit
- src/app/base/api/api-callback.ts
- src/app/dto/category-post-dto.ts
- src/app/dto/investment-plans-dto.ts
- src/app/dto/admin-panel-dto.ts
- src/app/pages/admin-main/category/category.component.ts
- src/app/pages/admin-main/investment-plans/investment-plans.component.ts
- src/app/pages/admin-main/overview/overview.component.ts

## Followup Steps
- [x] Run build to verify fixes.
- [ ] Confirm build success with user.
