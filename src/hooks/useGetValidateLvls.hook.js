const useGetValidateLvls = (password) => {
  const isLower = /[a-z]/g.test(password);
  const isUpper = /[A-Z]/g.test(password);
  const isNumber = /[0-9]/g.test(password);
  const isSpecialChar = /[-+_!@#$%^&*.;?]/g.test(password);
  const isFrom8to42Char = password.length >= 8 && password.length <= 42;

  return { isLower, isUpper, isNumber, isSpecialChar, isFrom8to42Char };
};

export default useGetValidateLvls;
