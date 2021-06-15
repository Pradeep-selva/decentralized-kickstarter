export default {
  home: "/",
  newCampaign: "/campaigns/new",
  campaignById: {
    absolute: "/campaigns/[campaign]",
    as: (id: string) => `/campaigns/${id}`
  },
  requestsByCampaign: {
    absolute: "/campaigns/[campaign]/requests",
    as: (id: string) => `/campaigns/${id}/requests`
  },
  newRequest: {
    absolute: "/campaigns/[campaign]/requests/new",
    as: (id: string) => `/campaigns/${id}/requests/new`
  }
};
