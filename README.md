# Tampermonkey Class Remover Utility

Lightweight utility for Tampermonkey scripts to remove annoying CSS classes that block text selection and user interactions

## Quick Start

### 1. In your Tampermonkey script header:
```javascript
// @require https://cdn.jsdelivr.net/gh/sterlingjf/tampermonkey-class-remover@main/class-remover-utility.js
```

### 2. In your script body:
```javascript
const CLASSES_TO_REMOVE = ['no-select', 'no-copy', 'unselectable'];
window.ClassRemoverUtility.removeClasses(CLASSES_TO_REMOVE);
```

## Configuration Options

```javascript
const options = {
    logLevel: 'info',        // 'silent', 'info', 'verbose'
    watchDynamic: true,      // Monitor for content added after page load
    observerDelay: 100       // Delay before re-scanning (milliseconds)
};

window.ClassRemoverUtility.removeClasses(CLASSES_TO_REMOVE, options);
```

## Common Annoying Classes

> [!NOTE]
> This list covers common accessibility-hindering classes. Use responsibly and respect content creators' rights.

- `no-select` - Prevents text selection
- `no-copy` - Blocks copy operations  
- `noselect` - Alternative spelling
- `unselectable` - Descriptive variant
- `disable-select` - Verbose version
- `readonly` - Form/code elements

## Example Scripts

> [!IMPORTANT]
> All examples require `@run-at document-end` in your userscript header.

**News Sites:**
```javascript
const CLASSES = ['no-select', 'paywall-blur'];
window.ClassRemoverUtility.removeClasses(CLASSES, { logLevel: 'silent' });
```

**Documentation Sites:**
```javascript
const CLASSES = ['no-select', 'no-copy', 'readonly'];
window.ClassRemoverUtility.removeClasses(CLASSES);
```

**Social Media (dynamic content):**
```javascript
const CLASSES = ['unselectable-text', 'protected-content'];
window.ClassRemoverUtility.removeClasses(CLASSES, { 
    watchDynamic: true, 
    observerDelay: 50 
});
```

## Advanced Usage

For debugging or custom workflows, the function returns an object:

```javascript
const result = window.ClassRemoverUtility.removeClasses(classes);
console.log(`Removed ${result.removed} class instances`);

// Manually trigger another removal later
result.performRemoval();
```

**Returns:**
- `removed` (number) - Count of class instances removed
- `performRemoval` (function) - Manually trigger another scan

## License

MIT
