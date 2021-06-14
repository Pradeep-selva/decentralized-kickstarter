export default {
  home: "/",
  newCampaign: "/campaigns/new",
  campaignById: {
    absolute: "/campaigns/[campaign]",
    as: (id: string) => `/campaigns/${id}`
  }
};
