import Passaro from "@/components/jogo/Passaro"

export default function Home() {
    return (
        <main className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-5xl space-x-4">
                <span className="text-red-400">Flappy</span>
                <span className="text-green-400">Bird</span>
            </h1>
            <div className="flex w-4/6 h-4/6 relative overflow-hidden bg-background bg-no-repeat bg-cover bg-blue-400 border-4 border-blue-500">
                <Passaro />
            </div>
        </main>
    )
}
