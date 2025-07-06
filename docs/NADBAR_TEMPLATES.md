# Nadbar Templates Architecture

## Overview

The nadbar system now uses a generic `NadbarEditor` component that can work with any template. This makes it easy to create new nadbar types without duplicating code.

## Architecture

### Components

1. **NadbarEditor** (`components/common/NadbarEditor.tsx`)
   - Generic component that accepts a template as a prop
   - Handles all nadbar management (loading, saving, target selection)
   - Renders the nadbar using `NadbarRenderer`

2. **Template Structure** (`components/common/nadbarTypes.ts`)
   - `NadbarTemplate`: Static structure definition
   - `NadbarData`: Dynamic values stored in database
   - `MergedNadbar`: Combined template + data for rendering

### Services

- **NadbarService**: Manages nadbar data (CRUD operations)
- **NadbarMerger**: Utilities to merge templates with data

## Creating a New Template

### Step 1: Define the Template

Create a new template file (e.g., `components/nadbars/myTemplate/myTemplate.ts`):

```typescript
import { NadbarTemplate, NadbarType } from '../../common/nadbarTypes';

export const MY_TEMPLATE: NadbarTemplate = {
  id: 'my_template_v1',
  name: 'התבנית שלי',
  type: NadbarType.Maskar, // or create new type in enum
  version: '1.0',
  elements: [
    {
      type: 'form',
      header: 'פרטים',
      data: [
        { label: 'שם', fieldId: 'name', inputType: 'text' },
        { label: 'אזימוט', fieldId: 'azimuth', inputType: 'text', targetField: 'azimuth' },
        { label: 'טווח', fieldId: 'distance', inputType: 'text', targetField: 'distance' }
      ]
    }
  ]
};
```

### Step 2: Create the Component

Create a simple component (e.g., `components/nadbars/myTemplate/index.tsx`):

```typescript
import React from 'react';
import NadbarEditor from '../../common/NadbarEditor';
import { MY_TEMPLATE } from './myTemplate';

const MyTemplateNadbar: React.FC = () => {
  return <NadbarEditor template={MY_TEMPLATE} />;
};

export default MyTemplateNadbar;
```

### Step 3: Register the Template

Add your template to the registry in `app/screens/nadbar/NadbarList.tsx`:

```typescript
import { MY_TEMPLATE } from '../../../components/nadbars/myTemplate/myTemplate';

const TEMPLATE_REGISTRY = {
  [DEFAULT_MASKAR_TEMPLATE.id]: DEFAULT_MASKAR_TEMPLATE,
  [MY_TEMPLATE.id]: MY_TEMPLATE, // Add your template here
};
```

### Step 4: Add Route Mapping

Add a route case in the `getNadbarRoute` function:

```typescript
function getNadbarRoute(nadbar: NadbarData): string | null {
  switch (nadbar.templateId) {
    case DEFAULT_MASKAR_TEMPLATE.id:
      return '/TargetPage/Maskar';
    case MY_TEMPLATE.id:
      return '/TargetPage/MyTemplateNadbar'; // Add your route
    default:
      return null;
  }
}
```

### Step 5: Add Navigation Route

Create the route file in your app structure (e.g., `app/TargetPage/MyTemplateNadbar.tsx`):

```typescript
import MyTemplateNadbar from '../../components/nadbars/myTemplate';

export default MyTemplateNadbar;
```

## Template Features

### Field Types

- `text`: Simple text input
- `textArea`: Multi-line text input
- `dropdown`: Select from options
- `number`: Numeric input
- `date`: Date picker
- `time`: Time picker

### Target Fields

Fields can automatically populate from target data by setting `targetField`:

```typescript
{ 
  label: 'אזימוט', 
  fieldId: 'azimuth', 
  inputType: 'text', 
  targetField: 'azimuth' // Will auto-populate from target
}
```

Available target fields:
- `azimuth`: Calculated azimuth to target
- `distance`: Calculated distance to target
- `elevation`: Calculated elevation to target
- `coords`: Combined coordinates (northCoord/eastCoord)

### Dropdown Options

```typescript
{
  label: 'סוג פעולה',
  fieldId: 'actionType',
  inputType: 'dropdown',
  inputOptions: { 
    dropdown: ['פעולה א', 'פעולה ב', 'פעולה ג'] 
  }
}
```

## Benefits

1. **Reusability**: All nadbar management logic is in one place
2. **Consistency**: All templates behave the same way
3. **Maintainability**: Changes to core logic affect all templates
4. **Extensibility**: Easy to add new templates
5. **Type Safety**: Full TypeScript support

## Example

See `components/nadbars/example/` for a complete example template implementation. 