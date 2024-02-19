import { Container } from "@/components/Container";

export const Navbar = () => {
  return (
    <Container className="flex justify-center">
      {process.env.NEXT_PUBLIC_FULL_LOGO_URL && (
        <a
          href={process.env.NEXT_PUBLIC_WEBSITE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={process.env.NEXT_PUBLIC_FULL_LOGO_URL}
            className="h-8 mt-8"
          />
        </a>
      )}
    </Container>
  );
};
