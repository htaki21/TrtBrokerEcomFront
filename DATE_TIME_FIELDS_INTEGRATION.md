# Date and Time Fields Integration Guide

## Overview

The "Date de préférence" (Date preference) and "Créneau horaire" (Time slot) fields have been temporarily hidden from all insurance forms but preserved in the code for future use.

## What Was Hidden

- **Date Picker**: Calendar component for selecting preferred date
- **Time Slot Selector**: Dropdown for selecting time slots (08:30-09:00, 09:00-09:30, etc.)

## Files Modified

The following form step files have been updated with commented-out date/time sections:

### Auto Insurance

- `src/app/(multi-step-form)/devis-assurance-auto/step7/step7.tsx`

### Moto Insurance

- `src/app/(multi-step-form)/devis-assurance-moto/step4/step4.tsx`

### Habitation Insurance

- `src/app/(multi-step-form)/devis-assurance-habitation/step6/step6.tsx`

### Santé Insurance

- `src/app/(multi-step-form)/devis-assurance-sante/step3/step3.tsx`

### Assistance Voyage Insurance

- `src/app/(multi-step-form)/devis-assurance-assistance-voyage/step3/step3.tsx`

### Plaisance/Jet-Ski Insurance

- `src/app/(multi-step-form)/devis-assurance-plaisance-jet-ski/step5/step5.tsx`

### Individuelle Accidents Insurance

- `src/app/(multi-step-form)/devis-assurance-individuelle-accidents/step2/step2.tsx`

### Single-Page Forms

- `src/app/(with-header)/(pages)/contact/form.tsx`
- `src/app/(with-header)/(Particuliers)/assurance-automobile/sections/form/form.tsx`
- `src/app/(with-header)/(pages)/assurance-professionnelle/sections/form/form.tsx`

## How to Re-enable

### Step 1: Uncomment the Fields

In each form file, find the section marked with:

```jsx
{
  /* TEMPORARILY HIDDEN - Date and Time fields
...
*/
}
```

Remove the comment markers `{/*` and `*/}` to uncomment the entire section.

### Step 2: Verify Field Names

Each form uses different field names for the date and time:

- **Auto**: `selectedDate`, `selectedTime`
- **Moto**: `Date`, `Créneauhoraire`
- **Habitation**: `date`, `creneauHoraire`
- **Santé**: `date`, `creneauHoraire`
- **Assistance Voyage**: `date`, `creneauHoraire`
- **Plaisance**: `date`, `creneauHoraire`
- **Individuelle Accidents**: `date`, `creneauHoraire`

#### Single-Page Forms:

- **Contact**: Uses `Calendar24` and `SelectScrollable` components (no specific field names)
- **Auto Assurance**: Uses `selectedTimeSlot` for time slot
- **Assurance Professionnelle**: Uses `selectedTimeSlot` for time slot

### Step 3: Update Context Types

Make sure the form context types include the date and time fields:

- `selectedDate` / `selectedTime` (for auto)
- `Date` / `Créneauhoraire` (for moto)
- `date` / `creneauHoraire` (for others)

### Step 4: Test Form Submission

The backend already handles these fields in `src/app/api/send-devis/route.ts`, so no backend changes are needed.

## Backend Integration

The email templates in `send-devis/route.ts` already include these fields:

- `${formData.datePreference}` - Date preference
- `${formData.creneauHoraire}` - Time slot
- `${formData.selectedDate}` - Selected date (auto form)
- `${formData.selectedTime}` - Selected time (auto form)

## Notes

- All time slots are predefined in each form's `timeSlots` array
- The calendar component uses `Calendar24` from the date picker component
- The time selector uses `SelectScrollable` component
- Fields are marked as optional in the UI
