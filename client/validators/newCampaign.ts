import { ProcessedCampaign } from "../types";
import { CampaignErrors, CampaignPayload } from "../types/validators";

export default ({
  description,
  minContribution,
  title
}: CampaignPayload): [ProcessedCampaign | null, CampaignErrors | null] => {
  let errors = {};
  const contribution = parseInt(minContribution);

  const payload = {
    description,
    title,
    minContribution: contribution
  };

  if (!title.length) errors["title"] = "Title can't be empty";
  if (title.length > 50)
    errors["title"] = "Title can't be longer than 50 characters";

  if (!contribution)
    errors["minContribution"] = "Minimum contribution must be > 1 wei";

  if (!!Object.keys(errors).length) return [null, errors];
  else return [payload, null];
};
