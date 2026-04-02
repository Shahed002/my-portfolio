export default function Home() {
  return (
    <main className="bg-gradient-to-br from-black via-slate-950 to-blue-950 text-white relative">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-10 py-6 text-sm text-gray-300 z-50 backdrop-blur-md bg-black/30">
        <h1 className="font-bold text-white">SHAHEDUL</h1>
        <div className="flex gap-8">
          <a href="#home" className="hover:text-white transition">Home</a>
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#projects" className="hover:text-white transition">Projects</a>
          <a href="#services" className="hover:text-white transition">Services</a>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="max-w-7xl w-full grid md:grid-cols-2 gap-10 items-center">

          <div className="space-y-6">

            <div className="flex gap-3 text-sm text-gray-400">
              <span className="border border-gray-700 px-3 py-1 rounded-full">3D Artist</span>
              <span className="border border-gray-700 px-3 py-1 rounded-full">Blender Expert</span>
              <span className="border border-gray-700 px-3 py-1 rounded-full">Animator</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Hello, I'm <br />
              <span className="text-blue-400 drop-shadow-[0_0_25px_rgba(59,130,246,0.8)]">
                Shahedul.
              </span>
            </h1>

            <p className="text-gray-400 max-w-lg">
              Where ideas meet reality — turning visions, dreams, and wild thoughts into fully crafted 3D worlds.
            </p>

            <div className="flex gap-4 pt-4">
              {/* Get in touch button */}
              <a
                href="#contact"
                className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 px-6 py-3 rounded-lg shadow-lg inline-block text-white"
              >
                Get in touch →
              </a>

              {/* Learn more button */}
              <a
                href="#about"
                className="border border-gray-700 hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 px-6 py-3 rounded-lg inline-block"
              >
                Learn more
              </a>
            </div>

          </div>

          <div className="flex justify-center">
            <img
              src="/hero.png"
              alt="hero"
              className="w-[420px] h-[300px] object-cover rounded-2xl border border-gray-800 shadow-2xl"
            />
          </div>

        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-2xl space-y-4">
          <h2 className="text-4xl font-bold">About Me</h2>
          <p className="text-gray-400">
            I'm a 3D artist focused on creating realistic and cinematic visuals using Blender.
          </p>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">My Projects</h2>
          <p className="text-gray-400">Coming soon...</p>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">Services</h2>
          <p className="text-gray-300">
            I offer 3D modeling, animation, and rendering services.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section
  id="contact"
  className="relative min-h-screen flex items-center justify-center px-6 pt-24"
>
  {/* Overlay gradient fade */}
  <div className="absolute inset-0 bg-gradient-to-t from-black via-slate-950 to-blue-950 -z-10"></div>

  <div className="text-center max-w-2xl space-y-4 z-10">
    <h2 className="text-4xl font-bold text-white">Contact Me</h2>
    <p className="text-gray-400">Email: your@email.com</p>
    <p className="text-gray-400">Phone: +880123456789</p>
    <button className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 px-6 py-3 rounded-lg text-white">
      Send Message
    </button>
  </div>
</section>

    </main>
  );
}