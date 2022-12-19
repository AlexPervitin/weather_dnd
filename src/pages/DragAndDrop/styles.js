import { motion } from 'framer-motion';
import styled from 'styled-components';

export const DnDItemWrapper = styled.div`
  width: 100%;
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
  right: -7px;
  top: 28px;
  flex-direction: column;
`;

export const AddNewRowBlock = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 20px;
`;

export const AddNewRowInput = styled.input`
  min-height: 40px;
  min-width: 50%;
  border-radius: 8px;
  margin-right: 5px;
`;

export const RowWrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: 800;
  font-size: 28px;
  justify-content: center;
`;

export const RowBlock = styled.div`
  background: #fff;
  margin: 8px;
  padding: 8px;
  width: 90%;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;

export const RowInner = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const RowText = styled.div`
  width: 100%;
  margin-left: 30px;
`;

export const MenuItem = styled.div`
  cursor: pointer;
`;

export const ChangeRowTextInput = styled.input`
  width: 100%;
  height: 100%;
  min-height: 40px;
  margin-bottom: 10px;
  border-radius: 8px;
`;

export const ActionRowBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  height: 40px;
`;

export const ActionButton = styled.button`
  cursor: pointer;
  border-radius: 8px;
  &:disabled {
    background: #fff;
    opacity: 0.9;
  }
`;

export const DndTitle = styled.div`
  color: #fff;
  font-size: 20px;
  margin-bottom: 15px;
`;
