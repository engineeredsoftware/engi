// Example integration of procurement marketplace opt-in into credits-step.tsx
// This shows where to add the ProcurementMarketplaceOptIn component (moved)

// At the top of credits-step.tsx, add this import:
import ProcurementMarketplaceOptIn from './procurement-marketplace-opt-in';

// In the CreditsStep component, after the credit bundles section and before the usage analytics,
// add this procurement earning section:

{/* Procurement Marketplace Earning Section - NEW */}
<div className="procurement-earning-section" style={{ marginBottom: '32px' }}>
  <ProcurementMarketplaceOptIn 
    onSave={(data) => {
      // Handle procurement profile save
      console.log('Procurement profile saved:', data);
      
      // You can track this event
      trackEvent('procurement_profile_configured', {
        is_available: data.procurementProfile?.isAvailable,
        opted_repos: data.optedInRepositories || 0
      });
      
      // Optionally notify parent component
      onSave?.({
        ...data,
        step: 'credits',
        procurement: data.procurementProfile
      });
    }}
  />
</div>

// The component fits naturally in the credits flow because:
// 1. Users come to Credits to understand their balance and purchase more
// 2. Earning credits through marketplace work is the perfect complement
// 3. It's a simple toggle-based opt-in that doesn't complicate the UX
// 4. Repository selection is straightforward - just checkboxes for their repos

/*
Integration notes:

1. The procurement opt-in expands when clicked, keeping the credits UI clean
2. It includes earning potential calculation based on hourly rate
3. Repository opt-in is simple - just toggle which repos you're willing to work on
4. Skills are tag-based with suggestions for easy selection
5. Everything saves to the database tables we created

The user flow becomes:
1. User goes to Credits tab in their profile
2. Sees current balance and purchase options
3. Also sees "Earn Credits" marketplace option
4. Can easily opt-in their repos and set availability
5. Starts receiving procurement requests matching their skills

This creates a complete credit economy:
- Spend credits on AI usage and pipeline runs  
- Earn credits by contributing to marketplace projects
- Simple, discoverable, integrated into existing UI
*/
