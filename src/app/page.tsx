"use client";
import ThemeTiles from "@/components/ThemeTiles";
import useASLThemes from "@/hooks/useAslThemes";

const Home = () => {
  const aslThemes = useASLThemes();

  return (
    <main className="flex flex-col ">
      <header>
        <h1 className="text-center text-4xl pt-12">Welcome</h1>
      </header>

      <div className="container">
        {aslThemes &&
          aslThemes.length > 0 &&
          aslThemes.map((theme) => {
            return (
              <ThemeTiles
                key={theme.id}
                id={theme.id}
                title={theme.title}
                image={theme.image}
              />
            );
          })}
      </div>
    </main>
  );
};

export default Home;
