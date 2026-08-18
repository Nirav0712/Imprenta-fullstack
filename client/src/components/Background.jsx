const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden transform-gpu will-change-transform" style={{ backgroundColor: 'var(--theme-background)' }}>

      {/* Base Gradient */}
      <div className="absolute inset-0 transform-gpu will-change-transform" style={{ backgroundImage: 'linear-gradient(to bottom right, var(--theme-secondary), var(--theme-background))', opacity: 0.8 }} />

      {/* Shape 1 */}
      <div className="absolute -top-[35%] -left-[15%] w-[900px] h-[900px] rounded-[130px] bg-gradient-to-br from-blue-600/25 to-transparent rotate-[25deg] animate-rotateSlow transform-gpu will-change-transform" />

      {/* Shape 2 */}
      <div className="absolute top-[20%] right-[-20%] w-[950px] h-[950px] rounded-[160px] bg-gradient-to-tr from-cyan-500/20 to-transparent rotate-[35deg] animate-rotateReverse transform-gpu will-change-transform" />
      {/* Shape 3 */}
      <div className="absolute bottom-[-30%] left-[25%] w-[700px] h-[700px] rounded-[120px] bg-gradient-to-r from-sky-500/15 to-transparent rotate-[45deg] animate-rotateSlow transform-gpu will-change-transform" />

      {/* Glow */}
      <div className="absolute left-0 top-0 w-[500px] h-[500px] bg-blue-600/20 blur-[180px] transform-gpu will-change-transform" />

      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[180px] transform-gpu will-change-transform" />

    </div>
  );
};

export default Background;