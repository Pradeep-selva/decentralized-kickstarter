import { ProcessedCampaign } from "../types";
import { CampaignErrors, CampaignPayload } from "../types/validators";

export default (
  { description, minContribution, title, image }: CampaignPayload,
  isEdit = false
): [ProcessedCampaign | null, CampaignErrors | null] => {
  let errors = {};
  const contribution = parseInt(minContribution);

  const payload = {
    description,
    title,
    image,
    minContribution: contribution
  };

  if (!title.length) errors["title"] = "Title can't be empty";
  if (title.length > 100)
    errors["title"] = "Title can't be longer than 50 characters";

  if (contribution <= 0)
    errors["minContribution"] = "Minimum contribution must be > 0 wei";

  const imageWithoutQuery = image.slice(0, image.indexOf("?"));

  if (
    !!image.length &&
    (!["http", "https"].some((item) => image.startsWith(item)) ||
      !["png", "jpg", "jpeg", "gif"].some((item) =>
        imageWithoutQuery.includes(item)
      ))
  )
    errors["image"] = "This is not a valid image URL";

  if (isEdit) {
    delete errors["minContribution"];
    delete payload["minContribution"];
  }

  if (!!Object.keys(errors).length) return [null, errors];
  else return [payload, null];
};
