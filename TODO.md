# TODO: Fix Topbar Hover Name Display

## Steps to Complete:
- [x] Update topbar.component.html: Remove pTooltip from nav-items and add data-label attribute with item.label
- [x] Update topbar.component.scss: Add CSS for ::after pseudo-element on .nav-item:hover to display the label below the icon with fade-in transition
- [x] Test the hover effect in the browser to ensure labels appear correctly and look good

# TODO: Fix Transaction Nav Button Icon

## Steps to Complete:
- [x] Update topbar.component.ts: Change the icon for Transaction menu item to an emoji (e.g., 💱)
- [x] Update topbar.component.html: Modify the icon rendering to handle emojis properly
- [ ] Test that the emoji displays correctly in the topbar navigation
