const validaButton = (valueEmail, valuePassword, buttonDisable, validEmail) => {
  let verification = buttonDisable;
  const quantMin = 5;
  if (valueEmail.length >= quantMin && valuePassword.length >= quantMin) {
    verification = false;
  } else {
    verification = true;
  }
  return validEmail.length > 0 ? true : verification;
};

export default validaButton;
