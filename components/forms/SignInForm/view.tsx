import type { FC } from 'react';
import type { SignInFormProps } from '../../../types/components/forms';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { pseudoOrEmailTexts, passwordTexts } from '../../../translations/components/inputs';
import { rememberMeTexts, signInTexts } from '../../../translations/pages/login';
import { CheckBox } from '../../buttons/CheckBox/CheckBox';
import { InputField } from '../../inputs/InputField/InputField';
import { InputPassword } from '../../inputs/InputPassword/InputPassword';
import { FormWrapper } from '../../../layouts/wrappers/FormWrapper/FormWrapper';
import { Message } from '../../Message/Message';

export const SignInFormView: FC<SignInFormProps> = ({
  handleSubmit,
  pseudoOrEmail, setPseudoOrEmail,
  password, setPassword,
  rememberMe, setRememberMe,
  warningMessage, setWarningMessage,
  loading
}) => {

  const { lang } = useContext(LangContext);

  const pseudoOrEmailInputLabel = pseudoOrEmailTexts.label[lang as keyof typeof pseudoOrEmailTexts.label];
  const pseudoOrEmailInputTitle = pseudoOrEmailTexts.title[lang as keyof typeof pseudoOrEmailTexts.title];
  const passwordInputLabel = passwordTexts.label[lang as keyof typeof passwordTexts.label];
  const passwordInputTitle = passwordTexts.title[lang as keyof typeof passwordTexts.title];
  const submitLabel = signInTexts.submit.label[lang as keyof typeof signInTexts.submit.label];
  const submitTitle = signInTexts.submit.title[lang as keyof typeof signInTexts.submit.title];
  const checkBoxLabel = rememberMeTexts.label[lang as keyof typeof rememberMeTexts.label];
  const checkBoxTitle = rememberMeTexts.title[lang as keyof typeof rememberMeTexts.title];

  return (
    <FormWrapper
      handleSubmit={handleSubmit}
      submitLabel={submitLabel}
      submitTitle={submitTitle}
      loading={loading}
    >
      <InputField
        value={pseudoOrEmail}
        setValue={setPseudoOrEmail}
        label={pseudoOrEmailInputLabel}
        title={pseudoOrEmailInputTitle}
        id='sign-in-pseudo-or-email-input'
      />

      <InputPassword
        value={password}
        setValue={setPassword}
        label={passwordInputLabel}
        title={passwordInputTitle}
        id='sign-in-password-input'
      />

      <Message
        warningMessage={warningMessage}
        setWarningMessage={setWarningMessage}
      />

      <CheckBox
        state={rememberMe}
        setState={setRememberMe}
        label={checkBoxLabel}
        title={checkBoxTitle}
        id='sign-in-remember-me-switch'
      />
    </FormWrapper>
  );
};