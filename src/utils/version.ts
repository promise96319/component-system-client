export const sortVersion = (v1: string, v2: string) => {
  const [major1, minor1, patch1] = v1.split('.');
  const [major2, minor2, patch2] = v2.split('.');

  if (major1 !== major2) {
    return Number(major1) - Number(major2);
  }

  if (minor1 !== minor2) {
    return Number(minor1) - Number(minor2);
  }

  return Number(patch1) - Number(patch2);
};
