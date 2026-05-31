export default function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[url('/src/assets/pexels1.jpg')] bg-cover bg-center opacity-40" />
      <div className="absolute inset-0 bg-white/70" />
    </div>
  )
}
