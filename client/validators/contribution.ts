export default (
  contribution: string,
  minContribution: string
): [number | null, string | null] => {
  const _contribution = parseInt(contribution);
  const _minContribution = parseInt(minContribution);

  if (_contribution < _minContribution)
    return [null, "Insufficient contribution"];
  else return [_contribution, null];
};
