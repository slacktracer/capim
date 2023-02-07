export const deleteCookie = ({ name }: { name: string }) => {
  document.cookie = `${name}=; max-age=0; path=/`;
};
