import { motion } from 'framer-motion';
import styled from 'styled-components';

export const DnDItemWrapper = styled.div`
  background: #fff;
  margin: 8px;
  padding: 8px;
  width: 90%;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;

export const DnDWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 25px;
`;

export const Tooltip = styled(motion.div)`
  position: absolute;
  border: 0.5px solid grey;
  z-index: 1;
  background: #fff;
  padding: 15px;
  width: 100%;
  max-width: 300px;
  right: -8px;
  top: 22px;
  flex-direction: column;
`;
