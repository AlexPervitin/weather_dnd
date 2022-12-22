import { motion } from 'framer-motion';
import styled from 'styled-components';

export const WrapperLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export const TextField = styled.input`
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 40px;
  padding: 4px 11px;
  border-radius: 4px;
  border: 1px solid rgb(216, 216, 216);
  ::-webkit-input-placeholder {
    opacity: 0.5;
  }
  margin-bottom: 30px;
`;

export const Label = styled.div`
  width: 100%;
  max-width: 400px;
  font-size: 14px;
  margin-bottom: 8px;
`;

export const LoginButton = styled.button`
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 40px;
  margin-top: 30px;
  cursor: pointer;
  user-select: none;
`;

export const Tooltip = styled(motion.div)`
  top: 49px;
  position: absolute;
  width: fit-content;
  border: 0.5px solid grey;
  background: #fff;
  padding: 15px;
`;

export const PasswordBlock = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const TestStr = styled.div`
  color: ${(props) => (props.isOk ? 'green' : 'red')};
`;

export const ValidMessage = styled.div`
  width: 100%;
  color: red;
`;

export const ValidEmailMessage = styled.div`
  width: 400px;
  color: red;
  margin-top: -20px;
`;

export const ValidSubmitMessage = styled.div`
  width: 400px;
  color: red;
`;

export const ValidateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
`;

export const ProtectionLevelWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  height: 10px;
  border: 1px solid rgb(216, 216, 216);
  position: absolute;
  top: 39px;
  border-radius: 0px 0px 4px 4px;
  background: rgb(231, 235, 241);
`;

export const ProtectionLevel = styled(motion.div)`
  height: 100%;
  background: ${(props) =>
    props.protectionLength === 0
      ? 'none'
      : props.protectionLength === 1
      ? 'rgb(255, 77, 77)'
      : props.protectionLength === 2
      ? 'rgb(255, 153, 51)'
      : props.protectionLength === 3
      ? 'rgb(230, 188, 0)'
      : 'rgb(0, 153, 51)'};
`;

export const ProtectMessageBlock = styled.div`
  display: flex;
  width: 100%;
  max-width: 400px;
  justify-content: flex-end;
  color: ${(props) =>
    props.protectionLength === 0
      ? 'none'
      : props.protectionLength === 1
      ? 'rgb(255, 77, 77)'
      : props.protectionLength === 2
      ? 'rgb(255, 153, 51)'
      : props.protectionLength === 3
      ? 'rgb(230, 188, 0)'
      : 'rgb(0, 153, 51)'};
`;
