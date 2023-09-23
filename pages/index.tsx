import Link from "next/link";

const Home = () => {
  return (
    <main className="grid place-content-center">
      <Link href={'/GestionFinanciera'} className="hover:underline">
        Gestión Financiera
      </Link>
    </main>
  );
};

export default Home;
