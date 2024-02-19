import { Container } from "@/components/Container";

export const Footer = () => {
  return (
    <Container className="flex justify-center mb-4">
      <span className="text-dark-accent">{`© ${new Date().getFullYear()} ${
        process.env.NEXT_PUBLIC_APP_NAME
      }`}</span>
    </Container>
  );
};
