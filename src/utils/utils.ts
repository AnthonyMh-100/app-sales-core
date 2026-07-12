import bcryptjs from "bcryptjs";

interface Props {
  password: string;
  hashedPassword: string;
}

export const generatePassword = async (password: string): Promise<string> => {
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async ({
  password,
  hashedPassword,
}: Props): Promise<boolean> => {
  return await bcryptjs.compare(password, hashedPassword);
};

export const formatCurrency = (number: number) => {
  const format = new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(number);

  return format;
};
