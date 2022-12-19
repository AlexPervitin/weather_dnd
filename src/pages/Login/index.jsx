import { emailValidate } from 'constants/constants';
import { useAuthContext } from 'context/auth/auth.provider';
import useGetValidateLvls from 'hooks/useGetValidateLvls.hook';
import { useState } from 'react';
import {
  Label,
  LoginButton,
  PasswordBlock,
  ProtectionLevel,
  ProtectionLevelWrapper,
  ProtectMessageBlock,
  TestStr,
  TextField,
  Tooltip,
  ValidateWrapper,
  ValidMessage,
  WrapperLogin,
} from './styles';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focus, setFocus] = useState(false);
  const { login } = useAuthContext();

  const { isLower, isUpper, isNumber, isSpecialChar, isFrom8to42Char } =
    useGetValidateLvls(password);

  const validateEmail = (() => {
    return String(email).toLowerCase().match(emailValidate);
  })();

  const protectionLength = [
    isLower,
    isUpper,
    isNumber,
    isSpecialChar,
    isFrom8to42Char,
  ].filter((item) => item === true).length;

  const getProtectMessage = () => {
    return protectionLength === 0
      ? ''
      : protectionLength === 1
      ? 'Bad'
      : protectionLength === 2
      ? 'Weak'
      : protectionLength === 3
      ? 'Good'
      : 'Strong';
  };

  const isValid =
    protectionLength >= 1 && protectionLength < 5 ? 'Password not valid' : '';

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    login(email, password);
  };

  return (
    <WrapperLogin>
      <Label>Email</Label>
      <TextField
        type="email"
        placeholder="Enter your email"
        onChange={handleChangeEmail}
      />
      <Label>Password</Label>
      <PasswordBlock>
        <TextField
          type="password"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder="Must have 8-42 characters"
          onChange={handleChangePassword}
        />
        <ProtectionLevelWrapper>
          <ProtectionLevel
            protectionLength={protectionLength}
            animate={{
              width:
                protectionLength === 0
                  ? '0'
                  : protectionLength === 1
                  ? '25%'
                  : protectionLength === 2
                  ? '50%'
                  : protectionLength === 3
                  ? '75%'
                  : '100%',
            }}
          />
        </ProtectionLevelWrapper>
        <Tooltip
          focus={focus}
          animate={{ opacity: focus ? 1 : 0, scale: focus ? 1 : 1 }}
        >
          <div>Password requirements:</div>
          <TestStr isOk={isLower}>At least 1 lowercase latter</TestStr>
          <TestStr isOk={isUpper}>At least 1 uppercase latter</TestStr>
          <TestStr isOk={isNumber}>At least 1 number</TestStr>
          <TestStr isOk={isSpecialChar}>At least 1 special character</TestStr>
          <TestStr isOk={isFrom8to42Char}>Must have 8-42 characters</TestStr>
        </Tooltip>
      </PasswordBlock>
      <ValidateWrapper>
        <ValidMessage>{isValid}</ValidMessage>
        <ProtectMessageBlock protectionLength={protectionLength}>
          {getProtectMessage()}
        </ProtectMessageBlock>
      </ValidateWrapper>
      <LoginButton
        disabled={!validateEmail || protectionLength < 5}
        onClick={handleLogin}
      >
        Sign UP
      </LoginButton>
    </WrapperLogin>
  );
}

export default Login;
