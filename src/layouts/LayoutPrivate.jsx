import { motion, useCycle } from 'framer-motion';
import styled from 'styled-components';
import { routes } from 'constants/routes';
import { useAuthContext } from 'context/auth/auth.provider';

const sidebar = {
  open: () => ({
    top: 0,
    bottom: 0,
    x: 0,
    transition: {
      type: 'just',
      stiffness: 201,
      restDelta: 0,
    },
  }),
  closed: {
    top: 0,
    bottom: 0,
    x: -400,
    transition: {
      delay: 0,
      type: 'just',
    },
  },
};

const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};

function LayoutPrivate({ children }) {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const { logout } = useAuthContext();
  return (
    <div>
      <Header>
        <IconWrapper onClick={toggleOpen}>
          <MenuIcon />
        </IconWrapper>
      </Header>
      <motion.div
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        style={{ width: '400px' }}
      >
        <Menu variants={sidebar}>
          <InnerMenu>
            <CloseIcon onClick={toggleOpen}>X</CloseIcon>
            {routes
              .filter((route) => route.isMenu)
              .map(({ path, name }) => (
                <Link
                  key={path}
                  href={path}
                  whileHover={{ scale: 1.1 }}
                  variants={itemVariants}
                >
                  {name}
                </Link>
              ))}
            <LogoutButton onClick={logout}>Logout</LogoutButton>
          </InnerMenu>
        </Menu>
      </motion.div>
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </div>
  );
}

export default LayoutPrivate;

export function MenuIcon() {
  return (
    <svg viewBox="0 0 100 80" width="30" height="25" fill="#fff">
      <rect width="100" height="20" />
      <rect y="30" width="100" height="20" />
      <rect y="60" width="100" height="20" />
    </svg>
  );
}

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
