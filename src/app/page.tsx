
export default function Home() {
  const Card = ({ className, children }: { className?: string; children?: React.ReactNode }) => (
    <div
      className={`rounded-2xl border border-border/20 bg-card p-4 shadow-lg flex items-center justify-center ${className}`}
    >
      {children}
    </div>
  );

  return (
    <main className="min-h-screen p-4">
      <div className="grid grid-cols-4 grid-rows-[repeat(26,minmax(0,1fr))] gap-2 md:grid-cols-8 md:grid-rows-10 lg:grid-cols-12 lg:grid-rows-6 h-[1200px] md:h-[900px] lg:h-[600px]">
        {/* div1 */}
        <Card className="col-span-4 row-span-7 md:col-span-5 md:row-span-5 lg:col-span-6 lg:row-span-4 bg-red-500/20">
          div1
        </Card>
        {/* div2 */}
        <Card className="col-span-2 row-start-8 row-span-3 md:col-start-1 md:col-span-3 md:row-start-6 md:row-span-3 lg:col-start-1 lg:col-span-4 lg:row-start-5 lg:row-span-2 bg-blue-500/20">
          div2
        </Card>
        {/* div3 */}
        <Card className="col-start-3 col-span-2 row-start-8 row-span-3 md:col-start-4 md:col-span-2 md:row-start-6 md:row-span-3 lg:col-start-5 lg:col-span-2 lg:row-start-5 lg:row-span-2 bg-green-500/20">
          div3
        </Card>
        {/* div4 */}
        <Card className="col-span-4 row-start-11 row-span-5 md:col-start-6 md:col-span-3 md:row-start-1 md:row-span-3 lg:col-start-7 lg:col-span-3 lg:row-start-1 lg:row-span-3 bg-yellow-500/20">
          div4
        </Card>
        {/* div5 */}
        <Card className="col-span-4 row-start-16 row-span-7 md:col-start-6 md:col-span-3 md:row-start-4 md:row-span-5 lg:col-start-10 lg:col-span-3 lg:row-start-1 lg:row-span-5 bg-purple-500/20">
          div5
        </Card>
        {/* div6 */}
        <Card className="col-span-1 row-start-23 row-span-4 md:col-start-1 md:col-span-2 md:row-start-9 md:row-span-2 lg:col-start-7 lg:col-span-3 lg:row-start-4 lg:row-span-2 bg-pink-500/20">
          div6
        </Card>
        {/* div7 */}
        <Card className="col-span-3 row-start-23 row-span-4 md:col-start-3 md:col-span-6 md:row-start-9 md:row-span-2 lg:col-start-1 lg:col-span-6 lg:row-start-7 lg:row-span-1 bg-indigo-500/20">
          div7
        </Card>
      </div>
    </main>
  );
}
