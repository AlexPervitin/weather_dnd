import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Menu = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 400px;
  z-index: 1300;
  background: #121212;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const Link = styled(motion.a)`
  color: #f9fafb;
  text-decoration: none;
  font-size: 1.75rem;
  font-weight: 600;
  display: block;
  margin: 20px;
`;

export const Header = styled.div`
  width: 100%;
  height: 40px;
  background: #121212;
  padding: 5px 30px;
`;

export const IconWrapper = styled.div`
  width: fit-content;
  cursor: pointer;
`;

export const CloseIcon = styled.div`
  color: #fff;
  align-self: flex-end;
  cursor: pointer;
`;

export const ChildrenWrapper = styled.div`
  background: #424242;
  width: 100%;
  height: calc(100vh - 40px);
`;

export const LogoutButton = styled.button`
  width: 80%;
  height: 40px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  margin-top: auto;
  align-self: center;
`;

export const InnerMenu = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
