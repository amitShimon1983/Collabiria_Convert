import mixpanel from 'mixpanel-browser';

declare global {
  interface Window {
    Appcues: {
      identify: (...params) => void;
    };
  }
}

export function initUser({
  userObjectId,
  upn,
  tid,
  tenantSKU,
  teamSiteDomain,
  loginHint,
  mixPanelId,
}: any & { mixPanelId?: string }) {
  if (mixPanelId) {
    mixpanel.init(mixPanelId);
    mixpanel.identify(userObjectId);
    mixpanel.people.set({
      $email: upn || loginHint,
      'Sign up date': new Date().toISOString(),
      USER_ID: userObjectId,
      tid,
      tenantSKU,
      teamSiteDomain,
    });
  }

  window?.Appcues?.identify(
    loginHint, // unique, required
    {
      // recommended (optional) properties

      createdAt: Date.now(), // Unix timestamp of user signup date
      purchasedAd: null, // Unix timestamp of account purchase date (leave null if empty)
      planTier: 'Standard', // Current user’s plan tier
      role: 'Member', // Current user’s role or permissions
      accountId: tid, // Current user's account ID
      firstName: 'Jo', // current user's first name

      // additional suggestions

      companyName: teamSiteDomain, // Current user’s company name
      email: loginHint, // Current user's email
    }
  );
}

export function mixpanelEvent(eventName: string, data = {}) {
  try {
    // if (mixpanel && mixpanel?.get_distinct_id()) {
    //   mixpanel.track(eventName, data);
    // }
  } catch (error) {
    console.log({ errorMessage: error?.message });
  }
}
