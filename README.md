# focus-whatsapp-web
Focus for WhatsApp Web. Tame your messaging use &amp; take back control on your productivity.

## Features
- Hide entire chat list
- Hide search results
    - Only show when 'exact match'
    - Only show when minimum 3 characters typed
- Ability to hide any particular chat
- Shortcut for searching (is already defined, as `/`)
- "Focus timer" / "Focus schedule"
    - i.e. only whilst working


### Developer notes
A rule to hide the chat list:
```css
[aria-label~='Chat'] {
    display: none;
}
```

And the search menu:
```css
[aria-label~='Search'] {
    display: none;
}