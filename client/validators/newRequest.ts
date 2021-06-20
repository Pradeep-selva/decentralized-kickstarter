import { web3 } from "../instances";
import { ProcessedRequest } from "../types";
import { RequestErrors, RequestPayload } from "../types/validators";

export default ({
  description,
  recipient,
  value: strValue
}: RequestPayload): [ProcessedRequest | null, RequestErrors | null] => {
  let errors = {};
  const value = parseInt(strValue);

  const payload = {
    description,
    recipient,
    value
  };

  if (value <= 0) errors["value"] = "Minimum contribution must be > 0 wei";

  if (description.length <= 0)
    errors["description"] = "Description cannot be empty";

  if (!web3.utils.checkAddressChecksum(recipient))
    errors["recipient"] = "Please enter a valid recipient address";

  if (!!Object.keys(errors).length) return [null, errors];
  else return [payload, null];
};
