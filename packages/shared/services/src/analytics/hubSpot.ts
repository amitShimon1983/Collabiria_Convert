import { browserName, browserVersion } from 'react-device-detect';
import * as os from 'os';
let _context: any;
const hubSpotReady = new Promise(resolve => {
  const interval = setInterval(() => {
    // @ts-ignore
    const api = window._hsq;
    if (api) {
      clearInterval(interval);
      resolve(api);
    }
  }, 250);
  setTimeout(() => {
    if (interval) {
      clearInterval(interval);
    }
  }, 30000);
});

const sendEventToHubSpot = (name: string, properties: any) => {
  hubSpotReady.then((hubSpot: any) => {
    hubSpot.push([
      'trackCustomBehavioralEvent',
      {
        name,
        properties,
      },
    ]);
  });
};

export const initialHubSpot = (context: any) => {
  _context = context;
};

export const pushEmailSharedByUserEvent = () => {
  sendEventToHubSpot('pe25346238_ce_email_share', {
    email_share_event: true,
  });
};

export const pushEmailReplyByUserEvent = () => {
  sendEventToHubSpot('pe25346238_ce_email_reply', {
    email_reply_event: true,
  });
};

export const pushRuleCreatedByUserEvent = () => {
  sendEventToHubSpot('pe25346238_rule_created_by_user', {
    rule_created_event: true,
  });
};

export const pushRemoveAppEvent = () => {
  sendEventToHubSpot('pe25346238_remove_app', { remove_app___event: true });
};

export const pushTaskAssignedByUserToSelfEvent = () => {
  sendEventToHubSpot('pe25346238_ce_tasks_by_user_to_self', {
    tasks_by_user_to_self_team_id: _context.teamId,
    tasks_by_user_to_self_tenant_id: _context.tid,
    tasks_by_user_to_self_channel_id: _context.channelId,
    tasks_by_user_to_self___event: true,
  });
};

export const pushTaskAssignedByUserToOthersEvent = () => {
  sendEventToHubSpot('pe25346238_ce_tasks_by_user_to_others', {
    tasks_by_user_to_others_team_id: _context.teamId,
    tasks_by_user_to_others_tenant_id: _context.tid,
    tasks_by_user_to_others_channel_id: _context.channelId,
    tasks_by_user_to_others_event: true,
  });
};

export const pushTaskAssignedByUserEvent = (ownerEmail: string) => {
  if (ownerEmail === _context?.loginHint) {
    pushTaskAssignedByUserToSelfEvent();
  } else {
    pushTaskAssignedByUserToOthersEvent();
  }
};

export const pushDeclineReasonEvent = (declinedPermissions: boolean, reasonNotAllowedToAcceptPermissions: boolean) => {
  sendEventToHubSpot('pe25346238_decline_reason', {
    reason___declined_permissions: declinedPermissions,
    reason___not_allowed: reasonNotAllowedToAcceptPermissions,
  });
};

export const pushSuccessfullyConnectedEvent = (connectedSuccessfully: boolean) => {
  sendEventToHubSpot('pe25346238_successfully_connected', {
    connected___team_id: _context.teamId,
    connected___tenant_id: _context.tid,
    connected___channel_id: _context.channelId,
    connected_successfully: connectedSuccessfully,
  });
};

export const pushContactIsCreatedEvent = () => {
  const { teamId, tid, channelId, teamSiteDomain, teamSiteUrl, tenantSKU, userObjectId, loginHint } = _context;

  sendEventToHubSpot('pe25346238_contact_is_created', {
    account_champion: true,
    account_team_member: true,
    created___browser_version: `${browserName} ${browserVersion}`,
    created___channel_id: channelId,
    email: loginHint,
    created___initial_referring_domain: teamSiteUrl,
    created___operating_system: os.platform(),
    created___team_id: teamId,
    created___team_site_domain: teamSiteDomain,
    created___tenant_id: tid,
    created___tenant_sku: tenantSKU,
    created_time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    created___user_id: userObjectId,
  });
};
