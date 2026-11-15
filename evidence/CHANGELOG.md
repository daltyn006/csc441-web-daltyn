# Changelog

- Change theme button to drop down selector to allow for accessibility.

- Simplified the theme system: OS dark/light preference is now resolved once on first visit and saved like any other theme

- Fixed theme flash on first load by applying the theme before first paint

- JS loaded as a plain script in head: top half applies the theme pre-paint, bottom half waits for page to load

- Replaced the cycling button with a dropdown, options generated from the theme list, change event applies and saves

- Styled the dropdown: .theme-picker, the nav doesn't shift when options load, visible focus ring

- fetchpriority="high" on the header portrait

- Removed error listeners that deleted broken images/cards; alt text now shows inside the reserved box

- Lightbox image size caps so the overlay and caption paint immediately

- Changed body transition to background-color/color only
