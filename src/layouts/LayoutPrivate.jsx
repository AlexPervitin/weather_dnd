import { motion, useCycle } from 'framer-motion';
import { routes } from 'constants/routes';
import { useAuthContext } from 'context/auth/auth.provider';
import { MenuIcon } from 'assets/MenuIcon';
import {
  ChildrenWrapper,
  CloseIcon,
  Header,
  IconWrapper,
  InnerMenu,
  Link,
  LogoutButton,
  Menu,
} from './styles';

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
